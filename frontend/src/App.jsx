import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
const App = () => {


  return (

    <BrowserRouter>

      <Navbar/>


      <Routes>


        <Route
        path="/"
        element={<Home/>}
        />



        <Route
        path="/login"
        element={<Login/>}
        />



        <Route
        path="/register"
        element={<Register/>}
        />



        
        <Route
path="/add-product"
element={
<ProtectedRoute roles={["admin","sales"]}>
<AddProduct/>
</ProtectedRoute>
}
/>

<Route
 path="/product/:id"
 element={<ProductDetails/>}
/>
<Route
path="/cart"
element={<Cart/>}
/>
<Route
path="/wishlist"
element={<Wishlist/>}
/>
      </Routes>


    </BrowserRouter>

  )

}


export default App;