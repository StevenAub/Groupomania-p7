import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFetch } from "../../Hooks/Hook";

export default function AllPost() {
  const { data, error } = useFetch(`http://localhost:3000/api/post`);

  const PostData = data?.posts;

  if (error) {
    return <span>Oups il y a eu un problème</span>;
  }

  return (
    <div style={{ margin: "auto" }}>
      {PostData?.map((post, index) => (
        <Card key={`${post.title}-${index}`} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
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
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
