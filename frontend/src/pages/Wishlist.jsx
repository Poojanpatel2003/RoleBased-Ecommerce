import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";


const Wishlist = () => {


  const {
    wishlistItems,
    toggleWishlist
  } = useContext(WishlistContext);



  const {
    addToCart
  } = useContext(CartContext);





  if(wishlistItems.length === 0){

    return (

      <div className="
      min-h-screen
      flex
      justify-center
      items-center
      text-2xl
      font-semibold
      text-gray-500
      ">

        Your Wishlist is Empty ❤️

      </div>

    )

  }





return (

<div className="
min-h-screen
bg-gray-50
py-10
px-6
">


<div className="
max-w-6xl
mx-auto
">


<h1 className="
text-3xl
font-bold
mb-8
">

My Wishlist ❤️

</h1>




<div className="
grid
grid-cols-1
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
gap-8
">


{

wishlistItems.map(product=>(


<div

key={product._id}

className="
bg-white
rounded-2xl
shadow-md
overflow-hidden
p-5
"


>


<img

src={product.image}

alt={product.name}

className="
w-full
h-56
object-cover
rounded-xl
"

/>




<h2 className="
mt-4
text-xl
font-bold
">

{product.name}

</h2>



<p className="
text-gray-500
mt-2
">

₹{product.price.toLocaleString()}

</p>





<div className="
flex
gap-3
mt-5
">


<button

onClick={()=>addToCart(product)}

className="
flex-1
bg-black
text-white
py-2
rounded-xl
flex
justify-center
items-center
gap-2
"

>

<FaShoppingCart/>

Add

</button>




<button

onClick={()=>toggleWishlist(product)}

className="
border
px-4
rounded-xl
text-red-500
"

>

<FaTrash/>

</button>



</div>




</div>


))

}


</div>



</div>


</div>

)


}


export default Wishlist;