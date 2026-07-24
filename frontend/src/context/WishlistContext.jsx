import { createContext, useState } from "react";


export const WishlistContext = createContext();



const WishlistProvider = ({children}) => {


  const [wishlistItems,setWishlistItems] = useState([]);




  // ADD / REMOVE WISHLIST

  const toggleWishlist = (product)=>{


    const exists = wishlistItems.find(
      item => item._id === product._id
    );



    if(exists){


      setWishlistItems(

        wishlistItems.filter(
          item => item._id !== product._id
        )

      );


    }
    else{


      setWishlistItems([

        ...wishlistItems,
        product

      ]);


    }


  };





  // CHECK PRODUCT IN WISHLIST

  const isWishlist = (id)=>{


    return wishlistItems.some(
      item => item._id === id
    );


  };





return (

<WishlistContext.Provider

value={{

wishlistItems,
toggleWishlist,
isWishlist

}}

>

{children}

</WishlistContext.Provider>


)


}



export default WishlistProvider;