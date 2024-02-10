import React, { useEffect, useState } from "react";
import "./bookmark.css";

function CreateBookmark() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
  });

  const getBookmarks = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      let token = localStorage.getItem("access_token");
      const response = await fetch(`${apiUrl}/bookmark`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      setData(jsonResponse);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      let token = localStorage.getItem("access_token");
      const response = await fetch(`${apiUrl}/bookmark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // After successful creation, fetch bookmarks again to update the list
      getBookmarks();
      // Clear the form data after submission
      setFormData({ title: "", description: "", link: "" });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <div className="container">
      <div className="title">
        <h1>BookMark Dashboard</h1>
      </div>
      <div className="bookmarks">
        <div className="items">
          {data.map((bookmark, index) => (
            <div key={index} className="bookmark-item">
              <h2>{bookmark.title}</h2>
              <p>{bookmark.description}</p>
              <a href={bookmark.link} target="_blank" rel="noopener noreferrer">
                Go to Bookmark
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="create-bookmark">
        <h2>Create Bookmark</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <label>Link:</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
          />
          <button type="submit">Create Bookmark</button>
        </form>
      </div>
    </div>
  );
}

export default CreateBookmark;
