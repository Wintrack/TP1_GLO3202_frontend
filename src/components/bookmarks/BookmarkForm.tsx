// BookmarkForm.tsx
import React, { useState } from 'react';
import { useBookmarkContext } from './BookmarkContext';

const BookmarkForm: React.FC = () => {
  const { createBookmark, updateBookmark } = useBookmarkContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [editId, setEditId] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await updateBookmark(editId, title, description);
      setEditId(null);
    } else {
      await createBookmark(title, description, link);
      setTitle('');
      setDescription('');
      setLink('');
    }
  };

  return (
    <form className="bookmark-form" onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" />
      <button type="submit">{editId ? 'Update' : 'Create'} Bookmark</button>
    </form>
  );
};

export default BookmarkForm;
