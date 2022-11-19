
import './App.css';
import { Router } from "react-router-dom";
import { Home, Login, Signup } from "./pages/index";

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <Home path="home" />
        <Signup path="signup" />
      </Router>
    </div>
  );

}


export default App;