import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/sign-up' element={<SignUp/>} />
                <Route path='/' element={<Navigate to="/"/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes