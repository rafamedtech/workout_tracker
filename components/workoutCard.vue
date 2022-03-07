<template>
  <nuxt-link
    class="m-4 flex cursor-pointer flex-col items-center rounded-md bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:m-0"
    :to="`/view-workout/${workout.id}`"
  >
    <img
      :src="require(`@/assets/images/${workout.type}.png`)"
      class="h-32 w-auto"
      :alt="workout.type"
    />

    <p
      class="mt-6 rounded-lg py-1 px-3 text-xs text-white shadow-md"
      :class="workout.type === 'cardio' ? 'bg-blue-500' : 'bg-purple-500'"
    >
      {{ workout.type }}
    </p>

    <h1 class="mt-8 mb-2 text-center text-xl text-gray-500">
      {{ workout.name }}
    </h1>
    <i
      v-if="$route.path !== '/profile'"
      class="text-center text-[10px] text-gray-500"
      >Added by <br /><span
        :class="workout.type === 'cardio' ? 'text-blue-500' : 'text-purple-500'"
        >{{ workout.owner === $auth.user ? 'you' : workout.owner }}</span
      ></i
    >
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
