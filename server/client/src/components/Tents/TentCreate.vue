<template>
    <div class="tent-create-container">
      <h1>Create New Tent</h1>
      <form @submit.prevent="createTent" class="tent-form">
        <div class="form-group">
          <label for="title">Brand:</label>
          <input id="title" v-model="tent.title" required />
        </div>
        <div class="form-group">
          <label for="pictures">Image URL:</label>
          <input id="pictures" v-model="tent.pictures" placeholder="Enter image URL" required />
        </div>
        <div class="form-group">
          <label for="content">Description:</label>
          <textarea id="content" v-model="tent.content" required></textarea>
        </div>
        <div class="form-group">
          <label for="category">Size:</label>
          <input id="category" v-model="tent.category" required />
        </div>
        <div class="form-group">
          <label for="status">Status:</label>
          <input id="status" v-model="tent.status" required />
        </div>
        <button type="submit" class="submit-button">Create Tent</button>
      </form>
  
      <!-- Preview Image -->
      <div v-if="tent.pictures" class="image-preview">
        <h3>Image Preview</h3>
        <img :src="tent.pictures" alt="Tent Image" width="300" />
      </div>
    </div>
  </template>
  
  <script>
  import TentService from '@/services/TentService';
  
  export default {
    data() {
      return {
        tent: {
          title: '',
          pictures: '', // URL for the image
          content: '',
          category: '',
          status: ''
        }
      };
    },
    methods: {
      async createTent() {
        try {
          await TentService.createTent(this.tent);
          this.$router.push('/tents'); // Redirect to tent list page
        } catch (error) {
          console.error('Error creating tent:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .tent-create-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .tent-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  textarea {
    resize: vertical; /* Allow vertical resizing only */
  }
  
  .submit-button {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .submit-button:hover {
    background-color: #45a049;
  }
  
  .image-preview {
    text-align: center;
    margin-top: 20px;
  }
  </style>
  
  
  <script>
  import TentService from '@/services/TentService';
  
  export default {
    data() {
      return {
        tent: {
          title: '',
          pictures: '',
          content: '',
          category: '',
          status: ''
        }
      };
    },
    methods: {
      async createTent() {
        try {
          await TentService.createTent(this.tent);
          this.$router.push('/tents');
        } catch (error) {
          console.error('Error creating tent:', error);
        }
      }
    }
  };
  </script>
  