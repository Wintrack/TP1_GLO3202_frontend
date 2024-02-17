// BookmarkList.tsx
import React from 'react';
import { useBookmarkContext, Bookmark } from './BookmarkContext'; // Import Bookmark type

const BookmarkList: React.FC = () => {
  const { bookmarks, setEditId, handleDelete } = useBookmarkContext();

  return (
    <ul className="bookmark-list">
      {bookmarks.map((bookmark: Bookmark) => ( // Type the bookmark parameter
        <li key={bookmark.id}>
          <span>{bookmark.title}</span>
          <button onClick={() => setEditId(bookmark.id)}>Edit</button>
          <button onClick={() => handleDelete(bookmark.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default BookmarkList;
