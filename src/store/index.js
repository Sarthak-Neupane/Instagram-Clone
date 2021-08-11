import { createStore } from "vuex";


import mutations from "./mutations";
import getters from "./getters"
import actions from "./actions"


import authentication from './Authentication/index.js'
import database from './Database/index.js'

export default createStore({
  state() {
    return {}
  },
  getters,
  mutations,
  actions,
  modules: {
    auth : authentication,
    database: database
  },
});
