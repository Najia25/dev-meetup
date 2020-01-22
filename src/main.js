import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import AlertCmp from './components/common/Alert.vue'

Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCTx2zr6wuKaM-SwTOzY3y3m8yCPCR1OGk',
      authDomain: 'devmeetup-3984e.firebaseapp.com',
      databaseURL: 'https://devmeetup-3984e.firebaseio.com',
      projectId: 'devmeetup-3984e',
      storageBucket: 'devmeetup-3984e.appspot.com',
      messagingSenderId: '369884531349',
      appId: '1:369884531349:web:623a4caa91d09ab229a99c',
      measurementId: 'G-KY0BVXGPEC'
    })
  }
}).$mount('#app')
