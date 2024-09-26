<template>
  <div class="container mt-4">
    <h1>{{ $t('recettes.modifierTitre') }}</h1>
    <form @submit.prevent="mettreAJourRecette">
      <div class="mb-3">
        <label for="titre" class="form-label">{{ $t('recettes.titleColumn') }}</label>
        <input
          type="text"
          id="titre"
          class="form-control"
          v-model="recette.titre"
          required
        />
      </div>
      <div class="mb-3">
        <label for="ingredients" class="form-label">{{ $t('recettes.ingredients') }}</label>
        <textarea
          id="ingredients"
          class="form-control"
          v-model="recette.ingredients"
          rows="3"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="type" class="form-label">{{ $t('recettes.type') }}</label>
        <select
          id="type"
          class="form-select"
          v-model="recette.type"
          required
        >
          <option value="entrée">{{ $t('recettes.entrée') }}</option>
          <option value="plat">{{ $t('recettes.plat') }}</option>
          <option value="dessert">{{ $t('recettes.dessert') }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">{{ $t('recettes.save') }}</button>
      <router-link to="/recettes" class="btn btn-danger ms-2">{{ $t('recettes.cancel') }}</router-link>
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
}
form {
  margin-top: 20px;
}
</style>
