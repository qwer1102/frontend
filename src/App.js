import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NicknamePage from './NicknamePage';
import ChatPage from './ChatPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NicknamePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
