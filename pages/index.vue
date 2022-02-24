<template>
  <main class="container">
    {{ workouts }}
  </main>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      dataLoaded: null,
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    workouts() {
      return this.$store.getters.getWorkouts
    },
  },
}
</script>
