import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="Cursos" element={<Home />} />
      </Routes>
    </>
  );
};
