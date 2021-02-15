import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './BooksList.scss';

export const BooksList = ({ books, removeSelectedBook, onBookSelect }) => {
  const history = useHistory();

  return (
    <table cellSpacing="0" className="books-table">
      <thead className="books-table__headers">
        <tr>
          <td>Book title</td>
          <td>Author name</td>
          <td>Category</td>
          <td>ISBN</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody className="books-table__body">
        {
          books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.ISBN}</td>
              <td>
                <button
                  type="button"
                  className="books-table__button books-table__button--edit"
                  onClick={() => {
                    onBookSelect(book.id);
                    history.push('/editbook');
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="books-table__button books-table__button--delete"
                  onClick={() => {
                    removeSelectedBook(book.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

BooksList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    ISBN: PropTypes.string.isRequired,
  })).isRequired,
  removeSelectedBook: PropTypes.func.isRequired,
  onBookSelect: PropTypes.func.isRequired,
};
