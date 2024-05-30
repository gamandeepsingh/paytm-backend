import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const getUsers = async () => {
            try {
                setUsers([])
                const response = await axios.get(`http://localhost:5000/user/find?filter=${search}`)
                setUsers(response.data.user)
                // console.log(response.data.user);
            } catch (error) {
                console.log(error);
            }
        }
        const timeout = setTimeout(() => {
            getUsers()
        }, 200)

        return () => clearTimeout(timeout)
    }, [search])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users && users.length > 0 && users.map((user,ind) => <User user={user} key={ind}/>)}
        </div>
    </>
}

function User({ user }) {
    const navigate = useNavigate()
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.first_name[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.first_name} {user.last_name}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button
            onClick={()=>
                navigate(`/send?id=${user._id}&name=${user.first_name}`)
            }
            label={"Send Money"} />
        </div>
    </div>
}

export default Users