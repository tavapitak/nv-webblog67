<template>
  <div class="user-container">
    <h1>Get All Users</h1>
    <div class="button-container">
      <button class="create-user-button" @click="navigateTo('/user/create')">สร้างผู้ใช้</button>
    </div>
    <hr />
    <div v-if="users.length">
      <div><b>จำนวนผู้ใช้งาน:</b> {{ users.length }}</div>
      <table class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ชื่อผู้ใช้</th>
            <th>อีเมล</th>
            <th>Status</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }} {{ user.lastname }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.status }}</td>
            <td>{{ user.type }}</td>
            <td>
              <button class="action-button" @click="navigateTo('/user/' + user.id)">ดูข้อมูล</button>
              <button class="action-button" @click="navigateTo('/user/edit/' + user.id)">แก้ไขข้อมูล</button>
              <button class="action-button delete-button" @click="deleteUser(user)">ลบข้อมูล</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <button class="logout-button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [] // Ensure to load the users data appropriately
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user) {
      if (confirm(`Are you sure you want to delete user ${user.name}?`)) {
        // Add your delete logic here
      }
    },
    logout() {
      // Add your logout logic here
    }
  },
  async created() {
    await this.loadUsers();
  },
  methods: {
    async loadUsers() {
      // Load users data from your API and assign to this.users
    }
  }
};
</script>

<style scoped>
.user-container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.create-user-button,
.logout-button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.create-user-button:hover,
.logout-button:hover {
  background-color: #0056b3;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.user-table th,
.user-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

.user-table th {
  background-color: #007BFF;
  color: white;
}

.user-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.action-button {
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #e0e0e0;
}

.delete-button {
  background-color: #ff4d4d;
  color: white;
}

.delete-button:hover {
  background-color: #ff1a1a;
}
</style>



<script>
import UsersService from "@/services/UsersService";
export default {
  data(){
    return {
      users: []
    }
  },
  async created() {
    try{
      this.users = (await UsersService.index()).data;
    }catch(err){
      console.log(err);
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('setToken',null)
      this.$store.dispatch('setUser',null)
      this.$router.push({
        name: 'login'
      })
    },
    navigateTo(route){
      this.$router.push(route);
    },
    async deleteUser(user){
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
      if(result){
        try{
          await UsersService.delete(user);
          this.refreshData();

        }catch(err){
          console.log(err);
        }
      }
    },
    async refreshData(){
      try{
        this.users = (await UsersService.index()).data;
      }catch(err){
        console.log(err);
      }
    }
  }
};
</script>

<style></style>
