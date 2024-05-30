import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const [error,setError] = useState(false);
  const navigate = useNavigate()

  async function sendUserToSignUp(){
    try {
      const response = await axios.post("http://localhost:5000/user/signup",{
      first_name:formData.firstName,
      last_name:formData.lastName,
      email:formData.email,
      password:formData.password
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log(response);
    localStorage.setItem("token", response.data.token)
    navigate("/dashboard")
    } catch (error) {
      setError(true);
    }

  }

  function changesHandler(e){
    const {name,value }= e.target;
    setFormData({
      ...formData,
      [name]:value
    })
    // console.log(formData); 
  }

  if(error){
    return (
      <Heading label={"Invalid Request: 404 Not Found"}/>
    )
  }

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your credentials to create your account"} />
        <InputBox change={changesHandler} name={"firstName"} value={formData.firstName} placeholder="Gamandeep" label={"First Name"} />
        <InputBox change={changesHandler} name={"lastName"} value={formData.lastName} placeholder="Singh" label={"Last Name"} />
        <InputBox change={changesHandler} name={"email"} value={formData.email} placeholder="gaman@gmail.com" label={"Email"} />
        <InputBox change={changesHandler} name={"password"} value={formData.password} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={sendUserToSignUp} label={"Sign up"} />
        </div>
        <BottomWarning label={"Have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}

export default Signup