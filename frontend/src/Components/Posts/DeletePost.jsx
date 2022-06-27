import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function DeletePost(id) {
  const navigate = useNavigate(); // remove unused variable
  const token = JSON.parse(localStorage.getItem("tokens"));
  const user = JSON.parse(localStorage.getItem("UserId"));

  function Delete() {
    axios
      .delete(`http://localhost:8080/api/post/${id.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Link to={`/home/user/${user.userId}`}>
        <Button onClick={Delete} color="error">
          {" "}
          Supprimer le post
        </Button>
      </Link>
    </div>
  );
}
