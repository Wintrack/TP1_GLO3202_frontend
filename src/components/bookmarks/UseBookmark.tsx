import { useState, useEffect } from 'react';
import { Bookmark } from './Bookmark';
import { useAuth } from '../../AuthContext/AuthContext'; // Adjust the import path accordingly

export const useBookmarks = () => {
  const { isAuthenticated } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookmarks = async () => {
    if (!isAuthenticated) {
      // Don't fetch bookmarks if the user is not authenticated
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('https://backend-6xa4.onrender.com/bookmark', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setBookmarks(data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const createBookmark = async (bookmark: Bookmark) => {
    if (!isAuthenticated) {
      // Don't create bookmarks if the user is not authenticated
      return;
    }

    const token = localStorage.getItem('access_token');
    const response = await fetch('https://backend-6xa4.onrender.com/bookmark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(bookmark),
    });
    if (response.ok) {
      const newBookmark = await response.json();
      setBookmarks([...bookmarks, newBookmark]);
    } else {
      throw new Error('Failed to create bookmark');
    }
  };

  const updateBookmark = async (id: string, bookmark: Bookmark) => {
    if (!isAuthenticated) {
      // Don't update bookmarks if the user is not authenticated
      return;
    }

    const token = localStorage.getItem('access_token');
    const response = await fetch(`https://backend-6xa4.onrender.com/bookmark/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(bookmark),
    });
    if (response.ok) {
      const updatedBookmark = await response.json();
      setBookmarks(bookmarks.map((b) => (b.id === id ? updatedBookmark : b)));
    } else {
      throw new Error('Failed to update bookmark');
    }
  };

  const deleteBookmark = async (id: string) => {
    if (!isAuthenticated) {
      // Don't delete bookmarks if the user is not authenticated
      return;
    }

    const token = localStorage.getItem('access_token');
    const response = await fetch(`https://backend-6xa4.onrender.com/bookmark/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setBookmarks(bookmarks.filter((b) => b.id !== id));
    } else {
      throw new Error('Failed to delete bookmark');
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [isAuthenticated]);

  return { bookmarks, loading, error, createBookmark, updateBookmark, deleteBookmark };
};
