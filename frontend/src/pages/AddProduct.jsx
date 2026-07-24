import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";


const AddProduct = () => {


  const [form, setForm] = useState({

    name:"",
    description:"",
    price:"",
    category:"",
    stock:""

  });


  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();



  const handleChange = (e)=>{

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };



  const handleImageChange = (e)=>{

    const file = e.target.files[0];


    if(file){

      setImage(file);

      setPreview(URL.createObjectURL(file));

    }

  };



  const handleSubmit = async(e)=>{

    e.preventDefault();


    if(!image){

      alert("Please select product image");

      return;

    }


    try{


      setLoading(true);


      const data = new FormData();


      data.append("name",form.name);
      data.append("description",form.description);
      data.append("price",form.price);
      data.append("category",form.category);
      data.append("stock",form.stock);
      data.append("image",image);



      await API.post(
        "/products",
        data,
        {
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }
      );



      alert("Product Added Successfully");


      navigate("/");



    }catch(error){


      console.log(error);


      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );


    }finally{

      setLoading(false);

    }


  };




  return (

    <div
    className="
    min-h-screen
    bg-gray-100
    flex
    justify-center
    items-center
    p-6
    "
    >



      <form

      onSubmit={handleSubmit}

      className="
      bg-white
      w-full
      max-w-xl
      rounded-3xl
      shadow-xl
      p-8
      "

      >



        <h1
        className="
        text-3xl
        font-bold
        text-center
        mb-8
        "
        >

          Add New Product

        </h1>




        <div className="space-y-4">



          <input

          name="name"

          value={form.name}

          onChange={handleChange}

          placeholder="Product Name"

          className="
          w-full
          border
          rounded-xl
          px-4
          py-3
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          "

          />




          <input

          name="category"

          value={form.category}

          onChange={handleChange}

          placeholder="Category"

          className="
          w-full
          border
          rounded-xl
          px-4
          py-3
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          "

          />




          <div className="grid grid-cols-2 gap-4">


            <input

            name="price"

            type="number"

            value={form.price}

            onChange={handleChange}

            placeholder="Price"

            className="
            border
            rounded-xl
            px-4
            py-3
            "

            />



            <input

            name="stock"

            type="number"

            value={form.stock}

            onChange={handleChange}

            placeholder="Stock"

            className="
            border
            rounded-xl
            px-4
            py-3
            "

            />


          </div>





          <textarea


          name="description"

          value={form.description}

          onChange={handleChange}

          placeholder="Product Description"

          rows="4"

          className="
          w-full
          border
          rounded-xl
          px-4
          py-3
          "

          />






          <div>


            <label
            className="
            block
            font-medium
            mb-2
            "
            >

              Product Image

            </label>



            <input

            type="file"

            accept="image/*"

            onChange={handleImageChange}

            />



          </div>






          {
            preview &&

            <div className="mt-4">

              <p className="font-medium mb-2">
                Preview
              </p>


              <img

              src={preview}

              alt="preview"

              className="
              w-full
              h-56
              object-cover
              rounded-xl
              "

              />

            </div>

          }






          <button

          disabled={loading}

          className="
          w-full
          bg-blue-600
          text-white
          py-3
          rounded-xl
          font-semibold
          hover:bg-blue-700
          disabled:bg-gray-400
          "

          >

            {
              loading
              ?
              "Adding Product..."
              :
              "Add Product"
            }


          </button>



        </div>



      </form>



    </div>

  )

}


export default AddProduct;