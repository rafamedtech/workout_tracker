<template>
  <section
    class="absolute inset-0 grid h-screen w-screen place-items-center bg-[#000]/80"
  >
    <article
      class="flex h-[143px] w-[400px] flex-col justify-around rounded-xl bg-white p-4 shadow-lg"
    >
      <span class="text-md">Delete this workout?</span>
      <div class="flex gap-x-4 self-end">
        <button
          type="button"
          class="cursor-pointer self-center rounded-sm border-2 border-solid border-transparent bg-red-500 py-2 px-6 text-sm text-white duration-200 hover:border-at-light-blue hover:bg-white hover:text-at-light-blue"
          @click="$router.go(-1)"
        >
          Cancel
        </button>
        <button
          type="button"
          class="cursor-pointer self-center rounded-sm border-2 border-solid border-transparent bg-at-light-blue py-2 px-6 text-sm text-white duration-200 hover:border-at-light-blue hover:bg-white hover:text-at-light-blue"
          @click="deleteWorkout"
        >
          Delete
        </button>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  props: {
    workout: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteWorkout() {
      return this.$store.dispatch('workouts/deleteWorkout', this.workout.id)
    },
  },
}
</script>
