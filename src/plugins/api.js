import Vue from 'vue'

import { ScreepsAPI } from 'screeps-api'

Vue.prototype.$api = new ScreepsAPI()

export default ({ app }, inject) => {
  app.$api = Vue.prototype.$api
  inject('api', Vue.prototype.$api)
}