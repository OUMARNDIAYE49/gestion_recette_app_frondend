<template>
  <div class="container my-5">
    <h2 class="my-4 text-center">{{ $t('categoryList.title') }}</h2>

    <div class="d-flex justify-content-between mb-3">
      <div class="d-flex flex-column">
        <div class="d-flex">
          <input 
            type="text" 
            class="form-control me-2" 
            v-bind:placeholder="$t('categoryList.addCategory')" 
            v-model="newCategoryName"
            @keyup.enter="addCategory"
            :class="{ 'is-invalid': newCategoryError }"
          />
          <button class="btn btn-primary" @click="addCategory">{{ $t('categoryList.addCategory') }}</button>
        </div>
        <div v-if="newCategoryError" class="text-danger mt-1">
          {{ $t('categoryList.error') }}
        </div>
      </div>

      <input 
        type="text" 
        class="form-control search-bar ms-3" 
        v-bind:placeholder="$t('categoryList.searchCategory')" 
        v-model="searchQuery"
      />
    </div>

    <ul class="list-group">
      <li
        v-for="category in filteredCategories"
        :key="category.id"
        class="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-3"
      >
        <span v-if="!isEditing(category.id)" class="category-name">
          {{ category.name }}
        </span>
        <input 
          v-else 
          type="text" 
          class="form-control edit-input" 
          v-model="editCategoryName" 
          @keyup.enter="saveCategory(category.id)"
        />

        <div>
          <button 
            v-if="!isEditing(category.id)" 
            class="btn btn-warning action-btn me-2" 
            @click="editCategory(category.id, category.name)"
          >
            {{ $t('categoryList.edit') }}
          </button>
          <div v-else>
            <button 
              class="btn btn-success action-btn me-2" 
              @click="saveCategory(category.id)"
            >
              {{ $t('categoryList.save') }}
            </button>
            <button 
              class="btn btn-secondary action-btn me-2" 
              @click="cancelEdit"
            >
              {{ $t('categoryList.cancel') }}
            </button>
          </div>
          <button 
            v-if="!isEditing(category.id)" 
            class="btn btn-danger action-btn" 
            @click="confirmDelete(category.id)"
          >
            {{ $t('categoryList.delete') }}
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  data() {
    return {
      categories: [
        { id: 1, name: 'Salades' },
        { id: 2, name: 'Pâtes' },
        { id: 3, name: 'Gâteaux' },
        { id: 4, name: 'Quiches' }
      ],
      nextId: 5,
      newCategoryName: '',
      searchQuery: '',
      editingId: null,
      editCategoryName: '',
      newCategoryError: false
    };
  },
  computed: {
    filteredCategories() {
      return this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    addCategory() {
      if (this.newCategoryName.trim()) {
        this.categories.push({ id: this.nextId++, name: this.newCategoryName });
        console.log(`Nouvelle catégorie ajoutée : ${this.newCategoryName}`);
        this.newCategoryName = '';
        this.newCategoryError = false;
      } else {
        this.newCategoryError = true;
      }
    },
    editCategory(categoryId, categoryName) {
      this.editingId = categoryId;
      this.editCategoryName = categoryName;
    },
    saveCategory(categoryId) {
      if (this.editCategoryName.trim()) {
        const category = this.categories.find(c => c.id === categoryId);
        category.name = this.editCategoryName;
        console.log(`Catégorie mise à jour : ${this.editCategoryName}`);
        this.editingId = null;
        this.editCategoryName = '';
      } else {
        alert(this.$t('categoryList.error'));
      }
    },
    cancelEdit() {
      this.editingId = null;
      this.editCategoryName = '';
    },
    confirmDelete(categoryId) {
      const categoryName = this.categories.find(c => c.id === categoryId).name;
      const confirmDeletion = confirm(this.$t('categoryList.deleteConfirm', { name: categoryName }));
      if (confirmDeletion) {
        this.deleteCategory(categoryId);
      }
    },
    deleteCategory(categoryId) {
      this.categories = this.categories.filter(category => category.id !== categoryId);
      console.log(`Catégorie supprimée avec ID : ${categoryId}`);
    },
    isEditing(categoryId) {
      return this.editingId === categoryId;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1000px;
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

.btn-primary {
  font-size: 1rem;
  padding: 0.5em 1em;
  font-weight: 600;
}

.btn-warning {
  font-size: 1rem;
  padding: 0.5em 1em;
  font-weight: 600;
}

.list-group-item {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: none;
  background-color: #ffffff;
  border-radius: 6px;
}

.list-group-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.category-name {
  font-size: 1.25rem;
  font-weight: 500;
  color: #495057;
}

.action-btn {
  font-size: 1rem;
  padding: 0.5em 1em;
  font-weight: 600;
}
.btn-primary {
  width: 260px;
  height: 45px; 
  padding: 0.5em 1em; 
}
.search-bar {
  width: 250px;
  height: 45px;
}

.edit-input {
  width: 60%;
  font-size: 1.25rem;
  font-weight: 500;
  color: #495057;
}

.is-invalid {
  border-color: #dc3545;
}

.text-danger {
  font-size: 0.875rem;
}
</style>
