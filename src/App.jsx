import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import Nav from "./components/Nav.jsx";
import ViewArticle from "./components/ViewArticle.jsx";
import { UserProvider } from "./contexts/User.jsx";

export default function App() {
  const [page, setPage] = useState(1);
  return (
    <UserProvider>
      <main className="main">
        <Header id="main-header" />
        <h2 className="welcome-message">Welcome to NC News!</h2>
        <Nav setPage={setPage} />
        <Routes>
          <Route path="/" element={<Home page={page} setPage={setPage} />} />
          <Route path="/articles/:article_id" element={<ViewArticle />} />
        </Routes>
        <Footer id="main-footer" />
      </main>
    </UserProvider>
  );
}
