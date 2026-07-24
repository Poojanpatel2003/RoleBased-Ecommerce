import { useEffect, useState } from "react";
import API from "../api/axios";

const MyOrders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const token = localStorage.getItem("token");

      const { data } = await API.get("/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data.orders);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-gray-50 p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          My Orders
        </h1>

        {
          orders.length === 0
          ?
          <p>No Orders Yet</p>
          :
          orders.map(order => (

            <div
              key={order._id}
              className="bg-white rounded-xl shadow p-6 mb-6"
            >

              <div className="flex justify-between mb-4">

                <p>
                  Order ID:
                  <span className="font-semibold">
                    {order._id}
                  </span>
                </p>

                <span className="font-bold text-green-600">
                  {order.orderStatus}
                </span>

              </div>

              {
                order.items.map(item => (

                  <div
                    key={item.product._id}
                    className="flex justify-between py-2 border-b"
                  >

                    <p>{item.product.name}</p>

                    <p>
                      {item.quantity} × ₹{item.price}
                    </p>

                  </div>

                ))
              }

              <div className="text-right mt-4 font-bold text-xl">
                ₹{order.totalAmount}
              </div>

            </div>

          ))
        }

      </div>

    </div>

  );

};

export default MyOrders;