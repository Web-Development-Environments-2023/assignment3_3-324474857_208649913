<template>

  <div>
    <b-card
      v-if="image_load"
      :title="recipe.title"
      :img-src="recipe.image"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text> Ready in {{ recipe.readyInMinutes }} minutes </b-card-text>
      <b-card-text> Popularity: {{ recipe.popularity }} likes </b-card-text>

      <div class="data">
        <i v-if="recipe.watched" class="bi bi-eye-fill" style="font-size:20px" ></i>
        <i v-if="!recipe.watched"  class="bi bi-eye" style="font-size:20px"></i>
        <img v-if="recipe.vegan" :src="vegan" alt="Vegan Icon" width="35px" />
        <img v-if="recipe.vegetarian" :src="vegetarian" alt="Vegan Icon" width="35px" />
        <img v-if="recipe.glutenFree" :src="glutenFree" alt="Vegan Icon" width="30px" />
      </div>
      <router-link
        :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
        class="recipe-preview"
      >
        <div class="buttonWrapper">
        <b-button  id="watchBtn" variant="primary">Watch full recipe</b-button>
      </div>
      </router-link>
    </b-card>
  </div>
</template>

<script>

export default {
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: false,
      vegan: require('@/assets/vegan_icon.png'),
      vegetarian: require('@/assets/vegetarian_icon.png'),
      glutenFree: require('@/assets/gluten_free_icon.png'),
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}

.buttonWrapper{
  width: 100%;
  display: flex;
}

#watchBtn{
  margin: auto;
}

</style>
