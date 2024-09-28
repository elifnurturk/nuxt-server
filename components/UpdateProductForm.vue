<!-- UpdateproductForm.vue -->

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
      <label for="details" class="block text-sm font-medium text-gray-700"
        >Details</label
      >
      <input
        v-model="form.details"
        type="text"
        id="details"
        name="Details"
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
    productId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      form: {
        name: "",
        details: "",
      },
    };
  },
  mounted() {
    // Fetch product data using this.productId and populate the form fields
    this.fetchProductData();
  },
  methods: {
    async fetchProductData() {
      try {
        const response = await fetch(`/api/products/${this.productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const productData = await response.json();
        this.form.name = productData.Name;
        this.form.details = productData.Details;
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    },
    async submitForm() {
      try {
        const response = await fetch(`/api/products/${this.productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name: this.form.name,
            Details: this.form.details,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to update product");
        }
        // Emit event to notify parent component (products page) of successful update
        this.$emit("product-updated");
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },
  },
};
</script>

