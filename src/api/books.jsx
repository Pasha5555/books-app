const BASE_URL = 'http://localhost:3000/books/';

export const getBooks = async() => {
  const res = await fetch(BASE_URL);

  return res.json();
};

export const addBook = newBook => (
  fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newBook),
  })
);

export const deleteBook = bookId => (
  fetch(`${BASE_URL}${bookId}`, {
    method: 'DELETE',
  })
);

export const changeBook = (bookId, book) => (
  fetch(`${BASE_URL}${bookId}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(book),
  })
);
