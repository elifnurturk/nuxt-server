<template>
  <div class="flex items-center justify-center mb-12 mt-8">
    <div class="w-full max-w-md p-8 space-y-6 rounded-xl bg-white shadow-md">
      <h1 class="text-2xl font-bold text-center text-gray-900">
        Add New Product
      </h1>
      <form class="space-y-6" @submit.prevent="addProduct">
        <div>
          <label for="name" class="text-sm font-semibold text-gray-900"
            >Product Name</label
          >
          <input
            v-model="Name"
            type="text"
            placeholder="Product Name"
            required
            class="w-full p-2 mt-1 border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label for="name" class="text-sm font-semibold text-gray-900"
            >Product Detail</label
          >
          <input
            v-model="Details"
            type="text"
            placeholder="Product Detail"
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
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Name: "",
      Details: "",
    };
  },
  methods: {
    async addProduct() {
      try {
        const response = await fetch("/api/products/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name: this.Name,
            Details: this.Details,
          }),
        });

        // Check if the response is successful
        if (response.ok) {
          // Reset the form fields
          this.Name = "";
          this.Details = "";
          window.location.reload();
          console.log("Product added successfully!");
          window.alert("Product added successfully!");
        } else {
          // Handle errors
          window.alert("Product is exist with same name!");
        }
      } catch (error) {
        // Handle network error
        console.error("Network error:", error);
      }
    },
  },
};
</script>

