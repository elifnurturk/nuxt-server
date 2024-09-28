<!-- Card.vue -->
<template>
  <div
    class="w-full bg-gray-400 p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8"
  >
    <h5 class="mb-2 text-3xl font-bold text-gray-900">
      {{ LicenceKeyNo }}
    </h5>
    <p class="mb-5 text-base text-gray-500 sm:text-lg">
      {{ LicenceKey }}
    </p>
    <div
      class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse"
    >
      <a
        href="#"
        class="w-full sm:w-auto focus:ring-4 focus:outline-none text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
      >
        <div class="text-left rtl:text-right">
          <div
            class="-mt-1 font-sans text-sm px-2 font-semibold border-gray-200"
          >
            Edit
          </div>
        </div>
      </a>
      <a
        href="#"
        class="w-full sm:w-auto focus:ring-4 focus:outline-none text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
      >
        <div class="text-left rtl:text-right">
          <div class="-mt-1 font-sans text-sm font-semibold">Delete</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    LicenceKeyNo: String,
    LicenceKey: String,
    occupation: String,
  },
};
</script>