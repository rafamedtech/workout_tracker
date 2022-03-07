export const state = () => ({
  deleteModal: false,
  workouts: [],
  myWorkouts: [],
})

export const actions = {
  // Fetch all workouts
  async fetchWorkouts({ commit }) {
    try {
      const { data, error } = await this.$axios('/workouts/')
      commit('setWorkouts', data)

      if (this.$auth.user) {
        commit(
          'setMyWorkouts',
          data.filter((workout) => workout.owner === this.$auth.user)
        )
      }

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
      const { error } = await this.$axios.post('/workouts/', payload, {
        headers: {
          Authorization: 'Bearer ' + this.$auth.user.token,
        },
      })

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
      const { error } = await this.$axios.put(
        `/workouts/${payload.id}/`,
        payload,
        {
          headers: {
            Authorization: 'Bearer ' + this.$auth.user.token,
          },
        }
      )

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
      const { error } = await this.$axios.delete(`/workouts/${id}/`, {
        headers: {
          Authorization: 'Bearer ' + this.$auth.user.token,
        },
      })

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
  getMyWorkouts: (state) => state.myWorkouts,
}

export const mutations = {
  setWorkouts: (state, workouts) => (state.workouts = workouts),
  setMyWorkouts: (state, workouts) => (state.myWorkouts = workouts),
}
