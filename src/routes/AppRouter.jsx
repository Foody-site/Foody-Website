import { Route, Routes } from "react-router";
import Home from "../pages/home/Home";
import Layout from "../components/layout/Layout";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import AddChef from "../pages/Add_chef/AddChef";
import ChooseRole from "../components/Auth/ChooseRole";
import Login_2 from "../components/Auth/Login_2";
import AddRecipe from "../pages/Add_Recipe/AddRecipe";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/login2" element={<Login_2 />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/ChooseRole" element={<ChooseRole />} />
      <Route path="/AddChef" element={<AddChef />} />
      <Route path="/AddRecipe" element={<AddRecipe />} />
    </Routes>
  );
};

export default AppRouter;
