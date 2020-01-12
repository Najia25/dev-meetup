import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    meetups: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: 'sdsaddsdsdssd',
        title: 'Meetup in New York',
        date: '2020-07-19'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Paris_vue_d%27ensemble_tour_Eiffel.jpg',
        id: 'kukhjghjy',
        title: 'Meetup in Paris',
        date: '2020-07-30'
      }
    ],
    user: {
      id: 'sdsdsfdsf12',
      registeredMeetups: ['sdsaddsdsdssd']
    }
  },
  mutations: {
  },
  actions: {
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
    }
  }
})
