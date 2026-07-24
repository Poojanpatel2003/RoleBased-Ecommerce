import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";


const Home = () => {

  const [products,setProducts] = useState([]);

  const [keyword,setKeyword] = useState("");
  const [category,setCategory] = useState("");
  const [minPrice,setMinPrice] = useState("");
  const [maxPrice,setMaxPrice] = useState("");
const [loading,setLoading] = useState(true);


  const fetchProducts = async () => {

 try {

 setLoading(true);

 const {data} = await API.get("/products",{
 params:{
 keyword,
 category,
 minPrice,
 maxPrice
 }
 });

 setProducts(data.products);


 } catch(error){

 console.log(error);

 } finally {

 setLoading(false);

 }

};



  useEffect(()=>{
    fetchProducts();
  },[]);



  return (

    <div className="bg-gray-50 min-h-screen">


      {/* HERO SECTION */}

      <section
      className="
      bg-gradient-to-r
      from-blue-600
      to-purple-600
      text-white
      px-8
      py-20
      "
      >

        <div className="
        max-w-6xl
        mx-auto
        "
        >

          <h1 className="
          text-5xl
          font-extrabold
          mb-5
          "
          >
            Shop Smart With LumosShop
          </h1>


          <p className="
          text-lg
          opacity-90
          max-w-xl
          "
          >
            Discover premium products with secure payments
            and fast delivery.
          </p>


          <button
          className="
          mt-8
          bg-white
          text-blue-600
          px-8
          py-3
          rounded-full
          font-semibold
          hover:scale-105
          transition
          "
          >
            Explore Products
          </button>


        </div>


      </section>




      {/* PRODUCTS SECTION */}

      <section className="
      max-w-7xl
      mx-auto
      px-8
      py-12
      ">


        <h2 className="
        text-3xl
        font-bold
        mb-8
        "
        >
          Featured Products
        </h2>



        {/* FILTER BOX */}

        <div className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        mb-10
        flex
        flex-wrap
        gap-4
        "
        >


          <input
          placeholder="Search products"
          value={keyword}
          onChange={(e)=>setKeyword(e.target.value)}
          className="
          border
          rounded-xl
          px-4
          py-3
          flex-1
          "
          />



          <input
          placeholder="Category"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          className="
          border
          rounded-xl
          px-4
          py-3
          "
          />



          <input
          placeholder="Min price"
          value={minPrice}
          onChange={(e)=>setMinPrice(e.target.value)}
          className="
          border
          rounded-xl
          px-4
          py-3
          "
          />



          <input
          placeholder="Max price"
          value={maxPrice}
          onChange={(e)=>setMaxPrice(e.target.value)}
          className="
          border
          rounded-xl
          px-4
          py-3
          "
          />



          <button
          onClick={fetchProducts}
          className="
          bg-blue-600
          text-white
          px-8
          rounded-xl
          "
          >
            Search
          </button>


        </div>




        {/* PRODUCT GRID */}

        <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-8
        "
        >


        {
 loading ?

 (
  <p className="text-center col-span-4">
    Loading products...
  </p>
 )

 :

 products.length === 0 ?

 (
  <p className="text-center col-span-4 text-gray-500">
    No products found
  </p>
 )

 :

 products.map(product=>(
   <ProductCard
    key={product._id}
    product={product}
   />
 ))

}


        </div>


      </section>


    </div>

  )

}


export default Home;