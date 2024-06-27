import axios from 'axios';

const URL_API = 'http://localhost:3000';

class BookService {
    static async getAllBooks() {
        return await axios.get(URL_API + '/books');
    }

    static async addBook(book) {
        return await axios.post(URL_API + '/books', book);
    }

    static async searchBooks(keyword, category) {
        let query = `${URL_API}/books?`;
        if (keyword) query += `name_like=${keyword}&`;
        if (category) query += `category_like=${category}&`;
        return await axios.get(query);
    }
}

export default BookService;
