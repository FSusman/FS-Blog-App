# Blog App

This Blog App was developed as part of the exercises in the Full Stack Open course by the University of Helsinki. It includes user authentication implemented from scratch, the ability to create, like, and comment on blog posts, view information about users, and more.

The UI is just there to make the application somewhat reasonable. It was put together in around an hour or something as per the instructions of the course. There is also an implementation of toasts which tell the user what actions have occured

## Features
- User authentication (login/logout)
- Create, like, and comment on blog posts
- View individual blog post details
- Anonymous commenting
- View user information and their blog posts

## Tech Stack
- React JS with Redux (frontend)
- ShadCN and TailwindCSS and react-hot-toast Libraries (styling)
- Express JS (backend)
- MongoDB (database)

## Pages

### 1. Login Page
The login page features a simple form where users can enter their username and password to access the application.
![image](https://github.com/FSusman/FS-Blog-App/assets/170493954/f21b37d8-f8ec-4da7-b18c-bc95a06800eb)

### 2. Blog Page
The main blog page displays a table listing all blog posts with columns for title, likes, and comments. Users can navigate to other pages using the navigation links, create a new blog post using the "New Blog" button, and log out using the "Logout" button.

#### Blog Table
- **Sr.**: Serial number of the blog post.
- **Title**: The title of the blog post, which is a clickable link to the individual blog view.
- **Likes**: The number of likes the blog post has received.
- **Comments**: The number of comments on the blog post.

![image](https://github.com/FSusman/FS-Blog-App/assets/170493954/95ab13bb-1177-4503-9f8c-9a2d2ca3a6b8)


### 3. Individual Blog View
When a blog title is clicked, the user is taken to the individual blog view page. Here, the blog's details are displayed, including the URL, likes, author, and comments.

- **Like Button**: Any user can like the blog post by clicking the heart button.
- **Comment Section**: Users can view existing comments and add new comments anonymously.

![image](https://github.com/FSusman/FS-Blog-App/assets/170493954/bdce746c-00c2-4212-a60d-98c404501a46)

### 4. Users Info Page
The users info page displays a table listing all registered users with columns for their name, username, and the number of blogs they have created.

#### Users Table
- **Sr.**: Serial number of the user.
- **Name**: The name of the user.
- **Username**: The username of the user.
- **Blogs**: The number of blogs the user has created.

This is how it looks like on the website:
![image](https://github.com/FSusman/FS-Blog-App/assets/170493954/2e7cdde6-67fa-4e30-8103-49ac99dc8b00)


### 5. User Details Page
Clicking on a user in the users info page navigates to that user's details page. This page shows the user's blogs, likes, and comments.
![image](https://github.com/FSusman/FS-Blog-App/assets/170493954/09f10f19-678e-4440-b3ff-39801efe1fd2)

This project was just for learning purposes. With this, complex concepts explained in the course were put into practice.
