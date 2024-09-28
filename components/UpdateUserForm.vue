<!-- UpdateUserForm.vue -->

<template>
  <form @submit.prevent="submitForm">
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700"
        >Name</label
      >
      <input
        v-model="form.name"
        type="text"
        id="name"
        name="name"
        autocomplete="off"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
    </div>
    <div class="mb-4">
      <label for="surname" class="block text-sm font-medium text-gray-700"
        >Surname</label
      >
      <input
        v-model="form.surname"
        type="text"
        id="surname"
        name="surname"
        autocomplete="off"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
    </div>
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700"
        >Email</label
      >
      <input
        v-model="form.email"
        type="email"
        id="email"
        name="email"
        autocomplete="off"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
    </div>
    <div class="flex justify-end">
      <button
        type="submit"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Update
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      form: {
        name: "",
        surname: "",
        email: "",
      },
    };
  },
  mounted() {
    // Fetch user data using this.userId and populate the form fields
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await fetch(`/api/users/${this.userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        this.form.name = userData.Name;
        this.form.surname = userData.Surname;
        this.form.email = userData.Email;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    async submitForm() {
      try {
        const response = await fetch(`/api/users/${this.userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name: this.form.name,
            Surname: this.form.surname,
            Email: this.form.email,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to update user");
        }
        // Emit event to notify parent component (users page) of successful update
        this.$emit("user-updated");
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add custom scoped styles if needed */
</style>