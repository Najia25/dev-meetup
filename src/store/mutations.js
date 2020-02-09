export default {
  // MEETUPS
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
  // USER
  registerForMeetup (state, payload) {
    if (state.user.registeredMeetups.findIndex(meetupId => meetupId === payload.id) >= 0) {
      return
    }
    state.user.registeredMeetups.push(payload.id)
    state.user.registrationIds[payload.id] = payload.registrationId
  },
  unregisterForMeetup (state, payload) {
    state.user.registeredMeetups.splice(state.user.registeredMeetups.findIndex(meetupId => meetupId === payload), 1)
    Reflect.deleteProperty(state.user.registrationIds, payload)
  },
  addUser (state, payload) {
    state.user = payload
  },
  // OTHERS
  setLoading (state, payload) {
    state.loading = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  clearError (state) {
    state.error = null
  }
}
