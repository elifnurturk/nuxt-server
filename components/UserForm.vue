<template>
  <div class="flex items-center justify-center mb-12 mt-8">
    <div class="w-full max-w-md p-8 space-y-6 rounded-xl bg-white shadow-md">
      <h1 class="text-2xl font-bold text-center text-gray-900">Add New User</h1>
      <form class="space-y-6" @submit.prevent="addUser">
        <div>
          <label for="name" class="text-sm font-semibold text-gray-900"
            >Name</label
          >
          <input
            v-model="Name"
            type="text"
            placeholder="Name"
            required
            class="w-full p-2 mt-1 border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label for="surname" class="text-sm font-semibold text-gray-900"
            >Surname</label
          >
          <input
            v-model="Surname"
            type="text"
            placeholder="Surname"
            required
            class="w-full p-2 mt-1 border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label for="email" class="text-sm font-semibold text-gray-900"
            >Email</label
          >
          <input
            v-model="Email"
            type="email"
            placeholder="Email"
            required
            class="w-full p-2 mt-1 border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <button
            type="submit"
            class="w-full py-2 text-white bg-gray-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add New
          </button>
        </div>

        <!-- Display error message -->
        <div v-if="errorMessage" class="text-red-500 text-center mt-4">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Name: "",
      Surname: "",
      Email: "",
      errorMessage: "", // Store error message here
    };
  },
  methods: {
    async addUser() {
      this.errorMessage = ""; // Clear any previous error message

      try {
        const response = await fetch("/api/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name: this.Name,
            Surname: this.Surname,
            Email: this.Email,
          }),
        });

        // Check if the response is successful
        if (response.ok) {
          // Reset the form fields
          this.Name = "";
          this.Surname = "";
          this.Email = "";
          window.location.reload();

          // Show success message
          console.log("User added successfully!");
          window.alert("User created successfully!");
        } else {
          // Handle errors
          const errorData = await response.json(); // Parse error response
          this.errorMessage = errorData.errorMessage || "Failed to add user. User may be exist.";
          console.error("Failed to add user:", this.errorMessage);
        }
      } catch (error) {
        // Handle network error
        this.errorMessage = "Network error: " + error.message;
        console.error("Network error:", error);
      }
    },
  },
};
</script>
