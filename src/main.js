import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import messagePlugin from '@/plugins/message.plugin'
import 'materialize-css/dist/js/materialize.min'
import './registerServiceWorker'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);


let app;
firebase.initializeApp({
  apiKey: "AIzaSyAAjRLv3YrB-r_IZMxL7jJaK8opXHf19gw",
  authDomain: "app-finanse-manager.firebaseapp.com",
  databaseURL: "https://app-finanse-manager.firebaseio.com",
  projectId: "app-finanse-manager",
  storageBucket: "app-finanse-manager.appspot.com",
  messagingSenderId: "82174371033",
  appId: "1:82174371033:web:61379d6de73c119d368ac8",
  measurementId: "G-0DJKT6NBRD"
});


firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


