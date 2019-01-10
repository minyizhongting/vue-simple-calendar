import VueSimpleCalendar from './components/SimpleCalendar.vue'

import Vue from 'vue'
import iview from 'iview'
Vue.use(iview);
import 'iview/dist/styles/iview.css'

VueSimpleCalendar.install = function (Vue) {
  Vue.component('vue-simple-calendar', VueSimpleCalendar)
}

export default VueSimpleCalendar
