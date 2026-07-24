import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaStore } from "react-icons/fa";
import API from "../api/axios";


const ProductDetails = () => {

  const { id } = useParams();

  const [product,setProduct] = useState(null);
  const [loading,setLoading] = useState(true);


  const fetchProduct = async()=>{

    try{

      const {data}=await API.get(`/products/${id}`);

      setProduct(data.product);

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);

    }

  }


  useEffect(()=>{
    fetchProduct();
  },[id]);



  if(loading){

    return(
      <div className="
      min-h-screen
      flex
      justify-center
      items-center
      text-xl
      ">
        Loading...
      </div>
    )

  }



  if(!product){

    return(
      <div className="
      min-h-screen
      flex
      justify-center
      items-center
      text-xl
      ">
        Product Not Found
      </div>
    )

  }



return (

<div className="
min-h-screen
bg-gray-50
py-12
px-6
">


<div className="
max-w-6xl
mx-auto
bg-white
rounded-2xl
shadow-xl
p-8
grid
md:grid-cols-2
gap-10
items-center
">



{/* LEFT IMAGE */}

<div className="
relative
bg-gray-100
rounded-2xl
h-[420px]
flex
justify-center
items-center
">


<button

className="
absolute
top-5
right-5
bg-white
shadow
p-3
rounded-full
hover:text-red-500
transition
"

>

<FaHeart/>

</button>



<img

src={product.image}

alt={product.name}

className="
w-[320px]
h-[320px]
object-contain
hover:scale-105
transition
duration-300
"

/>


</div>






{/* RIGHT DETAILS */}


<div className="
flex
flex-col
justify-center
">



<p className="
text-blue-600
font-semibold
uppercase
text-sm
mb-2
">

{product.category}

</p>





<h1 className="
text-4xl
font-bold
text-gray-900
">

{product.name}

</h1>





<p className="
mt-4
text-gray-600
leading-relaxed
">

{product.description}

</p>






<h2 className="
mt-6
text-3xl
font-bold
text-gray-900
">

₹{product.price.toLocaleString()}

</h2>





<div className="mt-4">


{
product.stock > 0 ?

<p className="
text-green-600
font-semibold
">

✓ In Stock ({product.stock})

</p>

:

<p className="
text-red-500
font-semibold
">

Out of Stock

</p>

}


</div>







<div className="
flex
gap-4
mt-8
">


<button

className="
bg-black
text-white
px-8
py-3
rounded-xl
flex
items-center
gap-3
font-semibold
hover:bg-gray-800
transition
"

>

<FaShoppingCart/>

Add To Cart

</button>





<button

className="
border
px-5
rounded-xl
hover:text-red-500
transition
"

>

<FaHeart/>

</button>



</div>







{/* SELLER */}


<div className="
mt-8
border-t
pt-5
flex
items-center
gap-3
">


<FaStore className="
text-blue-600
text-xl
"/>



<div>

<p className="
text-sm
text-gray-500
">

Sold By

</p>


<p className="
font-semibold
">

{product.seller?.name}

</p>


<p className="
text-sm
text-gray-500
">

{product.seller?.email}

</p>


</div>


</div>





</div>



</div>


</div>

)


}


export default ProductDetails;