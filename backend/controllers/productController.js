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


module.exports = {
  createProduct,
};