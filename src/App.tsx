import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext/AuthContext';
import PrivateRoute from './AuthContext/PrivateRoute';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import BookmarkComponent from './components/bookmarks/Bookmarkcomponent';


const App: React.FC = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private route using PrivateRoute component */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/home" element={<BookmarkComponent />} />
        </Route>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
