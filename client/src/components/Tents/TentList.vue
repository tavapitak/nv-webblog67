<template>
    <div class="tent-list-container">
      <h1>All Tents</h1>
      <button @click="goToCreatePage" class="create-button">Create New Tent</button>
      <div class="card-container">
        <div v-for="tent in tents" :key="tent.id" class="tent-card">
          <div class="tent-image-container">
            <!-- Show image preview if available -->
            <img v-if="tent.pictures" :src="tent.pictures" alt="Tent Image" class="tent-image" />
            <!-- Fallback to title if no image URL -->
            <div v-else class="no-image">{{ tent.title }}</div>
          </div>
          <div class="tent-content">
            <h3 class="tent-title">{{ tent.title }}</h3>
            <div class="tent-actions">
              <button @click="goToDetailsPage(tent.id)" class="action-button">View Details</button>
              <button @click="goToEditPage(tent.id)" class="action-button">Edit</button>
              <button @click="deleteTent(tent.id)" class="action-button delete-button">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import TentService from '@/services/TentService';
  
  export default {
    data() {
      return {
        tents: []
      };
    },
    async created() {
      this.loadTents();
    },
    methods: {
      async loadTents() {
        try {
          const response = await TentService.getAllTents();
          this.tents = response.data;
        } catch (error) {
          console.error('Error fetching tents:', error);
        }
      },
      goToCreatePage() {
        this.$router.push('/tents/create');
      },
      goToEditPage(id) {
        this.$router.push(`/tents/edit/${id}`);
      },
      goToDetailsPage(id) {
        this.$router.push(`/tents/${id}`);
      },
      async deleteTent(id) {
        if (confirm('Are you sure you want to delete this tent?')) {
          try {
            await TentService.deleteTent(id);
            this.loadTents();
          } catch (error) {
            console.error('Error deleting tent:', error);
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .tent-list-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .create-button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    display: block;
    margin: 0 auto 20px;
  }
  
  .create-button:hover {
    background-color: #45a049;
  }
  
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
  .tent-card {
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin: 10px;
    width: 300px; /* Set a fixed width for the cards */
    overflow: hidden;
    transition: transform 0.2s;
  }
  
  .tent-card:hover {
    transform: scale(1.02); /* Slightly enlarge the card on hover */
  }
  
  .tent-image-container {
    height: 200px; /* Fixed height for image container */
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .tent-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover; /* Maintain aspect ratio */
  }
  
  .no-image {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #666;
    font-weight: bold;
    background-color: #eaeaea; /* Background for no image */
  }
  
  .tent-content {
    padding: 15px;
  }
  
  .tent-title {
    margin: 0;
    font-size: 1.2em;
  }
  
  .tent-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  
  .action-button {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .action-button:hover {
    background-color: #0056b3;
  }
  
  .delete-button {
    background-color: #dc3545;
  }
  
  .delete-button:hover {
    background-color: #c82333;
  }
  </style>
  
  
  <script>
  import TentService from '@/services/TentService';
  
  export default {
    data() {
      return {
        tents: []
      };
    },
    async created() {
      this.loadTents();
    },
    methods: {
      async loadTents() {
        try {
          const response = await TentService.getAllTents();
          this.tents = response.data;
        } catch (error) {
          console.error('Error fetching tents:', error);
        }
      },
      goToCreatePage() {
        this.$router.push('/tents/create');
      },
      goToEditPage(id) {
        this.$router.push(`/tents/edit/${id}`);
      },
      goToDetailsPage(id) {
        this.$router.push(`/tents/${id}`);
      },
      async deleteTent(id) {
        if (confirm('Are you sure you want to delete this tent?')) {
          try {
            await TentService.deleteTent(id);
            this.loadTents(); // Reload tents after deletion
          } catch (error) {
            console.error('Error deleting tent:', error);
          }
        }
      }
    }
  };
  </script>
  