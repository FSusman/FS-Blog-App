import { useEffect, useState } from "react";
import BlogCreator from "./BlogCreator";
import blogService from "../services/blogs";
import { addBlog, setBlogs } from "../reducers/blogReducer";
import { useSelector, useDispatch } from "react-redux";
import { notify } from "../reducers/notificationReducer";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

const BlogsView = () => {
  const [creatorVisible, setCreatorVisible] = useState(false);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const hideWhenVisible = { display: creatorVisible ? "none" : "" };
  const showWhenVisible = { display: creatorVisible ? "" : "none" };

  const handleCreate = async (blog) => {
    if (blog.title && blog.url) {
      const creator = await blogService.getUser(user.username);
      const blogToCreate = {
        title: blog.title,
        author: creator.username,
        url: blog.url,
        user: creator.id,
      };
      const createdBlog = await blogService.create(blogToCreate);
      dispatch(addBlog(createdBlog));
      dispatch(
        notify({ message: "Blog created successfully", variant: "success" })
      );
      setCreatorVisible(false);
    } else {
      dispatch(
        notify({ message: "Please fill the entire form", variant: "error" })
      );
    }
  };

  return (
    <div>
      <div>
        <div style={hideWhenVisible}>
          <Button onClick={() => setCreatorVisible(true)} variant={"outline"}>
            New Blog
          </Button>
        </div>
        <div style={showWhenVisible}>
          <BlogCreator handleCreate={handleCreate} />
          <Button onClick={() => setCreatorVisible(false)}>cancel</Button>
        </div>
      </div>
      <div className="grid-container">
          <Table className="w-1/2 border mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Sr.</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead>Comments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
        {blogs.map((blog, id) => (
                <TableRow key={blog.id}>
                  <TableCell>{id + 1}</TableCell>
                  <TableCell className="font-medium">
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
                  <TableCell>{blog.likes}</TableCell>
                  <TableCell>{blog.comments.length}</TableCell>
                </TableRow>
            ))}
            </TableBody>
          </Table>
      </div>
    </div>
  );
};

export default BlogsView;
