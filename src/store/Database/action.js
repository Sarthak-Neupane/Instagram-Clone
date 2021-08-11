import { db } from "../../firebase";

export default {
  async getData(context, payload) {
    const docRef = await db.collection("users").doc(payload).get();
    const info = docRef.data()
    console.log(info)
    context.commit('set_user_info', info)
  },
};
