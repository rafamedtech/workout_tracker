export const state = () => ({
  isLoading: false,
  statusMsg: null,
  errorMsg: null,
  workouts: [],
})

export const actions = {
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

  async fetchWorkout({ commit }, id) {
    try {
      const { error } = await this.$supabase
        .from('workouts')
        .select('*')
        .eq('id', id)
      //   commit('setWorkout', data)

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

      this.$router.push('/')
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

  async updateWorkout({ commit }, payload) {
    try {
      const { error } = await this.$supabase
        .from('workouts')
        .update(payload)
        .eq('id', Number(payload.id))

      //   commit('setUpdateWorkout', data)

      if (error) throw error
    } catch (error) {
      commit('setErrorMsg', error)
      setTimeout(() => {
        commit('setErrorMsg', null)
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

      this.$router.push('/')
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
  getStatusMsg: (state) => state.statusMsg,
  getErrorMsg: (state) => state.errorMsg,
  getWorkout: (state) => (id) => {
    return state.workouts.find((workout) => workout.id === Number(id))
  },
}

export const mutations = {
  setWorkouts(state, workouts) {
    state.workouts = workouts
  },
  //   setUpdateWorkout(state, updatedWorkout) {
  //     const index = state.workouts.findIndex(
  //       (workout) => workout.id === updatedWorkout.id
  //     )
  //     if (index !== -1) {
  //       state.todos.splice(index, 1, updatedWorkout)
  //     }
  //   },

  setStatusMsg(state, payload) {
    state.statusMsg = payload
  },
  setErrorMsg(state, error) {
    state.errorMsg = error
  },
}
