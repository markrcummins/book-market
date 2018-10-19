import Vue from 'nativescript-vue';
import App from './components/App';
import Login from './components/Login';
import Task from './components/Task';
import Home from'./components/Home';
import RadListView from 'nativescript-ui-listview/vue';
import VueDevtools from 'nativescript-vue-devtools'

Vue.use(RadListView);
Vue.registerElement('CardView', () => require('nativescript-cardview').CardView)
if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
  render: h => h('frame', [h(Home)])
}).$start()