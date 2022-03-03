<template>
  <main class="container mt-10">
    <!-- Data -->
    <transition-group
      v-if="workouts.length"
      name="slide-up"
      tag="div"
      class="relative mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <WorkoutCard
        v-for="workout in workouts"
        :key="workout.id"
        :workout="workout"
      />
    </transition-group>

    <!-- When no data -->
    <section v-else class="flex w-full flex-col items-center">
      <h1 class="text-2xl">Looks empty here...</h1>
      <nuxt-link
        class="bg-at-light-blue hover:border-at-light-blue hover:text-at-light-blue mt-6 rounded-sm border-2 border-solid border-transparent py-2 px-6 text-sm text-white duration-200 hover:bg-white"
        to="/create"
        >Create Workout</nuxt-link
      >
    </section>
  </main>
</template>

<script>
export default {
  head: {
    title: 'Home | Workout Tracker',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Workout Tracker',
      },
    ],
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
