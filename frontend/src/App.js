import {useState, useEffect} from "react";
import { Routes, Route } from "react-router-dom";

import LoginRegister from "./components/LoginRegister.jsx";
import HomePage from "./components/HomePage.jsx";
import AddFiles from "./components/AddFiles.jsx";
import AddUpdatePost from "./components/AddUpdatePost.jsx";
import Header from "./components/Header.jsx";
import Feed from './components/Feed.jsx'

import logo from './logo.svg';
import './App.css';


function App() {

  const [data, setData] = useState(null);
  const [name, setName] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const send = () => {
   if(name){
    fetch(`${BASE_URL}/api/${name}`)
      .then((res) => {
        console.log("res", res);
        return res.json();
      })
      .then((data) => {
        console.log("data", data);
        setData(data.message);
      })
      .catch((e) => console.log(e));
    }
  }

  return (
    <div className="App">
      {/* <header className="App-header"> */}
      
      {/* <header>
          <Header />
        </header> */}

      {/* <AddUpdatePost /> */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<LoginRegister action={'Register'} />} />
          <Route path="/login" element={<LoginRegister action={'Login'}/>} />
          <Route path="/newpost" element={<AddUpdatePost />} />
          <Route path="/updatepost" element={<AddUpdatePost />} />
          <Route path="/feed" element={<Feed />} />

        </Routes>

      {/* </header> */}

    </div>
  );
}

export default App;
