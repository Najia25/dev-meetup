export default {
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
