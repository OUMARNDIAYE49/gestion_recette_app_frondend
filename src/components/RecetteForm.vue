<template>
  <div class="container">
    <h2>{{ isEditMode ? $t('recettes.form.modifierTitre') : $t('recettes.form.ajouterTitre') }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="titre" class="form-label">{{ $t('recettes.form.titreRecette') }}</label>
        <input
          type="text"
          id="titre"
          v-model="recette.titre"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="ingredients" class="form-label">{{ $t('recettes.form.ingredients') }}</label>
        <textarea
          id="ingredients"
          v-model="recette.ingredients"
          class="form-control"
          rows="3"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="type" class="form-label">{{ $t('recettes.form.typeRecette') }}</label>
        <select id="type" v-model="recette.type" class="form-select" required>
          <option value="Entrée">{{ $t('recettes.form.entrée') }}</option>
          <option value="Plat">{{ $t('recettes.form.plat') }}</option>
          <option value="Dessert">{{ $t('recettes.form.dessert') }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">
        {{ isEditMode ? $t('recettes.form.submitEdit') : $t('recettes.form.submitAdd') }}
      </button>
    </form>
  </div>
</template>

<script>
import { useRecettesStore } from '@/stores/useRecettesStore';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  props: {
    recetteIndex: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    const recettesStore = useRecettesStore();
    const router = useRouter();
    
    const isEditMode = computed(() => props.recetteIndex !== null);

    const recette = ref(
      isEditMode.value
        ? { ...recettesStore.recettes[props.recetteIndex] }
        : { titre: '', ingredients: '', type: '' }
    );

    const handleSubmit = () => {
      if (isEditMode.value) {
        recettesStore.modifierRecette(props.recetteIndex, recette.value);
      } else {
        recettesStore.ajouterRecette(recette.value);
      }
      router.push('/recettes');
    };

    return { recette, handleSubmit, isEditMode };
  },
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin-top: 20px;
}
</style>
