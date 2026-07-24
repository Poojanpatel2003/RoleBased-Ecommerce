import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";


const AdminProducts = () => {


  const [products,setProducts] = useState([]);

  const [loading,setLoading] = useState(true);


  const navigate = useNavigate();




  const fetchProducts = async()=>{


    try{


      const token = localStorage.getItem("token");


      const {data} = await API.get(

        "/products",

        {
          headers:{
            Authorization:
            `Bearer ${token}`
          }
        }

      );


      setProducts(data.products);



    }
    catch(error){


      console.log(error);


      alert(
        error.response?.data?.message ||
        "Failed to load products"
      );


    }
    finally{


      setLoading(false);


    }


  };






  const deleteProduct = async(id)=>{


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );


    if(!confirmDelete) return;




    try{


      const token = localStorage.getItem("token");


      await API.delete(

        `/products/${id}`,

        {
          headers:{
            Authorization:
            `Bearer ${token}`
          }
        }

      );



      alert(
        "Product Deleted Successfully"
      );



      fetchProducts();



    }
    catch(error){


      console.log(error);


      alert(
        error.response?.data?.message ||
        "Delete Failed"
      );


    }


  };







  useEffect(()=>{


    fetchProducts();


  },[]);







  if(loading){


    return(

      <div className="
      min-h-screen
      flex
      justify-center
      items-center
      text-xl
      font-semibold
      ">

        Loading Products...

      </div>

    )


  }








return (

<div
className="
min-h-screen
bg-gray-100
py-10
px-6
"
>


<div
className="
max-w-7xl
mx-auto
"
>


<div className="
flex
justify-between
items-center
mb-8
">


<h1 className="
text-4xl
font-bold
">

Admin Products

</h1>




<Link

to="/add-product"

className="
flex
items-center
gap-2
bg-blue-600
text-white
px-5
py-3
rounded-xl
hover:bg-blue-700
"

>

<FaPlus/>

Add Product

</Link>



</div>







<div className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
gap-6
">


{

products.map(product=>(


<div

key={product._id}

className="
bg-white
rounded-3xl
shadow-lg
overflow-hidden
"

>



<img

src={product.image}

alt={product.name}

className="
w-full
h-56
object-cover
"

/>





<div className="
p-5
">


<div className="
flex
justify-between
items-start
">


<h2 className="
text-xl
font-bold
">

{product.name}

</h2>



<span className="
bg-blue-100
text-blue-600
px-3
py-1
rounded-full
text-xs
">

{product.category}

</span>


</div>







<p className="
text-gray-500
mt-3
line-clamp-2
">

{product.description}

</p>







<div className="
mt-4
flex
justify-between
items-center
">


<p className="
text-2xl
font-bold
">

₹{product.price.toLocaleString()}

</p>




<p className="
text-green-600
font-semibold
">

Stock: {product.stock}

</p>


</div>







<div className="
mt-5
text-sm
text-gray-500
">

Seller:

<span className="
font-semibold
text-gray-700
ml-1
">

{product.seller?.name}

</span>


</div>








<div className="
flex
gap-3
mt-6
">


<button

onClick={()=>navigate(`/admin/products/edit/${product._id}`)}

className="
flex-1
flex
justify-center
items-center
gap-2
border
py-2
rounded-xl
hover:bg-gray-100
"

>

<FaEdit/>

Edit

</button>







<button

onClick={()=>deleteProduct(product._id)}

className="
flex-1
flex
justify-center
items-center
gap-2
bg-red-500
text-white
py-2
rounded-xl
hover:bg-red-600
"

>

<FaTrash/>

Delete

</button>




</div>




</div>



</div>


))


}



</div>





</div>


</div>


)


}


export default AdminProducts;