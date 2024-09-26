import { defineStore } from 'pinia';

export const useRecettesStore = defineStore('recettes', {
  state: () => ({
    recettes: [
      // Exemples de recettes avec des IDs uniques
      { id: 1, titre: 'Salade César', ingredients: 'Laitue, Poulet, Parmesan, Sauce César', type: 'Entrée' },
      { id: 2, titre: 'Spaghetti Carbonara', ingredients: 'Spaghetti, Oeufs, Pancetta, Parmesan', type: 'Plat' }
    ],
    nextId: 3 // Prochain ID unique à utiliser
  }),

  actions: {
    ajouterRecette(recette) {
      recette.id = this.nextId; // Assigner l'ID unique à la recette
      this.recettes.push(recette);
      this.nextId++; // Incrémenter l'ID pour la prochaine recette
    },
    
    modifierRecette(id, nouvelleRecette) {
      const index = this.recettes.findIndex(recette => recette.id === id);
      if (index !== -1) {
        this.recettes[index] = { ...nouvelleRecette, id }; // Préserver l'ID original
      }
    },

    supprimerRecette(id) {
      this.recettes = this.recettes.filter(recette => recette.id !== id);
    },

    getRecetteById(id) {
      return this.recettes.find(recette => recette.id === id);
    }
  }
});
