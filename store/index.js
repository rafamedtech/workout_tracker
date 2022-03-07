export const state = () => ({
  user: null,
  request: {
    statusMsg: null,
    errorMsg: null,
  },
})

export const actions = {
  // Fetch all workouts on first load
  async nuxtServerInit({ dispatch }) {
    await dispatch('workouts/fetchWorkouts')
  },

  // User Registration
  async userRegister({ commit }, payload) {
    try {
      const { error } = await this.$axios.post('/users/register/', payload)

      commit('setStatusMsg', 'Registration successful!')
      setTimeout(() => {
        commit('setStatusMsg', null)
      }, 5000)
      this.$router.push('/login')

      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error)
      setTimeout(() => {
        commit('setErrorMsg', null)
      }, 5000)
    }
  },

  // User Login
  async userLogin({ commit }, payload) {
    try {
      const { data, error } = await this.$auth.loginWith('local', {
        data: payload,
      })

      this.$auth.setUser(data.user)

      await this.$auth.setUserToken(data.access, data.refresh)
      commit('setStatusMsg', 'Login successful')
      setTimeout(() => {
        commit('setStatusMsg', null)
      }, 5000)
      this.$router.push('/profile')

      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.detail)
      setTimeout(() => {
        commit('setErrorMsg', null)
      }, 5000)
    }
  },

  // User Logout
  async userLogout({ commit }) {
    await this.$auth.logout()
    this.$router.push('/login')

    commit('setStatusMsg', 'Logout successful')
    setTimeout(() => {
      commit('setStatusMsg', null)
    }, 5000)
  },
}

export const getters = {
  getUser: (state) => state.user,
  getRequest: (state) => state.request,
}

export const mutations = {
  setUser: (state, payload) => (state.user = payload),
  setStatusMsg: (state, payload) => (state.request.statusMsg = payload),
  setErrorMsg: (state, error) => (state.request.errorMsg = error),
}
