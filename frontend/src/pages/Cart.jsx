import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";


const Cart = () => {


  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalPrice
  } = useContext(CartContext);




  if(cartItems.length === 0){

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

        Your Cart is Empty 🛒

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

          Shopping Cart

        </h1>





        <div className="
        bg-white
        rounded-2xl
        shadow
        p-6
        ">



        {
          cartItems.map(item=>(


            <div

            key={item._id}

            className="
            flex
            items-center
            justify-between
            border-b
            py-5
            "
            >



              {/* IMAGE */}

              <div className="
              flex
              items-center
              gap-5
              ">


                <img

                src={item.image}

                alt={item.name}

                className="
                w-24
                h-24
                object-contain
                bg-gray-100
                rounded-xl
                "

                />


                <div>


                  <h2 className="
                  font-bold
                  text-lg
                  ">

                    {item.name}

                  </h2>


                  <p className="
                  text-gray-500
                  ">

                    ₹{item.price.toLocaleString()}

                  </p>


                </div>


              </div>







              {/* QUANTITY */}

              <div className="
              flex
              items-center
              gap-4
              ">


                <button

                onClick={()=>updateQuantity(item._id,"dec")}

                className="
                border
                p-2
                rounded-lg
                "

                >

                  <FaMinus/>

                </button>



                <span className="
                font-bold
                ">

                  {item.quantity}

                </span>




                <button

                onClick={()=>updateQuantity(item._id,"inc")}

                className="
                border
                p-2
                rounded-lg
                "

                >

                  <FaPlus/>

                </button>



              </div>







              {/* REMOVE */}


              <button

              onClick={()=>removeFromCart(item._id)}

              className="
              text-red-500
              hover:text-red-700
              "

              >

                <FaTrash/>

              </button>




            </div>


          ))

        }



        </div>







        {/* TOTAL */}


        <div className="
        mt-6
        bg-white
        rounded-2xl
        shadow
        p-6
        flex
        justify-between
        items-center
        ">


          <h2 className="
          text-xl
          font-bold
          ">

            Total:

          </h2>



          <h2 className="
          text-3xl
          font-bold
          ">

            ₹{totalPrice.toLocaleString()}

          </h2>



        </div>




      </div>


    </div>

  )

}


export default Cart;