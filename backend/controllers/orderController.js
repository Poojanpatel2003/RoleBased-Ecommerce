const Order = require("../models/Order");
const Product = require("../models/Product");

// ================= CREATE ORDER =================

const createOrder = async (req, res) => {

  try {

    const {
      items
    } = req.body;

    if (!items || items.length === 0) {

      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      });

    }


    const orderItems = [];

    for (const item of items) {

      const product = await Product.findById(item.product);

      if (!product) {

        return res.status(404).json({
          success: false,
          message: "Product not found",
        });

      }

      orderItems.push({

        product: product._id,
        name: product.name,
        image: product.image,
        quantity: item.quantity,
        price: product.price,

      });

    }


    // ================= CALCULATE TOTAL =================

    const calculatedTotal = orderItems.reduce(

      (total, item) => total + (item.price * item.quantity),

      0

    );


    // ================= CREATE ORDER =================

    const order = await Order.create({

      user: req.user._id,

      items: orderItems,

      totalAmount: calculatedTotal,

    });


    return res.status(201).json({

      success: true,

      message: "Order Created Successfully",

      order

    });


  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// ================= GET MY ORDERS =================

const getMyOrders = async (req, res) => {

  try {

    const orders = await Order.find({

      user: req.user._id

    })
      .populate("items.product")
      .sort({
        createdAt: -1
      });


    return res.status(200).json({

      success: true,

      orders

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


module.exports = {
  createOrder,
  getMyOrders
};