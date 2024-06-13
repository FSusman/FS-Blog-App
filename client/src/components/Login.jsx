import { notify } from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";
import loginService from "../services/login";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    try {
      const user = await loginService.login({
        username: username,
        password: password,
      });
      dispatch(setUser(user));
      localStorage.setItem("user", JSON.stringify(user));
      e.target.username.value = "";
      e.target.password.value = "";
      dispatch(
        notify({ message: "Logged user in successfully", variant: "success" })
      );
    } catch (error) {
      if (error.response.status === 400) {
        dispatch(
          notify({
            message: "Incorrect username or password",
            variant: "error",
          })
        );
      } else {
        dispatch(
          notify({ message: "Internal server error", variant: "error" })
        );
      }
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Please login to your account.</CardDescription>
      </CardHeader>
      <form onSubmit={(e) => handleLogin(e)}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                autoComplete="off"
                id="username"
                name="username"
                placeholder="Enter your username"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                autoComplete="off"
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit">Login</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Login;
