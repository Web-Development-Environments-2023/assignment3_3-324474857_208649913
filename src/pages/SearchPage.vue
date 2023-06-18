<template>
  <div class="main_section">
  <div class="search_section">
    <h3 style="color: rgba(0, 0, 0, 0.60);">Filters</h3>
    <span>Recipe name:</span>
    <b-form-input  class="mb-3" v-model="searchQuery" size="sm" ></b-form-input>
    <span>Cuisines:</span><vue-select class="mb-3"  v-model="selectedCuisine" :options="cuisine_array" multiple ></vue-select>
    <span>Diets:</span><vue-select class="mb-3" v-model="selectedDiet" :options="dietary_list" multiple ></vue-select>
    <span>Intolerances:</span><vue-select class="mb-3" v-model="selectedIntolerances" :options="allergens_list" multiple ></vue-select>
    <div>
    <b-button @click="searchRecipes" size="sm" class="my-2 my-sm-3 w-75 " variant="warning">Search</b-button>
    <b-form-select size="sm" class="w-25" v-model="numResults">
      <b-form-select-option value="5">5</b-form-select-option>
      <b-form-select-option value="10">10</b-form-select-option>
      <b-form-select-option value="15">15</b-form-select-option>
    </b-form-select>
  </div>
    
  </div>
  <div class="results_section">
    <ul>
      <RecipePreview v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </ul>
  </div>
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
<style>

.search_section{
  display: flex;
  flex-direction: column;
  background-color: rgba(237, 240, 237, 0.797);
  width: 250px;
  height: 100vh;
  padding: 15px;
  padding-top: 40px;
}

</style>