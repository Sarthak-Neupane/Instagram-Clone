import { db } from "../../firebase";

export default {
  async getData(context, payload) {
    const docRef = await db.collection("users").doc(payload).get();
    const info = docRef.data()
    context.commit('set_user_info', info)
  },

  async updateProfile(_, payload){
    const first = payload.name.split(' ')
    await db.collection("users").doc(payload.id).update({
      bio: payload.bio,
      displayName: payload.displayName,
      firstName: first[0],
      lastName: first.reverse()[0],
      website: payload.website
    });
  }
};
