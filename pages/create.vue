<template>
  <main class="mx-auto max-w-screen-md px-4 py-10">
    <!-- Create Form -->
    <form
      class="flex flex-col gap-4 rounded-md bg-light-grey p-8 shadow-md shadow-at-light-blue"
      @submit.prevent="createWorkout"
    >
      <h1 class="mb-4 text-3xl text-at-light-blue">Create Workout</h1>

      <!-- Workout Name -->
      <section class="mb-2 flex flex-col">
        <label for="workout-name" class="mb-1 text-sm text-at-light-blue"
          >Name</label
        >
        <input
          id="workout-name"
          v-model="workoutName"
          type="text"
          class="p-2 text-gray-500 focus:outline-at-light-blue"
          required
        />
      </section>

      <!-- Workout Type -->
      <section class="mb-2 flex flex-col">
        <label for="workout-type" class="mb-1 text-sm text-at-light-blue"
          >Workout Type</label
        >
        <select
          id="workout-type"
          v-model="workoutType"
          class="p-2 text-gray-500 focus:outline-none"
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
            <label for="exercise-name" class="mb-1 text-sm text-at-light-blue"
              >Exercise Name</label
            >
            <input
              id="exercise-name"
              v-model="item.exercise"
              type="text"
              class="w-full p-2 text-gray-500 focus:outline-at-light-blue"
              required
            />
          </section>
          <section class="flex flex-1 flex-col">
            <label for="sets" class="mb-1 text-sm text-at-light-blue"
              >Sets</label
            >
            <input
              id="sets"
              v-model="item.sets"
              type="text"
              class="w-full p-2 text-gray-500 focus:outline-at-light-blue"
              required
            />
          </section>
          <section class="flex flex-1 flex-col">
            <label for="reps" class="mb-1 text-sm text-at-light-blue"
              >Reps</label
            >
            <input
              id="reps"
              v-model="item.reps"
              type="text"
              class="w-full p-2 text-gray-500 focus:outline-at-light-blue"
              required
            />
          </section>
          <section class="flex flex-1 flex-col">
            <label for="weight" class="mb-1 text-sm text-at-light-blue"
              >Weight</label
            >
            <input
              id="weight"
              v-model="item.weight"
              type="text"
              class="w-full p-2 text-gray-500 focus:outline-at-light-blue"
              required
            />
          </section>
          <img
            class="absolute -right-5 h-4 w-auto cursor-pointer"
            src="@/assets/images/trash-light-green.png"
            alt="delete-icon"
            @click="removeExercise(item.id)"
          />
        </div>
        <button
          type="button"
          class="mt-6 cursor-pointer self-center rounded-sm border-2 border-solid border-transparent bg-at-light-blue py-2 px-6 text-xs text-white duration-200 hover:border-at-light-blue hover:bg-white hover:text-at-light-blue"
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
            <label for="cardio-type" class="mb-1 text-sm text-at-light-blue"
              >Type</label
            >
            <select
              id="cardio-type"
              v-model="item.cardioType"
              class="w-full p-2 text-gray-500 focus:outline-none"
            >
              <option value="">Select Type</option>
              <option value="run">Run</option>
              <option value="walk">Walk</option>
            </select>
          </section>

          <section class="flex flex-1 flex-col">
            <label for="distance" class="mb-1 text-sm text-at-light-blue"
              >Distance</label
            >
            <input
              id="distance"
              v-model="item.distance"
              type="text"
              class="w-full p-2 text-gray-500 focus:outline-at-light-blue"
              required
            />
          </section>

          <section class="flex flex-1 flex-col">
            <label for="duration" class="mb-1 text-sm text-at-light-blue"
              >Duration</label
            >
            <input
              id="duration"
              v-model="item.duration"
              type="text"
              class="w-full p-2 text-gray-500 focus:outline-at-light-blue"
              required
            />
          </section>

          <section class="flex flex-1 flex-col">
            <label for="pace" class="mb-1 text-sm text-at-light-blue"
              >Pace</label
            >
            <input
              id="pace"
              v-model="item.pace"
              type="text"
              class="w-full p-2 text-gray-500 focus:outline-at-light-blue"
              required
            />
          </section>

          <img
            class="absolute -right-5 h-4 w-auto cursor-pointer"
            src="@/assets/images/trash-light-green.png"
            alt="delete-icon"
            @click="removeExercise(item.id)"
          />
        </div>
        <button
          type="button"
          class="mt-6 cursor-pointer self-center rounded-sm border-2 border-solid border-transparent bg-at-light-blue py-2 px-6 text-xs text-white duration-200 hover:border-at-light-blue hover:bg-white hover:text-at-light-blue"
          @click="addExercise"
        >
          Add Exercise
        </button>
      </section>
      <hr />
      <input
        type="submit"
        value="Record Workout"
        class="mt-6 cursor-pointer self-end rounded-sm border-2 border-solid border-transparent bg-at-light-blue py-2 px-6 text-sm text-white duration-200 hover:border-at-blue hover:bg-white hover:text-at-blue"
      />
    </form>
    <article
      v-if="formErrorMsg"
      class="mt-10 rounded-md bg-light-grey p-4 shadow-lg"
    >
      <p class="text-red-500">{{ formErrorMsg }}</p>
    </article>

    <!-- Status Message -->
    <article
      v-if="statusMsg || errorMsg"
      class="mt-10 rounded-md bg-light-grey p-4 shadow-lg"
    >
      <p class="text-at-light-blue">{{ statusMsg }}</p>
      <p class="text-red-500">{{ errorMsg }}</p>
    </article>
  </main>
</template>

<script>
import { uid } from 'uid'
export default {
  data() {
    return {
      workoutName: '',
      workoutType: '',
      exercises: [1],
      formErrorMsg: '',
    }
  },
  computed: {
    errorMsg() {
      return this.$store.getters.getErrorMsg
    },
    statusMsg() {
      return this.$store.getters.getStatusMsg
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
      this.$store.dispatch('createWorkout', {
        name: this.workoutName,
        type: this.workoutType,
        exercises: this.exercises,
      })
      this.workoutName = ''
      this.workoutType = ''
      this.exercises = []
    },
  },
}
</script>
