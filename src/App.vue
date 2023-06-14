<template>
  <div id="app">
    <div id="nav">
      <router-link class="nav_btn" :to="{ name: 'main' }">Main</router-link>
      <router-link class="nav_btn" :to="{ name: 'search' }">Search</router-link>
      <span v-if="!$root.store.username">
        Hello guest
        <router-link class="nav_btn" :to="{ name: 'register' }">Register</router-link>
        <router-link class="nav_btn" :to="{ name: 'login' }">Login</router-link>
      </span>
      <span v-else>
        <select v-model="selectedOption" @change="navigateToOption">
          <option value="option1">My favorite recipes</option>
          <option value="option2">My recipes</option>
          <option value="option3">My family recipes</option>
        </select>
        {{ $root.store.username }}: <button @click="logout">Logout</button>
      </span>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      selectedOption: "select"
    };
  },
  methods: {
    navigateToOption() {
      if (this.selectedOption === "option1") {
        this.$router.push({ name: "myFavoriteRecipes" });
      } else if (this.selectedOption === "option2") {
        this.$router.push({ name: "myRecipes" });
      } else if (this.selectedOption === "option3") {
        this.$router.push({ name: "myFamilyRecipes" });
      }
    },
    logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#nav {
  padding: 30px;
  width: 100%;
  background-color: lightblue;
  display: flex;
  justify-content: center;
  text-align: center;
  align-content: center;
  align-items: center;
}

.nav_btn{
  margin-left: 10px;
  margin-right: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
