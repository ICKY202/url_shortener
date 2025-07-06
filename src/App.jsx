
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/app-layout';
import Landing from './pages/landing';
import Auth from './pages/auth';
import Dashboard from './pages/dashboard';
import Link from './pages/link';
import RedirectLink from './pages/redirect-link';
import UrlProvider from './context';
import RequireAuth from './components/ui/require-auth';


const router = createBrowserRouter([
  {  
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Landing />
      },
      {
        path: '/auth',
        element: <Auth />
      },
      {
        path: '/dashboard',
        element: <RequireAuth><Dashboard /></RequireAuth>
      },
      {
        path: '/link/:id',
        element: <Link />
      },
      {
        path: ':id',
        element: <RedirectLink />
      }
    ]
  }
]);

function App() {

  return (
    <>
      <UrlProvider>
        <RouterProvider router={router} />
      </UrlProvider>
    </>
  )
}

export default App
