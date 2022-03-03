<template>
  <main class="mx-auto max-w-screen-md px-4 py-10">
    <!-- Create Form -->
    <form
      class="flex flex-col gap-4 rounded-md bg-white p-8 shadow-lg"
      @submit.prevent="createWorkout"
    >
      <h1 class="mb-4 flex items-center gap-x-4 text-3xl text-blue-500">
        Create Workout <NotePlusOutline :size="36" fill-color="#6b7280" />
      </h1>

      <!-- Workout Name -->
      <section class="mb-2 flex flex-col">
        <label for="workout-name" class="mb-1 text-sm text-gray-500"
          >Name</label
        >
        <input
          id="workout-name"
          v-model="workoutName"
          type="text"
          class="rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-purple-500"
          required
        />
      </section>

      <!-- Workout Type -->
      <section class="mb-2 flex flex-col">
        <label for="workout-type" class="mb-1 text-sm text-gray-500"
          >Workout Type</label
        >
        <select
          id="workout-type"
          v-model="workoutType"
          class="rounded-md border border-gray-500 p-2 text-purple-500 focus:outline-none"
          required
          @change="workoutChanged"
        >
          <option value="">Select Workout Type</option>
          <option value="strength">Strength</option>
          <option value="cardio">Cardio</option>
        </select>
      </section>

      <!-- Strength Training Inputs -->
      <section v-if="workoutType === 'strength'" class="flex flex-col gap-y-4">
        <div
          v-for="(item, index) in exercises"
          :key="index"
          class="relative flex flex-col gap-x-6 md:flex-row"
        >
          <section class="flex flex-col md:w-1/3">
            <label for="exercise-name" class="mb-1 text-sm text-gray-500"
              >Exercise Name</label
            >
            <input
              id="exercise-name"
              v-model="item.exercise"
              type="text"
              class="w-full rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-purple-500"
              required
            />
          </section>
          <section class="flex flex-1 flex-col">
            <label for="sets" class="mb-1 text-sm text-gray-500">Sets</label>
            <input
              id="sets"
              v-model="item.sets"
              type="text"
              class="w-full rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-purple-500"
              required
            />
          </section>
          <section class="flex flex-1 flex-col">
            <label for="reps" class="mb-1 text-sm text-gray-500">Reps</label>
            <input
              id="reps"
              v-model="item.reps"
              type="text"
              class="w-full rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-purple-500"
              required
            />
          </section>
          <section class="flex flex-1 flex-col">
            <label for="weight" class="mb-1 text-sm text-gray-500"
              >Weight</label
            >
            <input
              id="weight"
              v-model="item.weight"
              type="text"
              class="w-full rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-purple-500"
              required
            />
          </section>

          <DeleteOutline
            class="absolute -right-5 h-4 w-auto cursor-pointer"
            @click="removeExercise(item.id)"
          />
          <hr class="mt-4 md:hidden" />
        </div>

        <button
          type="button"
          class="mt-6 cursor-pointer self-center rounded-sm border-2 border-transparent bg-gray-500 py-2 px-6 text-xs text-white duration-200 hover:border-purple-500 hover:bg-purple-500 focus:outline-purple-500"
          @click="addExercise"
        >
          Add Exercise
        </button>
      </section>

      <!-- Cardio Training Inputs -->
      <section v-if="workoutType === 'cardio'" class="flex flex-col gap-y-4">
        <div
          v-for="(item, index) in exercises"
          :key="index"
          class="relative flex flex-col gap-x-6 md:flex-row"
        >
          <section class="flex flex-col md:w-1/3">
            <label for="cardio-type" class="mb-1 text-sm text-gray-500"
              >Type</label
            >
            <select
              id="cardio-type"
              v-model="item.cardioType"
              class="w-full rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-none"
            >
              <option value="Run">Run</option>
              <option value="Walk">Walk</option>
            </select>
          </section>

          <section class="flex flex-1 flex-col">
            <label for="distance" class="mb-1 text-sm text-gray-500"
              >Distance</label
            >
            <input
              id="distance"
              v-model="item.distance"
              type="text"
              class="w-full rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-purple-500"
              required
            />
          </section>

          <section class="flex flex-1 flex-col">
            <label for="duration" class="mb-1 text-sm text-gray-500"
              >Duration</label
            >
            <input
              id="duration"
              v-model="item.duration"
              type="text"
              class="w-full rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-purple-500"
              required
            />
          </section>

          <section class="flex flex-1 flex-col">
            <label for="pace" class="mb-1 text-sm text-gray-500">Pace</label>
            <input
              id="pace"
              v-model="item.pace"
              type="text"
              class="w-full rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-purple-500"
              required
            />
          </section>

          <DeleteOutline
            class="absolute -right-5 h-4 w-auto cursor-pointer"
            @click="removeExercise(item.id)"
          />
        </div>
        <button
          type="button"
          class="mt-6 cursor-pointer self-center rounded-sm border-2 border-transparent bg-gray-500 py-2 px-6 text-xs text-white duration-200 hover:border-purple-500 hover:bg-purple-500 focus:outline-purple-500"
          @click="addExercise"
        >
          Add Exercise
        </button>
      </section>
      <hr />
      <section class="mt-6 flex gap-x-2 self-end">
        <button
          class="self-start rounded-sm border-2 border-solid border-red-500 bg-white py-2 px-6 text-sm text-red-500 duration-200 hover:border-red-500 hover:bg-red-500 hover:text-white focus:outline-red-500"
          @click="$router.go(-1)"
        >
          Cancel
        </button>
        <input
          type="submit"
          value="Record Workout"
          class="cursor-pointer self-center rounded-sm border-2 border-transparent bg-gray-500 py-2 px-6 text-sm text-white duration-200 hover:border-blue-500 hover:bg-blue-500 focus:outline-blue-500"
        />
      </section>
    </form>

    <!-- Form Error Handling -->
    <article
      v-if="formErrorMsg"
      class="absolute right-4 top-4 mt-2 flex animate-bounce items-center gap-x-2 rounded-md bg-white p-4 text-gray-500 shadow-lg"
    >
      <AlertCircle :size="36" fill-color="#C30000" />
      <p>{{ formErrorMsg }}</p>
    </article>
  </main>
</template>

<script>
import { uid } from 'uid'
import AlertCircle from 'vue-material-design-icons/AlertCircle.vue'
import DeleteOutline from 'vue-material-design-icons/DeleteOutline.vue'
import NotePlusOutline from 'vue-material-design-icons/NotePlusOutline.vue'

export default {
  components: {
    AlertCircle,
    DeleteOutline,
    NotePlusOutline,
  },

  // If the user is not authenticated
  middleware({ store, redirect }) {
    if (!store.getters.getUser) {
      return redirect('/')
    }
  },

  data: () => ({
    workoutName: '',
    workoutType: '',
    exercises: [1],
    formErrorMsg: '',
  }),

  head: {
    title: 'Create Workout | Workout Tracker',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Create a new workout',
      },
    ],
  },

  computed: {
    errorMsg() {
      return this.$store.getters.getErrorMsg
    },
    statusMsg() {
      return this.$store.getters.getStatusMsg
    },
    user() {
      return this.$store.getters.getUser
    },
  },

  methods: {
    addExercise() {
      if (this.workoutType === 'strength') {
        this.exercises.push({
          id: uid(),
          exercise: '',
          sets: '',
          reps: '',
          weight: '',
        })
        return
      }
      if (this.workoutType === 'cardio') {
        this.exercises.push({
          id: uid(),
          cardioType: '',
          distance: '',
          duration: '',
          pace: '',
        })
      }
    },
    workoutChanged() {
      this.exercises = []
      this.addExercise()
    },
    removeExercise(id) {
      if (this.exercises.length > 1) {
        this.exercises = this.exercises.filter((exercise) => exercise.id !== id)
        return
      }
      this.formErrorMsg = 'You must have at least one exercise'
      setTimeout(() => {
        this.formErrorMsg = ''
      }, 5000)
    },
    createWorkout() {
      return this.$store.dispatch('workouts/createWorkout', {
        name: this.workoutName,
        type: this.workoutType,
        User: this.user.email,
        exercises: this.exercises,
      })
    },
  },
}
</script>
