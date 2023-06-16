<template>
  <div>
    <h3>Search recipes:</h3>
    <input type="text" v-model="searchQuery" placeholder="Search recipe">
    <select v-model="numResults">
      <option value="15">15</option>
      <option value="10">10</option>
      <option value="5">5</option>
    </select>
    <br/>
    <b>Cuisines:</b><vue-select v-model="selectedCuisine" :options="cuisine_array" multiple style="width: 200px;"></vue-select>
    <b>Diets:</b><vue-select v-model="selectedDiet" :options="dietary_list" multiple style="width: 200px;"></vue-select>
    <b>Intolerances:</b><vue-select v-model="selectedIntolerances" :options="allergens_list" multiple style="width: 200px;"></vue-select>
    <button @click="searchRecipes">Search</button>
    <ul>
      <RecipePreview v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import RecipePreview from '../components/RecipePreview.vue';
import VueSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
  data() {
    return {
      searchQuery: '',
      numResults: '5',
      selectedCuisine: [],
      selectedDiet: [],
      selectedIntolerances: [],
      cuisine_array: [
        "African",
        "Asian",
        "American",
        "British",
        "Cajun",
        "Caribbean",
        "Chinese",
        "Eastern European",
        "European",
        "French",
        "German",
        "Greek",
        "Indian",
        "Irish",
        "Italian",
        "Japanese",
        "Jewish",
        "Korean",
        "Latin American",
        "Mediterranean",
        "Mexican",
        "Middle Eastern",
        "Nordic",
        "Southern",
        "Spanish",
        "Thai",
        "Vietnamese"
      ],
      dietary_list: [
        "Gluten Free",
        "Ketogenic",
        "Vegetarian",
        "Lacto-Vegetarian",
        "Ovo-Vegetarian",
        "Vegan",
        "Pescetarian",
        "Paleo",
        "Primal",
        "Modified Paleo (Dairy allowed)",
        "Low FODMAP",
        "Whole30"
      ],
      allergens_list: [
        "Dairy",
        "Egg",
        "Gluten",
        "Grain",
        "Peanut",
        "Seafood",
        "Sesame",
        "Shellfish",
        "Soy",
        "Sulfite",
        "Tree Nut",
        "Wheat"
      ],
      recipes: []
    };
  },
  methods: {
    async searchRecipes() {
      try {
        const params = {
          query: this.searchQuery,
          number: this.numResults,
          cuisine: this.selectedCuisine.join(","),
          diet: this.selectedDiet.join(","),
          intolerances: this.selectedIntolerances.join(",")
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
    RecipePreview,
    VueSelect
  }
};
</script>
