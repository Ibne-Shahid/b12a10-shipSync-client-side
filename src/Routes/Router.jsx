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
                path: '/myImports',
                element: <PrivateRout><MyImports></MyImports></PrivateRout>
            },
            {
                path: '/myExports',
                element: <PrivateRout><MyExport></MyExport></PrivateRout>
            },
            {
                path: '/exportProducts',
                element: <PrivateRout><ExportProucts></ExportProucts></PrivateRout>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    }
])

export default router;