
import './App.css';
import { Login } from "./pages/index";
import { Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/" />
      </Router>
    </div>
  );
}

export default App;
