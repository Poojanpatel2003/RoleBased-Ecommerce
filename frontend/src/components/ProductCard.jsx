import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
const { addToCart } = useContext(CartContext);
const { toggleWishlist, isWishlist } = useContext(WishlistContext);
  return (

    <div
      className="
      bg-white
      rounded-3xl
      overflow-hidden
      shadow-md
      hover:shadow-2xl
      transition-all
      duration-300
      group
      "
    >


      {/* Image */}

      <div
      className="
      relative
      overflow-hidden
      "
      >

        <img

        src={product.image}

        alt={product.name}

        className="
        w-full
        h-64
        object-cover
        group-hover:scale-110
        transition
        duration-500
        "

        />



        <button

onClick={()=>toggleWishlist(product)}

className="
absolute
top-4
right-4
bg-white
p-3
rounded-full
shadow
hover:text-red-500
transition
"

>

<FaHeart

className={
isWishlist(product._id)
?
"text-red-500"
:
"text-gray-400"
}

/>

</button>




        <span

        className={`
        absolute
        bottom-4
        left-4
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        ${
          product.stock > 0
          ?
          "bg-green-100 text-green-700"
          :
          "bg-red-100 text-red-700"
        }
        `}

        >

          {
            product.stock > 0
            ?
            `${product.stock} Available`
            :
            "Out of Stock"
          }

        </span>


      </div>





      {/* Content */}


      <div className="p-5">



        <div
        className="
        flex
        justify-between
        gap-3
        "
        >


          <h2
          className="
          text-xl
          font-bold
          text-gray-800
          "
          >

            {product.name}

          </h2>



          <span

          className="
          text-xs
          h-fit
          bg-blue-100
          text-blue-600
          px-3
          py-1
          rounded-full
          "

          >

            {product.category}

          </span>


        </div>





        <p

        className="
        text-gray-500
        text-sm
        mt-3
        line-clamp-2
        "

        >

          {product.description}

        </p>






        <div
        className="
        flex
        justify-between
        items-center
        mt-5
        "
        >



          <h3

          className="
          text-2xl
          font-bold
          text-gray-900
          "

          >

            ₹{product.price.toLocaleString()}

          </h3>





         <button

onClick={()=>addToCart(product)}

disabled={product.stock===0}

className="
flex
items-center
gap-2
bg-black
text-white
px-4
py-2
rounded-xl
hover:bg-gray-800
disabled:bg-gray-400
"

>

            <FaShoppingCart/>

            Add


          </button>



        </div>





        <Link

        to={`/product/${product._id}`}

        className="
        mt-4
        flex
        justify-center
        items-center
        gap-2
        border
        border-gray-300
        py-2
        rounded-xl
        hover:bg-gray-100
        transition
        "

        >

          <FaEye/>

          View Details

        </Link>




      </div>



    </div>

  )

}


export default ProductCard;