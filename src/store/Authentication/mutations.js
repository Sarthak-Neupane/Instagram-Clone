export default {
  sign_up_the_user(state, payload) {
    state.user = payload;
    // console.log(payload);
  },
  log_in_the_user(state, payload) {
    state.user = payload;
    // console.log(payload);
  },
};
