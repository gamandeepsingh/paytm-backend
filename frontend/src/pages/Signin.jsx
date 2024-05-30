import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import axios from "axios";
const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error,setError] = useState(false);
  const navigate = useNavigate();

  function changesHandler(e){
    const {name,value }= e.target;
    setFormData({
      ...formData,
      [name]:value
    })
    // console.log(formData); 
  }
  async function sendUserToSignin(){
    console.log("start");
    try {
    const response = await axios.post("http://localhost:5000/user/signin",{
      email:formData.email,
      password:formData.password
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
   )
    console.log(response);
    localStorage.setItem("token",response.data.token);
    navigate("/dashboard")

    } catch (error) {
      setError(true);
    }
  }
  if(error){
    return (
      <Heading label={"Invalid Request: 404 Not Found"}/>
    )
  }

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox change={changesHandler} name={"email"} value={formData.email} placeholder="gaman@gmail.com" label={"Email"} />
        <InputBox change={changesHandler} name={"password"} value={formData.password} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={sendUserToSignin} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}

export default Signin