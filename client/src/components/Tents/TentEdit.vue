<template>
    <div class="edit-tent-container">
      <h1>Edit Tent</h1>
      <form @submit.prevent="updateTent" class="tent-form">
        <div class="form-group">
          <label>Title:</label>
          <input v-model="tent.title" required class="form-input" />
        </div>
        <div class="form-group">
          <label>Pictures URL:</label>
          <input v-model="tent.pictures" placeholder="Enter image URL" class="form-input" />
        </div>
        <div class="form-group">
          <label>Content:</label>
          <textarea v-model="tent.content" required class="form-textarea"></textarea>
        </div>
        <div class="form-group">
          <label>Category:</label>
          <input v-model="tent.category" required class="form-input" />
        </div>
        <div class="form-group">
          <label>Status:</label>
          <input v-model="tent.status" required class="form-input" />
        </div>
        <button type="submit" class="submit-button">Update Tent</button>
      </form>
  
      <!-- Preview Image if URL is valid -->
      <div v-if="tent.pictures" class="image-preview-container">
        <h3>Image Preview:</h3>
        <img :src="tent.pictures" alt="Tent Image" class="tent-image" />
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
          pictures: '',
          content: '',
          category: '',
          status: ''
        },
      };
    },
    async created() {
      await this.loadTentDetails();
    },
    methods: {
      async loadTentDetails() {
        const tentId = this.$route.params.id;
        try {
          const response = await TentService.getTentById(tentId);
          this.tent = response.data;
        } catch (error) {
          console.error('Error fetching tent details:', error);
        }
      },
      async updateTent() {
        try {
          await TentService.updateTent(this.tent.id, this.tent);
          this.$router.push('/tents');
        } catch (error) {
          console.error('Error updating tent:', error);
        }
      }
    },
  };
  </script>
  
  <style scoped>
  .edit-tent-container {
    max-width: 600px;
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
  
  .tent-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-input,
  .form-textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .form-textarea {
    resize: vertical; /* Allow vertical resizing */
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
  
  .image-preview-container {
    margin-top: 20px;
    text-align: center;
  }
  
  .tent-image {
    max-width: 300px;
    max-height: 300px;
    object-fit: cover; /* Maintain aspect ratio */
  }
  </style>
  
  
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
    async created() {
      const { id } = this.$route.params; // Get ID from URL
      try {
        // Fetch tent details by ID and pre-fill the form
        const response = await TentService.getTentById(id);
        this.tent = response.data;
      } catch (error) {
        console.error('Error loading tent:', error);
      }
    },
    methods: {
      async updateTent() {
        const { id } = this.$route.params; // Get ID from URL
        try {
          // Update tent details with the form data
          await TentService.updateTent(id, this.tent);
          this.$router.push('/tents'); // Redirect to tent list page
        } catch (error) {
          console.error('Error updating tent:', error);
        }
      }
    }
  };
  </script>
  