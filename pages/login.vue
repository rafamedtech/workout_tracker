<template>
  <main class="mx-auto max-w-[450px] px-4 py-10">
    <!-- Login Form -->
    <form
      class="flex flex-col gap-3 rounded-lg bg-white p-8 shadow-lg"
      @submit.prevent="userLogin"
    >
      <h1 class="mb-4 text-3xl text-purple-500">Login</h1>
      <figure class="h-48">
        <img
          class="mx-auto h-full"
          src="@/assets/images/login-image.png"
          alt="login image"
        />
      </figure>
      <section class="mb-2 flex flex-col">
        <label for="email" class="mb-1 text-sm text-gray-500">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-purple-500"
          required
        />
      </section>

      <section class="mb-2 flex flex-col">
        <label for="password" class="mb-1 text-sm text-gray-500"
          >Password</label
        >
        <input
          id="password"
          v-model="password"
          type="password"
          class="rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-purple-500"
          required
        />
      </section>

      <input
        type="submit"
        value="Login"
        class="mt-6 cursor-pointer self-center rounded-sm border-2 border-solid border-transparent bg-gray-500 py-2 px-6 text-sm text-white transition-all duration-200 hover:border-purple-500 hover:bg-purple-500 focus:outline-purple-500"
      />

      <nuxt-link class="mt-6 text-center text-sm" to="/register">
        Don't have an account? <span class="text-blue-500">Register</span>
      </nuxt-link>
    </form>
  </main>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: '',
  }),

  head: {
    title: 'Login | Workout Tracker',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Login to your account',
      },
    ],
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
