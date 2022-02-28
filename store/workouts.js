export const state = () => ({
  deleteModal: false,
  workouts: [],
})

export const actions = {
  // Fetch all workouts
  async fetchWorkouts({ commit }) {
    try {
      const { data, error } = await this.$supabase.from('workouts').select('*')
      commit('setWorkouts', data)

      if (error) throw error
    } catch ({ message }) {
      commit('setErrorMsg', message, { root: true })
      setTimeout(() => {
        commit('setErrorMsg', null, { root: true })
      }, 5000)
    }
  },

  // Create Workout
  async createWorkout({ commit }, payload) {
    try {
      const { error } = await this.$supabase.from('workouts').insert([payload])

      commit('setStatusMsg', 'Workout created', { root: true })
      setTimeout(() => {
        commit('setStatusMsg', null, { root: true })
      }, 5000)

      this.$router.push('/')
      if (error) throw error
    } catch ({ message }) {
      commit('setErrorMsg', message, { root: true })
      setTimeout(() => {
        commit('setErrorMsg', null, { root: true })
      }, 5000)
    }
  },

  // Update Workout
  async updateWorkout({ commit }, payload) {
    try {
      const { error } = await this.$supabase
        .from('workouts')
        .update(payload)
        .eq('id', Number(payload.id))

      commit('setStatusMsg', 'Workout updated', { root: true })
      setTimeout(() => {
        commit('setStatusMsg', null, { root: true })
      }, 5000)

      if (error) throw error
    } catch (error) {
      commit('setErrorMsg', error, { root: true })
      setTimeout(() => {
        commit('setErrorMsg', null, { root: true })
      }, 5000)
    }
  },

  // Delete Workout
  async deleteWorkout({ commit }, id) {
    try {
      const { error } = await this.$supabase
        .from('workouts')
        .delete()
        .eq('id', id)

      commit('setStatusMsg', 'Workout deleted', { root: true })
      setTimeout(() => {
        commit('setStatusMsg', null, { root: true })
      }, 5000)

      this.$router.push('/')
      if (error) throw error
    } catch ({ message }) {
      commit('setErrorMsg', message, { root: true })
      setTimeout(() => {
        commit('setErrorMsg', null, { root: true })
      }, 5000)
    }
  },
}

export const getters = {
  getWorkouts: (state) => state.workouts,
}

export const mutations = {
  setWorkouts(state, workouts) {
    state.workouts = workouts
  },
}
