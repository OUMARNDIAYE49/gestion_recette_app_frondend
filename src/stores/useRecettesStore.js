import { defineStore } from 'pinia';
import axios from "axios";
import { ref } from 'vue';

export const useRecettesStore = defineStore('recettes', {
  state: () => ({
    recettes: [],
    nextId: 5 
  }),

  actions: {
 
    async loadDataFromApi() {
      try {
        const resp = await axios.get("http://localhost:4000/api/recipes");
        this.recettes = resp.data;
      } catch (error) {
        this.recettes = [];
      }
   
    },

    async addRecette(recette) {
      try {
        const resp = await axios.post("http://localhost:4000/api/recipes", recette);
        this.recettes.push(resp.data);                
        await this.loadDataFromApi();  
      } catch (error) {
        console.error("Error adding recipe:", error);              
      }
    },
    
    async updateRecipe(id, updatedRecipe) {
      try {
        await axios.put(`http://localhost:4000/api/recipes/${id}`, updatedRecipe);
        await this.loadDataFromApi(); 
      } catch (error) {
        console.error("Error updating recipe:", error);
      }
    },
    
    
    async deleteRecipe(id) {
      try {
        await axios.delete(`http://localhost:4000/api/recipes/${id}`);
        await this.loadRecipesFromApi();
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    },

    
    getRecetteById(id) {
      return this.recettes.find(recette => recette.id === id);
    }
  }
});
