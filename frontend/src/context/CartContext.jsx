import { createContext, useState, useEffect } from "react";


export const CartContext = createContext();



const CartProvider = ({children}) => {


  const [cartItems, setCartItems] = useState(() => {
  const savedCart = localStorage.getItem("cart");

  return savedCart ? JSON.parse(savedCart) : [];
});



  // ADD TO CART

  const addToCart = (product) => {


    const existing = cartItems.find(
      item => item._id === product._id
    );


    if(existing){

      setCartItems(
        cartItems.map(item =>
          item._id === product._id
          ?
          {
            ...item,
            quantity:item.quantity + 1
          }
          :
          item
        )
      );

    }
    else{

      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity:1
        }
      ]);

    }


  };




  // REMOVE FROM CART

  const removeFromCart = (id)=>{


    setCartItems(
      cartItems.filter(
        item => item._id !== id
      )
    );


  };




  // UPDATE QUANTITY

  const updateQuantity = (id,type)=>{


    setCartItems(

      cartItems.map(item=>{


        if(item._id === id){


          let qty = item.quantity;


          if(type==="inc"){
            qty++;
          }


          if(type==="dec" && qty>1){
            qty--;
          }


          return {
            ...item,
            quantity:qty
          };


        }


        return item;


      })

    );


  };




  // TOTAL PRICE

  const totalPrice = cartItems.reduce(

    (total,item)=>
      total + item.price * item.quantity

    ,0

  );
  useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}, [cartItems]);

const clearCart = () => {
  setCartItems([]);
};



return (

<CartContext.Provider

value={{

cartItems,
addToCart,
removeFromCart,
updateQuantity,
totalPrice,
clearCart,

}}

>

{children}

</CartContext.Provider>


)


}



export default CartProvider;