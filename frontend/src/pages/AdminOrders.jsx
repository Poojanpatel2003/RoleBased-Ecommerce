import { useEffect, useState } from "react";
import API from "../api/axios";


const AdminOrders = () => {


  const [orders,setOrders] = useState([]);
  const [loading,setLoading] = useState(true);



  const fetchOrders = async()=>{

    try{


      const token = localStorage.getItem("token");


const {data} = await API.get(
  "/orders",
  {
    headers:{
      Authorization:`Bearer ${token}`
    }
  }
);


      setOrders(data.orders);


    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);

    }

  };





  const updateStatus = async(id,status)=>{


    try{


      const token = localStorage.getItem("token");


await API.put(
 `/orders/${id}/status`,
 {
   status
 },
 {
   headers:{
     Authorization:`Bearer ${token}`
   }
 }
);


      alert("Order Status Updated");


      fetchOrders();


    }catch(error){

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Update Failed"
      );

    }


  };





  useEffect(()=>{

    fetchOrders();

  },[]);





  if(loading){

    return (

      <div className="
      min-h-screen
      flex
      justify-center
      items-center
      text-xl
      font-semibold
      ">

        Loading Orders...

      </div>

    )

  }





  return (

    <div className="
    min-h-screen
    bg-gray-50
    py-10
    px-6
    ">


      <div className="
      max-w-7xl
      mx-auto
      ">


        <h1 className="
        text-3xl
        font-bold
        mb-8
        ">
          Manage Orders
        </h1>





       <div className="
bg-white
rounded-2xl
shadow
overflow-x-auto
">


          <table className="
          w-full
          ">


            <thead
            className="
            bg-gray-100
            "
            >

              <tr>

                <th className="p-4 text-left">
                  Customer
                </th>


                <th className="p-4 text-left">
                  Products
                </th>


                <th className="p-4 text-left">
                  Amount
                </th>


                <th className="p-4 text-left">
                  Status
                </th>


                <th className="p-4">
                  Date
                </th>


              </tr>

            </thead>





            <tbody>


            {
              orders.map(order=>(


                <tr
                key={order._id}
                className="
                border-t
                "
                >



                  <td className="p-4">

                    <p className="font-semibold">
                      {order.user?.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {order.user?.email}
                    </p>

                  </td>





                  <td className="p-4">

                    {
                      order.items.map(item=>(

                        <p key={item._id}>
                          {item.name} x {item.quantity}
                        </p>

                      ))
                    }

                  </td>





                  <td className="
                  p-4
                  font-bold
                  ">

                    ₹{order.totalAmount.toLocaleString()}

                  </td>






                  <td className="p-4">


                    <select

                    value={order.orderStatus}

                    onChange={(e)=>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }

                    className="
                    border
                    rounded-lg
                    px-3
                    py-2
                    "

                    >

                      <option>
                        Placed
                      </option>


                      <option>
                        Processing
                      </option>


                      <option>
                        Shipped
                      </option>


                      <option>
                        Delivered
                      </option>


                    </select>


                  </td>





                  <td className="p-4 text-sm">

                    {
                      new Date(order.createdAt)
                      .toLocaleDateString()
                    }

                  </td>




                </tr>


              ))
            }


            </tbody>



          </table>


        </div>



      </div>


    </div>

  )

}


export default AdminOrders;