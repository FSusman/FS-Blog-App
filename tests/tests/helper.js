const createBlog = async (page, content) => {
  await page.getByRole("button", { name: "New Blog" }).click();

  await page.getByTestId("title").fill(content.title);
  await page.getByTestId("url").fill(content.url);
  await page.getByRole("button", { name: "create" }).click();
};

module.exports = { createBlog };
