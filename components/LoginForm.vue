<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-md">
      <h1 class="text-2xl font-bold text-center text-gray-900">
        Log in to your account
      </h1>
      <form class="space-y-6" @submit.prevent="signIn">
        <div>
          <label for="username" class="text-sm font-semibold text-gray-900"
            >Username</label
          >
          <input
            type="text"
            id="username"
            v-model="Username"
            placeholder="Enter your username"
            required
            class="w-full p-2 mt-1 border rounded-md focus:border-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
          />
        </div>
        <div>
          <label for="password" class="text-sm font-semibold text-gray-900"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="Password"
            placeholder="Enter your password"
            required
            class="w-full p-2 mt-1 border rounded-md focus:border-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Sign in
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Username: "",
      Password: "",
    };
  },
  methods: {
    async signIn() {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.Username,
            password: this.Password,
          }),
        });

        const data = await response.json();
        if (data.statusCode == 200) {
          localStorage.setItem("authToken", data.token);
          console.log("Login successful, token stored");
          alert("Login is successful");
          this.$router.push("/");
        } else {
          console.log("Login failed:", data.message);
          alert("Username or password is invalid");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Error during login. Please try again.");
      }
    },
  },
};
</script>
