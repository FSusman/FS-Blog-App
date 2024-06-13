import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notify, removeNotification } from "./reducers/notificationReducer";
import { removeUser, setUser } from "./reducers/userReducer";

import BlogsView from "./components/BlogsView";
import UserView from "./components/UserView";
import Login from "./components/Login";
import UsersView from "./components/UsersView";
import BlogView from "./components/BlogView";
import { setBlogs } from "./reducers/blogReducer";
import blogService from "./services/blogs";
import toast from "react-hot-toast";
import { Button } from "./components/ui/button";

const App = () => {
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    await blogService.getAll().then((blogs) => {
      dispatch(setBlogs(blogs));
    });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)));
    }
  }, []);

  useEffect(() => {
    if (notification) {
      notification.variant === 'success' ? toast.success(notification.message) : toast.error(notification.message)
    }
    setTimeout(() => {
      if (notification === null) {
        return;
      } else {
        dispatch(removeNotification());
      }
    }, 2000);
  }, [notification]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(removeUser());
    dispatch(
      notify({
        message: "Logged user out successfully",
        variant: "success",
      })
    );
  };

  return (
    <div className="p-4">
      {user === null ? (
        <div>
          <Login />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-semibold">Blog App</h2>
            <ul className="flex items-center space-x-2 text-lg">
              <Button variant={'ghost'} className='text-lg underline hover:no-underline duration-300' >
                <Link to="/users">Users</Link>
              </Button>
              <Button variant={'ghost'} className='text-lg underline hover:no-underline duration-300'>
                <Link to="/">Blogs</Link>
              </Button>

            </ul>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
          <div className="flex items-center space-x-2">
            <p className="italic text-lg">"{user.name}" is logged in</p>
          </div>

          <Routes>
            <Route path="/" element={<BlogsView />} />
            <Route path="/users" element={<UsersView />} />
            <Route path="/users/:id" element={<UserView />} />
            <Route path="/blogs/:id" element={<BlogView />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
