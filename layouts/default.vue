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
}
</script>
