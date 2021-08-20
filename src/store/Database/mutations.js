export default {
    set_user_info(state, payload){
        state.userInfo = payload
    },
    update_user_info(state, payload){
        const first = payload.name.split(' ')
          state.bio= payload.bio,
          state.displayName= payload.displayName,
          state.firstName= first[0],
          state.lastName= first.reverse()[0],
          state.website= payload.website
    },
    savePosts(state, payload){
        state.posts = payload
    }
}