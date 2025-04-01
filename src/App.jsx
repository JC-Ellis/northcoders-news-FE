import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import './App.css'
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx"
import Nav from "./components/Nav.jsx";

function App() {
  const [page, setPage] = useState(1);
  return (
    <>
        <main className="main">
      <Header />
      <h2>Welcome to NC News!</h2>
      <Nav setPage={setPage}/>
      <Routes>
      <Route path="/" element={<Home page={page} setPage={setPage}/>} />
      </Routes>
      <Footer />
    </main>
      </>
  )
}

export default App
