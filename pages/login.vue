<template>
  <main class="mx-auto max-w-screen-sm px-4 py-10">
    <!-- Login Form -->
    <form
      class="flex flex-col gap-4 rounded-md bg-light-grey p-8 shadow-md shadow-at-light-blue"
      @submit.prevent="userLogin"
    >
      <h1 class="mb-4 text-3xl text-at-light-blue">Login</h1>
      <section class="mb-2 flex flex-col">
        <label for="email" class="mb-1 text-sm text-at-light-blue">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="p-2 text-gray-500 focus:outline-at-light-blue"
          required
        />
      </section>

      <section class="mb-2 flex flex-col">
        <label for="password" class="mb-1 text-sm text-at-light-blue"
          >Password</label
        >
        <input
          id="password"
          v-model="password"
          type="password"
          class="p-2 text-gray-500 focus:outline-at-light-blue"
          required
        />
      </section>

      <input
        type="submit"
        value="Login"
        class="mt-6 cursor-pointer self-center rounded-sm border-2 border-solid border-transparent bg-at-light-blue py-2 px-6 text-sm text-white duration-200 hover:border-at-blue hover:bg-white hover:text-at-blue"
      />

      <nuxt-link class="mt-6 text-center text-sm" to="/register">
        Don't have an account? <span class="text-at-light-blue">Register</span>
      </nuxt-link>
    </form>

    <!-- Error Handling -->
    <article v-if="errorMsg" class="mt-10 rounded-md bg-light-grey p-4">
      <p class="text-red-500">Error: {{ errorMsg }}</p>
    </article>
  </main>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    errorMsg() {
      return this.$store.getters.getErrorMsg
    },
  },
  methods: {
    userLogin() {
      return this.$store.dispatch('userLogin', {
        email: this.email,
        password: this.password,
      })
    },
  },
}
</script>
