import { storage, auth, db } from "../../firebase";

export default {
  async changeProfilePic(context, payload){
    await storage.ref().child(`DP/${payload.id}`).put(payload.file)
    const url = await storage.ref().child(`DP/${payload.id}`).getDownloadURL()
    console.log(url)
    console.log(context)

    await auth.currentUser.updateProfile({
      photoURL: url,
    });
    await db.collection("users").doc(payload.id).update({
      photoURL: url,
    });
    console.log(context.rootState.auth.user.photoURL)
    context.rootState.auth.user.photoURL = url
    const user = JSON.parse(localStorage.getItem("User"))
    user.photoURL = url 
    localStorage.setItem('User', JSON.stringify(user));
    context.commit('change_profile', url)
  }
};
