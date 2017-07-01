import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import ListBooksContent from './ListBooksContent';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    shelves: {
      current: {
        name: 'Current Reading',
        books: []
      },
      want: {
        name: 'Want To Read',
        books: []
      },
      read: {
        name: 'Read',
        books: []
      }
    }
  }

  componentDidMount() {

    BooksAPI.getAll().then(this.setShelvesContent);

    BooksAPI.update({id: 'nggnmAEACAAJ'}, 'read').then((data) => {
      console.log('update',data);
    });

    BooksAPI.search('Cervantes', 10).then((results) => {
      // console.log('search', results);
    });
  }

  updateBook(book, shelfName){
    BooksAPI.update({id: book.id}, shelfName).then(this.setShelvesContent);
  }

  // replace the books in the state shelves with the give books
  setShelvesContent = (books) => {
    const tmpShelves = {
      current: [],
      want: [],
      read: []
    };
    // console.log('getAll', books);
    // store books to the tmp shelves
    books.forEach((book) => {
      switch (book.shelf) {
        case 'currentlyReading':
          tmpShelves.current.push(book);
          break;
        case 'wantToRead':
          tmpShelves.want.push(book);
          break;
        case 'read':
          tmpShelves.read.push(book);
          break;
        default:
          console.error('No shelf ', book.shelf);
      }
    });

    // replace state shelves with tmp shelvs
    this.setState((oldState) => ({
      shelves: {
        current: {
          name: oldState.shelves.current.name,
          books: tmpShelves.current
        },
        want: {
          name: oldState.shelves.want.name,
          books: tmpShelves.want
        },
        read: {
          name: oldState.shelves.read.name,
          books: tmpShelves.read
        }
      }
    }));
  };

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
          )}>

        </Route>

        <Route exact path='/' render={() => (
            <div className='list-books'>
              <div className='list-books-title'>
                <h1>MyReads</h1>
              </div>
              <ListBooksContent shelves={this.state.shelves}/>
            </div>
          )}>
        </Route>
      </div>


    )
  }
}

export default BooksApp
