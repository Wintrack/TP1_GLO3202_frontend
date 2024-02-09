import React, { useEffect, useState } from 'react';
import './bookmark.css';

function Home() {
  const [data, setData] = useState([]);

  const getBookmarks = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      let token = localStorage.getItem('access_token');
      const response = await fetch(`${apiUrl}/bookmark`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonResponse = await response.json();
      setData(jsonResponse);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <div className='container'>
      <div className='title'>
        <h1>BookMark Dashboard</h1>
      </div>
      <div className='bookmarks'>
        <div className='items'>
          {data.map((bookmark, index) => (
            <div key={index} className="bookmark-item">
              <h2>{bookmark.title}</h2>
              <p>{bookmark.description}</p>
              <a href={bookmark.link} target="_blank" rel="noopener noreferrer">Go to Bookmark</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
