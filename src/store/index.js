import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    meetups: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: 'sdsaddsdsdssd',
        title: 'Meetup in New York',
        date: '2020-07-19',
        description: 'sdkljsakdljsakldsjakldjaskldjkasldjksaldj'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Paris_vue_d%27ensemble_tour_Eiffel.jpg',
        id: 'kukhjghjy',
        title: 'Meetup in Paris',
        date: '2020-07-30',
        description: 'sdkljsakdljsakldsjakldjaskldjkasldjksaldj'
      }
    ],
    user: null
  },
  mutations: {
    createMeetup (state, payload) {
      state.meetups.push(payload)
    },
    addUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    addMeetup ({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        imageUrl: payload.imageUrl,
        id: 'yuyuyuy',
        date: payload.date
      }
      commit('createMeetup', meetup)
    },
    signInUser ({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('addUser', newUser)
          }
        )
        .catch(error => {
          console.log(error)
        })
    },
    signUpUser ({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('addUser', newUser)
          }
        )
        .catch(error => {
          console.log(error)
        })
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
      return getters.loadMeetups.slice(0, 1)
    },
    user (state) {
      return state.user
    }
  }
})
