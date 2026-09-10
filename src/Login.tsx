< !DOCTYPE html >
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Institution Portal Login</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;750&display=swap"
                rel="stylesheet"
            />
            <link rel="stylesheet" href="style.css" />
        </head>
        <body>
            <main class="main-page">
                <div class="login-wrapper">

                    <!-- Top Brand Header -->
                    <div class="login-header">
                        <p class="eyebrow">INSTITUTION PORTAL</p>
                        <h1>Welcome back</h1>
                        <p class="subtitle">Enter your institutional credentials to access your account.</p>
                    </div>

                    <!-- Main Login Form Card -->
                    <div class="card login-card">
                        <div class="card-content">
                            <form class="login-form" onsubmit="event.preventDefault();">

                                <div class="form-group">
                                    <label for="email">Institutional Email</label>
                                    <div class="input-box">
                                        <span class="icon">✉</span>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="username@institution.edu"
                                            required
                                        />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="label-row">
                                        <label for="password">Password</label>
                                        <a href="#" class="forgot-link">Forgot password?</a>
                                    </div>
                                    <div class="input-box">
                                        <span class="icon">🔒</span>
                                        <input
                                            type="password"
                                            id="password"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>

                                <div class="form-options">
                                    <label class="remember-me">
                                        <input type="checkbox" />
                                        <span>Remember this device</span>
                                    </label>
                                </div>

                                <button type="submit" class="submit-button">
                                    Sign In <span>→</span>
                                </button>
                            </form>

                            <div class="card-footer">
                                <div class="support-info">
                                    <span>NEED ASSISTANCE?</span>
                                    <p>Contact IT Helpdesk at <strong>support@institution.edu</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom System Status Tag -->
                    <div class="system-status">
                        <span class="status-dot"></span>
                        <span>All systems operational</span>
                    </div>

                </div>
            </main>
        </body>
    </html>