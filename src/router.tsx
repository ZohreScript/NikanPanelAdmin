// src/router.tsx
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import MainLayout from './Layout/MainLayout/MainLayout';
import IdentityLayout from './Layout/identity-layout';
import Login from './features/Identity/login/login';
import NotFound from './features/NotFound';
import CardexRegister from './features/Cardex/CardexRegister';
import SettingEhzarRfid from './features/Setting/SettingEhzarRfid';
import SettingEhzarWards from './features/Setting/SettingEhzarWards';
import Dastband from './features/Setting/Dastband';
import FractureType from './features/Setting/FractureType';
import SafeLevel from './features/Setting/SafeLevel';
import MovementStatus from './features/Setting/MovementStatus';
import Name from './features/Setting/Name';
import DashboardEhzar from './features/Dashboard/DashboardEhzar';
import DashboardCardex from './features/Dashboard/DashboardCardex';
import CodeReports from './features/Reports/CodeReports';
import EhzarFailure from './features/Reports/EhzarFailure';
import EhzarReports from './features/Reports/EhzarReports';
import AccessRegister from './features/Access/AccessRegister';
import AccessAuthorizeDevice from './features/Access/AccessAuthorizeDevice';
import AccessRoll from './features/Access/AccessRoll';
import AccessPermission from './features/Access/AccessPermission';
import Dashboard from './features/Dashboard/Dashboard';
import Ehzar from './features/EhzarNurse/Ehzar';

// Type definition for menu items
interface MenuItem {
  url: string;
  subMenus?: MenuItem[];
}

// Map API menu names to React components
const componentMapping: Record<string, JSX.Element> = {
  '': <Dashboard />,
  'ehzar': <Ehzar />,
  'cardex/register': <CardexRegister />,
  'setting/ehzar/rfid': <SettingEhzarRfid />,
  'setting/ehzar/wards': <SettingEhzarWards />,
  'setting/cardex/wards': <Dastband />,
  'setting/cardex/fracture_type': <FractureType />,
  'setting/cardex/safeLevel': <SafeLevel />,
  'setting/cardex/movementStatus': <MovementStatus />,
  'setting/cardex/name': <Name />,
  'dashbord/ehzar': <DashboardEhzar />,
  'dashbord/cardex': <DashboardCardex />,
  'code/reports': <CodeReports />,
  'ehzar/reports': <EhzarReports />,
  'ehzar/failure': <EhzarFailure />,
  'access/register': <AccessRegister />,
  'access/authorizDevice': <AccessAuthorizeDevice />,
  'access/Roll': <AccessRoll />,
  'access/Permission': <AccessPermission />,
};

// Function to create routes from menu items
const createRoutesFromMenu = (menuItems: MenuItem[]): RouteObject[] => {
  return (
    menuItems?.map((item) => {
      const parentPath = item.url?.replace(/^\//, '');

      if (item.subMenus && item.subMenus.length > 0) {
        return {
          path: parentPath,
          children: item.subMenus.map((subMenu) => {
            const subMenuPath = subMenu.url?.replace(/^\//, '');
            return {
              path: subMenuPath,
              element: componentMapping[subMenuPath] || <NotFound />,
              key: Math.random().toString(), // Ensure uniqueness using random key
            };
          }),
          key: Math.random().toString(), // Ensure parent route has a unique key
        };
      } else {
        return {
          path: parentPath,
          element: componentMapping[parentPath] || <NotFound />,
          key: Math.random().toString(), // Ensure unique key for items without submenus
        };
      }
    }) || []
  );
};

// Router setup function
const router = (menuItems: MenuItem[]) =>
  createBrowserRouter([
    {
      path: '/',
      element: <IdentityLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" replace /> },
        { path: 'login', element: <Login /> },
      ],
    },
    {
      element: <MainLayout />,
      children: [
        { path: '/dashboard', element: <Dashboard /> },
        ...createRoutesFromMenu(menuItems),
        { path: '*', element: <NotFound /> }, // Catch-all for undefined routes
      ],
    },
  ]);

export default router;
