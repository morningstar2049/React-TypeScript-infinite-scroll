import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import User from "./components/User";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserList />}></Route>
      <Route path="/user/:id" element={<User />}></Route>
    </Routes>
  );
}

export default App;
