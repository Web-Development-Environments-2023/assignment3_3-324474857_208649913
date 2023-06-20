<template>
  <div class="container">
    <div class="random_section">
      <h1 id="title" class="mt-5 ">Main Page</h1>
      <RecipePreviewList ref="random_recipesList" title="Random Recipes" server_url="/recipes" class="RandomRecipes" />
      <b-button @click="moreRandomRecipes" variant="primary">More Recipes</b-button>
    </div>
    <div class="bottom">
      <div v-if="$root.store.username">
        <h1 id="last_watched" class="text-center">Last Watched</h1>
      <RecipePreviewList
        title="Last Viewed Recipes"
        server_url="/recipes/watched"
        :class="{
          RandomRecipes: true,
          center: true
        }"
        disabled
      ></RecipePreviewList></div>
      <div v-else>
        <LoginPage class="login_page"></LoginPage>
      </div>
    </div>
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
.container {
  width: 95vw;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.RandomRecipes{
  margin-left: 180px;
}

.random_section {
  width: 99vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center; /* Add this line to center horizontally */
}

.bottom {
  display: flex;
  justify-content: center;
  padding-top: 50px;
  padding-bottom: 20px;
  background-color: rgb(245, 239, 215);
  width: 99vw;
}
#title {
  color: rgb(91, 184, 91);
  font-size: 35px;
}

.login_page{
  height: 300px;
}

#last_watched{
  color: rgba(0, 0, 0, 0.278);
}

</style>
