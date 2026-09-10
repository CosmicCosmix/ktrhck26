using Postgrest.Attributes;
using Postgrest.Models;

namespace ktr_back.Models
{
    [Table("equipment")]
    public class Equipment : BaseModel
    {
        [PrimaryKey("id", false)] public string Id { get; set; } = string.Empty;
        [Column("organization_id")] public string OrganizationId { get; set; } = string.Empty;
        [Column("name")] public string Name { get; set; } = string.Empty;
        [Column("category")] public string Category { get; set; } = string.Empty;
        [Column("manufacturer")] public string? Manufacturer { get; set; }
        [Column("model")] public string? Model { get; set; }
        [Column("description")] public string? Description { get; set; }
        [Column("condition")] public string? Condition { get; set; } = "Good";
        [Column("hourly_rate")] public decimal HourlyRate { get; set; }
        [Column("daily_rate")] public decimal? DailyRate { get; set; }
        [Column("security_deposit")] public decimal? SecurityDeposit { get; set; }
        [Column("image_url")] public string? ImageUrl { get; set; }
        [Column("specifications")] public JsonElement? Specifications { get; set; } 
        [Column("status")] public string Status { get; set; } = "available";
        [Column("is_listed")] public bool IsListed { get; set; } = true;
        [Column("created_at")] public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Column("updated_at")] public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}