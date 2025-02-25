import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../pages/home/Home'
import Layout from '../components/layout/Layout'

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>
    )
}

export default AppRouter