import { Link } from "react-router-dom";

export default function Nav({ setPage }) {
  function handleHomeClick() {
    setPage(1);
  }
  return (
    <Link to="/">
      <div className="cat-class">
        <div>
          <button onClick={handleHomeClick}>HOME</button>
        </div>
      </div>
    </Link>
  );
}
