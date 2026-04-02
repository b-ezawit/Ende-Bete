import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import Layout from './components/Layout';
import Home from './pages/Home';

// Create "Placeholder" components for the pages you haven't coded yet
// This prevents the app from crashing if the files are empty
const Today = () => <div style={{padding: '20px'}}>Today's Schedule Page</div>;
const Comfort = () => <div style={{padding: '20px'}}>Comfort Settings Page</div>;
const Memories = () => <div style={{padding: '20px'}}>Memories Gallery Page</div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* The Layout wraps everything */}
        <Route path="/" element={<Layout />}>
          {/* Index means this is the "Home" or default page */}
          <Route index element={<Home />} />
          <Route path="today" element={<Today />} />
          <Route path="comfort" element={<Comfort />} />
          <Route path="memories" element={<Memories />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;