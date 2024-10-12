<template>
    <div class="tent-details-container">
      <h1>Tent Details</h1>
      <div v-if="tent" class="tent-card">
        <!-- Show tent title -->
        <h2 class="tent-title">{{ tent.title }}</h2>
  
        <!-- Show image preview if available -->
        <div class="tent-image-container">
          <img v-if="tent.pictures" :src="tent.pictures" alt="Tent Image" class="tent-image" />
          <div v-else class="no-image">{{ tent.title }}</div>
        </div>
  
        <!-- Show tent content -->
        <p><strong>Content:</strong> {{ tent.content }}</p>
  
        <!-- Show tent category -->
        <p><strong>Category:</strong> {{ tent.category }}</p>
  
        <!-- Show tent status -->
        <p><strong>Status:</strong> {{ tent.status }}</p>
  
        <!-- Navigation buttons -->
        <div class="button-container">
          <button @click="goToEditPage(tent.id)" class="action-button">Edit</button>
          <button @click="goBack" class="back-button">Back</button>
        </div>
      </div>
      <div v-else>
        <p>Loading tent details...</p>
      </div>
    </div>
  </template>
  
  <script>
  import TentService from '@/services/TentService';
  
  export default {
    data() {
      return {
        tent: null,
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
      goToEditPage(id) {
        this.$router.push(`/tents/edit/${id}`);
      },
      goBack() {
        this.$router.go(-1);
      },
    },
  };
  </script>
  
  <style scoped>
  .tent-details-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .tent-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.5em;
  }
  
  .tent-image-container {
    height: 300px; /* Fixed height for image container */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    background-color: #eaeaea; /* Background for empty image */
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
  }
  
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .action-button {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .action-button:hover {
    background-color: #0056b3;
  }
  
  .back-button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .back-button:hover {
    background-color: #c82333;
  }
  </style>
  
  
  <script>
  import TentService from '@/services/TentService';
  
  export default {
    data() {
      return {
        tent: null
      };
    },
    async created() {
      const { id } = this.$route.params; // Get the ID from the route parameters
      this.loadTentDetails(id);
    },
    methods: {
      async loadTentDetails(id) {
        try {
          const response = await TentService.getTentById(id);
          this.tent = response.data;
        } catch (error) {
          console.error('Error loading tent details:', error);
        }
      },
      goToEditPage(id) {
        this.$router.push(`/tents/edit/${id}`);
      },
      goBack() {
        this.$router.push('/tents');
      }
    }
  };
  </script>
  