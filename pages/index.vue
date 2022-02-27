<template>
  <main class="container mt-10">
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
      v-else
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <nuxt-link
        v-for="(workout, index) in workouts"
        :key="index"
        class="flex cursor-pointer flex-col items-center bg-light-grey p-8 shadow-md"
        :to="`/view-workout/${workout.id}`"
      >
        <!-- Cardio Img -->
        <img
          v-if="workout.type === 'cardio'"
          src="@/assets/images/running-light-green.png"
          class="h-24 w-auto"
          alt=""
        />

        <!-- Strength Training -->
        <img
          v-else
          src="@/assets/images/dumbbell-light-green.png"
          class="h-24 w-auto"
          alt=""
        />

        <p
          class="mt-6 rounded-lg bg-at-light-blue py-1 px-3 text-xs text-white shadow-md"
        >
          {{ workout.type }}
        </p>

        <h1 class="mt-8 mb-2 text-center text-xl text-at-light-blue">
          {{ workout.name }}
        </h1>
      </nuxt-link>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      route: this.$route.path,
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    workouts() {
      return this.$store.getters['workouts/getWorkouts']
    },
  },
  created() {
    this.$store.dispatch('workouts/fetchWorkouts')
  },
}
</script>
