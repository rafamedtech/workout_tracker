<template>
  <main class="mx-auto max-w-screen-sm px-4 py-5">
    <button
      class="mb-5 self-start rounded-sm border-2 border-solid border-transparent bg-at-light-blue py-2 px-6 text-sm text-white duration-200 hover:border-at-light-blue hover:bg-white hover:text-at-light-blue"
      @click="$router.go(-1)"
    >
      back
    </button>

    <div>
      <!-- General Workout Info -->
      <div
        v-if="dataLoaded"
        class="relative flex flex-col items-center rounded-md bg-white p-8 shadow-md"
      >
        <div v-if="user" class="absolute left-2 top-2 flex gap-x-2">
          <div
            class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-at-light-blue shadow-lg"
            @click="deleteWorkout"
          >
            <img
              class="h-3.5 w-auto"
              src="@/assets/images/trash-light.png"
              alt="delete-icon"
            />
          </div>
          <div
            v-if="!edit"
            class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-at-light-blue shadow-lg"
            @click="editMode"
          >
            <img
              class="h-3.5 w-auto"
              src="@/assets/images/pencil-light.png"
              alt="edit-icon"
            />
          </div>
        </div>

        <img
          v-if="workout.type === 'cardio'"
          class="h-24 w-auto"
          src="@/assets/images/running-light-green.png"
          alt="running-icon"
        />

        <img
          v-if="workout.type === 'strength'"
          class="h-24 w-auto"
          src="@/assets/images/dumbbell-light-green.png"
          alt="dumbbell-icon"
        />

        <span
          class="mt-6 rounded-lg bg-at-light-blue py-1.5 px-5 text-xs text-white shadow-md"
        >
          {{ workout.type }}
        </span>

        <div class="mt-6 w-full">
          <input
            v-if="edit"
            v-model="workout.name"
            type="text"
            class="w-full p-2 text-gray-500 focus:outline-none"
          />
          <h1 v-else class="text-center text-2xl text-at-light-blue">
            {{ workout.name }}
          </h1>
        </div>
      </div>

      <!-- Exercises -->
      <div
        v-if="dataLoaded"
        class="item-center mt-10 flex flex-col rounded-md bg-white p-8 shadow-md"
      >
        <!-- Strength Training -->
        <div
          v-if="workout.type === 'strength'"
          class="flex w-full flex-col gap-y-4"
        >
          <div
            v-for="(item, index) in workout.exercises"
            :key="index"
            class="relative flex flex-col gap-x-6 gap-y-2 sm:flex-row"
          >
            <div class="flex flex-2 flex-col md:w-1/3">
              <label
                for="exercise-name"
                class="mb-1 text-sm text-at-light-blue"
              >
                Exercise
              </label>
              <input
                v-if="edit"
                id="exercise-name"
                v-model="item.exercise"
                class="w-full p-2 text-gray-500 focus:outline-none"
                type="text"
              />
              <p v-else>{{ item.exercise }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="sets" class="mb-1 text-sm text-at-light-blue">
                Sets
              </label>
              <input
                v-if="edit"
                id="sets"
                v-model="item.sets"
                class="w-full p-2 text-gray-500 focus:outline-none"
                type="text"
              />
              <p v-else>{{ item.sets }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="reps" class="mb-1 text-sm text-at-light-blue">
                Reps
              </label>
              <input
                v-if="edit"
                id="reps"
                v-model="item.reps"
                class="w-full p-2 text-gray-500 focus:outline-none"
                type="text"
              />
              <p v-else>{{ item.reps }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="weight" class="mb-1 text-sm text-at-light-blue">
                Weight (LB's)
              </label>
              <input
                v-if="edit"
                id="weight"
                v-model="item.weight"
                class="w-full p-2 text-gray-500 focus:outline-none"
                type="text"
              />
              <p v-else>{{ item.weight }}</p>
            </div>
            <img
              v-if="edit"
              class="absolute -right-5 h-4 w-auto cursor-pointer"
              src="@/assets/images/trash-light-green.png"
              alt="edit-icon"
              @click="removeExercise(item.id)"
            />
          </div>
          <button
            v-if="edit"
            class="self-start rounded-sm border-2 border-solid border-transparent bg-at-light-blue py-2 px-6 text-xs text-white duration-200 hover:border-at-light-blue hover:bg-white hover:text-at-light-blue"
            type="button"
            @click="addExercise"
          >
            Add Exercise
          </button>
        </div>

        <!-- Cardio -->
        <div v-else class="flex w-full flex-col gap-y-4">
          <div
            v-for="(item, index) in workout.exercises"
            :key="index"
            class="relative flex flex-col gap-x-6 gap-y-2 sm:flex-row"
          >
            <div class="flex flex-2 flex-col md:w-1/3">
              <label for="cardioType" class="mb-1 text-sm text-at-light-blue">
                Type
              </label>
              <select
                v-if="edit"
                id="cardioType"
                v-model="item.cardioType"
                class="w-full p-2 text-gray-500 focus:outline-none"
                type="text"
              >
                <!-- <option value="#">Select Type</option> -->
                <option value="Run">Run</option>
                <option value="Walk">Walk</option>
              </select>
              <p v-else>{{ item.cardioType }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="distance" class="mb-1 text-sm text-at-light-blue">
                Distance
              </label>
              <input
                v-if="edit"
                id="distance"
                v-model="item.distance"
                class="w-full p-2 text-gray-500 focus:outline-none"
                type="text"
              />
              <p v-else>{{ item.distance }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="duration" class="mb-1 text-sm text-at-light-blue">
                Duration
              </label>
              <input
                v-if="edit"
                id="duration"
                v-model="item.duration"
                class="w-full p-2 text-gray-500 focus:outline-none"
                type="text"
              />
              <p v-else>{{ item.duration }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="pace" class="mb-1 text-sm text-at-light-blue">
                Pace
              </label>
              <input
                v-if="edit"
                id="pace"
                v-model="item.pace"
                class="w-full p-2 text-gray-500 focus:outline-none"
                type="text"
              />
              <p v-else>{{ item.pace }}</p>
            </div>
            <img
              v-if="edit"
              class="absolute -right-5 h-4 w-auto cursor-pointer"
              src="@/assets/images/trash-light-green.png"
              alt="edit-icon"
              @click="removeExercise(item.id)"
            />
          </div>
          <button
            v-if="edit"
            class="rounded-xs self-start border-2 border-solid border-transparent bg-at-light-blue py-2 px-6 text-xs text-white duration-200 hover:border-at-light-blue hover:bg-white hover:text-at-light-blue"
            type="button"
            @click="addExercise"
          >
            Add Exercise
          </button>
        </div>
      </div>

      <!-- Update -->
      <button
        v-if="edit"
        type="button"
        class="mt-10 self-start rounded-sm border-2 border-solid border-transparent bg-at-light-blue py-2 px-6 text-sm text-white duration-200 hover:border-at-light-blue hover:bg-white hover:text-at-light-blue"
        @click="updateWorkout"
      >
        Update Workout
      </button>

      <!-- Form Error Handling -->
      <article
        v-if="formErrorMsg"
        class="absolute right-4 bottom-4 mt-10 flex animate-bounce items-center gap-x-2 rounded-md bg-white p-4 text-red-500 shadow-lg"
      >
        <AlertCircle />
        <p>{{ formErrorMsg }}</p>
      </article>

      <div v-if="!dataLoaded">
        <div
          class="relative mb-10 flex h-[270px] flex-col items-center justify-center rounded-md bg-white p-8 text-3xl shadow-md"
        >
          <svg
            class="relative h-10 w-10 animate-spin rounded-full border-t-2 border-r-2 border-at-light-blue"
            viewBox="0 0 24 24"
          ></svg>
        </div>
        <div
          class="item-center mt-10 flex h-[112px] flex-col items-center justify-center rounded-md bg-white p-8 shadow-md"
        >
          <svg
            class="relative h-5 w-5 animate-spin rounded-full border-t-2 border-r-2 border-at-light-blue"
            viewBox="0 0 24 24"
          ></svg>
        </div>
      </div>
    </div>
    <DeleteModal v-if="deleteModal" :workout="workout" />
  </main>
</template>

<script>
import { uid } from 'uid'
import AlertCircle from 'vue-material-design-icons/AlertCircle.vue'

export default {
  components: {
    AlertCircle,
  },
  data() {
    return {
      edit: false,
      dataLoaded: false,
      deleteModal: false,
      formErrorMsg: null,
      workout: {},
    }
  },

  computed: {
    user() {
      return this.$store.getters.getUser
    },
  },

  mounted() {
    this.getWorkout()
  },

  methods: {
    // Get current workout
    async getWorkout() {
      const { data } = await this.$supabase
        .from('workouts')
        .select('*')
        .eq('id', this.$route.params.id)
      this.workout = await data[0]
      this.dataLoaded = true
    },
    editMode() {
      this.edit = !this.edit
    },
    deleteWorkout() {
      this.deleteModal = true
    },

    // Update Workout
    updateWorkout() {
      this.$store.dispatch('workouts/updateWorkout', this.workout)
      this.edit = false
    },

    // Add Exercise to Workout
    addExercise() {
      if (this.workout.type === 'strength') {
        this.workout.exercises.push({
          id: uid(),
          exercise: '',
          sets: '',
          reps: '',
          weight: '',
        })
        return
      }
      if (this.workout.type === 'cardio') {
        this.workout.exercises.push({
          id: uid(),
          cardioType: '',
          distance: '',
          duration: '',
          pace: '',
        })
      }
    },

    // Remove Exercise to Workout
    removeExercise(id) {
      if (this.workout.exercises.length > 1) {
        this.workout.exercises = this.workout.exercises.filter(
          (exercise) => exercise.id !== id
        )
        return
      }
      this.formErrorMsg = 'You must have at least one exercise'
      setTimeout(() => {
        this.formErrorMsg = null
      }, 5000)
    },
  },
}
</script>
