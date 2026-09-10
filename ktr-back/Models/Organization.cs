using Postgrest.Attributes;
using Postgrest.Models;

namespace ktr_back.Models
{
    [Table("organizations")]
    public class Organization : BaseModel
    {
        [PrimaryKey("id", false)] public string Id { get; set; } = string.Empty;
        [Column("name")] public string Name { get; set; } = string.Empty;
        [Column("organization_type")] public string? OrganizationType { get; set; }
        [Column("email")] public string? Email { get; set; }
        [Column("phone")] public string? Phone { get; set; }
        [Column("website")] public string? Website { get; set; }
        [Column("address")] public string? Address { get; set; }
        [Column("city")] public string? City { get; set; }
        [Column("state")] public string? State { get; set; }
        [Column("country")] public string? Country { get; set; }
        [Column("postal_code")] public string? PostalCode { get; set; }
        [Column("latitude")] public double? Latitude { get; set; }
        [Column("longitude")] public double? Longitude { get; set; }
        [Column("is_verified")] public bool IsVerified { get; set; }
        [Column("created_at")] public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Column("updated_at")] public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}