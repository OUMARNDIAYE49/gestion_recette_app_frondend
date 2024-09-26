<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <!-- Mise à jour du titre avec la nouvelle clé de traduction -->
      <h1>{{ $t('recettes.listTitle') }}</h1>
      <router-link to="/ajouter" class="btn btn-primary">{{ $t('recettes.addRecipe') }}</router-link>
    </div>
    <table class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>{{ $t('recettes.id') }}</th>
          <th>{{ $t('recettes.titleColumn') }}</th>
          <th>{{ $t('recettes.ingredients') }}</th>
          <th>{{ $t('recettes.type') }}</th>
          <th>{{ $t('recettes.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="recette in recettesStore.recettes" :key="recette.id">
          <td>{{ recette.id }}</td>
          <td>{{ recette.titre }}</td>
          <td>{{ recette.ingredients }}</td>
          <td><span>{{ recette.type }}</span></td>
          <td>
            <router-link :to="{ name: 'VoirRecette', params: { id: recette.id } }" class="btn btn-info btn-sm me-3">{{ $t('recettes.viewDetails') }}</router-link>
            <router-link :to="{ name: 'ModifierRecette', params: { recetteId: recette.id } }" class="btn btn-warning btn-sm me-3">{{ $t('recettes.edit') }}</router-link>
            <button @click="supprimer(recette.id)" class="btn btn-danger btn-sm">{{ $t('recettes.delete') }}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useRecettesStore } from '@/stores/useRecettesStore';

export default {
  setup() {
    const recettesStore = useRecettesStore();

    const supprimer = (id) => {
      recettesStore.supprimerRecette(id);
    };

    return { recettesStore, supprimer };
  }
};
</script>

<style scoped>
.container {
  max-width: 1000px;
}

.table {
  margin-top: 20px;
}

.btn-primary {
  margin-left: auto;
}

</style>
