import { defineStore } from 'pinia';

export const useRecettesStore = defineStore('recettes', {
  state: () => ({
    recettes: [
      // Exemples de recettes avec des IDs uniques
      {
        "id": 1,
        "titre": "Salade César",
        "ingredients": "Laitue, Croutons, Poulet, Sauce César",
        "type": "Entrée",
        "categorie": "Salades"
      },
      {
        "id": 2,
        "titre": "Spaghetti Bolognese",
        "ingredients": "Spaghetti, Viande hachée, Sauce tomate",
        "type": "Plat Principal",
        "categorie": "Pâtes"
      },
      {
        "id": 3,
        "titre": "Tiramisu",
        "ingredients": "Mascarpone, Biscuits à la cuillère, Café, Cacao",
        "type": "Dessert",
        "categorie": "Gâteaux"
      },
      {
        "id": 4,
        "titre": "Quiche Lorraine",
        "ingredients": "Pâte brisée, Lardons, Crème, Oeufs",
        "type": "Plat Principal",
        "categorie": "Quiches"
      },
    ],
    nextId: 5 // Prochain ID unique à utiliser
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
