import { useState } from "react"
import "./LandingPage.css"
import AuthTest from "./AuthTest";


const LandingPage = ({onLogin}) => {
    const [showAuth, setShowAuth] = useState(false);
    console.log(showAuth,"showAuth")
    return (
        <div className="landing-container">
            <h1 className="landing-title">Welcome to Inippagam</h1>
            <p className="landing-subtitle">
                Sign up or login to start ordering desserts!
            </p>
            {!showAuth ? (
                <div className="button-group">
                    <button className="login-btn" onClick={() => setShowAuth("login")}>
                        Login
                    </button>
                    <button className="signup-btn" onClick={() => setShowAuth("signup")}>
                        Sign Up
                    </button>
                </div>
            ) : (
                <div className="auth-section">
                    <AuthTest onLogin={onLogin} />
                </div>
            )}
        </div>
    )
}
export default LandingPage