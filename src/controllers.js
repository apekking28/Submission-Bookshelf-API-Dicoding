import { nanoid } from "nanoid";

import books from "./books.js";

export const addBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  let response;

  if (!name) {
    return (response = h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400));
  }

  if (readPage > pageCount) {
    return (response = h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400));
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  let finished;

  readPage === pageCount ? finished = true: finished = false

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    return (response = h
      .response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: id,
        },
      })
      .code(201));
  }

  return (response = h
    .response({
      status: "fail",
      message: "Buku gagal ditambahkan",
    })
    .code(500));
};

export const findAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;

  let filteredBooks = books;

  if (name) {
    filteredBooks = filteredBooks.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (reading) {
    filteredBooks = filteredBooks.filter(
      (book) => book.reading === (reading === "1")
    );
  }

  if (finished) {
    filteredBooks = filteredBooks.filter(
      (book) => book.finished === (finished === "1")
    );
  }

  const mappedBooks = filteredBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  const response = h.response({
    status: "success",
    data: { books: mappedBooks },
  });
  response.code(200);

  return response;
};

export const findDetailBook = (req, h) => {
  const { id } = req.params;
  const book = books.filter((property) => property.id === id)[0];

  let response;

  if (!book) {
    return (response = h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(404));
  }

  return (response = h
    .response({
      status: "success",
      data: {
        book,
      },
    })
    .code(200));
};

export const updateBook = (request, h) => {
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);

  let response;

  if (index !== -1) {
    if (!name) {
      response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      });
      response.code(400);

      return response;
    }

    if (pageCount < readPage) {
      return (response = h
        .response({
          status: "fail",
          message:
            "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400));
    }

    let finished;

    readPage === pageCount ? finished = true: finished = false

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    return (response = h
      .response({
        status: "success",
        message: "Buku berhasil diperbarui",
      })
      .code(200));
  }

  return (response = h
    .response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    })
    .code(404));
};

export const deleteBook = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  let response;
  if (index === -1) {
    response = h.response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
  } else {
    books.splice(index, 1);
    response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
  }

  return response;
};
