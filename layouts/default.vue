<template>
  <div class="m-h-full font-Poppins">
    <Navigation />

    <transition name="slide-fade">
      <Nuxt class="container" />
    </transition>

    <Notifications v-if="request" :request="request" />
  </div>
</template>

<script>
export default {
  computed: {
    request() {
      return this.$store.getters.getRequest
    },
  },

  // mounted() {
  //   // When the app loads, check to see if the user is signed in

  //   this.$supabase.auth.onAuthStateChange(() => this.checkUser())

  //   this.checkUser()
  // },

  // methods: {
  //   async checkUser() {
  //     const user = await this.$supabase.auth.user()
  //     if (user) {
  //       this.$store.dispatch('fetchUser', user)
  //     }
  //   },
  // },
}
</script>
