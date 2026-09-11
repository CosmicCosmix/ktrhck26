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
            setError(
                "Please enter the name of the institutional representative."
            );
            return;
        }

        if (!checkPhoneNumber(trimmedPhone)) {
            setError("Please enter a valid representative phone number.");
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
         * In production, these details should be sent to the backend.
         * The backend should verify institutional registration details,
         * institutional email, official records, documentation and
         * administrator approval.
         */

        setIsVerified(true);
        setIsLoggedIn(true);
    };

    if (isLoggedIn && isVerified) {
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
                        background: #f5f7fa;
                        color: #172033;
                    }

                    .verified-page {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 32px 18px;
                        background:
                            radial-gradient(
                                circle at top right,
                                rgba(37, 99, 235, 0.08),
                                transparent 32%
                            ),
                            #f5f7fa;
                    }

                    .verified-card {
                        width: 100%;
                        max-width: 720px;
                        padding: 36px;
                        border: 1px solid #e5e7eb;
                        border-radius: 20px;
                        background: #ffffff;
                        box-shadow:
                            0 20px 60px rgba(15, 23, 42, 0.08);
                    }

                    .verified-badge {
                        display: inline-flex;
                        align-items: center;
                        gap: 7px;
                        padding: 7px 11px;
                        border-radius: 999px;
                        background: #ecfdf3;
                        color: #15803d;
                        font-size: 10px;
                        font-weight: 800;
                        letter-spacing: 0.7px;
                    }

                    .verified-card h1 {
                        margin: 18px 0 8px;
                        color: #111827;
                        font-size: 30px;
                        letter-spacing: -0.8px;
                    }

                    .verified-description {
                        margin: 0;
                        color: #667085;
                        font-size: 14px;
                        line-height: 1.6;
                    }

                    .institution-summary {
                        margin-top: 26px;
                        overflow: hidden;
                        border: 1px solid #e8ebef;
                        border-radius: 14px;
                        background: #fafbfc;
                    }

                    .summary-row {
                        display: grid;
                        grid-template-columns: 190px 1fr;
                        gap: 18px;
                        padding: 14px 17px;
                        border-bottom: 1px solid #e8ebef;
                        font-size: 13px;
                    }

                    .summary-row:last-child {
                        border-bottom: none;
                    }

                    .summary-row span {
                        color: #667085;
                    }

                    .summary-row strong {
                        color: #172033;
                        overflow-wrap: anywhere;
                    }

                    .verified-text {
                        color: #15803d !important;
                    }

                    .access-note {
                        margin-top: 20px;
                        padding: 16px;
                        border: 1px solid #dbeafe;
                        border-radius: 12px;
                        background: #f8fbff;
                    }

                    .access-note strong {
                        color: #1d4ed8;
                        font-size: 12px;
                    }

                    .access-note p {
                        margin: 6px 0 0;
                        color: #667085;
                        font-size: 12px;
                        line-height: 1.55;
                    }

                    .logout-button {
                        width: 100%;
                        margin-top: 22px;
                        height: 46px;
                        border: none;
                        border-radius: 10px;
                        background: #111827;
                        color: white;
                        font-size: 13px;
                        font-weight: 650;
                        cursor: pointer;
                        transition: 0.2s ease;
                    }

                    .logout-button:hover {
                        background: #2563eb;
                    }

                    @media (max-width: 600px) {
                        .verified-card {
                            padding: 24px 18px;
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

                <main className="verified-page">
                    <div className="verified-card">
                        <div className="verified-badge">
                            ✓ VERIFIED INSTITUTION
                        </div>

                        <h1>Institutional Dashboard</h1>

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
                                Resources added by this institution will
                                undergo separate resource-level verification,
                                including equipment details, availability,
                                certification, pricing, access terms and
                                facility manager approval.
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
            </>
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
                    background: #f4f6f9;
                    color: #172033;
                }

                .login-page {
                    min-height: 100vh;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 42px 20px;
                    background:
                        radial-gradient(
                            circle at 15% 10%,
                            rgba(37, 99, 235, 0.07),
                            transparent 28%
                        ),
                        radial-gradient(
                            circle at 90% 85%,
                            rgba(37, 99, 235, 0.05),
                            transparent 30%
                        ),
                        #f4f6f9;
                }

                .login-wrapper {
                    width: 100%;
                    max-width: 940px;
                }

                .login-top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 20px;
                    padding: 0 3px;
                }

                .brand {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #111827;
                    font-size: 15px;
                    font-weight: 750;
                    letter-spacing: -0.2px;
                }

                .brand-mark {
                    width: 31px;
                    height: 31px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 9px;
                    background: #111827;
                    color: white;
                    font-size: 12px;
                    font-weight: 800;
                }

                .portal-label {
                    color: #98a2b3;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }

                .login-layout {
                    display: grid;
                    grid-template-columns: 0.82fr 1.45fr;
                    min-height: 600px;
                    overflow: hidden;
                    border: 1px solid #e2e6eb;
                    border-radius: 22px;
                    background: white;
                    box-shadow:
                        0 24px 70px rgba(15, 23, 42, 0.09);
                }

                .login-intro {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 38px;
                    overflow: hidden;
                    background: #111827;
                    color: white;
                }

                .login-intro::before {
                    content: "";
                    position: absolute;
                    width: 260px;
                    height: 260px;
                    right: -120px;
                    top: -90px;
                    border: 1px solid rgba(255, 255, 255, 0.09);
                    border-radius: 50%;
                }

                .login-intro::after {
                    content: "";
                    position: absolute;
                    width: 190px;
                    height: 190px;
                    left: -100px;
                    bottom: -80px;
                    border: 1px solid rgba(255, 255, 255, 0.07);
                    border-radius: 50%;
                }

                .intro-content,
                .intro-footer {
                    position: relative;
                    z-index: 1;
                }

                .intro-kicker {
                    margin: 0 0 18px;
                    color: #93c5fd;
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                }

                .login-intro h1 {
                    max-width: 300px;
                    margin: 0;
                    font-size: 34px;
                    line-height: 1.08;
                    letter-spacing: -1.2px;
                }

                .intro-description {
                    max-width: 300px;
                    margin: 18px 0 0;
                    color: #cbd5e1;
                    font-size: 13px;
                    line-height: 1.65;
                }

                .intro-list {
                    display: flex;
                    flex-direction: column;
                    gap: 13px;
                    margin-top: 34px;
                }

                .intro-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    color: #dbe4ef;
                    font-size: 11px;
                    line-height: 1.45;
                }

                .intro-check {
                    width: 19px;
                    height: 19px;
                    min-width: 19px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #334155;
                    border-radius: 50%;
                    color: #93c5fd;
                    font-size: 9px;
                    font-weight: 800;
                }

                .intro-footer {
                    padding-top: 25px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    color: #94a3b8;
                    font-size: 10px;
                    line-height: 1.5;
                }

                .login-form-panel {
                    padding: 38px 42px;
                    background: #ffffff;
                }

                .form-heading {
                    margin-bottom: 26px;
                }

                .form-heading h2 {
                    margin: 0;
                    color: #111827;
                    font-size: 25px;
                    letter-spacing: -0.6px;
                }

                .form-heading p {
                    margin: 7px 0 0;
                    color: #667085;
                    font-size: 12px;
                    line-height: 1.5;
                }

                .login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 17px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 7px;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 14px;
                }

                .form-group label {
                    color: #344054;
                    font-size: 11px;
                    font-weight: 700;
                }

                .required {
                    color: #dc2626;
                }

                .input-box {
                    display: flex;
                    align-items: center;
                    height: 44px;
                    padding: 0 13px;
                    border: 1px solid #d9dee5;
                    border-radius: 9px;
                    background: #ffffff;
                    transition:
                        border-color 0.18s ease,
                        box-shadow 0.18s ease,
                        background 0.18s ease;
                }

                .input-box:hover {
                    border-color: #c3cad4;
                }

                .input-box:focus-within {
                    border-color: #2563eb;
                    background: #fff;
                    box-shadow:
                        0 0 0 3px rgba(37, 99, 235, 0.09);
                }

                .input-box input {
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: none;
                    background: transparent;
                    color: #172033;
                    font-size: 13px;
                }

                .input-box input::placeholder {
                    color: #a0a7b2;
                }

                select {
                    width: 100%;
                    height: 44px;
                    padding: 0 12px;
                    border: 1px solid #d9dee5;
                    border-radius: 9px;
                    outline: none;
                    background: #ffffff;
                    color: #172033;
                    font-size: 13px;
                    cursor: pointer;
                    transition:
                        border-color 0.18s ease,
                        box-shadow 0.18s ease;
                }

                select:focus {
                    border-color: #2563eb;
                    box-shadow:
                        0 0 0 3px rgba(37, 99, 235, 0.09);
                }

                .field-help {
                    margin: 0;
                    color: #98a2b3;
                    font-size: 9.5px;
                    line-height: 1.45;
                }

                .label-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .forgot-link {
                    color: #2563eb;
                    font-size: 10px;
                    text-decoration: none;
                }

                .forgot-link:hover {
                    text-decoration: underline;
                }

                .verification-banner {
                    display: flex;
                    align-items: flex-start;
                    gap: 11px;
                    margin-bottom: 22px;
                    padding: 12px 13px;
                    border: 1px solid #dbeafe;
                    border-radius: 10px;
                    background: #f8fbff;
                }

                .verification-mark {
                    width: 21px;
                    height: 21px;
                    min-width: 21px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 6px;
                    background: #2563eb;
                    color: white;
                    font-size: 10px;
                    font-weight: 800;
                }

                .verification-banner strong {
                    display: block;
                    margin-bottom: 2px;
                    color: #1e3a8a;
                    font-size: 10.5px;
                }

                .verification-banner p {
                    margin: 0;
                    color: #64748b;
                    font-size: 9.5px;
                    line-height: 1.45;
                }

                .declaration {
                    display: flex;
                    align-items: flex-start;
                    gap: 9px;
                    padding: 12px;
                    border: 1px solid #eaecf0;
                    border-radius: 9px;
                    background: #fafafa;
                    cursor: pointer;
                }

                .declaration input {
                    width: 15px;
                    height: 15px;
                    min-width: 15px;
                    margin: 1px 0 0;
                    accent-color: #2563eb;
                    cursor: pointer;
                }

                .declaration span {
                    color: #667085;
                    font-size: 9.5px;
                    line-height: 1.55;
                }

                .error-message {
                    padding: 10px 11px;
                    border: 1px solid #fecaca;
                    border-radius: 8px;
                    background: #fff7f7;
                    color: #b42318;
                    font-size: 10px;
                    line-height: 1.45;
                }

                .submit-button {
                    width: 100%;
                    height: 46px;
                    margin-top: 1px;
                    border: none;
                    border-radius: 9px;
                    background: #111827;
                    color: white;
                    font-size: 12px;
                    font-weight: 700;
                    cursor: pointer;
                    transition:
                        transform 0.18s ease,
                        background 0.18s ease,
                        box-shadow 0.18s ease;
                }

                .submit-button:hover {
                    background: #2563eb;
                    box-shadow:
                        0 8px 20px rgba(37, 99, 235, 0.18);
                    transform: translateY(-1px);
                }

                .submit-button:active {
                    transform: translateY(0);
                }

                .card-footer {
                    display: flex;
                    align-items: flex-start;
                    gap: 9px;
                    margin-top: 21px;
                    padding-top: 17px;
                    border-top: 1px solid #eef0f3;
                }

                .footer-dot {
                    width: 7px;
                    height: 7px;
                    min-width: 7px;
                    margin-top: 4px;
                    border-radius: 50%;
                    background: #16a34a;
                    box-shadow:
                        0 0 0 3px rgba(22, 163, 74, 0.09);
                }

                .support-title {
                    margin: 0 0 3px;
                    color: #344054;
                    font-size: 9px;
                    font-weight: 750;
                }

                .support-text {
                    margin: 0;
                    color: #98a2b3;
                    font-size: 9px;
                    line-height: 1.45;
                }

                .system-status {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 7px;
                    margin-top: 15px;
                    color: #98a2b3;
                    font-size: 9px;
                }

                .status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #16a34a;
                }

                @media (max-width: 820px) {
                    .login-layout {
                        grid-template-columns: 1fr;
                    }

                    .login-intro {
                        min-height: 250px;
                        padding: 28px;
                    }

                    .intro-list {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        margin-top: 24px;
                    }

                    .intro-footer {
                        display: none;
                    }

                    .login-form-panel {
                        padding: 30px;
                    }
                }

                @media (max-width: 560px) {
                    .login-page {
                        align-items: flex-start;
                        padding: 18px 10px;
                    }

                    .login-top {
                        padding: 0 4px;
                    }

                    .portal-label {
                        display: none;
                    }

                    .login-layout {
                        border-radius: 16px;
                    }

                    .login-intro {
                        min-height: auto;
                        padding: 25px 22px;
                    }

                    .login-intro h1 {
                        font-size: 28px;
                    }

                    .intro-description {
                        margin-top: 12px;
                    }

                    .intro-list {
                        display: flex;
                        margin-top: 20px;
                    }

                    .login-form-panel {
                        padding: 25px 19px;
                    }

                    .form-heading h2 {
                        font-size: 23px;
                    }

                    .form-row {
                        grid-template-columns: 1fr;
                        gap: 17px;
                    }

                    .verification-banner {
                        margin-bottom: 19px;
                    }
                }
            `}</style>

            <main className="login-page">
                <div className="login-wrapper">

                    <div className="login-top">
                        <div className="brand">
                            <div className="brand-mark">RL</div>
                            ResourceLink
                        </div>

                        <div className="portal-label">
                            Institution Portal
                        </div>
                    </div>

                    <div className="login-layout">

                        <section className="login-intro">
                            <div className="intro-content">

                                <p className="intro-kicker">
                                    Institutional Access
                                </p>

                                <h1>
                                    Connect verified institutions to shared resources.
                                </h1>

                                <p className="intro-description">
                                    Register your institution to access the
                                    resource provider platform and participate
                                    in verified institutional resource sharing.
                                </p>

                                <div className="intro-list">
                                    <div className="intro-item">
                                        <span className="intro-check">✓</span>
                                        <span>
                                            Official institution details
                                            are collected.
                                        </span>
                                    </div>

                                    <div className="intro-item">
                                        <span className="intro-check">✓</span>
                                        <span>
                                            Institutional identity is
                                            verified.
                                        </span>
                                    </div>

                                    <div className="intro-item">
                                        <span className="intro-check">✓</span>
                                        <span>
                                            Authorised representatives
                                            are recorded.
                                        </span>
                                    </div>

                                    <div className="intro-item">
                                        <span className="intro-check">✓</span>
                                        <span>
                                            Administrator approval is
                                            required.
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="intro-footer">
                                Institutional verification helps maintain
                                trusted access between participating
                                organisations.
                            </div>
                        </section>

                        <section className="login-form-panel">

                            <div className="form-heading">
                                <h2>Institutional Login</h2>

                                <p>
                                    Enter your official institution details
                                    to continue.
                                </p>
                            </div>

                            <div className="verification-banner">
                                <div className="verification-mark">
                                    ✓
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
                                <span className="footer-dot"></span>

                                <div>
                                    <p className="support-title">
                                        INSTITUTION VERIFICATION
                                    </p>

                                    <p className="support-text">
                                        Verification may include institutional
                                        domain validation, official
                                        registration records, government or
                                        academic registry checks, submitted
                                        documentation and administrator
                                        approval.
                                    </p>
                                </div>
                            </div>

                        </section>

                    </div>

                    <div className="system-status">
                        <span className="status-dot"></span>
                        Secure institutional access
                    </div>

                </div>
            </main>
        </>
    );
};

export default Login;