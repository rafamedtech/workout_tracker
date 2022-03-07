<template>
  <main class="mx-auto max-w-screen-sm px-4 py-5">
    <button
      class="mb-5 flex items-center gap-x-2 self-start rounded-lg border border-gray-200 bg-white py-2 px-6 text-sm text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-white hover:shadow-md hover:transition-all"
      @click="$router.go(-1)"
    >
      <ArrowLeft />
      Back
    </button>

    <div>
      <!-- General Workout Info -->
      <section
        v-if="dataLoaded"
        class="relative flex flex-col items-center rounded-md bg-white p-8 shadow-md"
      >
        <article
          v-if="$auth.loggedIn"
          class="absolute left-2 top-2 flex gap-x-2"
        >
          <div
            v-if="workout.owner == $auth.user"
            class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-red-500 shadow-lg"
            @click="deleteWorkout"
          >
            <DeleteOutline
              class="edit-delete h-full w-auto"
              fill-color="#ffffff"
            />
          </div>
          <div
            v-if="!edit && workout.owner == $auth.user"
            class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-400 shadow-lg"
            @click="editMode"
          >
            <PencilOutline
              class="edit-delete h-full w-auto"
              fill-color="#ffffff"
            />
          </div>
        </article>

        <img
          class="h-32 w-auto"
          :src="require(`@/assets/images/${workout.type}.png`)"
          alt="running-icon"
        />

        <span
          class="mt-6 rounded-lg py-1.5 px-5 text-xs text-white shadow-md"
          :class="workout.type === 'cardio' ? 'bg-blue-500' : 'bg-purple-500'"
        >
          {{ workout.type }}
        </span>

        <div class="mt-6 w-full">
          <input
            v-if="edit"
            v-model="workout.name"
            type="text"
            class="w-full rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-gray-500"
          />
          <h1 v-else class="text-center text-2xl text-gray-500">
            {{ workout.name }}
          </h1>
        </div>
        <i class="absolute right-2 top-4 text-right text-[10px] text-gray-500"
          >Added by
          <span
            :class="
              workout.type === 'cardio' ? 'text-blue-500' : 'text-purple-500'
            "
            >{{ workout.owner === $auth.user ? 'you' : workout.owner }}</span
          >
          <br />{{ workout.created_at.slice(0, 10) }}</i
        >
      </section>

      <!-- Exercises -->
      <div
        v-if="dataLoaded"
        class="item-center mt-10 flex flex-col rounded-md bg-white p-8 shadow-md"
      >
        <!-- Strength Training -->
        <section
          v-if="workout.type === 'strength'"
          class="flex w-full flex-col gap-y-4"
        >
          <div
            v-for="(item, index) in workout.exercises"
            :key="index"
            class="relative flex flex-col gap-x-6 gap-y-2 sm:flex-row"
          >
            <div class="flex flex-2 flex-col md:w-1/3">
              <label for="exercise-name" class="mb-1 text-sm text-purple-500">
                Exercise
              </label>
              <input
                v-if="edit"
                id="exercise-name"
                v-model="item.strength_type"
                class="w-full rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-gray-500"
                type="text"
              />
              <p v-else class="text-gray-500">{{ item.strength_type }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="sets" class="mb-1 text-sm text-purple-500">
                Sets
              </label>
              <input
                v-if="edit"
                id="sets"
                v-model="item.sets"
                class="w-full rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-gray-500"
                type="text"
              />
              <p v-else class="text-gray-500">{{ item.sets }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="reps" class="mb-1 text-sm text-purple-500">
                Reps
              </label>
              <input
                v-if="edit"
                id="reps"
                v-model="item.reps"
                class="w-full rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-gray-500"
                type="text"
              />
              <p v-else class="text-gray-500">{{ item.reps }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="weight" class="mb-1 text-sm text-purple-500">
                Weight
              </label>
              <input
                v-if="edit"
                id="weight"
                v-model="item.weight"
                class="w-full rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-gray-500"
                type="text"
              />
              <p v-else class="text-gray-500">{{ item.weight }} LB's</p>
            </div>
            <DeleteOutline
              v-if="edit"
              class="absolute -right-5 h-4 w-auto cursor-pointer"
              fill-color="#6b7280"
              @click="removeExercise(item.id)"
            />
          </div>

          <button
            v-if="edit"
            class="self-start rounded-sm border-2 border-solid border-transparent bg-gray-500 py-2 px-6 text-xs text-white duration-200 hover:border-blue-500 hover:bg-blue-500 focus:outline-blue-500"
            type="button"
            @click="addExercise"
          >
            Add Exercise
          </button>
        </section>

        <!-- Cardio -->
        <section v-else class="flex w-full flex-col gap-y-4">
          <div
            v-for="(item, index) in workout.exercises"
            :key="index"
            class="relative flex flex-col gap-x-6 gap-y-2 sm:flex-row"
          >
            <div class="flex flex-2 flex-col md:w-1/3">
              <label for="cardioType" class="mb-1 text-sm text-blue-500">
                Type
              </label>
              <select
                v-if="edit"
                id="cardioType"
                v-model="item.cardio_type"
                class="w-full rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-none"
                type="text"
              >
                <option value="Run">Run</option>
                <option value="Walk">Walk</option>
              </select>
              <p v-else class="text-gray-500">{{ item.cardio_type }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="distance" class="mb-1 text-sm text-blue-500">
                Distance
              </label>
              <input
                v-if="edit"
                id="distance"
                v-model="item.distance"
                class="w-full rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-gray-500"
                type="text"
              />
              <p v-else class="text-gray-500">{{ item.distance }} Km</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="duration" class="mb-1 text-sm text-blue-500">
                Duration
              </label>
              <input
                v-if="edit"
                id="duration"
                v-model="item.duration"
                class="w-full rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-gray-500"
                type="text"
              />
              <p v-else class="text-gray-500">{{ item.duration }} Mins</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="pace" class="mb-1 text-sm text-blue-500">
                Pace
              </label>
              <input
                v-if="edit"
                id="pace"
                v-model="item.pace"
                class="w-full rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-gray-500"
                type="text"
              />
              <p v-else class="text-gray-500">{{ item.pace }}</p>
            </div>
            <DeleteOutline
              v-if="edit"
              class="absolute -right-5 h-4 w-auto cursor-pointer"
              fill-color="#6b7280"
              @click="removeExercise(item.id)"
            />
          </div>

          <button
            v-if="edit"
            class="rounded-xs self-start border-2 border-solid border-transparent bg-gray-500 py-2 px-6 text-xs text-white duration-200 hover:border-purple-500 hover:bg-purple-500 focus:outline-purple-500"
            type="button"
            @click="addExercise"
          >
            Add Exercise
          </button>
        </section>
      </div>

      <!-- Update -->
      <button
        v-if="edit"
        type="button"
        class="mt-10 self-start rounded-sm border-2 border-solid border-transparent bg-gray-500 py-2 px-6 text-sm text-white duration-200"
        :class="
          workout.type === 'cardio'
            ? 'hover:border-blue-500 hover:bg-blue-500 focus:outline-blue-500'
            : 'hover:border-purple-500 hover:bg-purple-500 focus:outline-purple-500'
        "
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

      <!-- Loading Skeleton -->
      <div v-if="!dataLoaded">
        <div
          class="relative mb-10 flex h-[270px] flex-col items-center justify-center rounded-md bg-white p-8 text-3xl shadow-md"
        >
          <svg
            class="relative h-10 w-10 animate-spin rounded-full border-t-2 border-r-2 border-gray-500"
            viewBox="0 0 24 24"
          ></svg>
        </div>
        <div
          class="item-center mt-10 flex h-[112px] flex-col items-center justify-center rounded-md bg-white p-8 shadow-md"
        >
          <svg
            class="relative h-5 w-5 animate-spin rounded-full border-t-2 border-r-2 border-gray-500"
            viewBox="0 0 24 24"
          ></svg>
        </div>
      </div>
    </div>
    <Modal
      v-if="deleteModal"
      :workout="workout"
      type="workout"
      @closeModal="deleteWorkout"
    />
  </main>
</template>

<script>
import AlertCircle from 'icons/AlertCircle.vue'
import ArrowLeft from 'icons/ArrowLeft.vue'
import DeleteOutline from 'icons/DeleteOutline.vue'
import PencilOutline from 'icons/PencilOutline.vue'

export default {
  components: {
    AlertCircle,
    ArrowLeft,
    DeleteOutline,
    PencilOutline,
  },
  data: () => ({
    edit: false,
    dataLoaded: false,
    deleteModal: false,
    formErrorMsg: null,
    workout: {},
  }),

  head: {
    title: 'Workout Details | Workout Tracker',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Detail view of a workout',
      },
    ],
  },

  created() {
    this.getWorkout()
  },

  methods: {
    // Get current workout
    async getWorkout() {
      const { data } = await this.$axios(`/workouts/${this.$route.params.id}`)

      this.workout = data
      this.dataLoaded = true
    },
    editMode() {
      this.edit = !this.edit
    },
    deleteWorkout() {
      this.deleteModal = !this.deleteModal
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
          strength_type: '',
          sets: '',
          reps: '',
          weight: '',
        })
        return
      }
      if (this.workout.type === 'cardio') {
        this.workout.exercises.push({
          cardio_type: '',
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
