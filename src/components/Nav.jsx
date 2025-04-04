import { Link } from "react-router-dom";

export default function Nav({ setPage }) {
  function handleHomeClick() {
    setPage(1);
  }
  return (
    <nav className="main-nav" id="main-nav">
      <div className="nav-home">
        <Link to="/" className="nav-link">
          <button onClick={handleHomeClick} className="nav-button">
            HOME
          </button>
        </Link>
      </div>
      <h3 className="nav-title">Choose a topic</h3>
      <div className="nav-topics fancy-container">
        <Link to="/?topic=cooking" className="nav-link">
          <button onClick={handleHomeClick} className="nav-button">
            Cooking
          </button>
        </Link>
        <Link to="/?topic=coding" className="nav-link">
          <button onClick={handleHomeClick} className="nav-button">
            Coding
          </button>
        </Link>
        <Link to="/?topic=football" className="nav-link">
          <button onClick={handleHomeClick} className="nav-button">
            Football
          </button>
        </Link>
      </div>
    </nav>
  );
}
