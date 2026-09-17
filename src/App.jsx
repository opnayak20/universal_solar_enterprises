import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import FloatingButtons from "./components/FloatingButtons";

window.history.scrollRestoration = "manual";

window.scrollTo(0, 0);
function App() {
  return (
    <Router>
      <FloatingButtons />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;