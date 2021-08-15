import { auth, provider, db } from "../../firebase";

export default {
  async signUp(context, payload) {
    await auth.createUserWithEmailAndPassword(payload.email, payload.password);

    await auth.currentUser.updateProfile({
      displayName: `${payload.firstName}`,
    });

    if(!db.collection("users").doc(auth.currentUser.uid)){
      const docRef = await db.collection("users").doc(auth.currentUser.uid).set({
        firstName: payload.firstName,
        lastName: payload.lastName,
        displayName: auth.currentUser.displayName,
        bio: null,
        friends: [],
        website: null,
        fans: 0,
        following: 0,
        goals: 0,
        photoURL: auth.currentUser.photoURL
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

    if(!db.collection("users").doc(auth.currentUser.uid)){

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
