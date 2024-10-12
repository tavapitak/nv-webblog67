<template>
  <div class="user-form-container">
    <h1>Edit User</h1>
    <form @submit.prevent="editUser">
      <table class="user-form-table">
        <tr>
          <td><label for="name">Name:</label></td>
          <td><input type="text" v-model="user.name" id="name" required /></td>
        </tr>
        <tr>
          <td><label for="lastname">Lastname:</label></td>
          <td><input type="text" v-model="user.lastname" id="lastname" required /></td>
        </tr>
        <tr>
          <td><label for="email">Email:</label></td>
          <td><input type="email" v-model="user.email" id="email" required /></td>
        </tr>
        <tr>
          <td><label for="password">Password:</label></td>
          <td><input type="password" v-model="user.password" id="password" /></td>
        </tr>
        <tr>
          <td colspan="2">
            <button type="submit" class="submit-button">Edit User</button>
          </td>
        </tr>
      </table>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        lastname: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    editUser() {
      // Logic to edit user goes here
      console.log('User edited:', this.user);
    }
  }
};
</script>

<style scoped>
.user-form-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

.user-form-table {
  width: 100%;
  border-collapse: collapse;
}

.user-form-table td {
  padding: 10px;
  border: 1px solid #ccc;
}

.user-form-table label {
  font-weight: bold;
}

.submit-button {
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>

<script>
import UsersService from '../../services/UsersService';
export default {
  data(){
    return {
      user: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        status: 'active'
      }
    }
  },
  async created(){
    try{
      var userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    }catch(err){
      console.log(err);
    }
  },
  methods:{
    async editUser(){
      try{
        await UsersService.put(this.user);
        this.$router.push('/users');
      }catch(err){
        console.log(err);
      }
    }
  }
}
</script>

<style>

</style>