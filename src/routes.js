import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "favoriteRecipes",
    name: "myFavoriteRecipes",
    component: () => import("./pages/myFavoriteRecipes"),
  },
  {
    path: "myRecipes",
    name: "myRecipes",
    component: () => import("./pages/myRecipes"),
  },
  {
    path: "myfamilyRecipes",
    name: "myFamilyRecipes",
    component: () => import("./pages/myFamilyRecipes"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
