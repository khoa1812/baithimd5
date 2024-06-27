import React, { useState, useEffect } from 'react';
import BookService from '../../services/book.service';

function AddBook() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [dateAdded, setDateAdded] = useState('');
    const [quantity, setQuantity] = useState('');
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        BookService.getAllBooks()
            .then(response => {
                const uniqueCategories = [...new Set(response.data.map(book => book.category))];
                setCategories(uniqueCategories);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.length > 100) {
            setMessage('Book name should not exceed 100 characters.');
            return;
        }
        if (new Date(dateAdded) > new Date()) {
            setMessage('Date added cannot be in the future.');
            return;
        }
        if (quantity <= 0 || !Number.isInteger(Number(quantity))) {
            setMessage('Quantity must be a positive integer.');
            return;
        }

        const bookCode = `BO-${String(Date.now()).slice(-4)}`;
        const newBook = {
            code: bookCode,
            name,
            category,
            dateAdded,
            quantity: Number(quantity),
        };

        BookService.addBook(newBook)
            .then(response => {
                setMessage('Book added successfully!');
                setName('');
                setCategory('');
                setDateAdded('');
                setQuantity('');
            })
            .catch(error => console.error('Error adding book:', error));
    };

    return (
        <div className="card mt-2">
            <div className="card-header">
                <h4>Add New Book</h4>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Date Added</label>
                        <input type="date" className="form-control" value={dateAdded} onChange={(e) => setDateAdded(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Quantity</label>
                        <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Book</button>
                </form>
                {message && <p className="mt-2">{message}</p>}
            </div>
        </div>
    );
}

export default AddBook;
