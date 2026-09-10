using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace Forex.Data.Models;

[Table("organizations")]
public class Organization
{
    [Column("id")]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Column("name")]
    public string Name { get; set; } = null!;

    [Column("organization_type")]
    public string? OrganizationType { get; set; }

    [Column("email")]
    public string? Email { get; set; }

    [Column("phone")]
    public string? Phone { get; set; }

    [Column("website")]
    public string? Website { get; set; }

    [Column("address")]
    public string? Address { get; set; }

    [Column("city")]
    public string? City { get; set; }

    [Column("state")]
    public string? State { get; set; }

    [Column("country")]
    public string? Country { get; set; }

    [Column("postal_code")]
    public string? PostalCode { get; set; }

    [Column("latitude")]
    public double? Latitude { get; set; }

    [Column("longitude")]
    public double? Longitude { get; set; }

    [Column("is_verified")]
    public bool IsVerified { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

[Table("equipments")]
public class Equipment
{
    [Column("id")]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Column("organization_id")]
    public Guid OrganizationId { get; set; }

    [Column("name")]
    public string Name { get; set; } = null!;

    [Column("category")]
    public string Category { get; set; } = null!;

    [Column("manufacturer")]
    public string? Manufacturer { get; set; }

    [Column("model")]
    public string? Model { get; set; }

    [Column("description")]
    public string? Description { get; set; }

    [Column("condition")]
    public string? Condition { get; set; }

    [Column("hourly_rate")]
    public decimal HourlyRate { get; set; }

    [Column("daily_rate")]
    public decimal? DailyRate { get; set; }

    [Column("security_deposit")]
    public decimal? SecurityDeposit { get; set; }

    [Column("image_url")]
    public string? ImageUrl { get; set; }

    [Column("specifications", TypeName = "jsonb")]
    public JsonDocument? Specifications { get; set; }

    [Column("status")]
    public string Status { get; set; } = "available";

    [Column("is_listed")]
    public bool IsListed { get; set; } = true;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public Organization? Organization { get; set; }
}

[Table("equipment_availability")]
public class EquipmentAvailability
{
    [Column("id")]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Column("equipment_id")]
    public Guid EquipmentId { get; set; }

    [Column("day_of_week")]
    public int DayOfWeek { get; set; }

    [Column("start_time")]
    public TimeSpan StartTime { get; set; }

    [Column("end_time")]
    public TimeSpan EndTime { get; set; }

    [Column("is_available")]
    public bool IsAvailable { get; set; } = true;

    [Column("valid_from")]
    public DateTime? ValidFrom { get; set; }

    [Column("valid_until")]
    public DateTime? ValidUntil { get; set; }
    
    public Equipment? Equipment { get; set; }
}

[Table("bookings")]
public class Booking
{
    [Column("id")]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Column("equipment_id")]
    public Guid EquipmentId { get; set; }

    [Column("renter_organization_id")]
    public Guid RenterOrganizationId { get; set; }

    [Column("start_time")]
    public DateTime StartTime { get; set; }

    [Column("end_time")]
    public DateTime EndTime { get; set; }

    [Column("duration_hours")]
    public decimal DurationHours { get; set; }

    [Column("hourly_rate")]
    public decimal HourlyRate { get; set; }

    [Column("total_amount")]
    public decimal TotalAmount { get; set; }

    [Column("purpose")]
    public string? Purpose { get; set; }

    [Column("status")]
    public string Status { get; set; } = "pending";

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    public Equipment? Equipment { get; set; }
    public Organization? RenterOrganization { get; set; }
}

[Table("transactions")]
public class Transaction
{
    [Column("id")]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Column("booking_id")]
    public Guid BookingId { get; set; }

    [Column("equipment_id")]
    public Guid EquipmentId { get; set; }

    [Column("payer_organization_id")]
    public Guid PayerOrganizationId { get; set; }

    [Column("amount")]
    public decimal Amount { get; set; }

    [Column("platform_fee")]
    public decimal PlatformFee { get; set; }

    [Column("owner_earnings")]
    public decimal OwnerEarnings { get; set; }

    [Column("currency")]
    public string Currency { get; set; } = "INR";

    [Column("status")]
    public string Status { get; set; } = "pending";

    [Column("paid_at")]
    public DateTime? PaidAt { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public Booking? Booking { get; set; }
    public Equipment? Equipment { get; set; }
    public Organization? PayerOrganization { get; set; }
}

[Table("usage_records")]
public class UsageRecord
{
    [Column("id")]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Column("equipment_id")]
    public Guid EquipmentId { get; set; }

    [Column("booking_id")]
    public Guid? BookingId { get; set; }

    [Column("organization_id")]
    public Guid? OrganizationId { get; set; }

    [Column("usage_type")]
    public string UsageType { get; set; } = null!;

    [Column("start_time")]
    public DateTime StartTime { get; set; }

    [Column("end_time")]
    public DateTime EndTime { get; set; }

    [Column("duration_hours")]
    public decimal DurationHours { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

[Table("users")]
public class User
{
    [Column("id")]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Column("organization_id")]
    public Guid? OrganizationId { get; set; }

    [Column("email")]
    public string Email { get; set; } = null!;

    [Column("password_hash")]
    public string PasswordHash { get; set; } = null!;

    [Column("full_name")]
    public string? FullName { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Organization? Organization { get; set; }
}
