import React, { useState } from "react";

export const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registrationId, setRegistrationId] = useState("");
    const [institutionType, setInstitutionType] = useState("");
    const [declaration, setDeclaration] = useState(false);

    const [error, setError] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkInstitutionalEmail = (emailAddress: string) => {
        const emailDomain = emailAddress.split("@")[1]?.toLowerCase();

        if (!emailDomain) {
            return false;
        }

        // Block common personal email providers
        const personalDomains = [
            "gmail.com",
            "yahoo.com",
            "outlook.com",
            "hotmail.com",
            "icloud.com",
            "protonmail.com"
        ];

        if (personalDomains.includes(emailDomain)) {
            return false;
        }

        // Accept common academic/institutional domain patterns
        return (
            emailDomain.endsWith(".edu") ||
            emailDomain.endsWith(".edu.in") ||
            emailDomain.endsWith(".ac.in") ||
            emailDomain.endsWith(".ac.uk") ||
            emailDomain.endsWith(".edu.au") ||
            emailDomain.includes(".gov.") ||
            emailDomain.endsWith(".gov.in")
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setIsVerified(false);

        const trimmedEmail = email.trim().toLowerCase();
        const trimmedRegistrationId = registrationId.trim();

        // Rule 1: Required fields
        if (
            !trimmedEmail ||
            !password ||
            !trimmedRegistrationId ||
            !institutionType
        ) {
            setError("Please complete all required institution verification fields.");
            return;
        }

        // Rule 2: Institutional email verification
        if (!checkInstitutionalEmail(trimmedEmail)) {
            setError(
                "Please use an official institutional email address. Personal email providers are not accepted."
            );
            return;
        }

        // Rule 3: Minimum password requirement for the prototype
        if (password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        // Rule 4: Institution registration ID
        if (trimmedRegistrationId.length < 5) {
            setError(
                "Please enter a valid institutional registration ID."
            );
            return;
        }

        // Rule 5: Institutional declaration
        if (!declaration) {
            setError(
                "Please confirm that the institution is officially registered and authorised to use the platform."
            );
            return;
        }

        /*
         * PROTOTYPE VERIFICATION
         *
         * In the production version, this section should call your backend.
         *
         * Backend verification should check:
         *
         * 1. Institutional email/domain
         * 2. Official institution registration details
         * 3. Government/academic registry information
         * 4. Uploaded institutional documentation
         * 5. Administrator approval
         * 6. Institution verification status
         *
         * The frontend should NEVER be responsible for deciding
         * whether an institution is genuinely verified.
         */

        setIsVerified(true);
        setIsLoggedIn(true);
    };

    // VERIFIED INSTITUTION DASHBOARD
    if (isLoggedIn && isVerified) {
        return (
            <main
                style={{
                    minHeight: "100vh",
                    padding: "40px",
                    background: "#f7f8fa",
                    fontFamily: "Inter, sans-serif"
                }}
            >
                <div
                    style={{
                        maxWidth: "680px",
                        margin: "0 auto",
                        background: "white",
                        padding: "32px",
                        borderRadius: "16px",
                        border: "1px solid #dedede"
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "7px 12px",
                            borderRadius: "20px",
                            background: "#ecfdf3",
                            color: "#15803d",
                            fontSize: "12px",
                            fontWeight: 700,
                            marginBottom: "16px"
                        }}
                    >
                        <span>✓</span>
                        VERIFIED INSTITUTION
                    </div>

                    <p
                        style={{
                            color: "#2563eb",
                            fontWeight: 700,
                            fontSize: "11px",
                            letterSpacing: "1.8px",
                            marginBottom: "6px"
                        }}
                    >
                        INSTITUTION PORTAL
                    </p>

                    <h1
                        style={{
                            marginTop: "4px",
                            marginBottom: "10px"
                        }}
                    >
                        Institutional Dashboard
                    </h1>

                    <p
                        style={{
                            color: "#666",
                            lineHeight: 1.6
                        }}
                    >
                        Your institutional account has passed the initial
                        verification checks and is authorised to access the
                        resource provider portal.
                    </p>

                    <div
                        style={{
                            marginTop: "24px",
                            padding: "18px",
                            borderRadius: "12px",
                            background: "#f7f8fa",
                            border: "1px solid #eeeeee"
                        }}
                    >
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "150px 1fr",
                                gap: "12px",
                                fontSize: "13px"
                            }}
                        >
                            <strong>Institutional Email</strong>
                            <span>{email}</span>

                            <strong>Registration ID</strong>
                            <span>{registrationId}</span>

                            <strong>Institution Type</strong>
                            <span>{institutionType}</span>

                            <strong>Verification</strong>
                            <span
                                style={{
                                    color: "#15803d",
                                    fontWeight: 700
                                }}
                            >
                                Verified
                            </span>

                            <strong>Admin Approval</strong>
                            <span
                                style={{
                                    color: "#15803d",
                                    fontWeight: 700
                                }}
                            >
                                Approved
                            </span>
                        </div>
                    </div>

                    <div
                        style={{
                            marginTop: "24px",
                            padding: "16px",
                            borderRadius: "12px",
                            background: "#f8fafc",
                            border: "1px solid #e2e8f0"
                        }}
                    >
                        <p
                            style={{
                                margin: "0 0 8px",
                                fontSize: "12px",
                                fontWeight: 700,
                                color: "#333"
                            }}
                        >
                            RESOURCE PROVIDER ACCESS
                        </p>

                        <p
                            style={{
                                margin: 0,
                                fontSize: "12px",
                                lineHeight: 1.5,
                                color: "#666"
                            }}
                        >
                            Resource listings and sensitive equipment access
                            remain subject to resource-level verification,
                            availability, approval and responsible facility
                            manager authorisation.
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            setIsLoggedIn(false);
                            setIsVerified(false);
                        }}
                        style={{
                            marginTop: "20px",
                            padding: "10px 20px",
                            background: "#171717",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: 600
                        }}
                    >
                        Log Out
                    </button>
                </div>
            </main>
        );
    }

    // LOGIN PAGE
    return (
        <>
            <style>{`
                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    font-family: Inter, -apple-system, BlinkMacSystemFont,
                        "Segoe UI", sans-serif;
                    background: #f7f8fa;
                    color: #171717;
                }

                .login-page {
                    width: 100%;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 32px 20px;
                    background: #f7f8fa;
                }

                .login-wrapper {
                    width: 100%;
                    max-width: 480px;
                    display: flex;
                    flex-direction: column;
                    gap: 22px;
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
                    box-shadow:
                        0 4px 12px rgba(0, 0, 0, 0.03);
                }

                .card-content {
                    padding: 26px;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .verification-banner {
                    display: flex;
                    gap: 10px;
                    align-items: flex-start;
                    padding: 13px 14px;
                    border-radius: 10px;
                    background: #f8fafc;
                    border: 1px solid #e5e7eb;
                }

                .verification-icon {
                    width: 22px;
                    height: 22px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: #171717;
                    color: white;
                    font-size: 11px;
                    font-weight: 700;
                    flex-shrink: 0;
                }

                .verification-banner strong {
                    display: block;
                    font-size: 12px;
                    margin-bottom: 3px;
                }

                .verification-banner p {
                    margin: 0;
                    color: #666;
                    font-size: 11px;
                    line-height: 1.45;
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

                .required {
                    color: #dc2626;
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
                    transition:
                        border-color 0.2s ease,
                        box-shadow 0.2s ease;
                }

                .input-box:focus-within {
                    border-color: #2563eb;
                    box-shadow:
                        0 0 0 3px rgba(37, 99, 235, 0.08);
                }

                .input-box span {
                    margin-right: 9px;
                    font-size: 15px;
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

                select {
                    width: 100%;
                    height: 44px;
                    padding: 0 12px;
                    border: 1px solid #dedede;
                    border-radius: 12px;
                    background: white;
                    color: #222;
                    font-size: 14px;
                    outline: none;
                    cursor: pointer;
                }

                select:focus {
                    border-color: #2563eb;
                    box-shadow:
                        0 0 0 3px rgba(37, 99, 235, 0.08);
                }

                .field-help {
                    margin: 0;
                    font-size: 10px;
                    color: #888;
                    line-height: 1.4;
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

                .label-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .declaration {
                    display: flex;
                    align-items: flex-start;
                    gap: 9px;
                    padding: 12px;
                    border: 1px solid #eeeeee;
                    border-radius: 10px;
                    background: #fafafa;
                    cursor: pointer;
                }

                .declaration input {
                    margin-top: 2px;
                    accent-color: #2563eb;
                    width: 15px;
                    height: 15px;
                    flex-shrink: 0;
                }

                .declaration span {
                    color: #555;
                    font-size: 11px;
                    line-height: 1.45;
                }

                .error-message {
                    padding: 11px 12px;
                    border-radius: 9px;
                    background: #fef2f2;
                    border: 1px solid #fecaca;
                    color: #b91c1c;
                    font-size: 11px;
                    line-height: 1.45;
                }

                .submit-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    width: 100%;
                    min-height: 46px;
                    padding: 0 16px;
                    border: none;
                    border-radius: 10px;
                    background: #171717;
                    color: white;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 4px;
                    transition:
                        background 0.2s ease,
                        transform 0.2s ease;
                }

                .submit-button:hover {
                    background: #2563eb;
                    transform: translateY(-1px);
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

                @media (max-width: 520px) {
                    .login-page {
                        padding: 20px 12px;
                    }

                    .card-content {
                        padding: 20px;
                    }

                    .login-header h1 {
                        font-size: 28px;
                    }
                }
            `}</style>

            <main className="login-page">
                <div className="login-wrapper">

                    <div className="login-header">
                        <p className="eyebrow">
                            INSTITUTION PORTAL
                        </p>

                        <h1>
                            Institutional Login
                        </h1>

                        <p className="subtitle">
                            Verified institutions can securely access the
                            resource provider platform.
                        </p>
                    </div>

                    <div className="card">
                        <div className="card-content">

                            <div className="verification-banner">
                                <div className="verification-icon">
                                    ✓
                                </div>

                                <div>
                                    <strong>
                                        Institution verification required
                                    </strong>

                                    <p>
                                        Access is restricted to officially
                                        registered and administrator-approved
                                        institutions.
                                    </p>
                                </div>
                            </div>

                            <form
                                className="login-form"
                                onSubmit={handleSubmit}
                            >

                                <div className="form-group">
                                    <label htmlFor="email">
                                        Institutional Email{" "}
                                        <span className="required">*</span>
                                    </label>

                                    <div className="input-box">
                                        <span>✉</span>

                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            placeholder="researcher@institution.edu"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </div>

                                    <p className="field-help">
                                        Use your official institutional
                                        email. Personal email providers are
                                        not accepted.
                                    </p>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="registrationId">
                                        Institution Registration ID{" "}
                                        <span className="required">*</span>
                                    </label>

                                    <div className="input-box">
                                        <span>▣</span>

                                        <input
                                            id="registrationId"
                                            type="text"
                                            required
                                            placeholder="Official registration / institution ID"
                                            value={registrationId}
                                            onChange={(e) =>
                                                setRegistrationId(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <p className="field-help">
                                        This will be checked against the
                                        institution's official registration
                                        information.
                                    </p>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="institutionType">
                                        Institution Type{" "}
                                        <span className="required">*</span>
                                    </label>

                                    <select
                                        id="institutionType"
                                        required
                                        value={institutionType}
                                        onChange={(e) =>
                                            setInstitutionType(
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">
                                            Select institution type
                                        </option>

                                        <option value="Research Institution">
                                            Research Institution
                                        </option>

                                        <option value="University">
                                            University
                                        </option>

                                        <option value="College">
                                            College
                                        </option>

                                        <option value="Hospital">
                                            Hospital
                                        </option>

                                        <option value="Laboratory">
                                            Laboratory
                                        </option>

                                        <option value="Government Institution">
                                            Government Institution
                                        </option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <div className="label-row">
                                        <label htmlFor="password">
                                            Password{" "}
                                            <span className="required">*</span>
                                        </label>

                                        <a
                                            href="#forgot"
                                            className="forgot-link"
                                        >
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
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <label className="declaration">
                                    <input
                                        type="checkbox"
                                        checked={declaration}
                                        onChange={(e) =>
                                            setDeclaration(
                                                e.target.checked
                                            )
                                        }
                                    />

                                    <span>
                                        I confirm that this account
                                        represents an officially registered
                                        institution and that the information
                                        provided is accurate. I understand
                                        that access is subject to
                                        administrator verification.
                                    </span>
                                </label>

                                {error && (
                                    <div className="error-message">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="submit-button"
                                >
                                    Verify Institution & Sign In
                                    <span>→</span>
                                </button>

                            </form>

                            <div className="card-footer">
                                <div className="support-info">
                                    <span>
                                        VERIFICATION & SUPPORT
                                    </span>

                                    <p>
                                        Institution verification may require
                                        official registration information and
                                        administrator approval. For
                                        assistance, contact the platform
                                        administrator.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="system-status">
                        <span className="status-dot"></span>
                        <span>
                            Secure institutional access
                        </span>
                    </div>

                </div>
            </main>
        </>
    );
};

export default Login;