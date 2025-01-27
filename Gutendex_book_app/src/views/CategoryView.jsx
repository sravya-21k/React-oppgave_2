import React from "react";
import { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../App";
import "../App.css";

export default function CategoryView() {
  const { category } = useParams();
  const { books, loading, error, fetchBooks } = useContext(AppContext);

  useEffect(() => {
    fetchBooks(`https://gutendex.com/books?topic=${category}`);
  }, [category, fetchBooks]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error:{error}</div>;

  return (
    <div className="category-view">
      <h2>{category}Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>
              <h3>{book.title}</h3>
              <p>{book.author_name?.[0]}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
