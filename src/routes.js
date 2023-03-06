import {
  findAllBooks,
  findDetailBook,
  addBook,
  updateBook,
  deleteBook,
} from "./controllers.js";

const routes = [
  {
    method: "GET",
    path: "/books",
    handler: findAllBooks,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: findDetailBook,
  },
  {
    method: "POST",
    path: "/books",
    handler: addBook,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: updateBook,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBook,
  },
];

export default routes;
