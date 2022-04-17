import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import HomePage from './components/home_page';
import AddMovie from './components/add_movie';
import EditMovie from './components/edit_movie';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home_page" element={<HomePage />} />
          <Route path="/edit_movie/:id" element={<EditMovie />} />
          <Route path="/add_movie" element={<AddMovie />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
