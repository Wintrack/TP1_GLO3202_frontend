// BookmarkContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useMemo,
  useCallback, // Import useCallback
} from "react";
import axios from "axios";

export interface Bookmark {
  id: string;
  title: string;
  description: string;
  link: string;
}

interface BookmarkContextData {
  bookmarks: Bookmark[];
  createBookmark: (
      title: string,
      description: string,
      link: string
  ) => Promise<void>;
  updateBookmark: (
      id: string,
      title: string,
      description: string
  ) => Promise<void>;
  deleteBookmark: (id: string) => Promise<void>;
  setEditId: (id: string) => void; // Add this line
  handleDelete: (id: string) => void; // Add this line
}


const BookmarkContext = createContext<BookmarkContextData | undefined>(
  undefined
);

export const useBookmarkContext = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
      throw new Error(
          "useBookmarkContext must be used within a BookmarkProvider"
      );
  }
  return context;
};

interface BookmarkProviderProps {
  children: ReactNode;
}

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({
  children,
}) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
      fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
      try {
          const response = await axios.get(
              "https://backend-6xa4.onrender.com/bookmark"
          );
          setBookmarks(response.data);
      } catch (error) {
          console.error("Error fetching bookmarks:", error);
      }
  };

  const createBookmark = useCallback(async (
      title: string,
      description: string,
      link: string
  ) => {
      try {
          const response = await axios.post(
              "https://backend-6xa4.onrender.com/bookmark",
              {
                  title,
                  description,
                  link,
              }
          );
          setBookmarks([...bookmarks, response.data]);
      } catch (error) {
          console.error("Error creating bookmark:", error);
      }
  }, [bookmarks]); // Add bookmarks as a dependency

  const updateBookmark = useCallback(async (
      id: string,
      title: string,
      description: string
  ) => {
      try {
          const response = await axios.put(
              `https://backend-6xa4.onrender.com/bookmark`,
              {
                  id,
                  title,
                  description,
              }
          );
          setBookmarks(
              bookmarks.map((bookmark) =>
                  bookmark.id === id ? response.data : bookmark
              )
          );
      } catch (error) {
          console.error("Error updating bookmark:", error);
      }
  }, [bookmarks]); // Add bookmarks as a dependency

  const deleteBookmark = useCallback(async (id: string) => {
      try {
          await axios.delete(
              `https://backend-6xa4.onrender.com/bookmark/${id}`
          );
          setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
      } catch (error) {
          console.error("Error deleting bookmark:", error);
      }
  }, [bookmarks]); // Add bookmarks as a dependency

  const handleDelete = useCallback(async (id: string) => {
    try {
      await axios.delete(`https://backend-6xa4.onrender.com/bookmark/${id}`);
      setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  }, [bookmarks]);

  const value = useMemo(
    () => ({
      bookmarks,
      createBookmark,
      updateBookmark,
      deleteBookmark,
      setEditId,
      handleDelete, // Now handleDelete is defined
    }),
    [bookmarks, createBookmark, updateBookmark, deleteBookmark, setEditId, handleDelete] // Add handleDelete to the dependencies array
  );


  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};
