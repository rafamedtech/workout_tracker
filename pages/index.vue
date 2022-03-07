<template>
  <main class="container mt-10 md:px-4">
    <h1 class="ml-4 text-3xl text-gray-500 md:ml-0 md:mb-4">All Workouts</h1>
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
        class="mt-6 rounded-sm border-2 border-solid border-transparent bg-gray-500 py-2 px-6 text-sm text-white duration-200 hover:border-gray-500 hover:bg-white hover:text-gray-500"
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
