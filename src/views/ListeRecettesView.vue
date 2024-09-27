<template>
  <div class="container my-5">
    <!-- Titre de la liste des recettes -->
    <h2 class="my-4 text-center">{{ $t('recettes.listTitle') }}</h2>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <!-- Ajout de la barre de recherche -->
      <div class="d-flex align-items-center">
        <input
          type="text"
          class="form-control me-3 search-input"
          placeholder="Rechercher..."
          v-model="searchTerm"
        />
      </div>
      <router-link to="/ajouter" class="btn btn-primary">{{ $t('recettes.addRecipe') }}</router-link>
    </div>
    <table class="table table-hover table-bordered shadow-sm">
      <thead class="table-dark">
        <tr>
          <th>{{ $t('recettes.id') }}</th>
          <th>{{ $t('recettes.titleColumn') }}</th>
          <th>{{ $t('recettes.ingredients') }}</th>
          <th>{{ $t('recettes.type') }}</th>
          <th>{{ $t('recettes.category') }}</th>
          <th>{{ $t('recettes.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        
        <tr
          v-for="recette in filteredRecettes"
          :key="recette.id"
          class="recipe-row"
        >
          <td>{{ recette.id }}</td>
          <td class="recipe-title">{{ recette.titre }}</td>
          <td>{{ recette.ingredients }}</td>
          <td>{{ recette.type }}</td>
          <td>{{ recette.categorie }}</td> 
          <td>
            <router-link
              :to="{ name: 'VoirRecette', params: { id: recette.id } }"
              class="btn btn-info btn-sm me-3"
              >{{ $t('recettes.viewDetails') }}</router-link
            >
            <router-link
              :to="{ name: 'ModifierRecette', params: { recetteId: recette.id } }"
              class="btn btn-warning btn-sm me-3"
              >{{ $t('recettes.edit') }}</router-link
            >
            <button
              @click="supprimer(recette.id)"
              class="btn btn-danger btn-sm"
              >{{ $t('recettes.delete') }}</button
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useRecettesStore } from '@/stores/useRecettesStore';
import { computed, ref } from 'vue';

export default {
  setup() {
    const recettesStore = useRecettesStore();
    const searchTerm = ref('');

    // Calculer les recettes filtrées
    const filteredRecettes = computed(() => {
      if (!searchTerm.value) {
        return recettesStore.recettes;
      }
      const lowerCaseTerm = searchTerm.value.toLowerCase();
      return recettesStore.recettes.filter((recette) =>
        recette.titre.toLowerCase().includes(lowerCaseTerm) ||
        recette.ingredients.toLowerCase().includes(lowerCaseTerm) ||
        recette.type.toLowerCase().includes(lowerCaseTerm) ||
        recette.categorie.toLowerCase().includes(lowerCaseTerm) 
      );
    });

    const supprimer = (id) => {
      recettesStore.supprimerRecette(id);
    };

    return { recettesStore, supprimer, searchTerm, filteredRecettes };
  }
};
</script>

<style scoped>
/* Style global du conteneur */
.container {
  max-width: 1100px;
  margin: auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Style du titre */
h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #343a40;
}

/* Style de la barre de recherche */
.search-input {
  width: 300px;
}

/* Table hover et bordure */
.table {
  margin-top: 20px;
  background-color: #ffffff;
  border-radius: 6px;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}

/* Style de la ligne de recette */
.recipe-row {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.recipe-row:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

/* Style du titre de la recette */
.recipe-title {
  font-weight: 600;
  color: #495057;
}

/* Boutons d'action */
.btn-sm {
  font-size: 0.875rem;
}

.btn-info,
.btn-warning,
.btn-danger {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
