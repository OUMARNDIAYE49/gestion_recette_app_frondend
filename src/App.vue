<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">{{ $t('navbar.brand') }}</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">{{ $t('navbar.home') }}</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/recettes" class="nav-link">{{ $t('navbar.recipesList') }}</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/ajouter" class="nav-link">{{ $t('navbar.addRecipe') }}</router-link>
            </li>
          </ul>
    
          <select v-model="locale" @change="changerLangue" class="form-select w-auto">
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'App',
  setup() {
    const { locale } = useI18n();

    const changerLangue = (event) => {
      locale.value = event.target.value; 
    };

    return { locale, changerLangue };
  }
};
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
</style>
