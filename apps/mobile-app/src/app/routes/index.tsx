import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../../pages/home';
import Login from '../../pages/login';
import CarHistory from '../../pages/car-history';
import { routes } from './routes';
import Layout from '../layout';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.root} element={<Navigate replace to={routes.login} />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.main.root} element={<Layout />}>
          <Route path={routes.main.home} element={<Home />} />
          <Route path={routes.main.history} element={<CarHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
