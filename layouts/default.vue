<template>
  <div v-if="isAuthenticated" class="flex">
    <UserSideBar />
    <div class="flex pl-44"><NuxtPage /></div>
    <DialogWrapper />
  </div>
  <div v-else class="flex justify-center items-center h-screen">
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { DialogWrapper } from "vue3-promise-dialog";

const router = useRouter();
const isAuthenticated = ref(null); // Use null to distinguish between loading and not authenticated

onMounted(() => {
  const token = localStorage.getItem("authToken");
  if (token) {
    isAuthenticated.value = true;
  } else {
    isAuthenticated.value = false;
    router.push("/login");
  }
});
</script>

<style scoped>
/* Add your styles */
.flex {
  display: flex;
}
.content-area {
  flex: 1;
}
</style>
