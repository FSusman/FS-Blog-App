import { useEffect, useState } from "react";
import blogService from "../services/blogs";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UsersView = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await blogService.getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div>
      <h1 className="font-semibold text-2xl mt-4">Users</h1>
      <div>
        {users.length > 0 && (
          <Table className='w-1/2 border mt-4'>
            <TableHeader>
              <TableRow>
                <TableHead >Sr.</TableHead>
                <TableHead >Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead >Blogs</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 &&
                users.map((user,id) => (
                  <TableRow key={user.id}>
                    <TableCell>{id + 1}</TableCell>
                    <TableCell className="font-medium">
                      <Link to={`/users/${user.id}`}>
                        {user.name} <br />
                      </Link>
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell >{user.blogs.length}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell  >{users.length > 0 && users.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </div>
    </div>
  );
};

export default UsersView;
