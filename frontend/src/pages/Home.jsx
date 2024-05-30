import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className='flex gap-3 '>
        <Button label={"Sign in"} onClick={()=>navigate("/signin")}/>
        <Button label={"Sign Up"} onClick={()=>navigate("/signup")}/>
        <Button label={"Dashboard"} onClick={()=>navigate("/dashboard")}/>
        {/* <button onClick={()=>navigate("/signup")}>Sign Up</button>
        <button onClick={()=>navigate("/dashboard")}>Dashboard</button> */}
    </div>
  )
}

export default Home