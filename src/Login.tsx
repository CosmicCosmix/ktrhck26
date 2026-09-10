import React, { useState } from "react";

export const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f7f8fa;
          font-family: Inter, sans-serif;
        }
        .card {
          background: white;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid #dedede;
          width: 100%;
          max-width: 400px;
        }
        .input-box {
          width: 100%;
          height: 44px;
          border: 1px solid #dedede;
          border-radius: 12px;
          margin-bottom: 12px;
          padding: 0 12px;
        }
        .btn {
          width: 100%;
          height: 44px;
          background: #171717;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
        }
      `}</style>

            <div className="login-page">
                <div className="card">
                    <h2>Sign In</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        className="input-box"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input-box"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="btn">Log In</button>
                </div>
            </div>
        </>
    );
};

export default Login;