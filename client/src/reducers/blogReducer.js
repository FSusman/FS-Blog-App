import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

const blogSlice = createSlice({
  initialState,
  name: "blogs",
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    updateBlog(state, action) {
      const index = state.findIndex((blog) => blog.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { setBlogs, addBlog, removeBlog, updateBlog } = blogSlice.actions;
export default blogSlice.reducer;
