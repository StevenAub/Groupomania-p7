import { WindowSharp } from "@mui/icons-material";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DeletePost() {
  const token = JSON.parse(localStorage.getItem("tokens"));

  const idRequest = useParams();
  const id = idRequest.id;
  console.log(id);
  function Delete() {
    console.log("hey");
    axios.delete(`http://localhost:3000/api/post/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    window.location = "/home";
  }

  return (
    <div>
      <p onClick={Delete}>Supprimer le post</p>
    </div>
  );
}
