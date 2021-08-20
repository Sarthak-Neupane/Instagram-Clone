import { auth, provider, db } from "../../firebase";

export default {
  async signUp(context, payload) {
    await auth.createUserWithEmailAndPassword(payload.email, payload.password);

    await auth.currentUser.updateProfile({
      displayName: `${payload.firstName}`,
    });

    const main = await db.collection("users").doc(auth.currentUser.uid).get()
    console.log(main.exists)

    if(!main.exists){
      const docRef = await db.collection("users").doc(auth.currentUser.uid).set({
        firstName: payload.firstName,
        lastName: payload.lastName,
        displayName: auth.currentUser.displayName,
        bio: null,
        friends: [],
        website: null,
        fans: [],
        following: [],
        goals: [],
        photoURL: auth.currentUser.photoURL,
        gender: null
      });
  
      console.log(docRef);
  
    }
    context.commit("sign_up_the_user", auth.currentUser);
  },

  async signUpWithGoogle(context) {
    let result;
    if(window.innerWidth > 768){
       result = await auth.signInWithPopup(provider);
    }else{
       result = await auth.signInWithRedirect(provider);
    }
    const user = result.user;

    const main = await db.collection("users").doc(auth.currentUser.uid).get()
    console.log(main.exists)

    if(!main.exists){

      const docRef =   await db.collection("users").doc(auth.currentUser.uid).set({
        firstName: null,
        lastName: null,
        displayName: auth.currentUser.displayName,
        bio: null,
        friends: [],
        website: null,
        fans: [],
        following: [],
        goals: [],
        photoURL: auth.currentUser.photoURL,
        gender: null
    })
  
      console.log(docRef);
    }

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
