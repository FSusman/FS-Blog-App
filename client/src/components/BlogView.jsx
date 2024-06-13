import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../reducers/notificationReducer";
import { removeBlog, updateBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import { GhostIcon, HeartIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const BlogView = () => {
  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((blog) => blog.id === id);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLike = async () => {
    await blogService.like(blog);
    dispatch(updateBlog(blog));
    dispatch(
      notify({
        message: `Liked "${blog.title}" `,
        variant: "success",
      })
    );
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author} `)) {
      await blogService.deleteBlog(blog.id);
      dispatch(removeBlog(blog.id));
      navigate("/");
      dispatch(
        notify({ message: `Deleted ${blog.title}`, variant: "success" })
      );
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    await blogService.comment(blog, e.target.comment.value);
    window.location.reload()
  };

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <h1 className="font-semibold text-2xl">{blog.title}</h1>
      <Link to="#" className="font-medium">
        {blog.url}
      </Link>
      <p className=" text-slate-600">{blog.likes} likes</p>
      <p className=" text-slate-600">added by {blog.author}</p>
      {blog.author === user.name && (
        <Button onClick={handleDelete} variant="outline">
          <TrashIcon />
        </Button>
      )}
      <Button
        variant="outline"
        className="ml-2 text-red-600 border-red-600 hover:text-red-400"
        onClick={handleLike}
      >
        <HeartIcon />
      </Button>
      <ul className="mt-4">
        {blog.comments.length > 0 ? (
          blog.comments.map((comment) => <li>{comment}</li>)
        ) : (
          <p className="flex text-slate-600">No comments yet </p>
        )}
      </ul>
      <form onSubmit={(e) => handleComment(e)} className="flex w-1/2 mt-4">
        <Input type="text" name="comment" />
        <Button type="submit">comment</Button>
      </form>
    </div>
  );
};

export default BlogView;
