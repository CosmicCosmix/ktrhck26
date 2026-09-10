import React, { useState } from "react";

export const Login: React.FC = () => {
    const [institutionName, setInstitutionName] = useState("");
    const [registrationId, setRegistrationId] = useState("");
    const [email, setEmail] = useState("");
    const [representativeName, setRepresentativeName] = useState("");
    const [representativePhone, setRepresentativePhone] = useState("");
    const [institutionType, setInstitutionType] = useState("");
    const [password, setPassword] = useState("");
    const [declaration, setDeclaration] = useState(false);

    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const checkInstitutionalEmail = (emailAddress: string) => {
        const domain = emailAddress.split("@")[1]?.toLowerCase();

        if (!domain) {
            return false;
        }

        const personalDomains = [
            "gmail.com",
            "yahoo.com",
            "outlook.com",
            "hotmail.com",
            "icloud.com",
            "protonmail.com"
        ];

        if (personalDomains.includes(domain)) {
            return false;
        }

        return (
            domain.endsWith(".edu") ||
            domain.endsWith(".edu.in") ||
            domain.endsWith(".ac.in") ||
            domain.endsWith(".ac.uk") ||
            domain.endsWith(".edu.au") ||
            domain.endsWith(".gov.in") ||
            domain.includes(".gov.")
        );
    };

    const checkPhoneNumber = (phone: string) => {
        const cleanedPhone = phone.replace(/\s/g, "");

        return /^[+]?[0-9]{10,15}$/.test(cleanedPhone);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setError("");

        const trimmedInstitutionName = institutionName.trim();
        const trimmedRegistrationId = registrationId.trim();
        const trimmedEmail = email.trim().toLowerCase();
        const trimmedRepresentativeName = representativeName.trim();
        const trimmedPhone = representativePhone.trim();

        if (
            !trimmedInstitutionName ||
            !trimmedRegistrationId ||
            !trimmedEmail ||
            !trimmedRepresentativeName ||
            !trimmedPhone ||
            !institutionType ||
            !password
        ) {
            setError(
                "Please complete all required institution verification fields."
            );
            return;
        }

        if (trimmedInstitutionName.length < 3) {
            setError("Please enter a valid institution name.");
            return;
        }

        if (trimmedRegistrationId.length < 5) {
            setError(
                "Please enter a valid institutional registration or identification number."
            );
            return;
        }

        if (!checkInstitutionalEmail(trimmedEmail)) {
            setError(
                "Please use an official institutional email address. Personal email providers are not accepted."
            );
            return;
        }

        if (trimmedRepresentativeName.length < 3) {
            setError("Please enter the name of the institutional representative.");
            return;
        }

        if (!checkPhoneNumber(trimmedPhone)) {
            setError(
                "Please enter a valid representative phone number."
            );
            return;
        }

        if (password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        if (!declaration) {
            setError(
                "Please confirm that the institution is officially registered and authorised to use the platform."
            );
            return;
        }

        /*
         * PROTOTYPE VERIFICATION
         *
         * In the production version, this information should be
         * sent to the backend for verification.
         *
         * The backend should verify:
         *
         * 1. Institution name
         * 2. Institution registration / identification number
         * 3. Institutional email domain
         * 4. Official registration details
         * 5. Government / academic registry information
         * 6. Representative details
         * 7. Institutional documentation
         * 8. Administrator approval
         *
         * The frontend alone should not decide whether an
         * institution is genuinely verified.
         */

        setIsVerified(true);
        setIsLoggedIn(true);
    };

    if (isLoggedIn && isVerified) {
        return (
            <main className="verified-page">
                <div className="verified-card">

                    <div className="verified-badge">
                        VERIFIED INSTITUTION
                    </div>

                    <p className="eyebrow">
                        INSTITUTION PORTAL
                    </p>

                    <h1>
                        Institutional Dashboard
                    </h1>

                    <p className="verified-description">
                        Your institution has successfully completed the
                        initial verification checks and is authorised to
                        access the resource provider portal.
                    </p>

                    <div className="institution-summary">

                        <div className="summary-row">
                            <span>Institution Name</span>
                            <strong>{institutionName}</strong>
                        </div>

                        <div className="summary-row">
                            <span>Registration ID</span>
                            <strong>{registrationId}</strong>
                        </div>

                        <div className="summary-row">
                            <span>Institution Type</span>
                            <strong>{institutionType}</strong>
                        </div>

                        <div className="summary-row">
                            <span>Institutional Email</span>
                            <strong>{email}</strong>
                        </div>

                        <div className="summary-row">
                            <span>Representative</span>
                            <strong>{representativeName}</strong>
                        </div>

                        <div className="summary-row">
                            <span>Representative Phone</span>
                            <strong>{representativePhone}</strong>
                        </div>

                        <div className="summary-row">
                            <span>Verification Status</span>
                            <strong className="verified-text">
                                Verified
                            </strong>
                        </div>

                        <div className="summary-row">
                            <span>Administrator Approval</span>
                            <strong className="verified-text">
                                Approved
                            </strong>
                        </div>

                    </div>

                    <div className="access-note">
                        <strong>Resource Provider Access</strong>

                        <p>
                            Resources added by this institution will undergo
                            separate resource-level verification, including
                            equipment details, availability, certification,
                            pricing, access terms and facility manager
                            approval.
                        </p>
                    </div>

                    <button
                        className="logout-button"
                        onClick={() => {
                            setIsLoggedIn(false);
                            setIsVerified(false);
                        }}
                    >
                        Log Out
                    </button>

                </div>
            </main>
        );
    }

    return (
        <>
            <style>{`

                * {
                    box-sizing: border-box;
                }

                html,
                body,
                #root {
                    margin: 0;
                    min-height: 100%;
                    width: 100%;
                }

                body {
                    font-family:
                        Inter,
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;
                    background: #f7f8fa;
                    color: #171717;
                }

                .login-page {
                    min-height: 100vh;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 40px 20px;
                    background: #f7f8fa;
                }

                .login-wrapper {
                    width: 100%;
                    max-width: 620px;
                }

                .login-header {
                    text-align: center;
                    margin-bottom: 24px;
                }

                .eyebrow {
                    margin: 0 0 7px;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 1.8px;
                    color: #2563eb;
                    text-transform: uppercase;
                }

                .login-header h1 {
                    margin: 0;
                    font-size: 32px;
                    line-height: 1.15;
                    letter-spacing: -1px;
                    font-weight: 750;
                }

                .subtitle {
                    max-width: 500px;
                    margin: 9px auto 0;
                    color: #777;
                    font-size: 14px;
                    line-height: 1.5;
                }

                .card {
                    width: 100%;
                    border: 1px solid #dedede;
                    border-radius: 16px;
                    background: #ffffff;
                    box-shadow:
                        0 4px 12px rgba(0, 0, 0, 0.03);
                }

                .card-content {
                    padding: 28px;
                }

                .verification-banner {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 14px;
                    margin-bottom: 24px;
                    border: 1px solid #e5e7eb;
                    border-radius: 10px;
                    background: #f8fafc;
                }

                .verification-mark {
                    width: 22px;
                    height: 22px;
                    min-width: 22px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: #171717;
                    color: white;
                    font-size: 12px;
                    font-weight: 700;
                }

                .verification-banner strong {
                    display: block;
                    margin-bottom: 3px;
                    font-size: 12px;
                }

                .verification-banner p {
                    margin: 0;
                    color: #666;
                    font-size: 11px;
                    line-height: 1.5;
                }

                .login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 17px;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
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
                    width: 100%;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    padding: 0 13px;
                    border: 1px solid #dedede;
                    border-radius: 10px;
                    background: #ffffff;
                    transition:
                        border-color 0.2s ease,
                        box-shadow 0.2s ease;
                }

                .input-box:focus-within {
                    border-color: #2563eb;
                    box-shadow:
                        0 0 0 3px rgba(37, 99, 235, 0.08);
                }

                .input-box input {
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: none;
                    background: transparent;
                    color: #222;
                    font-size: 14px;
                }

                .input-box input::placeholder {
                    color: #aaa;
                }

                select {
                    width: 100%;
                    height: 44px;
                    padding: 0 12px;
                    border: 1px solid #dedede;
                    border-radius: 10px;
                    background: #ffffff;
                    color: #222;
                    font-size: 14px;
                    outline: none;
                }

                select:focus {
                    border-color: #2563eb;
                    box-shadow:
                        0 0 0 3px rgba(37, 99, 235, 0.08);
                }

                .field-help {
                    margin: 0;
                    color: #888;
                    font-size: 10px;
                    line-height: 1.4;
                }

                .label-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .forgot-link {
                    color: #2563eb;
                    font-size: 12px;
                    text-decoration: none;
                }

                .forgot-link:hover {
                    text-decoration: underline;
                }

                .declaration {
                    display: flex;
                    align-items: flex-start;
                    gap: 9px;
                    padding: 13px;
                    margin-top: 2px;
                    border: 1px solid #eeeeee;
                    border-radius: 10px;
                    background: #fafafa;
                    cursor: pointer;
                }

                .declaration input {
                    width: 15px;
                    height: 15px;
                    margin-top: 2px;
                    accent-color: #2563eb;
                    flex-shrink: 0;
                }

                .declaration span {
                    color: #555;
                    font-size: 11px;
                    line-height: 1.5;
                }

                .error-message {
                    padding: 11px 12px;
                    border: 1px solid #fecaca;
                    border-radius: 9px;
                    background: #fef2f2;
                    color: #b91c1c;
                    font-size: 11px;
                    line-height: 1.45;
                }

                .submit-button {
                    width: 100%;
                    min-height: 46px;
                    margin-top: 3px;
                    padding: 0 18px;
                    border: none;
                    border-radius: 10px;
                    background: #171717;
                    color: #ffffff;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition:
                        background 0.2s ease,
                        transform 0.2s ease;
                }

                .submit-button:hover {
                    background: #2563eb;
                    transform: translateY(-1px);
                }

                .card-footer {
                    margin-top: 22px;
                    padding-top: 17px;
                    border-top: 1px solid #eeeeee;
                }

                .support-title {
                    color: #999;
                    font-size: 9px;
                    font-weight: 700;
                    letter-spacing: 0.7px;
                }

                .support-text {
                    margin: 4px 0 0;
                    color: #666;
                    font-size: 11px;
                    line-height: 1.45;
                }

                .system-status {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                    margin-top: 18px;
                    color: #666;
                    font-size: 12px;
                }

                .status-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #15803d;
                }

                /* VERIFIED PAGE */

                .verified-page {
                    min-height: 100vh;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 20px;
                    background: #f7f8fa;
                    font-family:
                        Inter,
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;
                }

                .verified-card {
                    width: 100%;
                    max-width: 680px;
                    padding: 32px;
                    border: 1px solid #dedede;
                    border-radius: 16px;
                    background: #ffffff;
                    box-shadow:
                        0 4px 12px rgba(0, 0, 0, 0.03);
                }

                .verified-badge {
                    display: inline-flex;
                    padding: 7px 11px;
                    margin-bottom: 18px;
                    border-radius: 20px;
                    background: #ecfdf3;
                    color: #15803d;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                }

                .verified-card h1 {
                    margin: 0 0 10px;
                    font-size: 30px;
                    letter-spacing: -0.8px;
                }

                .verified-description {
                    margin: 0;
                    color: #666;
                    font-size: 14px;
                    line-height: 1.6;
                }

                .institution-summary {
                    margin-top: 24px;
                    padding: 18px;
                    border: 1px solid #eeeeee;
                    border-radius: 12px;
                    background: #fafafa;
                }

                .summary-row {
                    display: grid;
                    grid-template-columns: 180px 1fr;
                    gap: 15px;
                    padding: 10px 0;
                    border-bottom: 1px solid #eeeeee;
                    font-size: 12px;
                }

                .summary-row:last-child {
                    border-bottom: none;
                }

                .summary-row span {
                    color: #777;
                }

                .summary-row strong {
                    color: #222;
                    overflow-wrap: anywhere;
                }

                .verified-text {
                    color: #15803d !important;
                }

                .access-note {
                    margin-top: 20px;
                    padding: 16px;
                    border: 1px solid #e5e7eb;
                    border-radius: 10px;
                    background: #f8fafc;
                }

                .access-note strong {
                    font-size: 12px;
                }

                .access-note p {
                    margin: 6px 0 0;
                    color: #666;
                    font-size: 11px;
                    line-height: 1.5;
                }

                .logout-button {
                    margin-top: 20px;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 8px;
                    background: #171717;
                    color: #ffffff;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                }

                .logout-button:hover {
                    background: #2563eb;
                }

                /* TABLET */

                @media (max-width: 700px) {

                    .login-page {
                        align-items: flex-start;
                        padding: 28px 16px;
                    }

                    .login-header h1 {
                        font-size: 29px;
                    }

                    .card-content {
                        padding: 22px;
                    }

                    .form-row {
                        grid-template-columns: 1fr;
                        gap: 17px;
                    }

                    .verified-page {
                        align-items: flex-start;
                        padding: 28px 16px;
                    }

                    .verified-card {
                        padding: 24px;
                    }
                }

                /* MOBILE */

                @media (max-width: 480px) {

                    .login-page {
                        padding: 20px 10px;
                    }

                    .login-header {
                        margin-bottom: 18px;
                    }

                    .login-header h1 {
                        font-size: 26px;
                    }

                    .subtitle {
                        font-size: 13px;
                    }

                    .card {
                        border-radius: 12px;
                    }

                    .card-content {
                        padding: 18px;
                    }

                    .verification-banner {
                        padding: 12px;
                    }

                    .login-form {
                        gap: 15px;
                    }

                    .input-box,
                    select {
                        height: 46px;
                    }

                    .submit-button {
                        min-height: 48px;
                    }

                    .verified-card {
                        padding: 20px;
                        border-radius: 12px;
                    }

                    .verified-card h1 {
                        font-size: 25px;
                    }

                    .summary-row {
                        grid-template-columns: 1fr;
                        gap: 4px;
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
                            Access is limited to officially registered and
                            verified institutions.
                        </p>
                    </div>

                    <div className="card">
                        <div className="card-content">

                            <div className="verification-banner">
                                <div className="verification-mark">
                                    V
                                </div>

                                <div>
                                    <strong>
                                        Institution verification required
                                    </strong>

                                    <p>
                                        Your institutional identity and
                                        registration details will be checked
                                        before provider access is granted.
                                    </p>
                                </div>
                            </div>

                            <form
                                className="login-form"
                                onSubmit={handleSubmit}
                            >

                                <div className="form-group">
                                    <label htmlFor="institutionName">
                                        Institution Name
                                        <span className="required"> *</span>
                                    </label>

                                    <div className="input-box">
                                        <input
                                            id="institutionName"
                                            type="text"
                                            required
                                            placeholder="Enter official institution name"
                                            value={institutionName}
                                            onChange={(e) =>
                                                setInstitutionName(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="form-row">

                                    <div className="form-group">
                                        <label htmlFor="registrationId">
                                            Institution Registration / ID Number
                                            <span className="required"> *</span>
                                        </label>

                                        <div className="input-box">
                                            <input
                                                id="registrationId"
                                                type="text"
                                                required
                                                placeholder="Official registration number"
                                                value={registrationId}
                                                onChange={(e) =>
                                                    setRegistrationId(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <p className="field-help">
                                            This should correspond to the
                                            institution's official records.
                                        </p>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="institutionType">
                                            Institution Type
                                            <span className="required"> *</span>
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
                                                Select type
                                            </option>

                                            <option value="University">
                                                University
                                            </option>

                                            <option value="College">
                                                College
                                            </option>

                                            <option value="Research Institution">
                                                Research Institution
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

                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">
                                        Institutional Email
                                        <span className="required"> *</span>
                                    </label>

                                    <div className="input-box">
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            placeholder="official@institution.edu"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </div>

                                    <p className="field-help">
                                        Personal email providers such as
                                        Gmail, Yahoo and Outlook are not
                                        accepted.
                                    </p>
                                </div>

                                <div className="form-row">

                                    <div className="form-group">
                                        <label htmlFor="representativeName">
                                            Authorised Representative
                                            <span className="required"> *</span>
                                        </label>

                                        <div className="input-box">
                                            <input
                                                id="representativeName"
                                                type="text"
                                                required
                                                placeholder="Full name"
                                                value={representativeName}
                                                onChange={(e) =>
                                                    setRepresentativeName(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="representativePhone">
                                            Representative Phone Number
                                            <span className="required"> *</span>
                                        </label>

                                        <div className="input-box">
                                            <input
                                                id="representativePhone"
                                                type="tel"
                                                required
                                                placeholder="+91 9876543210"
                                                value={representativePhone}
                                                onChange={(e) =>
                                                    setRepresentativePhone(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="form-group">
                                    <div className="label-row">
                                        <label htmlFor="password">
                                            Password
                                            <span className="required"> *</span>
                                        </label>

                                        <a
                                            href="#forgot"
                                            className="forgot-link"
                                        >
                                            Forgot password?
                                        </a>
                                    </div>

                                    <div className="input-box">
                                        <input
                                            id="password"
                                            type="password"
                                            required
                                            placeholder="Enter password"
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
                                        that institutional access is subject
                                        to official verification and
                                        administrator approval.
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
                                    Verify Institution and Sign In
                                </button>

                            </form>

                            <div className="card-footer">
                                <div className="support-title">
                                    INSTITUTION VERIFICATION
                                </div>

                                <p className="support-text">
                                    Verification may include institutional
                                    domain validation, official registration
                                    records, government or academic registry
                                    checks, submitted documentation and
                                    administrator approval.
                                </p>
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

