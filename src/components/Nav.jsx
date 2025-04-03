import { Link } from "react-router-dom";

export default function Nav({ setPage }) {
  function handleHomeClick() {
    setPage(1);
  }
  return (
    <nav>
    <Link to="/">
      <div className="cat-class">
        <div>
          <button onClick={handleHomeClick}>HOME</button>
        </div>
      </div>
    </Link>
    <p>Choose a topic</p>
    <div className="fancy-container">
      <Link to="/?topic=cooking">
      <div className="cat-class">
        <div>
          <button onClick={handleHomeClick}>Cooking</button>
        </div>
      </div>
      </Link>
      <Link to="/?topic=coding">
      <div className="cat-class">
        <div>
          <button onClick={handleHomeClick}>Coding</button>
        </div>
      </div>
      </Link>
      <Link to="/?topic=football">
      <div className="cat-class">
        <div>
          <button onClick={handleHomeClick}>Football</button>
        </div>
      </div>
      </Link>
    </div>
    </nav>
  );
}
