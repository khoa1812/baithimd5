import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Master from "./pages/Master/Master";
import BookList from "./components/Books/BookList";
import AddBook from "./components/Books/AddBook";

function App() {
    return (
        <>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Master />} >
                    <Route path="books" element={<BookList />} />
                    <Route path="books/add" element={<AddBook />} />
                </Route>
            </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
