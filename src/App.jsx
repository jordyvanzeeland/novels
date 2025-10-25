import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from './views/Login.jsx';
import Books from './views/Books.jsx';


function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Books />} />
          <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App