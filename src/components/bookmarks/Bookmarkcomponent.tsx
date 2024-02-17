import React, { useState, useEffect } from 'react';
import { useBookmarks } from './UseBookmark';
import { Bookmark } from './Bookmark';
import './style.css'

const BookmarkComponent: React.FC = () => {
  const [newBookmark, setNewBookmark] = useState<{ id: string, title: string; description: string; link: string }>({
    id: '',
    title: '',
    description: '',
    link: '',
  });
  const [editingBookmark, setEditingBookmark] = useState<{ id: string; title: string; description: string } | null>(
    null
  );
  const { bookmarks, loading, error, createBookmark, updateBookmark, deleteBookmark } = useBookmarks();

  useEffect(() => {
  }, [bookmarks]);

  const handleCreate = () => {
    createBookmark(newBookmark);
    setNewBookmark({ id: '', title: '', description: '', link: '' });
  };

  const handleUpdate = () => {
    if (editingBookmark) {
      updateBookmark(editingBookmark.id, {
        title: editingBookmark.title,
        description: editingBookmark.description,
        link: '',
        id: '',
      });
      setEditingBookmark(null);
    }
  };

  const handleDelete = (id: string) => {
    deleteBookmark(id);
  };

  return (
    <div>
      {/* Form to create a new bookmark */}
      <div>
        <h2>Create a New Bookmark</h2>
        <input
          type="text"
          placeholder="Title"
          value={newBookmark.title}
          onChange={(e) => setNewBookmark({ ...newBookmark, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newBookmark.description}
          onChange={(e) => setNewBookmark({ ...newBookmark, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Link"
          value={newBookmark.link}
          onChange={(e) => setNewBookmark({ ...newBookmark, link: e.target.value })}
        />
        <button onClick={handleCreate}>Create</button>
      </div>

      {/* Render the list of bookmarks */}
      {bookmarks.map((bookmark: Bookmark) => (
        <div key={bookmark.id}>
          <h2>{bookmark.title}</h2>
          <p>{bookmark.description}</p>
          <a href={bookmark.link} target="_blank" rel="noopener noreferrer">
            Link
          </a>

          {/* Buttons to update or delete the bookmark */}
          <button onClick={() => setEditingBookmark({ id: bookmark.id, title: bookmark.title, description: bookmark.description })}>
            Edit
          </button>
          <button onClick={() => handleDelete(bookmark.id)}>Delete</button>
        </div>
      ))}

      {/* Form to update an existing bookmark */}
      {editingBookmark && (
        <div>
          <h2>Edit Bookmark</h2>
          <input
            type="text"
            placeholder="Title"
            value={editingBookmark.title}
            onChange={(e) => setEditingBookmark({ ...editingBookmark, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={editingBookmark.description}
            onChange={(e) => setEditingBookmark({ ...editingBookmark, description: e.target.value })}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditingBookmark(null)}>Cancel</button>
        </div>
      )}

      {/* Loading and error messages */}
      {loading && <div>Loading...</div>}
      {error && <div>Error in system</div>}
    </div>
  );
};

export default BookmarkComponent;
