import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="top-right">
        <button onClick={() => navigate("/signin")}>Sign In</button>
        <button onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
      <div className="center">
        <div className="text">
          <h1>Welcome to Your Journal</h1>
          <p>Start your journey by typing your thoughts.</p>
        </div>
        <button className="start-btn" onClick={() => navigate("/mood")}>
          Start Typing the Journal
        </button>
      </div>
    </div>
  );
}
