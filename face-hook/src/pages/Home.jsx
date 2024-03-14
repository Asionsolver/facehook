import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export default function Home() {
  const {auth} = useAuth();
  console.log(auth)
  return (
    <div>
    
      <p>Home</p>
      <Link to='./profile'>Go to Profile Page</Link>
    </div>
  )
}
