import React from "react";
import { Link } from "react-router-dom";
import "../BookListView.css";

export default function BookCard({
  book,
  isFavorite,
  onFavoriteClick,
  bookImage,
}) {
  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`} className="book-title">
        <h3>{book.title}</h3>
      </Link>
      {/* Display the image if available, else fallback to default */}
      <img src={bookImage} alt={book.title} className="book-image" />
      <p>{book.authors?.[0]?.name || "Unknown Author"}</p>
      <button onClick={() => onFavoriteClick(book.id)}>
        {isFavorite ? "Unfavorite" : "Favorite"} {/* Toggle favorite text */}
      </button>
    </div>
  );
}
