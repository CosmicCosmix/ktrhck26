import React, { useState } from "react";

// Types matching specification rules
interface Resource {
    id: string;
    equipmentName: string;
    manufacturer: string;
    model: string;
    institution: string;
    sector: "Hospitals" | "Research Labs" | "Universities" | "Industrial";
    facility: string;
    technicalSpecs: string;
    location: string;
    availability: boolean;
    operatorRequirement: string;
    certificationStatus: string;
    pricing: string;
    termsOfAccess: string;
    responsibleManager: string;
    institutionVerified: boolean;
}

interface BookingRequest {
    resourceId: string;
    researcherName: string;
    researcherEmail: string;
    institution: string;
    purpose: string;
    duration: string;
}

const SAMPLE_RESOURCES: Resource[] = [
    {
        id: "res-1",
        equipmentName: "Transmission Electron Microscope (TEM)",
        manufacturer: "Thermo Fisher Scientific",
        model: "Talos F200X",
        institution: "IIT Madras - Research Park",
        sector: "Research Labs",
        facility: "Advanced Imaging Suite",
        technicalSpecs: "200kV Field Emission Gun, Super-X EDS System",
        location: "Chennai, Tamil Nadu",
        availability: true,
        operatorRequirement: "Certified Technician Only",
        certificationStatus: "Calibrated ISO/IEC 17025 (Valid till 2027)",
        pricing: "₹2,500 / hr",
        termsOfAccess: "Non-commercial academic research only. Prior training required.",
        responsibleManager: "Dr. A. Ramanathan (Facility Director)",
        institutionVerified: true,
    },
    {
        id: "res-2",
        equipmentName: "High-Field 7T MRI Scanner",
        manufacturer: "Siemens Healthineers",
        model: "MAGNETOM Terra",
        institution: "Apollo Hospitals & Research Centre",
        sector: "Hospitals",
        facility: "Neuroimaging Core Lab",
        technicalSpecs: "7 Tesla, 80 mT/m gradients, 64-channel head coil",
        location: "Chennai, Tamil Nadu",
        availability: true,
        operatorRequirement: "Clinical Radiologist Approved",
        certificationStatus: "NABH & CE Certified",
        pricing: "₹8,000 / slot",
        termsOfAccess: "IRB approval mandatory prior to booking authorization.",
        responsibleManager: "Dr. K. Swaminathan (Lead Radiologist)",
        institutionVerified: true,
    },
    {
        id: "res-3",
        equipmentName: "Inductively Coupled Plasma Mass Spectrometer (ICP-MS)",
        manufacturer: "Agilent Technologies",
        model: "7900 ICP-MS",
        institution: "Anna University Cleanrooms",
        sector: "Universities",
        facility: "Environmental Analysis Lab",
        technicalSpecs: "Sub-ppt detection limits, Octopole Reaction System",
        location: "Guindy, Chennai",
        availability: false,
        operatorRequirement: "Supervised Access",
        certificationStatus: "Calibrated Jan 2026",
        pricing: "₹1,800 / sample",
        termsOfAccess: "Standard safety protocols for trace metal samples required.",
        responsibleManager: "Prof. S. Meenakshi",
        institutionVerified: true,
    }
];

export const ReceiverLandingPage: React.FC = () => {
    const [selectedSector, setSelectedSector] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

    // Booking Form State
    const [bookingStep, setBookingStep] = useState<"form" | "submitted">("form");
    const [bookingData, setBookingData] = useState<BookingRequest>({
        resourceId: "",
        researcherName: "",
        researcherEmail: "",
        institution: "",
        purpose: "",
        duration: "1 Day"
    });

    const sectors = ["All", "Hospitals", "Research Labs", "Universities", "Industrial"];

    const filteredResources = SAMPLE_RESOURCES.filter((res) => {
        const matchesSector = selectedSector === "All" || res.sector === selectedSector;
        const matchesSearch =
            res.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            res.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
            res.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSector && matchesSearch;
    });

    const handleOpenBooking = (res: Resource) => {
        setSelectedResource(res);
        setBookingData((prev) => ({ ...prev, resourceId: res.id }));
        setBookingStep("form");
    };

    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setBookingStep("submitted");
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "Inter, sans-serif", color: "#0f172a" }}>
            {/* Header */}
            <header style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#1e293b" }}>Verified Scientific Resource Network</h1>
                    <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Secure access to verified high-value equipment & infrastructure</p>
                </div>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <span style={{ fontSize: "12px", background: "#f1f5f9", padding: "6px 12px", borderRadius: "20px", border: "1px solid #cbd5e1" }}>
                        🔒 Authenticated Access Platform
                    </span>
                </div>
            </header>

            {/* Main Content */}
            <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 16px" }}>
                {/* Search & Sector Filter Section */}
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "16px" }}>
                        <input
                            type="text"
                            placeholder="Search equipment, institution, or location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ flex: 1, minWidth: "280px", padding: "10px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", outline: "none" }}
                        />
                    </div>

                    <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "#475569", marginRight: "8px" }}>Filter Sector:</span>
                        {sectors.map((sec) => (
                            <button
                                key={sec}
                                onClick={() => setSelectedSector(sec)}
                                style={{
                                    padding: "6px 14px",
                                    borderRadius: "20px",
                                    border: "1px solid",
                                    borderColor: selectedSector === sec ? "#2563eb" : "#cbd5e1",
                                    background: selectedSector === sec ? "#eff6ff" : "#ffffff",
                                    color: selectedSector === sec ? "#2563eb" : "#475569",
                                    fontWeight: selectedSector === sec ? 600 : 400,
                                    fontSize: "13px",
                                    cursor: "pointer"
                                }}
                            >
                                {sec}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Resource Listings */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "20px" }}>
                    {filteredResources.map((resource) => (
                        <div key={resource.id} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <div>
                                {/* Institution Verification Badge */}
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#2563eb", background: "#eff6ff", padding: "2px 8px", borderRadius: "4px" }}>
                                        {resource.sector}
                                    </span>
                                    {resource.institutionVerified && (
                                        <span style={{ fontSize: "11px", color: "#166534", background: "#dcfce7", padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>
                                            ✓ Institution Verified
                                        </span>
                                    )}
                                </div>

                                <h3 style={{ margin: "0 0 4px", fontSize: "16px", color: "#0f172a" }}>{resource.equipmentName}</h3>
                                <p style={{ margin: "0 0 12px", fontSize: "13px", color: "#64748b" }}>{resource.manufacturer} - {resource.model}</p>

                                {/* Structured Metadata List */}
                                <div style={{ fontSize: "12px", display: "flex", flexDirection: "column", gap: "6px", color: "#334155", background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #f1f5f9" }}>
                                    <div><strong>Institution:</strong> {resource.institution}</div>
                                    <div><strong>Facility:</strong> {resource.facility}</div>
                                    <div><strong>Location:</strong> {resource.location}</div>
                                    <div><strong>Technical Specs:</strong> {resource.technicalSpecs}</div>
                                    <div><strong>Operator Req:</strong> {resource.operatorRequirement}</div>
                                    <div><strong>Calibration:</strong> {resource.certificationStatus}</div>
                                    <div><strong>Pricing:</strong> {resource.pricing}</div>
                                    <div><strong>Manager:</strong> {resource.responsibleManager}</div>
                                </div>
                            </div>

                            <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontSize: "12px", fontWeight: 600, color: resource.availability ? "#166534" : "#991b1b" }}>
                                    {resource.availability ? "Available for Request" : "Currently Occupied"}
                                </span>
                                <button
                                    onClick={() => handleOpenBooking(resource)}
                                    disabled={!resource.availability}
                                    style={{
                                        padding: "8px 16px",
                                        background: resource.availability ? "#0f172a" : "#cbd5e1",
                                        color: "#ffffff",
                                        border: "none",
                                        borderRadius: "6px",
                                        fontWeight: 600,
                                        fontSize: "13px",
                                        cursor: resource.availability ? "pointer" : "not-allowed"
                                    }}
                                >
                                    Request Verification
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Structured Booking Request Modal */}
            {selectedResource && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", alignItems: "center", justifyCenter: "center", padding: "16px", zIndex: 1000 }}>
                    <div style={{ background: "#ffffff", borderRadius: "12px", maxWidth: "520px", width: "100%", margin: "0 auto", padding: "24px", position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
                        <button
                            onClick={() => setSelectedResource(null)}
                            style={{ position: "absolute", top: "16px", right: "16px", border: "none", background: "none", fontSize: "18px", cursor: "pointer", color: "#64748b" }}
                        >
                            ✕
                        </button>

                        {bookingStep === "form" ? (
                            <form onSubmit={handleBookingSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                                <div>
                                    <span style={{ fontSize: "11px", color: "#2563eb", fontWeight: 700, letterSpacing: "1px" }}>REQUEST PIPELINE</span>
                                    <h2 style={{ margin: "4px 0", fontSize: "18px" }}>Resource Booking Form</h2>
                                    <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Target: {selectedResource.equipmentName} ({selectedResource.institution})</p>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                    <label style={{ fontSize: "12px", fontWeight: 600 }}>Authenticated Researcher Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Dr. Jane Doe"
                                        value={bookingData.researcherName}
                                        onChange={(e) => setBookingData({ ...bookingData, researcherName: e.target.value })}
                                        style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                                    />
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                    <label style={{ fontSize: "12px", fontWeight: 600 }}>Institutional Email Domain</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="researcher@verified-domain.edu"
                                        value={bookingData.researcherEmail}
                                        onChange={(e) => setBookingData({ ...bookingData, researcherEmail: e.target.value })}
                                        style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                                    />
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                    <label style={{ fontSize: "12px", fontWeight: 600 }}>Research Purpose & Protocol Justification</label>
                                    <textarea
                                        required
                                        rows={3}
                                        placeholder="Specify project goals, regulatory approvals, and specialized requirements..."
                                        value={bookingData.purpose}
                                        onChange={(e) => setBookingData({ ...bookingData, purpose: e.target.value })}
                                        style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                                    />
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                    <label style={{ fontSize: "12px", fontWeight: 600 }}>Requested Access Duration</label>
                                    <select
                                        value={bookingData.duration}
                                        onChange={(e) => setBookingData({ ...bookingData, duration: e.target.value })}
                                        style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "13px" }}
                                    >
                                        <option>1 Day Slot</option>
                                        <option>3 Days Block</option>
                                        <option>1 Week Dedicated</option>
                                    </select>
                                </div>

                                <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "11px", color: "#475569" }}>
                                    <strong>Approval Workflow:</strong> Request → Institutional Verification Check → Sent to <i>{selectedResource.responsibleManager}</i> for approval.
                                </div>

                                <button
                                    type="submit"
                                    style={{ marginTop: "8px", padding: "10px", background: "#2563eb", color: "#ffffff", border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer" }}
                                >
                                    Submit Request to Resource Owner
                                </button>
                            </form>
                        ) : (
                            <div style={{ textAlign: "center", padding: "16px 0" }}>
                                <div style={{ fontSize: "36px", marginBottom: "8px" }}>✅</div>
                                <h3 style={{ margin: "0 0 8px" }}>Request Submitted for Approval</h3>
                                <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5 }}>
                                    Your request has been routed to <strong>{selectedResource.responsibleManager}</strong> at {selectedResource.institution}. You will receive a notification once institutional verification and access checks are complete.
                                </p>
                                <button
                                    onClick={() => setSelectedResource(null)}
                                    style={{ marginTop: "16px", padding: "8px 20px", background: "#0f172a", color: "#ffffff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}
                                >
                                    Return to Dashboard
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReceiverLandingPage;