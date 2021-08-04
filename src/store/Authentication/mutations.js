export default {
  sign_up_the_user(state, payload) {
    localStorage.setItem("User", JSON.stringify(payload));
    state.user = payload;
  },
  log_in_the_user(state, payload) {
    localStorage.setItem("User", JSON.stringify(payload));
    state.user = payload;
  },
  sign_the_user_out(state) {
    localStorage.clear();
    state.user = null;
  },
};
