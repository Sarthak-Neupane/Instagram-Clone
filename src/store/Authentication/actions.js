import { auth } from "../../firebase";

export default {
  async signUp(context, payload) {
    await auth.createUserWithEmailAndPassword(payload.email, payload.password);

    await auth.currentUser.updateProfile({
      displayName: `${payload.username}`,
    });
    context.commit("sign_up_the_user", auth.currentUser);
  },

  async logIn(context, payload) {
    await auth.signInWithEmailAndPassword(payload.email, payload.password);
    context.commit("log_in_the_user", auth.currentUser);
  },
};
