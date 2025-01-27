import { useEffect, useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";

export const AppContext = createContext();

export default function App() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState("https://gutendex.com/books");
  const [isFetching, setIsFetching] = useState(false);
  const baseAPIurl = "https://gutendex.com/books";

  const fetchBooks = async (url) => {
    setIsFetching(true);
    try {
      console.log(`Fetching from URL:${url}`);
      const response = await fetch(url);
      const data = await response.json();
      console.log("Full API Response:", data); // Log to check data

      setBooks((prevBooks) =>
        // const uniqueBooks = new Map();
        [...prevBooks, ...data.results]
      );
      //.forEach((book) => {
      //     uniqueBooks.set(book.id, book);
      //   });
      //   return Array.from(uniqueBooks.values());
      // });

      setNextPageUrl(data.next); // Update next page URL
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };
  const fetchBookDetails = async (id) => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`${baseAPIurl}/${id}`);
      if (!response.ok) throw new Error("Failed to fetch book details");
      const data = await response.json();
      setSelectedBook(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the initial page of books when component mounts
  useEffect(() => {
    console.log("Fetching books for URL : ", nextPageUrl);
    if (nextPageUrl && !isFetching) {
      fetchBooks(nextPageUrl);
    } // Fetch books for the first page or passed URL
  }, [nextPageUrl]);

  // Log the books whenever the 'books' state changes

  return (
    <AppContext.Provider
      value={{
        books,
        setBooks,
        categories,
        setCategories,

        favorites,
        setFavorites,
        selectedBook,
        error,
        loading,
        fetchBooks,
        fetchBookDetails,
      }}
    >
      <div>
        <Header />
        <main className="container">
          {loading && books.length === 0 ? (
            <div className="loading">Loading...</div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </AppContext.Provider>
  );
}
