<template>
  <header class="bg-gray-500 text-white">
    <nav
      class="container flex flex-col items-center gap-4 py-3 px-4 sm:flex-row"
    >
      <article class="flex items-center gap-x-4">
        <Dumbbell
          :size="48"
          class="flex h-14 w-14 items-center justify-center"
        />
        <h1 class="logo text-4xl">Workout Tracker</h1>
      </article>

      <ul class="flex flex-1 justify-end gap-x-10">
        <nuxt-link v-if="$route.path !== '/'" class="cursor-pointer" to="/"
          >Home</nuxt-link
        >
        <nuxt-link
          v-if="$auth.user && $route.path !== '/create'"
          class="cursor-pointer"
          to="/create"
          >Create</nuxt-link
        >
        <nuxt-link
          v-if="$auth.loggedIn && $route.path !== '/profile'"
          class="cursor-pointer"
          to="/profile"
          >My Workouts</nuxt-link
        >
        <nuxt-link v-if="!$auth.user" class="cursor-pointer" to="/login"
          >Login</nuxt-link
        >
        <button v-else class="cursor-pointer" @click="logoutModal">
          Logout
        </button>
      </ul>
    </nav>
    <Modal
      v-if="showModal"
      type="logout"
      @closeModal="logoutModal"
      @actionButton="userLogout"
    />
  </header>
</template>

<script>
import Dumbbell from 'icons/Dumbbell.vue'

export default {
  components: {
    Dumbbell,
  },

  emits: ['close'],
  data: () => ({
    showModal: false,
  }),

  methods: {
    logoutModal() {
      this.showModal = !this.showModal
    },
    userLogout() {
      return this.$store.dispatch('userLogout')
    },
  },
}
</script>
