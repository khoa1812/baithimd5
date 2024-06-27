import React, { useEffect, useState } from 'react';
import BookService from '../../services/book.service';
import { Link } from 'react-router-dom';
import SearchBook from './SearchBook';

function BookList() {
    const [books, setBooks] = useState([]);
    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        BookService.getAllBooks()
            .then(res => {
                const sortedBooks = res.data.sort((a, b) => b.quantity - a.quantity);
                setBooks(sortedBooks);
                setShowSpinner(false);
            })
            .catch(error => console.error('Error fetching books:', error));
    };

    const handleSearch = (keyword, category) => {
        setShowSpinner(true);
        BookService.searchBooks(keyword, category)
            .then(res => {
                const sortedBooks = res.data.sort((a, b) => b.quantity - a.quantity);
                setBooks(sortedBooks);
                setShowSpinner(false);
            })
            .catch(error => console.error('Error searching books:', error));
    };

    return (
        <div>
            <SearchBook onSearch={handleSearch} />
            <div className="card mt-2">
                <div className="card-header">
                    <div className="row">
                        <div className="col">Book List</div>
                        <div className="col">
                            <Link to="/books/add">
                                <button className="btn btn-primary">Add Book</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="d-flex justify-content-center">
                        {showSpinner && (
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        )}
                    </div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Date Added</th>
                            <th>Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.map((book, index) => (
                            <tr key={book.id}>
                                <td>{index + 1}</td>
                                <td>{book.code}</td>
                                <td>{book.name}</td>
                                <td>{book.category}</td>
                                <td>{new Date(book.dateAdded).toLocaleDateString('vi-VN')}</td>
                                <td>{book.quantity}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default BookList;
