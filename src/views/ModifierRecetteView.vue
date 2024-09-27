<template>
  <div class="container mt-5 p-4 bg-light rounded shadow">
    <h1 class="text-center mb-4">{{ $t('recettes.modifierTitre') }}</h1>
    <form @submit.prevent="mettreAJourRecette">
      <div class="row mb-3">
        <div class="col-md-6">
          <label for="titre" class="form-label">{{ $t('recettes.titleColumn') }}</label>
          <input
            type="text"
            id="titre"
            class="form-control"
            v-model="recette.titre"
            required
          />
        </div>
        <div class="col-md-6">
          <label for="type" class="form-label">{{ $t('recettes.type') }}</label>
          <select
            id="type"
            class="form-select"
            v-model="recette.type"
            required
          >
            <option value="Entrée">{{ $t('recettes.entrée') }}</option>
            <option value="Plat Principal">{{ $t('recettes.plat') }}</option>
            <option value="Dessert">{{ $t('recettes.dessert') }}</option>
          </select>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-12">
          <label for="categorie" class="form-label">{{ $t('recettes.form.categorie') }}</label>
          <select
            id="categorie"
            class="form-select"
            v-model="recette.categorie"
            required
          >
            <option value="Salades">{{ $t('recettes.form.salades') }}</option>
            <option value="Pâtes">{{ $t('recettes.form.pates') }}</option>
            <option value="Gâteaux">{{ $t('recettes.form.gateaux') }}</option>
            <option value="Quiches">{{ $t('recettes.form.quiches') }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3">
        <label for="ingredients" class="form-label">{{ $t('recettes.ingredients') }}</label>
        <textarea
          id="ingredients"
          class="form-control"
          v-model="recette.ingredients"
          rows="4"
          required
        ></textarea>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <button type="submit" class="btn btn-primary">{{ $t('recettes.save') }}</button>
        <router-link to="/recettes" class="btn btn-danger ms-2">{{ $t('recettes.cancel') }}</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { useRecettesStore } from '@/stores/useRecettesStore';
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const recettesStore = useRecettesStore();
    const route = useRoute();
    const router = useRouter();
    const recetteId = parseInt(route.params.recetteId);

    // Trouver la recette en fonction de l'ID
    const recette = computed(() => recettesStore.getRecetteById(recetteId));

    onMounted(() => {
      if (!recette.value) {
        router.push('/recettes');
      }
    });

    const mettreAJourRecette = () => {
      recettesStore.modifierRecette(recetteId, { ...recette.value });
      router.push('/recettes');
    };

    return {
      recette,
      mettreAJourRecette
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto; /* Centrer le conteneur */
}
form {
  margin-top: 20px;
}
</style>
