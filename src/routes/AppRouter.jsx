import { Route, Routes } from "react-router";
import Home from "../pages/home/Home";
import Layout from "../components/layout/Layout";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import AddChef from "../pages/Add_chef/AddChef";
import ChooseRole from "../components/Auth/ChooseRole";
import Login_2 from "../components/Auth/Login_2";
import AddRecipe from "../pages/Add_Recipe/AddRecipe";
import Add_Store from "../pages/Add_Store/Add_Store";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/login2" element={<Login_2 />} />
      <Route path="/register" element={<Register />} />
      <Route path="/choose-role" element={<ChooseRole />} />
      <Route path="/add-chef" element={<AddChef />} />
      <Route path="/add-recipe" element={<AddRecipe />} />
      <Route path="/add-store" element={<Add_Store />} />
    </Routes>
  );
};

export default AppRouter;