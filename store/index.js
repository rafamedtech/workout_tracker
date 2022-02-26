export const state = () => ({
  user: null,
  isLoading: false,
  statusMsg: null,
  errorMsg: null,
})

export const actions = {
  // Fetch all workouts from supabase
  async nuxtServerInit({ dispatch }) {
    await dispatch('workouts/fetchWorkouts')
    await dispatch('fetchUser')
  },

  fetchUser({ commit }) {
    const user = this.$supabase.auth.user()
    if (user) {
      commit('setUser', user)
    } else {
      commit('setUser', null)
    }
  },

  // User Registration
  async userRegister({ commit }, payload) {
    try {
      const { error } = await this.$supabase.auth.signUp(payload)

      this.$router.push('/login')

      if (error) throw error
    } catch ({ message }) {
      commit('setErrorMsg', message)
      setTimeout(() => {
        commit('setErrorMsg', null)
      }, 5000)
    }
  },

  // User Login
  async userLogin({ commit }, payload) {
    try {
      const { data, error } = await this.$supabase.auth.signIn(payload)
      commit('setUser', data.user)

      if (data) this.$router.push('/')

      if (error) throw error
    } catch ({ message }) {
      commit('setErrorMsg', message)
      setTimeout(() => {
        commit('setErrorMsg', null)
      }, 5000)
    }
  },

  // User Logout
  async userLogout({ commit }) {
    try {
      const { error } = await this.$supabase.auth.signOut()
      commit('setUser', null)

      this.$router.push('/login')

      if (error) throw error
    } catch ({ message }) {
      commit('setErrorMsg', message)
      setTimeout(() => {
        commit('setErrorMsg', null)
      }, 5000)
    }
  },
}

export const getters = {
  getUser: (state) => state.user,
  getStatusMsg: (state) => state.statusMsg,
  getErrorMsg: (state) => state.errorMsg,
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setStatusMsg(state, payload) {
    state.statusMsg = payload
  },
  setErrorMsg(state, error) {
    state.errorMsg = error
  },
}
