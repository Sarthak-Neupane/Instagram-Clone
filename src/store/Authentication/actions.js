import { auth, provider, db } from "../../firebase";

export default {
  async signUp(context, payload) {
    await auth.createUserWithEmailAndPassword(payload.email, payload.password);

    await auth.currentUser.updateProfile({
      displayName: `${payload.firstName}`,
    });

    const docRef = await db.collection("users").doc(auth.currentUser.uid).set({
      firstName: payload.firstName,
      lastName: payload.lastName,
      bio: null,
      friends: [],
      website: null,
      fans: 0,
      following: 0,
      goals: 0,
      photoURL: auth.currentUser.photoURL
    });

    console.log(docRef);

    context.commit("sign_up_the_user", auth.currentUser);
  },

  async signUpWithGoogle(context) {
    const result = await auth.signInWithPopup(provider);
    const user = result.user;

    const docRef =   await db.collection("users").doc(auth.currentUser.uid).set({
      firstName: null,
      lastName: null,
      displayName: auth.currentUser.displayName,
      bio: null,
      friends: [],
      website: null,
      fans: 0,
      following: 0,
      goals: 0,
      photoURL: auth.currentUser.photoURL
  })

    console.log(docRef);

    context.commit("sign_up_the_user", user);
  },

  async logIn(context, payload) {
    await auth.signInWithEmailAndPassword(payload.email, payload.password);
    context.commit("log_in_the_user", auth.currentUser);
  },

  async sign_out(context) {
    await auth.signOut();
    context.commit("sign_the_user_out");
  },
};
