import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../reducers/notificationReducer";
import { removeBlog, updateBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";

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

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes</p>
      <button onClick={handleLike}>like</button>
      <p>added by {blog.author}</p>
      {blog.author === user.name && (
        <button onClick={handleDelete}>delete</button>
      )}
    </div>
  );
};

export default BlogView;
