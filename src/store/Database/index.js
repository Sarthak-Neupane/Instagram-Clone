
import mutations from "./mutations";
import getters from "./getters";
import actions from "./action";

export default {
  namespaced: true,
  state() {
    return {
      error: null,
      userInfo: null,
    };
  },
  mutations,
  getters,
  actions,
};
