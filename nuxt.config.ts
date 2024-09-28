export default defineNuxtConfig({
  // Enables Nuxt DevTools
  devtools: { enabled: true },

  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    components: true,
  },

  imports: {
    dirs: ["stores"],
  },

  // Loads Tailwind CSS module
  modules: ['@nuxtjs/tailwindcss',  '@element-plus/nuxt', '@sidebase/nuxt-session'],

  server: {
    proxy: {
      '/api': 'http://localhost:3000' // Adjust the port if your backend server is running on a different port
    },
    router: {
      base: '/api' 
    },
  },
  router: {
    middleware: ['auth']
  },
  compatibilityDate: '2024-07-04'
});