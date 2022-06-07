import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFetch } from "../../Hooks/Hook";
import { Stack } from "@mui/material";
import NewPost from "./NewPost";

export default function AllPost() {
  const user_name = JSON.parse(localStorage.getItem("username"));

  const { data, error } = useFetch(`http://localhost:3000/api/post`);

  const PostData = data?.posts;

  if (error) {
    return <span>Oups il y a eu un problème</span>;
  }
  console.log(PostData);
  return (
    <div>
      <div style={{ backgroundColor: "grey", paddingTop: "2%" }}>
        <NewPost />

        <Stack justifyContent="center" alignItems="center" spacing={2}>
          {PostData?.map((post, index) => (
            <Card
              key={`${post.title}-${index}`}
              sx={{ minWidth: 650, maxWidth: 650 }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user_name}
                </Typography>
              </CardContent>
              <div>
                {post.imgUrl ? (
                  <CardMedia
                    component="img"
                    height="300"
                    image={post.imgUrl}
                    alt="green iguana"
                  />
                ) : (
                  <div></div>
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={function postId() {
                      window.location = `/home/post/${post.id}`;
                      console.log(post.userId);
                    }}
                  >
                    Commenter
                  </Button>
                </CardActions>
              </div>
            </Card>
          ))}
        </Stack>
      </div>
    </div>
  );
}
/*

function Search() {
  const token = JSON.parse(localStorage.getItem("tokens"));

  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/post", {
      headers: { authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => setDatas(data));
  }, [token]);

  const PostData = datas?.posts;
  const handleSearch = (e) => {
    let value = e.target.value;
    value.length > 2 && setSearch(value);
  };

  console.log(search);
  return (
    <>
      <div>
        <div className="search">
          <input
            type="text"
            name="searchBar"
            id="searchBar"
            placeholder="Rechercher sur groupomania"
            onChange={handleSearch}
          />
        </div>
        <div className="search_results">
          {PostData?.filter((val) => {
            return val.title.toLowerCase().includes(search.toLowerCase());
          }).map((post, index) => (
            <Stack justifyContent="center" alignItems="center" spacing={2}>
              <Card
                key={`${post.title}-${index}`}
                sx={{ minWidth: 600, maxWidth: 600, minHeight: 350 }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={post.imgUrl}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Commenter</Button>
                  <Button size="small">Partager</Button>
                </CardActions>
              </Card>
            </Stack>
          ))}
        </div>
      </div>
    </>
  );
}

export default function AllPost() {
  const { data, error } = useFetch(`http://localhost:3000/api/post`);

  const PostData = data?.posts;

  if (error) {
    return <span>Oups il y a eu un problème</span>;
  }

  return (
    <div>
      {" "}
      <Search />
      <div>
        <Stack justifyContent="center" alignItems="center" spacing={2}>
          {PostData?.map((post, index) => (
            <Card
              key={`${post.title}-${index}`}
              sx={{ minWidth: 600, maxWidth: 600, minHeight: 350 }}
            >
              <CardMedia
                component="img"
                height="300"
                image={post.imgUrl}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Commenter</Button>
                <Button size="small">Partager</Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
      </div>
    </div>
  );
}
*/
