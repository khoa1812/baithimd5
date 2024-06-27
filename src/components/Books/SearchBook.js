import React, { useState, useEffect } from 'react';
import BookService from '../../services/book.service';

function SearchBook({ onSearch }) {
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        BookService.getAllBooks()
            .then(response => {
                const uniqueCategories = [...new Set(response.data.map(book => book.category))];
                setCategories(uniqueCategories);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const handleSearch = () => {
        onSearch(keyword, category);
    };

    return (
        <div className="card mt-2">
            <div className="card-header">
                <h4>Search Books</h4>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                        className="form-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <button className="btn btn-primary" onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
}

export default SearchBook;
