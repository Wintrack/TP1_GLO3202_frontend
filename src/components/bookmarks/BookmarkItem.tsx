// BookmarkItem.tsx
import React from "react";
import { useBookmarkContext, Bookmark } from "./BookmarkContext"; // Import Bookmark type

interface BookmarkItemProps {
    bookmark: Bookmark; // Use the imported Bookmark type
}

const BookmarkItem: React.FC<BookmarkItemProps> = ({ bookmark }) => {
    const { updateBookmark, deleteBookmark } = useBookmarkContext();

    const handleEdit = () => {
        // Logic to set the bookmark to edit mode
        // You will need to implement this logic based on your application's requirements
    };

    const handleDelete = () => {
        deleteBookmark(bookmark.id);
    };

    return (
        <li className="bookmark-item">
            <span>{bookmark.title}</span>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </li>
    );
};

export default BookmarkItem;
