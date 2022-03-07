<template>
  <section
    class="absolute inset-0 z-50 grid h-screen w-screen place-items-center bg-gray-500/80"
  >
    <article
      class="flex h-[143px] w-[400px] flex-col justify-around rounded-lg bg-white p-4 shadow-lg"
    >
      <span v-if="modalType === 'workout'" class="text-md text-gray-500"
        >Delete this workout?</span
      >
      <span v-if="modalType === 'logout'" class="text-md text-gray-500"
        >Are you sure to logout?</span
      >
      <div class="flex gap-x-4 self-end">
        <button
          type="button"
          class="cursor-pointer self-center rounded-sm border-2 border-solid border-transparent border-red-500 bg-white py-2 px-6 text-sm text-red-500 duration-200 hover:bg-red-500 hover:text-white"
          @click="closeModal"
        >
          Cancel
        </button>
        <button
          type="button"
          class="cursor-pointer self-center rounded-sm border-2 border-transparent bg-gray-500 py-2 px-6 text-sm text-white transition-all"
          :class="
            modalType === 'workout'
              ? 'hover:border-blue-500 hover:bg-blue-500 focus:outline-blue-500'
              : 'hover:border-purple-500 hover:bg-purple-500 focus:outline-purple-500'
          "
          @click="actionButton"
        >
          {{ type === 'workout' ? 'Delete' : 'Logout' }}
        </button>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  props: {
    modalType: {
      type: String,
      default: '',
    },
  },

  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    actionButton() {
      this.$emit('actionButton')
    },
  },
}
</script>
