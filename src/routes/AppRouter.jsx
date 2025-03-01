import { Route, Routes } from 'react-router'
import Home from '../pages/home/Home'
import Layout from '../components/layout/Layout'
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
            </Route>
            <Route path='/login' element={<Login/>} />
            <Route path='/Register' element={<Register/>} />
        </Routes>
    )
}

export default AppRouter