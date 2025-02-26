import { Route, Routes } from 'react-router'
import Home from '../pages/home/Home'
import Layout from '../components/layout/Layout'
import Login from './../components/Auth/Login';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
            </Route>
            <Route path='/login' element={<Login/>} />
        </Routes>
    )
}

export default AppRouter