import { createStore } from 'vuex'

export default createStore({
  state: {
    loginUserData: null,
    userToken: "",
    postCount: 0
  },
  getters: {
    getUserData: state => state.loginUserData
  },
  mutations: {

  },
  actions: {
    setUserData: ({ state }, value) => state.loginUserData = value,
    setToken: ({ state }, value) => state.userToken = value,
    deleteLoginData: ({ state }) => {
      state.loginUserData = null;
      state.userToken = "";
    },
    setPostCount: ({ state }, value) => {
      state.postCount = value
    },
    addPostCount: ({ state }) => {
      state.postCount = state.postCount + 1
    },
    reducePostCount: ({ state }) => {
      state.postCount = state.postCount - 1
    }
  },
  modules: {
  }
})
