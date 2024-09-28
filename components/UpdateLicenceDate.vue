<template>
  <form @submit.prevent="submitForm">
    <div class="mb-4">
      <label for="enddate" class="block text-sm font-medium text-gray-700"
        >End date</label
      >
      <input
        v-model="EndDate"
        type="datetime-local"
        placeholder="End Date"
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
    keyId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      form: {
        EndDate: "",
      },
    };
  },
  mounted() {
    // Fetch Key data using this.keyId and populate the form fields
    this.fetchKeyData();
  },
  methods: {
    async fetchKeyData() {
      try {
        const response = await fetch(`/api/licences/${this.keyId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Key data");
        }
        const keyData = await response.json();
        if (keyData.EndDate) {
          const date = new Date(keyData.EndDate);
          this.EndDate = date.toISOString().slice(0, 16);
        }
      } catch (error) {
        console.error("Error fetching Key data:", error);
      }
    },
    async submitForm() {
      try {
        const endDateISO = new Date(this.EndDate).toISOString();
        const response = await fetch(`/api/licences/${this.keyId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            EndDate: endDateISO,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to update Key");
        }
        // Emit event to notify parent component (Keys page) of successful update
        this.$emit("key-updated");
      } catch (error) {
        console.error("Error updating Key:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add custom scoped styles if needed */
</style>
