import axios from "axios";
import { useEffect, useState } from "react"

const Balance = ({ value }) => {
    const [balance, setBalance] = useState(null)
    
    useEffect(() => { 
        async function fetchBalance() {
            try {
                const response = await axios.get("http://localhost:5000/account/balance",     
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                // console.log(response.data.balance.balance);
                setBalance(response.data.balance.balance)
            } catch (error) {
                console.log(error);
            }
        }
        fetchBalance()
    }, [])

    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance &&  balance.toFixed(2)}
        </div>
    </div>
}

export default Balance