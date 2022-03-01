<template>
  <article
    v-if="request.statusMsg || request.errorMsg"
    class="absolute right-4 top-6 animate-bounce rounded-md bg-white/80 p-4 shadow-lg"
  >
    <div
      v-if="request.statusMsg"
      class="flex items-center gap-x-2 text-gray-500"
    >
      <p>{{ request.statusMsg }}</p>
      <CheckCircle :size="36" fill-color="#219653" />
    </div>
    <div
      v-if="request.errorMsg"
      class="flex items-center gap-x-2 text-gray-500"
    >
      <CloseCircle :size="36" fill-color="#C30000" />
      <p>{{ request.errorMsg }}</p>
    </div>
  </article>
</template>

<script>
import CloseCircle from 'vue-material-design-icons/CloseCircle.vue'
import CheckCircle from 'vue-material-design-icons/CheckCircle.vue'

export default {
  components: {
    CloseCircle,
    CheckCircle,
  },
  computed: {
    request() {
      return this.$store.getters.getRequest
    },
  },
}
</script>
