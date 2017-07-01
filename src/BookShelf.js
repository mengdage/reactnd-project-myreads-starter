import React, { Component } from 'react';
import BookItem from './BookItem';

class BookShelf extends Component {

  render() {
    const shelfName = this.props.bookShelf.name;
    const books = this.props.bookShelf.books;
    const booksComponents = books.map((book) => (
      <li key={book.id}>
        <BookItem book={book}/>
      </li>
    ));

    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{shelfName}</h2>
        <div className='bookshelf-books'>
          <ol className='books-grid'>
            {booksComponents}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
