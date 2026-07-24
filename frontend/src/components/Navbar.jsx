import { Link } from "react-router-dom";
import { 
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaPlus
} from "react-icons/fa";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const Navbar = () => {
    const {user,logout}=useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
const { wishlistItems } = useContext(WishlistContext);

  return (

    <nav className="
    bg-white
    shadow-md
    sticky
    top-0
    z-50
    ">


      <div className="
      max-w-7xl
      mx-auto
      px-6
      py-4
      flex
      justify-between
      items-center
      ">



        {/* LOGO */}

        <Link
        to="/"
        className="
        text-3xl
        font-extrabold
        bg-gradient-to-r
        from-blue-600
        to-purple-600
        bg-clip-text
        text-transparent
        "
        >
          LumosShop
        </Link>




        {/* MENU */}

        <div className="
        flex
        items-center
        gap-6
        ">



          <Link
          to="/"
          className="
          text-gray-700
          hover:text-blue-600
          font-medium
          "
          >
            Home
          </Link>

{
user?.role === "admin" &&

<>

<Link
to="/admin/dashboard"
className="
px-4
py-2
rounded-xl
bg-indigo-600
text-white
hover:bg-indigo-700
transition
"
>
Dashboard
</Link>
<Link to="/admin/products">
Products
</Link>
<Link
to="/admin/orders"
className="
px-4
py-2
rounded-xl
bg-green-600
text-white
hover:bg-green-700
transition
"
>
Manage Orders
</Link>

</>

}




          <Link
          to="/wishlist"
          className="
          relative
          text-gray-700
          hover:text-red-500
          "
          >

            <FaHeart size={22}/>
            <span
className="
absolute
-top-2
-right-2
bg-red-500
text-white
text-xs
w-5
h-5
flex
items-center
justify-center
rounded-full
"
>
{wishlistItems.length}
</span>
          </Link>




          <Link
          to="/cart"
          className="
          relative
          text-gray-700
          hover:text-blue-600
          "
          >

            <FaShoppingCart size={22}/>


            <span
className="
absolute
-top-3
-right-3
bg-red-500
text-white
text-xs
w-5
h-5
flex
items-center
justify-center
rounded-full
"
>
{cartItems.length}
</span>


          </Link>




          {
user ?

(
<div className="flex items-center gap-3">

<span className="font-medium">
{user.name}
</span>


<button
onClick={logout}
className="
bg-red-500
text-white
px-3
py-2
rounded-lg
"
>
Logout
</button>


</div>
)

:

<Link
to="/login"
className="flex items-center gap-2"
>

<FaUserCircle size={25}/>

Login

</Link>

}



        </div>


      </div>


    </nav>

  )

}


export default Navbar;