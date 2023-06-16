<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div>
        <i v-if="recipe.watched" class="bi bi-eye-fill" style="font-size:20px" ></i>
        <i v-if="!recipe.watched"  class="bi bi-eye" style="font-size:20px"></i>
        <img v-if="recipe.vegan" :src="vegan" alt="Vegan Icon" width="35px" />
        <img v-if="recipe.vegetarian" :src="vegetarian" alt="Vegan Icon" width="35px" />
        <img v-if="recipe.glutenFree" :src="glutenFree" alt="Vegan Icon" width="30px" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div><b>Ready in:</b> {{ recipe.readyInMinutes }} minutes</div>
              <div><b>Likes:</b> {{ recipe.popularity }} likes</div>
              <div><b>Serving:</b> {{ recipe.servings }}</div>
            </div>
            <b>Ingredients:</b>
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            <b>Instructions</b>
            <div v-html="recipe.instructions"></div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
      vegan: require('@/assets/vegan_icon.png'),
      vegetarian: require('@/assets/vegetarian_icon.png'),
      glutenFree: require('@/assets/gluten_free_icon.png'),
    };
  },
  async created() {
    try {
      let response;
      try {
        response = await this.axios.get(
          `${this.$root.store.server_domain}/recipes/${this.$route.params.recipeId}`
        );
        console.log(response.data)
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        instructions,
        extendedIngredients,
        popularity,
        readyInMinutes,
        image,
        title,
        vegan,
        vegetarian,
        glutenFree,
        servings
      } = response.data

      let _recipe = {
        instructions,
        extendedIngredients,
        popularity,
        readyInMinutes,
        image,
        title,
        vegan,
        vegetarian,
        glutenFree,
        servings
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  },
}
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
