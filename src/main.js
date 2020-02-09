import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import AlertCmp from './components/common/Alert.vue'
import MeetupEditDetail from './components/Meetup edit/EditMeetupDetailsDialogue.vue'
import MeetupEditDate from './components/Meetup edit/EditMeetupDateDialogue.vue'
import MeetupEditTime from './components/Meetup edit/EditMeetupTimeDialogue.vue'
import MeetupRegister from './components/Registration/MeetupRegistrationDialogue.vue'
import DateFilter from './components/filters/date'

Vue.config.productionTip = false

Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialogue', MeetupEditDetail)
Vue.component('app-edit-meetup-date-dialogue', MeetupEditDate)
Vue.component('app-edit-meetup-time-dialogue', MeetupEditTime)
Vue.component('app-edit-meetup-registration-dialogue', MeetupRegister)
Vue.filter('date', DateFilter)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyD6S4OoBEpidnknY2SXVuR-8bNv0KexaxU',
      authDomain: 'devmeetup-11bc5.firebaseapp.com',
      databaseURL: 'https://devmeetup-11bc5.firebaseio.com',
      projectId: 'devmeetup-11bc5',
      storageBucket: 'gs://devmeetup-11bc5.appspot.com',
      messagingSenderId: '995011693070',
      appId: '1:995011693070:web:b966f56b63edbb1f540a5f'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserState')
      }
    })
    this.$store.dispatch('LoadMeetups')
  }
}).$mount('#app')
