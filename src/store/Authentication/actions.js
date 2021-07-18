import { auth } from "../../firebase";

export default {
  async signUp(context, payload) {
    const theUser = await auth.createUserWithEmailAndPassword(
      payload.email,
      payload.password
    );
    context.commit("sign_up_the_user", theUser);
  },

  async logIn(context, payload) {
    const theUser = await auth.signInWithEmailAndPassword(
      payload.email,
      payload.password
    );
    context.commit("log_in_the_user", theUser);
  },
};
