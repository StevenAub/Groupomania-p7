import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function DeletePost() {
  const token = JSON.parse(localStorage.getItem("tokens"));

  const idRequest = useParams();
  const id = idRequest.id;
  function Delete() {
    axios.delete(`http://localhost:8080/api/post/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  return (
    <div>
      <Link to={`/home`}>
        <Button onClick={Delete}>❌ Supprimer le post</Button>
      </Link>
    </div>
  );
}
