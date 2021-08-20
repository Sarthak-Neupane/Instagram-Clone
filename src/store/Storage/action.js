import { storage, auth, db, fb } from "../../firebase";

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
    const newUser = {...user}
    newUser.photoURL = url 
    localStorage.setItem('User', JSON.stringify(newUser));
    context.commit('change_profile', url)
  },

  async addPost(context, payload){
    console.log(context)
    console.log(payload)
    console.log(fb)
    await storage.ref().child(`Post/${payload.visible}/${payload.id}/${payload.time}`).put(payload.file)
    const url = await storage.ref().child(`Post/${payload.visible}/${payload.id}/${payload.time}`).getDownloadURL()

    console.log(url)

    const toBeAdded = {
      id: payload.id,
      author: payload.author,
      authorPic: payload.authorPic,
      file: url,
      likes: 0,
      caption: payload.caption,
      comments: 0,
      allComments: [],
      allLikes: [],
      time: payload.time
    }


    await db.collection(`${payload.visible}/`).add(toBeAdded)
    
    const docRef = await db.collection("users").doc(payload.id).get();
    const info = docRef.data()

  //   const docRef2 =  db.collection("users").doc(payload.id);

  //   docRef2.update({
  //     goals: fb.arrayUnion(toBeAdded)
  // });

    const goals = info.goals

    goals.push(toBeAdded)

    context.rootState.database.posts.push(toBeAdded)

    await db.collection("users").doc(payload.id).update({
      goals: goals
    });

    // await db.collection(`Posts/${payload.visible}/${payload.id}`).doc(payload.id).update({
    //   goals: db.FieldValue.arrayUnion(toBeAdded)
    // });

  }
};

// id: this.getUser.uid,
// author: this.getUser.displayName,
// authorPic: this.getUser.photoURL,
// file: file,
// likes: 0,
// caption: this.caption,
// visibile: this.radio,
// comments: 0,
// allComments: [],
// allLikes: [],
// time: new Date().getTime(),