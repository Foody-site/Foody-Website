import { Route, Routes } from "react-router";
import Layout from "../components/layout/Layout";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import AddChef from "../pages/Add_chef/AddChef";
import ChooseRole from "../components/Auth/ChooseRole";
import Login_2 from "../components/Auth/Login_2";
import AddRecipe from "../pages/Add_Recipe/AddRecipe";
import Add_Store from "../pages/Add_Store/Add_Store";
import NeedChef from "../pages/Need_Chef/NeedChef";
import Chef from "../pages/Chef/Chef";
import Recipe from "../pages/Recipe/Recipe";
import ChefProfile from "../pages/Chef/ChefProfile";
import List from "../pages/Lists/List";
import Home from "../pages/Home/Home";
import UserProfile from "../components/once/UserProfile";
import ViewStore from "../pages/Lists/StoresTable/ViewStore";
import ViewChef from "../pages/Lists/ChefsTable/ViewChef";
import ViewRecipe from "../pages/Lists/RecipesTable/ViewRecipe";
import EditRecipe from "../pages/Lists/RecipesTable/EditRecipe";
import EditChef from "../pages/Lists/ChefsTable/EditChef";
import EditStore from "../pages/Lists/StoresTable/EditStore";
import RecipeDetails from "../pages/Recipe/RecipeDetails";
import AuthCallback from "../components/Auth/AuthCallback";
import ChooseRoleWithGoogle from "../components/Auth/ChooseRoleWithGoogle";
import StoreProfile from "../pages/Product/StoreProfile";

const AppRouter = () => {
  return (
    <Routes>
      {/* 🔓 Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/login2" element={<Login_2 />} />
      <Route path="/register" element={<Register />} />
      <Route path="/choose-role" element={<ChooseRole />} />
      <Route path="/choose-role-with-google" element={<ChooseRoleWithGoogle />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* 🔒 Protected routes inside Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/chef/view/:id" element={<ViewChef />} />
        <Route path="/store/view/:id" element={<ViewStore />} />
        <Route path="/recipe/view/:id" element={<ViewRecipe />} />
        <Route path="/recipe/edit/:id" element={<EditRecipe />} />
        <Route path="/chef/edit/:id" element={<EditChef />} />
        <Route path="/store/edit/:id" element={<EditStore />} />
        <Route path="/chef" element={<Chef />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/chef" element={<Chef />} />
        <Route path="/user-profile" element={<UserProfile />} /> 
        <Route path="/chef/:id" element={<ChefProfile />} />
        <Route path="/store/:id" element={<StoreProfile />} />
        <Route path="/add-chef" element={<AddChef />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/add-store" element={<Add_Store />} />
        <Route path="/chefneed/:id" element={<NeedChef />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
