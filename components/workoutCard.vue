<template>
  <nuxt-link
    class="flex cursor-pointer flex-col items-center rounded-md bg-white p-8 shadow-lg"
    :to="`/view-workout/${workout.id}`"
  >
    <!-- Cardio Img -->
    <img
      v-if="workout.type === 'cardio'"
      src="@/assets/images/running-light-green.png"
      class="h-24 w-auto"
      :alt="workout.type"
    />

    <!-- Strength Training -->
    <img
      v-else
      src="@/assets/images/dumbbell-light-green.png"
      class="h-24 w-auto"
      :alt="workout.type"
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
</template>

<script>
export default {
  props: {
    workout: {
      type: Object,
      required: true,
    },
  },
}
</script>
