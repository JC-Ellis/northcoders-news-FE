export default function Nav({ setPage }) {
  function handleHomeClick() {
    setPage(1);
  }
  return (
    <div className="cat-class">
      <div>
        <button onClick={handleHomeClick}>HOME</button>
      </div>
    </div>
  );
}
