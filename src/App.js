/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable arrow-parens */
import React, { useEffect, useState } from 'react';
import {
  HashRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { getBooks, addBook, deleteBook, changeBook } from './api/books';
import { BooksList } from './components/BooksList/BooksList';
import { AddBook } from './components/AddBook/AddBook';
import { EditBook } from './components/EditBook/EditBook';
import './App.scss';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBookID, setSelectedBookID] = useState(null);
  const booksCategories = ['Fantasy', 'Epic fantasy', 'Thriller', 'Horror',
    'Detective', 'Drama', 'Classic', 'Roman', 'Humorous', 'Scientific'];

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => (
    getBooks().then(setBooks)
  );

  const addNewBook = async book => {
    await addBook(book);

    fetchBooks();
  };

  const removeSelectedBook = async bookId => {
    await deleteBook(bookId);

    fetchBooks();
  };

  const selectBook = (bookId) => {
    setSelectedBookID(bookId);
  };

  const editBook = async(bookId, book) => {
    await changeBook(bookId, book);

    fetchBooks();
  };

  const selectedBook = books.find(book => book.id === selectedBookID);

  return (
    <div className="app">
      <HashRouter>
        <nav className="app__nav">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span className="app__nav-item app__nav-item--is-active">
              Books
            </span>
          </Link>
          <Link to="/add-book" style={{ textDecoration: 'none' }}>
            <span className="app__nav-item app__nav-item--is-active">
              Add a book
            </span>
          </Link>
        </nav>
        <div>
          <Switch>
            <Route exact path="/">
              <BooksList
                books={books}
                removeSelectedBook={removeSelectedBook}
                onBookSelect={selectBook}
              />
            </Route>
            <Route exact path="/add-book">
              <AddBook
                addNewBook={addNewBook}
                booksCategories={booksCategories}
              />
            </Route>
            {
              selectedBook
              && (<Route exact path="/editbook">
                <EditBook
                  selectedBook={selectedBook}
                  editBook={editBook}
                  booksCategories={booksCategories}
                />
              </Route>)
            }
          </Switch>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
