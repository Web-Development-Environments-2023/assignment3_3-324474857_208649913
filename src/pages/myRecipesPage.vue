<template>
  <div>
    <h2 id="title" class="text-center mt-5 mb-5">My recipes</h2>
    <div class="main_container">
      <b-button v-b-modal.modal-prevent-closing @click="showModal"
        >Open Modal</b-button
      >
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Submit Your Recipe"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Title"
            label-for="title-input"
            invalid-feedback="Title is required"
            :state="titleState"
          >
            <b-form-input
              id="title-input"
              v-model="title"
              :state="titleState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Image"
            label-for="image-input"
            invalid-feedback="Image is required"
            :state="imageState"
          >
            <b-form-input
              id="image-input"
              v-model="image"
              :state="imageState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Ready in minutes"
            label-for="readyInMinutes-input"
            invalid-feedback="Ready in minutes is required"
            :state="readyInMinutesState"
          >
            <b-form-input
              id="readyInMinutes-input"
              v-model="readyInMinutes"
              :state="readyInMinutesState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Servings"
            label-for="servings-input"
            invalid-feedback="Servings is required"
            :state="servingsState"
          >
            <b-form-input
              id="servings-input"
              v-model="servings"
              :state="servingsState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Ingredients"
            label-for="ingredients-input"
            invalid-feedback="ingredients is required"
            :state="ingredientsState"
          >
            <b-form-input
              id="ingredients-input"
              v-model="ingredients"
              :state="ingredientsState"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Instructions"
            label-for="instructions-input"
            invalid-feedback="Instructions is required"
            :state="instructionsState"
          >
            <b-form-input
              id="instructions-input"
              v-model="instructions"
              :state="instructionsState"
              required
            ></b-form-input>
          </b-form-group>
          <div class="checkbox_gorup">
            <b-form-checkbox id="vegetarian-input" v-model="vegetarian" required
              >Vegetarian</b-form-checkbox
            >
            <b-form-checkbox id="vegan-input" v-model="vegan" required
              >Vegan</b-form-checkbox
            >
            <b-form-checkbox id="glutenFree-input" v-model="glutenFree" required
              >Gluten free</b-form-checkbox
            >
          </div>
        </form>
      </b-modal>
      <div :key="render">
        <RecipePreviewList
          title="My Recipes"
          server_url="/users/my-recipes"
          class="my recipes center"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { BModal } from "bootstrap-vue";
import RecipePreviewList from "../components/RecipePreviewList.vue";

export default {
  data() {
    return {
      render: 0,
      title: "",
      image: "",
      readyInMinutes: "",
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      servings: "",
      ingredients: "",
      instructions: "",
      titleState: null,
      imageState: null,
      readyInMinutesState: null,
      servingsState: null,
      instructionsState: null,
      ingredientsState: null,
    };
  },
  methods: {
    reRender() {
      this.render += 1;
    },
    showModal() {
      this.$root.$emit("bv::show::modal", "modal-prevent-closing");
    },

    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.titleState = valid;
      this.imageState = valid;
      this.readyInMinutesState = valid;
      this.servingsState = valid;
      this.ingredientsState = valid;
      this.instructionsState = valid;
      return valid;
    },
    resetModal() {
      this.title = "";
      this.image = "";
      this.readyInMinutes = "";
      this.vegetarian = false;
      this.vegan = false;
      this.glutenFree = false;
      this.servings = "";
      this.ingredients = "";
      this.instructions = "";
      this.titleState = null;
      this.imageState = null;
      this.readyInMinutesState = null;
      this.servingsState = null;
      this.ingredientsState = null;
      this.instructionsState = null;
    },
    async handleSubmit() {
      if (!this.checkFormValidity()) {
        return false;
      }
      try {
        const response = await this.axios.post(
          this.$root.store.server_domain + "/users/my-recipes",
          {
            title: this.title,
            image: this.image,
            readyInMinutes: this.readyInMinutes,
            vegetarian: this.vegetarian,
            vegan: this.vegan,
            glutenFree: this.glutenFree,
            servings: this.servings,
            ingredients: this.ingredients,
            instructions: this.instructions,
          },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
      }
      return true;
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();

      // Trigger submit handler
      const res = this.handleSubmit();
      if (!res) {
        return;
      }
      alert("good");
      // Wait for the modal to be hidden
      this.$nextTick(() => {
        // Hide the modal manually
        this.$refs.modal.hide();
      });
      reRender();
    },
  },
  components: {
    BModal,
    RecipePreviewList,
  },
};
</script>

<style scoped>
.main_container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.checkbox_gorup {
  display: flex;
  justify-content: space-around;
}

#title {
  color: rgb(91, 184, 91);
  font-size: 35px;
}
</style>
