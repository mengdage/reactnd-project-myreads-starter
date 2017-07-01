import React, { Component } from 'react';
import BookShelf from './BookShelf';

class ListBooksContent extends Component {
  render() {
    const shelves = this.props.shelves;
    console.log(shelves);
    const bookShelves = [];
    for(let shelfName in shelves) {
        if(shelves.hasOwnProperty(shelfName)){
          bookShelves.push(<BookShelf key={shelfName}
            bookShelf={{
              name: shelves[shelfName].name,
              books: shelves[shelfName].books
            }} />);
        }
    }

    return (
      <div className='list-books-content'>
        {bookShelves}
      </div>
    );
  }
}

export default ListBooksContent;
