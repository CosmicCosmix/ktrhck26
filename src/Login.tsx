import React, { useState } from "react";

interface LoginProps {
    /** Callback triggered when login succeeds to navigate to the next page/dashboard */
    onLoginSuccess?: (userData: { email: string }) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        setIsLoading(true);

        // Mock Authentication API call
        setTimeout(() => {
            setIsLoading(false);

            // Simple validation example
            if (email && password.length >= 6) {
                console.log("Logged in successfully:", { email, rememberMe });

                // Trigger navigation to the next page
                if (onLoginSuccess) {
                    onLoginSuccess({ email });
                } else {
                    // Default fallback redirect
                    window.location.href = "/dashboard";
                }
            } else {
                setErrorMessage("Invalid credentials. Password must be at least 6 characters.");
            }
        }, 1200);
    };

    return (
        <>
            <style>{`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: #f7f8fa;
          color: #171717;
        }
        .login-page {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: #f7f8fa;
        }
        .login-wrapper {
          width: 100%;
          max-width: 440px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .login-header {
          text-align: center;
        }
        .eyebrow {
          margin: 0 0 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.8px;
          color: #2563eb;
          text-transform: uppercase;
        }
        .login-header h1 {
          margin: 0;
          font-size: 32px;
          letter-spacing: -1.2px;
          font-weight: 750;
          color: #171717;
        }
        .subtitle {
          margin: 8px 0 0;
          color: #777;
          font-size: 14px;
          line-height: 1.5;
        }
        .card {
          position: relative;
          width: 100%;
          overflow: hidden;
          border: 1px solid #dedede;
          border-radius: 16px;
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .card:hover {
          transform: translateY(-4px);
          border-color: #c8d7f7;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06), 0 20px 45px rgba(0, 0, 0, 0.08);
        }
        .card-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group label {
          font-size: 12px;
          font-weight: 600;
          color: #333;
        }
        .label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .forgot-link {
          font-size: 12px;
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
        }
        .forgot-link:hover {
          text-decoration: underline;
        }
        .input-box {
          display: flex;
          align-items: center;
          width: 100%;
          height: 44px;
          padding: 0 14px;
          border: 1px solid #dedede;
          border-radius: 12px;
          background: white;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .input-box:focus-within {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
        }
        .input-box span {
          margin-right: 9px;
          font-size: 16px;
          color: #777;
        }
        .input-box input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          color: #222;
          font-size: 14px;
        }
        .error-banner {
          padding: 10px 12px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          border-radius: 8px;
          font-size: 12px;
        }
        .form-options {
          display: flex;
          align-items: center;
        }
        .remember-me {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #555;
          cursor: pointer;
        }
        .remember-me input {
          accent-color: #2563eb;
          width: 16px;
          height: 16px;
        }
        .submit-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          min-height: 44px;
          padding: 0 16px;
          border: none;
          border-radius: 10px;
          background: #171717;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .submit-button:hover:not(:disabled) {
          background: #2563eb;
          transform: translateY(-1px);
        }
        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .card-footer {
          padding-top: 16px;
          border-top: 1px solid #eeeeee;
        }
        .support-info span {
          color: #999;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }
        .support-info p {
          margin: 4px 0 0;
          color: #666;
          font-size: 12px;
          line-height: 1.4;
        }
        .system-status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 12px;
          color: #666;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #15803d;
        }
      `}</style>

            <main className="login-page">
                <div className="login-wrapper">
                    <div className="login-header">
                        <p className="eyebrow">INSTITUTION PORTAL</p>
                        <h1>Welcome back</h1>
                        <p className="subtitle">
                            Enter your institutional credentials to access your account.
                        </p>
                    </div>

                    <div className="card">
                        <div className="card-content">
                            {errorMessage && (
                                <div className="error-banner">{errorMessage}</div>
                            )}

                            <form className="login-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Institutional Email</label>
                                    <div className="input-box">
                                        <span>✉</span>
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            placeholder="username@institution.edu"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="label-row">
                                        <label htmlFor="password">Password</label>
                                        <a href="#forgot" className="forgot-link">
                                            Forgot password?
                                        </a>
                                    </div>
                                    <div className="input-box">
                                        <span>🔒</span>
                                        <input
                                            id="password"
                                            type="password"
                                            required
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-options">
                                    <label className="remember-me">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        <span>Remember this device</span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="submit-button"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Authenticating..." : "Sign In"} <span>→</span>
                                </button>
                            </form>

                            <div className="card-footer">
                                <div className="support-info">
                                    <span>NEED ASSISTANCE?</span>
                                    <p>
                                        Contact IT Helpdesk at{" "}
                                        <strong>support@institution.edu</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="system-status">
                        <span className="status-dot"></span>
                        <span>All systems operational</span>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Login;