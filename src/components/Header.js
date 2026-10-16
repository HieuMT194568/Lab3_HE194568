import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",

        margin: "0 auto",
        padding: "20px 30px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <h1 style={{ margin: 0 }}>ProductStore</h1>
      <div style={{ display: "flex", gap: "10px" }}>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/product")}>Product</button>
      </div>
    </header>
  );
}

export default Header;
