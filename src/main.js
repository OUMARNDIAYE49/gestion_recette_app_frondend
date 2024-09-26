import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';

// Importer les fichiers de traduction
import en from './locales/en.json';
import fr from './locales/fr.json';

// Configuration de vue-i18n
const i18n = createI18n({
  locale: 'en', // Langue par défaut
  fallbackLocale: 'en', // Langue de secours
  messages: {
    en,
    fr
  }
});
const app = createApp(App);
app.use(i18n);

app.use(createPinia());
app.use(router);
app.mount('#app');
