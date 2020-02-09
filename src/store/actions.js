import * as firebase from 'firebase'
export default {

  // MEETUPS

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
            time: obj[key].time,
            description: obj[key].description,
            creatorId: obj[key].creatorId,
            location: obj[key].location
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

  // USER

  registerForMeetup ({ commit, getters }, payload) {
    commit('setLoading', true)
    firebase.database().ref('/users/' + getters.user.id).child('/registration/')
      .push(payload)
      .then((data) => {
        commit('setLoading', false)
        console.log(data.key)
        commit('registerForMeetup', { id: payload, registrationId: data.key })
      })
      .catch(error => {
        commit('setLoading', false)
        console.log(error)
      })
  },
  unregisterForMeetup ({ commit, getters }, payload) {
    commit('setLoading', true)
    if (!getters.user.registrationIds) {
      return
    }
    firebase.database().ref('/users/' + getters.user.id + '/registration/').child(getters.user.registrationIds[payload])
      .remove()
      .then(() => {
        commit('setLoading', false)
        commit('unregisterForMeetup', payload)
      })
      .catch(error => {
        console.log(error)
      })
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
            registeredMeetups: [],
            registrationIds: {}
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
            registeredMeetups: [],
            registrationIds: {}
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
  autoSignIn ({ commit }, payload) {
    const user = {
      id: payload.uid,
      registeredMeetups: [],
      registrationIds: {}
    }
    commit('addUser', user)
  },
  fetchUserState ({ commit, getters }) {
    firebase.database().ref('/users/' + getters.user.id + '/registration/').once('value')
      .then(data => {
        const registeredMeetups = []
        const registrationIds = {}
        const values = data.val()
        for (let key in values) {
          registeredMeetups.push(values[key])
          registrationIds[values[key]] = key
        }
        const updateUser = {
          id: getters.user.id,
          registeredMeetups: registeredMeetups,
          registrationIds: registrationIds
        }
        commit('addUser', updateUser)
        console.log(registrationIds)
      })
      .catch(error => {
        console.log(error)
      })
  },
  logOut ({ commit }) {
    commit('addUser', null)
    firebase.auth().signOut()
  },

  // OTHERS

  clearError ({ commit }) {
    commit('clearError')
  }
}
