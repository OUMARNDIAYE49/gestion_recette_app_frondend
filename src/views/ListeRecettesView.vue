<template>
  <div class="container my-5">
    <h2 class="my-4 text-center ">Liste des Recettes</h2>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center">
        <input
          type="text"
          class="form-control me-3 search-input"
          placeholder="Rechercher..."
          v-model="searchTerm"
        />
      </div>
     
      <button class="btn btn-primary" @click="goToAddRecipePage">
        <i class="fas fa-plus"></i> Ajouter une recette
      </button>
    </div>

    <div v-if="store.recettes.length === 0" class="text-center">
      <p>Aucune recette trouvée.</p>
    </div>

    <table v-else class="table table-hover table-bordered shadow-sm">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Titre</th>
          <th>Ingrédients</th>
          <th>Type</th>
          <th>Catégorie</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(recette, index) in store.recettes"
          :key="recette.id"
          class="recipe-row"
        >
          <td>{{ index + 1 }}</td>
          <td class="recipe-titre">{{ recette.titre }}</td>
          <td>{{ recette.ingredients }}</td>
          <td>{{ recette.type }}</td>
          <td>{{ recette.category }}</td>
          <td>
            <router-link
              :to="{ name: 'VoirRecette', params: { id: recette.id } }"
              class="btn btn-info btn-sm me-3"
            >Voir Détails</router-link>
            <router-link
              :to="{ name: 'ModifierRecette', params: { recetteId: recette.id } }"
              class="btn btn-warning btn-sm me-3"
            >Modifier</router-link>
            <button
              @click="supprimer(recette.id)"
              class="btn btn-danger btn-sm"
            >Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRecettesStore } from '@/stores/useRecettesStore';
import { useRouter } from 'vue-router';

const store = useRecettesStore();
const router = useRouter();
const searchTerm = ref('');

onMounted(() => {
  store.loadDataFromApi();
});

const goToAddRecipePage = () => {
  router.push({ name: 'AjouterRecette' });
};

const supprimer = (id) => {
  store.supprimerRecette(id);
};
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #343a40;
}

.search-input {
  width: 300px;
}

.table {
  margin-top: 20px;
  background-color: #ffffff;
  border-radius: 6px;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}
.recipe-row {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.recipe-row:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.recipe-title {
  font-weight: 600;
  color: #495057;
}

.btn-sm {
  font-size: 0.875rem;
}

.btn-info,
.btn-warning,
.btn-danger {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
