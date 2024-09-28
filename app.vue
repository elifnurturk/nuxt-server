<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { DialogWrapper } from "vue3-promise-dialog";
const router = useRouter();
const navigateToRoute = (route) => {
  router.push(route);
};
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