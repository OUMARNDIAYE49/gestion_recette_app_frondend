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
      <div class="mb-3 d-flex justify-content-between align-items-end">
        <div class="w-50 me-3">
          <label for="type" class="form-label">{{ $t('recettes.form.typeRecette') }}</label>
          <select id="type" v-model="recette.type" class="form-select" required>
            <option value="Entrée">{{ $t('recettes.form.entrée') }}</option>
            <option value="Plat">{{ $t('recettes.form.plat') }}</option>
            <option value="Dessert">{{ $t('recettes.form.dessert') }}</option>
          </select>
        </div>
        <div class="w-50">
          <label for="categorie" class="form-label">{{ $t('recettes.form.categorie') }}</label>
          <select id="categorie" v-model="recette.categorie" class="form-select" required>
            <option value="Végétarien">{{ $t('recettes.form.végétarien') }}</option>
            <option value="Vegan">{{ $t('recettes.form.vegan') }}</option>
            <option value="Sans Gluten">{{ $t('recettes.form.sansGluten') }}</option>
            <option value="Classique">{{ $t('recettes.form.classique') }}</option>
          </select>
        </div>
      </div>
      <div class="d-flex justify-content-between mt-4">
        <button type="submit" class="btn btn-primary btn-sm">
          {{ isEditMode ? $t('recettes.form.submitEdit') : $t('recettes.form.submitAdd') }}
        </button>
        <button type="button" class="btn btn-danger btn-sm" @click="handleCancel">
          {{ $t('recettes.form.annuler') }}
        </button>
      </div>
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
        : { titre: '', ingredients: '', type: '', categorie: '' }
    );

    const handleSubmit = () => {
      if (isEditMode.value) {
        recettesStore.modifierRecette(props.recetteIndex, recette.value);
      } else {
        recettesStore.ajouterRecette(recette.value);
      }
      router.push('/recettes');
    };

    const handleCancel = () => {
      router.push('/recettes');
    };

    return { recette, handleSubmit, handleCancel, isEditMode };
  },
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin-top: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

form {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #343a40;
  text-align: center;
  margin-bottom: 20px;
}

.form-label {
  font-weight: 600;
  color: #495057;
}

.form-control,
.form-select {
  margin-top: 10px;
}

.d-flex {
  display: flex;
  justify-content: space-between;
}

.me-3 {
  margin-right: 1rem !important;
}

.btn-sm {
  width: 45%;
}

.btn-danger {
  background-color: #dc3545;
  border: none;
}

.btn-primary {
  background-color: #007bff;
  border: none;
}

.mt-4 {
  margin-top: 1.5rem;
}
</style>
