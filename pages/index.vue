<template>
  <main class="container mt-10">
    <!-- When no data -->
    <section
      v-if="workouts.length === 0"
      class="flex w-full flex-col items-center"
    >
      <h1 class="text-2xl">Looks empty here...</h1>
      <nuxt-link
        class="mt-6 rounded-sm border-2 border-solid border-transparent bg-at-light-blue py-2 px-6 text-sm text-white duration-200 hover:border-at-light-blue hover:bg-white hover:text-at-light-blue"
        to="/create"
        >Create Workout</nuxt-link
      >
    </section>

    <!-- Data -->
    <div
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <WorkoutCard
        v-for="(workout, index) in workouts"
        :key="index"
        :workout="workout"
      />
    </div>
  </main>
</template>

<script>
export default {
  head: {
    title: 'Workout Tracker',
  },
  computed: {
    workouts() {
      return this.$store.getters['workouts/getWorkouts']
    },
  },
  created() {
    this.$store.dispatch('workouts/fetchWorkouts')
  },
}
</script>
