import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    movie_same: JSON.parse(sessionStorage.getItem("movie_same")), //将相关数据存在session中,防止刷新页面后丢失
    flag:JSON.parse(sessionStorage.getItem("flag")),
  },
  mutations: {
    // set
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem("token", token)
    },
    SET_USERINFO: (state, movie_same) => {
      state.movie_same = movie_same
      sessionStorage.setItem("movie_same", JSON.stringify(movie_same))
    },
    REMOVE_INFO: (state) => {
      state.token = ''
      state.movie_same = {}
      localStorage.setItem("token", '')
      sessionStorage.setItem("movie_same", JSON.stringify(''))
    },
    SET_FLAG: (state) => {
      state.flag = 1
      sessionStorage.setItem("flag", 1)
    },
    REMOVE_FLAG: (state) => {
      state.flag = 0
    },

  },
  getters: {
    // get
    getUser: state => {
      return state.movie_same
    }

  },
  actions: {
  },
  modules: {
  }
})



// this.$store.getters.getUser.id
// this.$store.flag






