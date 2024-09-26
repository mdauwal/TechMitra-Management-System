import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Layout from './layout/Layout';
import SignUp from './pages/SignUp';
import CreateSchool from './pages/CreateSchool';
import Login from './pages/Login';
import Home from './pages/Home'
import HomeLayout from './layout/HomeLayouts';
import AccountCreated from './Components/AcountCreated';
import CreatingSchool from './Components/CreatingSchool';
import CreateSchoolSuccessFul from './Components/CreatedSchoolSuccessFul'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Outlet /></Layout>,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: 'sign-up',
        element: <SignUp />
      },
      {
        path: 'create-school',
        element: <CreateSchool />
      },
      {
        path: 'creating-school',
        element: <CreatingSchool />
      },
      {
        path: 'school-created',
        element: <CreateSchoolSuccessFul />
      },
      {
        path:'_',
        element: <AccountCreated />
      },
      {
        path: 'home',
        element: <HomeLayout />,
        children: [
          {
            index: true,
            element: <Home />
          },
        ]
      }
    ]
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
