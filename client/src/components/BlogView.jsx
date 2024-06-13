import { Link, useNavigate, useParams } from "react-router-dom";
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

  const handleComment = async (e) => {
    e.preventDefault();

    const response = await blogService.comment(blog, e.target.comment.value);
    console.log(response)
  };

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <Link to="#">{blog.url}</Link>
      <p>{blog.likes} likes</p>
      <button onClick={handleLike}>like</button>
      <p>added by {blog.author}</p>
      {blog.author === user.name && (
        <button onClick={handleDelete}>delete</button>
      )}
      <form onSubmit={(e) => handleComment(e)}>
        <input type="text" name="comment" />
        <button type="submit">comment</button>
      </form>
      <ul>
        {blog.comments.length > 0 &&
          blog.comments.map((comment) => <li>{comment}</li>)}
      </ul>
    </div>
  );
};

export default BlogView;
