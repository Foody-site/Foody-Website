import { Route, Routes } from "react-router";
import Home from "../pages/home/Home";
import Layout from "../components/layout/Layout";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import AddChef from "../pages/Add_chef/AddChef";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path='/AddChef' element={<AddChef/>} />

    </Routes>
  );
};

export default AppRouter;
