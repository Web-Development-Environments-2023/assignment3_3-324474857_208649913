<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <RecipePreviewList ref="random_recipesList" title="Random Recipes" server_url="/recipes" class="RandomRecipes center" />
    <b-button @click="moreRandomRecipes" variant="primary">More Recipes</b-button>
    <RecipePreviewList v-if="$root.store.username"
      title="Last Viewed Recipes"
      server_url="/recipes/watched"
      :class="{
        RandomRecipes: true,
        center: true
      }"
      disabled
    ></RecipePreviewList>
    <div v-else>
      <LoginPage></LoginPage>
    </div>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    RecipePreviewList, 
    LoginPage,
  },
  methods: {
    moreRandomRecipes() {
      this.$refs.random_recipesList.updateRecipes();
    },
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
