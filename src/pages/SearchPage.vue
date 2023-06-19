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
  <div v-if="showResults" class="results_section">
    <!-- Sort buttons with arrow icons -->
    <div>
        <b-button @click="toggleSort('popularity')" size="sm" class="my-2 my-sm-3 w-75" variant="primary">
          Sort by Popularity
          <i v-if="currentSortBy === 'popularity'" :class="{'bi-arrow-up': sortOrderPopularity, 'bi-arrow-down': !sortOrderPopularity}"></i>
        </b-button>
        <b-button @click="toggleSort('readyInMinutes')" size="sm" class="my-2 my-sm-3 w-75" variant="primary">
          Sort by Preparation Time
          <i v-if="currentSortBy === 'readyInMinutes'" :class="{'bi-arrow-up': sortOrderPreparation, 'bi-arrow-down': !sortOrderPreparation}"></i>
        </b-button>
    </div>
    <ul>
      <RecipePreview v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </ul>
  </div>
  <div v-if="showNoResultsMsg" class="no_results_section">
    <h3> No recipes found...</h3>
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
      currentSortBy: '',
      sortOrderPopularity: false, //True - ascending, False - descending
      sortOrderPreparation: true, //True - ascending, False - descending
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
      showResults:false,
      showNoResultsMsg:false,
      recipes:[],
      // For sort buttons testing
    //   recipes: [
    //     {id:1, popularity:5, readyInMinutes:10},
    //     {id:2, popularity:3, readyInMinutes:12},
    //     {id:3, popularity:7, readyInMinutes:8},
    // ],
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
// For testing comment 2 lines above, and uncomment one of the lines below
        // this.recipes= [
        // {id:1, popularity:5, readyInMinutes:10},
        // {id:2, popularity:3, readyInMinutes:12},
        // {id:3, popularity:7, readyInMinutes:8},
        // ];

        // this.recipes = [];

        if(this.recipes.length === 0){
          this.showNoResultsMsg = true;
          this.showResults = false;
        }
        else{
          this.showNoResultsMsg = false;
          this.showResults = true;
        }
        console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
    toggleSort(sortBy) {

      if (this.currentSortBy === sortBy) {
        if (sortBy === 'popularity') {
          this.sortOrderPopularity = !this.sortOrderPopularity; // Toggle sort order for popularity
        } else if (sortBy === 'readyInMinutes') {
          this.sortOrderPreparation = !this.sortOrderPreparation; // Toggle sort order for readyInMinutes
        }
      } else {
        // Default sort order: popularity= descending, preparation= ascending
        this.currentSortBy = sortBy;
        this.sortOrderPopularity = sortBy === 'popularity' ? false : true;
        this.sortOrderPreparation = sortBy === 'readyInMinutes' ? true : false;
      }

      this.sortRecipes();
    },

    sortRecipes() {
      const { currentSortBy, sortOrderPopularity, sortOrderPreparation } = this;
      this.recipes.sort((a, b) => {
        const valueA = a[currentSortBy];
        const valueB = b[currentSortBy];

        if (currentSortBy === 'popularity') {
          return sortOrderPopularity ? valueA - valueB : valueB - valueA;
        } else if (currentSortBy === 'readyInMinutes') {
          return sortOrderPreparation ? valueA - valueB : valueB - valueA;
        }
        return 0;
      });
    },
    resultsNotEmpty(){
      return this.rec
    }
  },
  components: {
    RecipePreview,
    VueSelect
  }
};
</script>
<style>
.main_section{
  display: flex;
}

.results_section{
  margin-top: 50px;
}

.search_section{
  display: flex;
  flex-direction: column;
  background-color: rgba(237, 240, 237, 0.797);
  width: 250px;
  height: 100vh;
  padding: 15px;
  padding-top: 40px;
}

.bi-arrow-up::before {
  font-size: 12px;
}

.bi-arrow-down::before {
  font-size: 12px;
}

</style>