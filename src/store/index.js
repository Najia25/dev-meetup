import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    meetups: [],
    user: null,
    error: null,
    loading: false
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.meetups = payload
    },
    createMeetup (state, payload) {
      state.meetups.push(payload)
    },
    addUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    LoadMeetups ({ commit }) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then(data => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              imageUrl: obj[key].imageUrl,
              id: key,
              title: obj[key].title,
              date: obj[key].date,
              description: obj[key].description
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    addMeetup ({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        imageUrl: payload.imageUrl,
        date: payload.date
      }
      // Reach out to firebse and store it.
      firebase.database().ref('meetups').push(meetup)
        .then(data => {
          console.log(data)
          const key = data.key
          commit('createMeetup', {
            ...meetup, id: key
          })
        })
        .catch(error => {
          console.log(error)
        })
      commit('createMeetup', meetup)
    },
    signInUser ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('addUser', newUser)
          }
        )
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    signUpUser ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('addUser', newUser)
          }
        )
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    clearError ({ commit }) {
      commit('clearError')
    }
  },
  modules: {
  },
  getters: {
    loadMeetups (state) {
      return state.meetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    loadMeetup (state) {
      return (meetupId) => {
        return state.meetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    featuredMeetups (state, getters) {
      return getters.loadMeetups.slice(0, 3)
    },
    user (state) {
      return state.user
    },
    error (state) {
      return state.error
    },
    loading (state) {
      return state.loading
    }
  }
})
