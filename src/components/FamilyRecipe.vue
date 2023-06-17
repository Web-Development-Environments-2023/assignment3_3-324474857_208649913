<template>
    <div class="container">
      <div v-if="recipe">
        <div class="recipe-header mt-3 mb-4">
          <h1>{{ recipe.title }}</h1>
          <img v-if="isValidImagePath" :src="getImage()" class="center" />
        </div>
        <div class="recipe-body">
          <div class="wrapper">
            <div class="wrapped">
              <div class="mb-3">
                <div><b>Ready in: </b> {{ recipe.readyInMinutes }} minutes</div>
                <div><b>Invented by: </b> {{ recipe.creator }} </div>
                <div><b>Typically prepared on: </b> {{ recipe.when_to_prepare }} </div>
              </div>
              <b>Ingredients:</b>
              <ul>
                <li
                  v-for="(ingredient, index) in parsedIngredients" :key="index">
                  {{ ingredient }}
                </li>
              </ul>
            </div>
            <div class="wrapped">
              <b>Instructions</b>
              <ol>
                <li
                  v-for="(instruction, index) in parsedInstructions" :key="index">
                  {{ instruction }}
                </li>
              </ol>
            </div>

          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>

    export default {
    // mounted() {
    //     this.axios.get(this.recipe.image).then((i) => {
    //     this.image_load = true;
    //     });
    // },
    props: {
        recipe: {
        type: Object,
        required: true,
        },
    },
    data(){
        return{
            image:null
        }
    },
    computed: {
        parsedIngredients(){
            return this.recipe.ingredients.split(";");
        },
        parsedInstructions(){
            return this.recipe.instructions.split(";");
        },
        isValidImagePath() {
            return this.getImage() !== null;
        },
    
    },
    methods: {
        getImage() {
        try {
            return require('@/assets/family_recipes_images/' + this.recipe.image)
        } catch (error) {
            return null;
        }
        },
  },
    };
    </script>
  
  <style scoped>
  .wrapper {
    display: flex;
  }
  .wrapped {
    width: 50%;
  }
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
  /* .recipe-header{
  
  } */
  </style>
  