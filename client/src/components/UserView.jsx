import { Link, useParams } from "react-router-dom";
import blogService from "../services/blogs";
import { useEffect } from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserView = () => {
  const id = useParams().id;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await blogService.getUsers();
      const user = response.data.find((user) => user.id === id);
      setUser(user);
    };

    fetchUsers();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  console.log(user.blogs);

  return (
    <div>
      <h1 className="font-semibold text-xl mt-2">Info</h1>
      <p className="">
        Username: <span className="italic">{user.username}</span>
      </p>
      <p className="">
        Name: <span className="italic">{user.name}</span>
      </p>
      <h1 className="text-xl font-semibold mt-4">Blogs</h1>
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
          {user.blogs.map((blog, id) => (
            <TableRow key={blog.id}>
              <TableCell>{id + 1}</TableCell>
              <TableCell className="font-medium">
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </TableCell>
              <TableCell >{blog.likes}</TableCell>
              <TableCell >{blog.comments.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserView;
