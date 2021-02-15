import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './AddBook.scss';
// import { addBook } from '../../api/books';

export const AddBook = ({ addNewBook, booksCategories }) => {
  const [bookName, setBookName] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookCategory, setBookCategory] = useState('');
  const [bookISBN, setBookISBN] = useState('');

  const newBook = {
    title: bookName,
    author: bookAuthor,
    category: bookCategory,
    ISBN: bookISBN,
  };

  const addTrueBook = (e) => {
    e.preventDefault();

    if (bookName && bookAuthor && bookCategory && bookISBN) {
      addNewBook(newBook);
      // eslint-disable-next-line no-alert
      alert('Book successfully added');
    }

    setBookName('');
    setBookAuthor('');
    setBookCategory('');
    setBookISBN('');
  };

  return (
    <form action="" className="book-form">
      <input
        type="text"
        placeholder="Book title*"
        className={classNames('book-form__field', {
          'error-field': bookName === '',
        })}
        value={bookName}
        onChange={({ target }) => setBookName(target.value)}
      />
      <input
        type="text"
        placeholder="Author name*"
        className={classNames('book-form__field', {
          'error-field': bookAuthor === '',
        })}
        value={bookAuthor}
        onChange={({ target }) => setBookAuthor(target.value)}
      />
      <input
        type="text"
        placeholder="ISBN number*"
        className={classNames('book-form__field', {
          'error-field': bookISBN === '',
        })}
        value={bookISBN}
        onChange={({ target }) => setBookISBN(target.value)}
      />
      <select
        className={classNames('book-form__select', {
          'error-field': bookCategory === '',
        })}
        value={bookCategory}
        onChange={({ target }) => setBookCategory(target.value)}
      >
        <option value="">Choose category</option>
        {
          booksCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))
        }
      </select>
      <button
        type="submit"
        className="book-form__button"
        onClick={addTrueBook}
      >
        Add a book
      </button>
    </form>
  );
};

AddBook.propTypes = {
  addNewBook: PropTypes.func.isRequired,
  booksCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
};
