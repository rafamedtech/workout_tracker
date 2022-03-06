export const state = () => ({
  deleteModal: false,
  workouts: [],
  myWorkouts: [],
})

export const actions = {
  // Fetch all workouts
  async fetchWorkouts({ commit }) {
    try {
      // const { data, error } = await this.$supabase.from('workouts').select('*')
      const { data, error } = await this.$axios('/workouts/')
      commit('setWorkouts', data)
      console.log(this.$auth.user)

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

  // Fetch a single workout
  async fetchWorkout({ commit }, id) {
    try {
      const { data, error } = await this.$axios(`/workouts/${id}`)
      commit('setWorkout', data)

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
      // const { error } = await this.$supabase.from('workouts').insert([payload])
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
      const { data, error } = await this.$axios.put(
        `/workouts/${payload.id}/`,
        payload,
        {
          headers: {
            Authorization: 'Bearer ' + this.$auth.user.token,
          },
        }
      )

      console.log(data)
      // const { error } = await this.$supabase
      //   .from('workouts')
      //   .update(payload)
      //   .eq('id', Number(payload.id))

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

      // const { error } = await this.$supabase
      //   .from('workouts')
      //   .delete()
      //   .eq('id', id)

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
