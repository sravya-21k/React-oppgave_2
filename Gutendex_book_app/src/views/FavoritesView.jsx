import React, { useContext, useCallback } from "react";
import { AppContext } from "../App";
import BookCard from "../Components/BookCard";
import "../App.css";

export default function FavoritesView() {
  const { books, favorites, setFavorites } = useContext(AppContext);

  const favoriteBooks = books.filter((book) => favorites.includes(book.id));
  console.log("Favorite List:", favorites);
  console.log("Favorite Books:", favoriteBooks);

  favoriteBooks.forEach((book) => {
    console.log("Favorite Book Id:", book.id);
  });

  const handleFavoriteClick = useCallback(
    (bookId) => {
      setFavorites((prevFavorites) => {
        if (prevFavorites.includes(bookId)) {
          return prevFavorites.filter((id) => id !== bookId);
        } else {
          return [...prevFavorites, bookId];
        }
      });
    },
    [setFavorites]
  );

  // Only recreate the function if setFavorites changes

  return (
    <div className="favorite-list">
      <h1>Favorites</h1>
      {favoriteBooks.length > 0 ? (
        favoriteBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isFavorite={favorites.includes(book.id)}
            onFavoriteClick={handleFavoriteClick}
            bookImage={book.formats?.["image/jpeg"] || "/default-book.jpg"}
          />
        ))
      ) : (
        <p>No favorite books yet.</p>
      )}
    </div>
  );
}
