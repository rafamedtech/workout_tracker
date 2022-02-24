export const state = () => ({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  statusMsg: null,
  errorMsg: null,
  workouts: [],
})

export const actions = {
  async nuxtServerInit({ dispatch }, context) {
    await dispatch('fetchWorkouts')
  },

  // Fetch all workouts from supabase
  async fetchWorkouts({ commit }) {
    try {
      const { data, error } = await this.$supabase.from('workouts').select('*')
      commit('setWorkouts', data)

      if (error) throw error
    } catch ({ message }) {
      commit('setErrorMsg', message)
      setTimeout(() => {
        commit('setErrorMsg', null)
      }, 5000)
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

  // Create Workout
  async createWorkout({ commit }, payload) {
    try {
      const { error } = await this.$supabase.from('workouts').insert([payload])

      commit('setStatusMsg', 'Workout created')
      setTimeout(() => {
        commit('setStatusMsg', null)
      }, 5000)

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
  getWorkouts: (state) => state.workouts,
  getUser: (state) => state.user,
  getStatusMsg: (state) => state.statusMsg,
  getErrorMsg: (state) => state.errorMsg,
}

export const mutations = {
  setWorkouts(state, workouts) {
    state.workouts = workouts
  },
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
