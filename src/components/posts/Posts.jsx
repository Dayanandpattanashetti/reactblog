import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  return (
    <>
      <div class="container text-center">
        <div class="row align-items-start">
          {posts.map((p) => (
            <div class="col">
              <Post post={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
