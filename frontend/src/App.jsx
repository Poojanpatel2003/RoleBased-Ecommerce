import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import AdminOrders from "./pages/AdminOrders";
import EditProduct from "./pages/EditProduct";
import AdminProducts from "./pages/AdminProducts";
import MyOrders from "./pages/MyOrders";
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
<Route
  path="/my-orders"
  element={
    <ProtectedRoute>
      <MyOrders />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute roles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
 path="/admin/orders"
 element={
  <ProtectedRoute roles={["admin"]}>
    <AdminOrders/>
  </ProtectedRoute>
 }
/>
<Route 
path="/admin/products"
element={<AdminProducts/>}
/>
<Route
  path="/admin/products/edit/:id"
  element={<EditProduct />}
/>
      </Routes>


    </BrowserRouter>

  )

}


export default App;