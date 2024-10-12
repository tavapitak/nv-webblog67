import Api from '@/services/Api';

export default {
    // Fetch all tents
    getAllTents() {
        return Api().get('/tents');
    },

    // Fetch a tent by ID
    getTentById(id) {
        return Api().get(`/tents/${id}`);
    },

    // Create a new tent
    createTent(tentData) {
        return Api().post('/tents', tentData);
    },

    // Update a tent by ID
    updateTent(id, tentData) {
        return Api().put(`/tents/${id}`, tentData);
    },

    // Delete a tent by ID
    deleteTent(id) {
        return Api().delete(`/tents/${id}`);
    }
};
