import {useState,useContext} from "react";
import API from "../api/axios";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";


const Login =()=>{


const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const {login}=useContext(AuthContext);

const navigate=useNavigate();



const handleLogin=async(e)=>{

e.preventDefault();


try{

const {data}=await API.post("/auth/login",{
email,
password
});


login(data);


navigate("/");


}catch(error){

console.log(error);

alert(
error.response?.data?.message ||
"Login Failed"
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
">


<form
onSubmit={handleLogin}
className="
bg-white
p-8
rounded-2xl
shadow-xl
w-96
"
>


<h1 className="
text-3xl
font-bold
mb-6
text-center
">
Login
</h1>



<input
type="email"
placeholder="Email"
className="
border
w-full
p-3
rounded-xl
mb-4
"
onChange={(e)=>setEmail(e.target.value)}
/>



<input
type="password"
placeholder="Password"
className="
border
w-full
p-3
rounded-xl
mb-6
"
onChange={(e)=>setPassword(e.target.value)}
/>



<button
className="
bg-blue-600
text-white
w-full
py-3
rounded-xl
"
>
Login
</button>


</form>


</div>

)

}


export default Login;