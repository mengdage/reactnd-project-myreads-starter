import React, { Component } from 'react';

class BookItem extends Component {

  render() {
    const book = this.props.book;
    return (
      <div className='book'>

        <div className='book-top'>
          <div className="book-cover"
              style={{
                backgroundImage: 'url(' + book.imageLinks.thumbnail+')',
                width: 128,
                height: 193
              }}>
          </div>
        </div>
        <div className='book-title'>{book.title}</div>
        <div className='book-authors'>{book.authors.join(' ')}</div>
      </div>
    )
  }

}

export default BookItem;
