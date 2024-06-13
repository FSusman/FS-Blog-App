import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <div>
      <div className="card blog">
        <Link to={`/blogs/${blog.id}`} className="blog-title">
          {blog.title}
        </Link>
      </div>
    </div>
  );
};

export default Blog;
