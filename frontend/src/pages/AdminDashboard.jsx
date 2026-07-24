import { useEffect, useState } from "react";
import API from "../api/axios";

const AdminDashboard = () => {

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {

  try {

    const token = localStorage.getItem("token");


    const statsResponse = await API.get(
      "/admin/stats",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );


    const ordersResponse = await API.get(
      "/admin/recent-orders",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );



    setDashboard({

      ...statsResponse.data.stats,

      recentOrders: ordersResponse.data.orders

    });



  } catch(error){

    console.log(error);


    alert(
      error.response?.data?.message ||
      "Failed to load dashboard"
    );


  } finally {

    setLoading(false);

  }

};

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {

    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading Dashboard...
      </div>
    );

  }
  if(!dashboard){
 return null;
}

  const cards = [
    {
      title: "Total Products",
      value: dashboard.totalProducts,
      color: "bg-blue-500",
    },
    {
      title: "Total Users",
      value: dashboard.totalUsers,
      color: "bg-green-500",
    },
    {
      title: "Total Orders",
      value: dashboard.totalOrders,
      color: "bg-purple-500",
    },
    {
      title: "Revenue",
      value: `₹${dashboard.totalRevenue.toLocaleString()}`,
      color: "bg-orange-500",
    },
  ];

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Admin Dashboard
        </h1>

        {/* Stats Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {
            cards.map((card) => (

              <div
                key={card.title}
                className={`${card.color} text-white rounded-2xl shadow-lg p-6`}
              >

                <h2 className="text-lg font-medium">
                  {card.title}
                </h2>

                <p className="text-4xl font-bold mt-4">
                  {card.value}
                </p>

              </div>

            ))
          }

        </div>

        {/* Recent Orders */}

        <div className="bg-white rounded-2xl shadow-lg mt-10 p-6">

          <h2 className="text-2xl font-bold mb-6">
            Recent Orders
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-3">Customer</th>

                  <th className="text-left py-3">Amount</th>

                  <th className="text-left py-3">Status</th>

                  <th className="text-left py-3">Date</th>

                </tr>

              </thead>

              <tbody>

                {
                  dashboard.recentOrders.map((order) => (

                    <tr
                      key={order._id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="py-4">
                        {order.user?.name}
                      </td>

                      <td>
                        ₹{order.totalAmount.toLocaleString()}
                      </td>

                      <td>

                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                          {order.orderStatus}

                        </span>

                      </td>

                      <td>

                        {new Date(order.createdAt).toLocaleDateString()}

                      </td>

                    </tr>

                  ))
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

};

export default AdminDashboard;