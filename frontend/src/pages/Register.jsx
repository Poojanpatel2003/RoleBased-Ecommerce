import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {


  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const navigate = useNavigate();



  const handleRegister = async(e)=>{

    e.preventDefault();


    if(password !== confirmPassword){

      alert("Password does not match");
      return;

    }


    try{


      const {data} = await API.post("/auth/register",{

        name,
        email,
        password

      });



      alert("Registration Successful");

      navigate("/login");



    }catch(error){


      console.log(error);


      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );


    }


  };




  return (


    <div className="
    min-h-screen
    flex
    items-center
    justify-center
    bg-gray-100
    px-4
    ">



      <form

      onSubmit={handleRegister}

      className="
      bg-white
      w-full
      max-w-md
      p-8
      rounded-2xl
      shadow-xl
      "

      >



        <h1 className="
        text-3xl
        font-bold
        text-center
        mb-6
        ">
          Create Account
        </h1>




        <input

        type="text"

        placeholder="Full Name"

        value={name}

        onChange={(e)=>setName(e.target.value)}

        className="
        border
        w-full
        p-3
        rounded-xl
        mb-4
        "

        />




        <input

        type="email"

        placeholder="Email"

        value={email}

        onChange={(e)=>setEmail(e.target.value)}

        className="
        border
        w-full
        p-3
        rounded-xl
        mb-4
        "

        />





        <input

        type="password"

        placeholder="Password"

        value={password}

        onChange={(e)=>setPassword(e.target.value)}

        className="
        border
        w-full
        p-3
        rounded-xl
        mb-4
        "

        />





        <input

        type="password"

        placeholder="Confirm Password"

        value={confirmPassword}

        onChange={(e)=>setConfirmPassword(e.target.value)}

        className="
        border
        w-full
        p-3
        rounded-xl
        mb-6
        "

        />





        <button

        className="
        bg-blue-600
        text-white
        w-full
        py-3
        rounded-xl
        hover:bg-blue-700
        transition
        "

        >

          Register

        </button>





        <p className="
        text-center
        mt-5
        text-gray-600
        ">

          Already have account?

          <Link
          to="/login"
          className="
          text-blue-600
          ml-2
          font-semibold
          "
          >
            Login
          </Link>


        </p>




      </form>



    </div>


  )

}


export default Register;