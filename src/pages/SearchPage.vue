<template>
  <div>
    <input type="text" v-model="searchQuery" placeholder="Search recipe">
    <select v-model="numResults">
      <option value="15">15</option>
      <option value="10">10</option>
      <option value="5">5</option>
    </select>
    <button @click="searchRecipes">Search</button>
    <ul>
      <RecipePreview v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import RecipePreview from '../components/RecipePreview.vue';

export default {
  data() {
    return {
      searchQuery: '',
      numResults: '5',
      selectedCuisine: '',
      selectedDiet: '',
      selectedIntolerances: [],
      cuisines: ['Cuisine 1', 'Cuisine 2', 'Cuisine 3'], // Replace with actual cuisine options
      diets: ['Diet 1', 'Diet 2', 'Diet 3'], // Replace with actual diet options
      intolerances: ['Intolerance 1', 'Intolerance 2', 'Intolerance 3'], // Replace with actual intolerance options
      recipes: []
    };
  },
  methods: {
    async searchRecipes() {
      try {
        const params = {
          query: this.searchQuery,
          number: this.numResults,
        };
        const response = await axios.get(`${this.$root.store.server_domain}/recipes/search`, { params });
        this.recipes = response.data;
        console.log(this.recipes);

      } catch (error) {
        console.log(error);
      }
    }
  },
  components: {
    RecipePreview
  }
};
</script>
