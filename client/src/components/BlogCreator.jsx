import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BlogCreator = ({ handleCreate }) => {
  const [blog, setBlog] = useState({ title: "", url: "" });

  const addBlog = (e) => {
    e.preventDefault();
    handleCreate(blog);
    setBlog({ url: "", title: "" });
  };

  return (
    <>
        
        <Card className="flex flex-col w-1/2">
          <CardHeader>
            <CardTitle>Create new Blog</CardTitle>
            <CardDescription>Enter the details of your blog.</CardDescription>
          </CardHeader>
          <form onSubmit={(e) => addBlog(e)}>
            <CardContent>
              <Label htmlFor="title">Title:</Label>
              <Input
                id="title"
                placeholder="Title of your blog"
                type="text"
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                value={blog.title}
                role="textbox"
                data-testid="title"
              />
              <Label htmlFor="url">URL:</Label>
              <Input
                type="text"
                placeholder="URL to your blog"
                id="url"
                onChange={(e) => setBlog({ ...blog, url: e.target.value })}
                value={blog.url}
                role="url"
                data-testid="url"
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">create</Button>
            </CardFooter>
          </form>
        </Card>
    </>
  );
};

export default BlogCreator;
