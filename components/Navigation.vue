<template>
  <header class="bg-at-blue text-white">
    <nav
      class="container flex flex-col items-center gap-4 py-3 px-4 sm:flex-row"
    >
      <article class="flex items-center gap-x-4">
        <Dumbbell
          :size="48"
          class="flex h-14 w-14 items-center justify-center"
        />
        <!-- <img class="w-14" src="@/assets/images/running-light.png" alt="" /> -->
        <h1 class="text-lg">Workout Tracker</h1>
      </article>
      <ul class="flex flex-1 justify-end gap-x-10">
        <nuxt-link v-if="$route.path !== '/'" class="cursor-pointer" to="/"
          >Home</nuxt-link
        >
        <nuxt-link
          v-if="user && $route.path !== '/create'"
          class="cursor-pointer"
          to="/create"
          >Create</nuxt-link
        >
        <nuxt-link v-if="!user" class="cursor-pointer" to="/login"
          >Login</nuxt-link
        >
        <button v-else class="cursor-pointer" @click="userLogout">
          Logout
        </button>
      </ul>
    </nav>
  </header>
</template>

<script>
import Dumbbell from 'vue-material-design-icons/Dumbbell.vue'
export default {
  components: {
    Dumbbell,
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
  },
  methods: {
    userLogout() {
      return this.$store.dispatch('userLogout')
    },
  },
}
</script>
