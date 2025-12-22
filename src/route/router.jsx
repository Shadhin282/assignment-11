import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout/MainLayout";
import Home from "../pages/home/Home";
import AllContests from "../pages/allcontest/AllContests";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import NotFound from "../pages/notfound/NotFound";
import ContestDetails from "../pages/ContestDetails/ContestDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layout/dashboarLayout/DashboardLayout";
import { ParticipatedContests } from "../pages/dashboard/user/ParticipatedContests";
import { Profile } from "../pages/dashboard/user/Profile";
import { WinningContests } from "../pages/dashboard/user/WinningContests";
import { Submissions } from "../pages/dashboard/creator/Submissions";
import { MyContests } from "../pages/dashboard/creator/MyContests";
import { AddContest } from "../pages/dashboard/creator/AddContest";
import { ManageContests } from "../pages/dashboard/admin/ManageContests";
import { ManageUsers } from "../pages/dashboard/admin/ManageUsers";
import PaymentSuccess from "../components/features/payment/PaymentSuccess";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/all-contests",
        element: <AllContests></AllContests>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/contest/:id",
        element: <PrivateRoute><ContestDetails></ContestDetails></PrivateRoute>,
      },
      {
        path: '/payment-success',
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [
          {
            path: 'user/participated',
            element: <ParticipatedContests></ParticipatedContests>
          },
          {
            path: 'user/profile',
            element: <Profile></Profile>
          },
          {
            path: 'user/winning',
            element: <WinningContests></WinningContests>
          },
          {
            path: 'admin/contests',
            element: <ManageContests></ManageContests>
          },
          {
            path: 'admin/users',
            element: <ManageUsers></ManageUsers>
          },
          {
            path: 'creator/contests',
            element: <MyContests></MyContests>
          },
          {
            path: 'creator/add',
            element: <AddContest></AddContest>
          },
          {
            path: 'creator/submissions',
            element: <Submissions></Submissions>
          },
          {
            path: 'creator/edit',
            element: <h1>creator/edit</h1>
          }
        ]
      }
    ]
  },
  {
    path: "/*",
    element: <NotFound></NotFound>
  }
]);
