import { createBrowserRouter } from "react-router";
import Root from "../Root-Layout/Root";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Home from "../Pages/Home/Home";
import MyImports from "../Pages/MyImports/MyImports";
import MyExport from "../Pages/MyExport/MyExport";
import ExportProucts from "../Pages/ExportProduct/ExportProucts";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRout from "../Provider/PrivateRout";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import NotFound from "../Pages/NotFound/NotFound";
import Dashboard from "../Root-Layout/dashboard/Dashboard";
import DashboardHome from "../Pages/DashboardHome/DashboardHome";
import MyProfile from "../Pages/MyProfile/MyProfile";
import AboutUs from "../Pages/AboutUs/AboutUs";
import InboxPage from "../Pages/Inbox/InboxPage";
import Contact from "../Pages/Contact/Contact";
import Jobs from "../Pages/Jobs/Jobs";
import PressKit from "../Pages/PressKit/PressKit";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/allProducts',
                element: <AllProducts></AllProducts>
            },
            {
                path: '/aboutUs',
                element: <AboutUs></AboutUs>
            },
            {
                path: '/notifications',
                element: <PrivateRout><InboxPage></InboxPage></PrivateRout>
            },
            {
                path: '/jobs',
                element: <Jobs></Jobs>
            },
            {
                path: '/pressKit',
                element: <PressKit></PressKit>
            },
            {
                path: '/contactUs',
                element: <Contact></Contact>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/productDetails/:id',
                element: <ProductDetails></ProductDetails>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRout><Dashboard></Dashboard></PrivateRout>,
        children: [
            {
                element: <PrivateRout><DashboardHome></DashboardHome></PrivateRout>,
                index: true
            },
            {
                path: 'exportProducts',
                element: <PrivateRout><ExportProucts></ExportProucts></PrivateRout>
            },
            {
                path: 'myExports',
                element: <PrivateRout><MyExport></MyExport></PrivateRout>
            },
            {
                path: 'myImports',
                element: <PrivateRout><MyImports></MyImports></PrivateRout>
            },
            {
                path: 'myProfile',
                element: <PrivateRout><MyProfile></MyProfile></PrivateRout>
            }
        ]
    },
    {
        path: '*',
        element: <NotFound></NotFound>
    }
])

export default router;