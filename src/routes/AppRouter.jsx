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

const AppRouter = () => {
  return (
    <Routes>
      {/* 🔓 Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/login2" element={<Login_2 />} />
      <Route path="/register" element={<Register />} />
      <Route path="/choose-role" element={<ChooseRole />} />

      {/* 🔒 Protected routes inside Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/chef" element={<Chef />} />
        <Route path="/user-profile" element={<UserProfile />} /> 
        <Route path="/chef" element={<Chef />} /> 
        <Route path="/chef/:id" element={<ChefProfile />} />
        <Route path="/add-chef" element={<AddChef />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/add-store" element={<Add_Store />} />
        <Route path="/chefneed" element={<NeedChef />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
