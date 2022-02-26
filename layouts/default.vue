<template>
  <div class="m-h-full font-Poppins">
    <Navigation />
    <Nuxt class="container" />
  </div>
</template>

<script>
export default {
  mounted() {
    /* When the app loads, check to see if the user is signed in */

    this.$supabase.auth.onAuthStateChange(() => this.checkUser())

    this.checkUser()
  },
  methods: {
    async checkUser() {
      const user = await this.$supabase.auth.user()
      if (user) {
        this.$store.dispatch('fetchUser', user)
      }
    },
  },
}
</script>
