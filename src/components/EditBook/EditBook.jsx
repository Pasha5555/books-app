/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import './EditBook.scss';

export const EditBook = ({ selectedBook, editBook, booksCategories }) => {
  const [selectedBookName, setSelectedBookName] = useState(selectedBook.title);
  const [selectedBookAuthor, setSelectedBookAuthor]
    = useState(selectedBook.author);
  const [selectedBookCategory, setSelectedBookCategory]
    = useState(selectedBook.category);
  const [selectedBookISBN, setSelectedBookISBN] = useState(selectedBook.ISBN);
  const [showMessage, setShowMessage] = useState(null);
  const history = useHistory();

  const changedBook = {
    id: selectedBook.id,
    title: selectedBookName,
    author: selectedBookAuthor,
    category: selectedBookCategory,
    ISBN: selectedBookISBN,
  };

  const addEditedBook = (e) => {
    e.preventDefault();

    if (selectedBookName && selectedBookAuthor
        && selectedBookCategory && selectedBookISBN) {
      editBook(selectedBook.id, changedBook);

      setTimeout(() => {
        history.push('/');
      }, 2000);

      setShowMessage(true);
    }
  };

  return (
    <form action="" className="book-form">
      <input
        type="text"
        placeholder="Book title*"
        className={classNames('book-form__field', {
          'error-field': selectedBookName === '',
        })}
        value={selectedBookName}
        onChange={({ target }) => setSelectedBookName(target.value)}
      />
      <input
        type="text"
        placeholder="Author name*"
        className={classNames('book-form__field', {
          'error-field': selectedBookAuthor === '',
        })}
        value={selectedBookAuthor}
        onChange={({ target }) => setSelectedBookAuthor(target.value)}
      />
      <input
        type="text"
        placeholder="ISBN number*"
        className={classNames('book-form__field', {
          'error-field': selectedBookISBN === '',
        })}
        value={selectedBookISBN}
        onChange={({ target }) => setSelectedBookISBN(target.value)}
      />
      <select
        className={classNames('book-form__select', {
          'error-field': selectedBookCategory === '',
        })}
        value={selectedBookCategory}
        onChange={({ target }) => setSelectedBookCategory(target.value)}
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
        onClick={addEditedBook}
        className="book-form__button"
      >
        Edit a book
      </button>
      {
        showMessage
          && (<span className="message-successful">
                Successfully changed
              </span>)
      }
    </form>
  );
};

EditBook.propTypes = {
  selectedBook: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    ISBN: PropTypes.string.isRequired,
  }).isRequired,
  editBook: PropTypes.func.isRequired,
  booksCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
};
