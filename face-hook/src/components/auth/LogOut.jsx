import { useNavigate } from "react-router-dom";
import LogOutIcon from "../../assets/icons/logout.svg";
import useAuth from "../../hooks/useAuth";

export default function LogOut() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogOut = () => {
    setAuth({});
    navigate("/login");
  };
  return (
    <>
      <button className="icon-btn" onClick={handleLogOut}>
        <img src={LogOutIcon} alt="Logout" />
      </button>
    </>
  );
}
