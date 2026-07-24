import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

const EditProduct = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
  });

  const fetchProduct = async () => {

    try {

      const { data } = await API.get(`/products/${id}`);

      const product = data.product;

      setForm({
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        stock: product.stock,
      });

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to load product"
      );

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchProduct();

  }, []);




  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };





  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      const token = localStorage.getItem("token");

      await API.put(

        `/products/${id}`,

        form,

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      alert("Product Updated Successfully ✅");

      navigate("/admin/products");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Update Failed"
      );

    } finally {

      setSaving(false);

    }

  };




  if (loading) {

    return (

      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">

        Loading...

      </div>

    );

  }




  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-xl rounded-3xl shadow-xl p-8"
      >

        <h1 className="text-3xl font-bold text-center mb-8">

          Edit Product

        </h1>

        <div className="space-y-4">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border rounded-xl px-4 py-3"
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="border rounded-xl px-4 py-3"
            />

          </div>

          <textarea
            rows="4"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border rounded-xl px-4 py-3"
          />

          <button
            disabled={saving}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-400"
          >

            {
              saving
                ? "Updating..."
                : "Update Product"
            }

          </button>

        </div>

      </form>

    </div>

  );

};

export default EditProduct;