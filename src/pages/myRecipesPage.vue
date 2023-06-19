<template>
  <div class="container">
    <h1 class="title">My Recipes Page</h1>
    <div>
      <b-button @click="showModal" ref="btnShow">Add new recipe</b-button>

      <b-modal id="modal-1" @hide="handleHide" >
        <template #modal-title>
          Add new recipe
        </template>
        <b-form ref="form">
          <div class="d-block">
            <span>Recipe name:</span>
            <b-form-input required v-model="recipeName" class="mb-3"></b-form-input>
            <span>Image link:</span>
            <b-form-input required v-model="image" class="mb-3"></b-form-input>
            <span>Ready in (minutes):</span>
            <b-form-input required v-model="readyInMinutes" class="mb-3"></b-form-input>
            <span>Likes:</span>
            <b-form-input required v-model="likes" class="mb-3"></b-form-input>
            <span>Serving:</span>
            <b-form-input required v-model="serving" class="mb-3"></b-form-input>
            <span>Ingredients:</span>
            <b-form-input required v-model="ingredients" class="mb-3"></b-form-input>
            <span>Instructions:</span>
            <b-form-input required v-model="instructions" class="mb-3"></b-form-input>
            <div class="checkbox-container">
              <b-form-checkbox  v-model="vegan">Vegan</b-form-checkbox>
              <b-form-checkbox  v-model="vegetarian">Vegetarian</b-form-checkbox>
              <b-form-checkbox  v-model="glutenFree">Gluten free</b-form-checkbox>
            </div>
          </div>
        </b-form>
      </b-modal>
    </div>
    <RecipePreviewList
      title="My Recipes"
      server_url="/users/my-recipes"
      notFound_msg="You have not created any new recipes yet"
      class="RandomRecipes center"
    />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { BModal } from "bootstrap-vue";

export default {
  data() {
    return {
      recipeName: "",
      readyInMinutes: "",
      likes: "",
      serving: "",
      image: "",
      ingredients: "",
      instructions: "",
      vegan: false,
      vegetarian: false,
      glutenFree: false,
    };
  },
  components: {
    RecipePreviewList,
    BModal,
  },
  methods: {
    showModal() {
      this.$root.$emit("bv::show::modal", "modal-1", "#btnShow");
    },
    handleHide(evt) {
      if (!this.$refs.form.checkValidity()) {
        evt.preventDefault();
        evt.stopPropagation();
        alert("Please fill in all required fields");
      }
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

.checkbox-container{
  display: flex;
  justify-content: space-around;
}
</style>
