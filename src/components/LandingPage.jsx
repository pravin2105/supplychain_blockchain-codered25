import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Dual-Chain Supply Solution</h1>
      <div className="landing-buttons">
        <Link to="/login">
          <button className="landing-button">Login</button>
        </Link>
        <Link to="/signup">
          <button className="landing-button">Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;