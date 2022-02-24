<template>
  <main class="mx-auto max-w-screen-sm px-4 py-10">
    <!-- Register Form -->
    <form
      class="flex flex-col gap-4 rounded-md bg-light-grey p-8 shadow-md shadow-at-light-blue"
      @submit.prevent="userRegister"
    >
      <h1 class="mb-4 text-3xl text-at-light-blue">Register</h1>
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

      <section class="mb-2 flex flex-col">
        <label for="confirmPassword" class="mb-1 text-sm text-at-light-blue"
          >Confirm Password</label
        >
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          class="p-2 text-gray-500 focus:outline-at-light-blue"
          required
        />
      </section>

      <input
        type="submit"
        value="Register"
        class="mt-6 cursor-pointer self-center rounded-sm border-2 border-solid border-transparent bg-at-light-blue py-2 px-6 text-sm text-white duration-200 hover:border-at-light-blue hover:bg-white hover:text-at-light-blue"
      />

      <nuxt-link class="mt-6 text-center text-sm" to="/login">
        Already have an account? <span class="text-at-light-blue">Login</span>
      </nuxt-link>
    </form>

    <!-- Error Handling -->
    <article v-if="errorMsg" class="mt-10 rounded-md bg-light-grey p-4">
      <p class="text-red-500">{{ errorMsg }}</p>
    </article>
  </main>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      errorMsg: '',
    }
  },
  methods: {
    userRegister() {
      if (this.password === this.confirmPassword) {
        return this.$store.dispatch('userRegister', {
          email: this.email,
          password: this.password,
        })
      }
      this.errorMsg = 'Passwords do not match'
      setTimeout(() => {
        this.errorMsg = ''
      }, 5000)
    },
  },
}
</script>
