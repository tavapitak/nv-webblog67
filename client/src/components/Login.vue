<template>
  <div class="login-container">
    <h1>User Login</h1>
    <form v-on:submit.prevent="onLogin" class="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" v-model="email" required class="form-input" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          required
          class="form-input"
        />
      </div>
      <button type="submit" class="submit-button">Login</button>
      <div class="error" v-if="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async onLogin() {
      try {
        // Your login logic here
      } catch (error) {
        this.error = 'Invalid credentials'; // Adjust this based on your error handling
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.submit-button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>

<script>
import AuthenService from "../services/AuthenService";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password,
        });

        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        this.$router.push({
          name: "users",
        });
      } catch (error) {
        console.log(error);
        this.error = error.response.data.error;
        this.email = "";
        this.password = "";
      }
    },
  },
};
</script>
<style scoped>
.error {
  color: red;
}
</style>
