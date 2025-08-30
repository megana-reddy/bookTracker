function BookCard({ book, onClick }) {
  return (
    <div
      className="border rounded-lg p-4 shadow-md hover:shadow-lg cursor-pointer transition"
      onClick={onClick}
    >
      <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
      <p className="text-sm text-gray-600">Author: {book.author}</p>
      {book.genre && <p className="text-xs text-gray-500">Genre: {book.genre}</p>}
      {book.status && (
        <p className="mt-2 text-xs font-medium text-blue-600">
          Status: {book.status}
        </p>
      )}
    </div>
  );
}

export default BookCard;
