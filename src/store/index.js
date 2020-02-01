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
    mutateMeetupData (state, payload) {
      // wierd
      // editing meetup variable updates the state. javascript feature.
      const meetup = state.meetups.find(data => {
        return data.id === payload.id
      })

      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
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
              description: obj[key].description,
              creatorId: obj[key].creatorId
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
    addMeetup ({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date,
        creatorId: getters.user.id
      }
      // Reach out to firebse and store it.
      let key
      let imageUrl
      console.log(meetup)
      firebase.database().ref('meetups').push(meetup)
        .then(data => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          console.log(ext)
          return firebase.storage().ref('meetups/' + key + ext).put(payload.image)
        })
        .then(filedata => {
          return filedata.ref.getDownloadURL()
        })
        .then(data => {
          imageUrl = data
          return firebase.database().ref('meetups').child(key).update({ imageUrl: imageUrl })
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            id: key,
            imageUrl: imageUrl
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateMeetupData ({ commit }, payload) {
      commit('setLoading', true)
      const updateObj = {}
      console.log(payload)
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      console.log(updateObj)
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('mutateMeetupData', payload)
        })
        .catch(error => {
          console.log(error)
          // commit('setLoading', false)
        })
      commit('setLoading', false)
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
    },
    autoSignIn ({ commit }, payload) {
      const user = {
        id: payload.uid,
        registeredMeetups: []
      }
      commit('addUser', user)
    },
    logOut ({ commit }) {
      commit('addUser', null)
      firebase.auth().signOut()
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
          console.log('jjskad')
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
