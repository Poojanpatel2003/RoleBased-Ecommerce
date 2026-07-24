const Product = require("../models/Product");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

// ================= CREATE PRODUCT =================

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }


    // ================= CLOUDINARY UPLOAD =================

    const form = new FormData();

    form.append(
      "file",
      fs.createReadStream(req.file.path)
    );

    form.append(
      "upload_preset",
      process.env.CLOUDINARY_UPLOAD_PRESET
    );


    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
      }
    );


    const imageUrl = cloudinaryResponse.data.secure_url;


    // Delete local temp image
    fs.unlinkSync(req.file.path);


    // ================= SAVE PRODUCT =================

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      image: imageUrl,
      seller: req.user._id,
    });


    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product,
    });


  } catch (error) {

    console.log(error.response?.data || error.message);


    // Delete temp image if exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }


    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= GET ALL PRODUCTS =================

// ================= GET ALL PRODUCTS WITH SEARCH/FILTER =================

const getAllProducts = async (req, res) => {
  try {

    const {
      keyword,
      category,
      minPrice,
      maxPrice
    } = req.query;


    let filter = {};


    // Search by name/description
    if (keyword) {
      filter.$or = [
        {
          name: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          description: {
            $regex: keyword,
            $options: "i",
          },
        },
      ];
    }


    // Category filter
    if (category) {
      filter.category = category;
    }


    // Price filter
    if (minPrice || maxPrice) {

      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }


    const products = await Product.find(filter)
      .populate("seller", "name email");


    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });


  } catch(error){

    console.log(error);

    return res.status(500).json({
      success:false,
      message:error.message
    });

  }
};
// ================= GET SINGLE PRODUCT =================

const getSingleProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id)
      .populate("seller", "name email");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }


    return res.status(200).json({
      success: true,
      product,
    });


  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ================= UPDATE PRODUCT =================

const updateProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);


    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }


    // Sales person can update only own product
    if (
      req.user.role === "sales" &&
      product.seller.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can update only your own products",
      });
    }


    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
      },
      {
        new: true,
      }
    );


    return res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product: updatedProduct,
    });


  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ================= DELETE PRODUCT =================

const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);


    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }


    // Sales person can delete only own product
    if (
      req.user.role === "sales" &&
      product.seller.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can delete only your own products",
      });
    }


    await Product.findByIdAndDelete(req.params.id);


    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });


  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
};