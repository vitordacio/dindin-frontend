import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import SignIn from "./pages/SignIn/index"
import Main from "./pages/Main/index"
import SignUp from "./pages/SignUp/index"
import { getItem } from './utils/storage'

const ProtectedRoutes = ({ redirectTo }) => {
    const isAuthenticated = getItem('token')

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

const MainRoutes = () => {
    return (
        <Routes>

            <Route path='/'>
                <Route path='/' element={<SignIn />} />
                <Route path='/login' element={<SignIn />} />
            </Route>

            <Route element={<ProtectedRoutes redirectTo={'/'} />}>
                <Route path='/main' element={<Main />} />
            </Route>

            <Route path='/signup' element={<SignUp />} />

        </Routes>
    )
}

export default MainRoutes