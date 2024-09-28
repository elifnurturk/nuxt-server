<template>
  <div class="flex items-center justify-center mb-12 mt-8">
    <div class="w-full max-w-md p-8 space-y-6 rounded-xl bg-white shadow-md">
      <h1 class="text-2xl font-bold text-center text-gray-900">
        Add New Licence Key
      </h1>
      <form class="space-y-6" @submit.prevent="addLicence">
        <div>
          <label for="key" class="text-sm font-semibold text-gray-900"
            >Licence Key</label
          >
          <input
            v-model="LicenceKey"
            type="text"
            placeholder="Licence Key"
            readonly
            class="w-full p-2 mt-1 bg-gray-300 rounded-md text-black"
          />
        </div>
        <div>
          <label for="startdate" class="text-sm font-semibold text-gray-900"
            >Product Id</label
          >
          <input
            v-model="ProductId"
            type="text"
            placeholder="Product Id"
            required
            class="w-full p-2 mt-1 border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label for="UserMail" class="text-sm font-semibold text-gray-900"
            >User Mail</label
          >
          <input
            v-model="UserMail"
            type="text"
            placeholder="User Mail"
            required
            class="w-full p-2 mt-1 border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label for="EndDate" class="text-sm font-semibold text-gray-900"
            >End Date</label
          >
          <input
            v-model="EndDate"
            type="datetime-local"
            placeholder="End Date"
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
      LicenceKey: "",
      ProductId: "",
      UserMail: "",
      EndDate: "",
    };
  },
  methods: {
    generateLicenseKey(ProductId, UserMail) {
      const salt = "ABC123"; // This salt can be any fixed string
      let hash = 0;
      const combined = ProductId + UserMail;
      for (let i = 0; i < combined.length; i++) {
        const char = combined.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
      }
      const key = btoa(hash.toString() + salt).substr(0, 16); // Base64 encode the hash with salt
      return key.toUpperCase();
    },
    async addLicence() {
      try {
        const response = await fetch("/api/licences/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            LicenceKey: this.LicenceKey,
            ProductId: this.ProductId,
            UserMail: this.UserMail,
            EndDate: this.EndDate,
          }),
        });

        const data = await response.json();
        if (data.status === 201) {
          // Reset the form fields
          this.LicenceKey = "";
          this.ProductId = "";
          this.UserMail = "";
          this.EndDate = "";
          window.location.reload();

          // Optionally, you can add logic to show a success message or redirect the user
          console.log("Key added successfully!");
          window.alert("Key created successfully!");
        } else {
          // Handle errors
          this.errorMessage =
            data.body.error ||
            "Failed to create key. User or product may not be exist.";
          window.alert(this.errorMessage);
        }
      } catch (error) {
        // Handle network error
        this.errorMessage = "Network error: " + error.message;

        console.error("Network error:", error);
      }
    },
    updateLicenseKey() {
      if (this.ProductId && this.UserMail) {
        this.LicenceKey = this.generateLicenseKey(
          this.ProductId,
          this.UserMail
        );
      } else {
        this.LicenceKey = "";
      }
    },
  },
  watch: {
    ProductId: "updateLicenseKey",
    UserMail: "updateLicenseKey",
  },
  mounted() {
    this.updateLicenseKey();
  },
};
</script>

