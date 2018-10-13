import Vue from 'nativescript-vue';
import App from './components/App'
import Login from './components/Login'
import Task from './components/Task'
import Home from'./components/Home'
import VueDevtools from 'nativescript-vue-devtools'

Vue.registerElement('CardView', () => require('nativescript-cardview').CardView)
if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
  render: h => h('frame', [h(Home)])
}).$start()