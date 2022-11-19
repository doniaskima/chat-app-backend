
import './App.css';
import { Router } from "react-router-dom";
import { Home, Login, Signup } from "./pages/index";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <PrivateRoute path="home" />
        <Signup path="signup" />
      </Router>
    </div>
  );

}


export default App;