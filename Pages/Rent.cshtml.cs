using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Forex.Data;
using Forex.Data.Models;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Forex.Pages;

[Authorize]
public class RentModel : PageModel
{
    private readonly AppDbContext _context;

    public RentModel(AppDbContext context)
    {
        _context = context;
    }

    [BindProperty]
    public EquipmentInputModel Input { get; set; } = new();

    public List<Equipment> MyEquipment { get; set; } = new();

    [TempData]
    public string? StatusMessage { get; set; }

    public class EquipmentInputModel
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        public string Category { get; set; } = string.Empty;
        
        public string? Manufacturer { get; set; }
        public string? Model { get; set; }
        public string? Description { get; set; }
        public string Condition { get; set; } = "Good";
        
        [Required]
        [Range(0, double.MaxValue)]
        public decimal HourlyRate { get; set; }
        
        [Range(0, double.MaxValue)]
        public decimal? DailyRate { get; set; }
        
        [Range(0, double.MaxValue)]
        public decimal? SecurityDeposit { get; set; }
        
        public string? ImageUrl { get; set; }
    }

    public async Task OnGetAsync()
    {
        await LoadEquipmentAsync();
    }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
        {
            await LoadEquipmentAsync();
            return Page();
        }

        var orgIdClaim = User.FindFirst("OrganizationId");
        if (orgIdClaim == null)
        {
            ModelState.AddModelError(string.Empty, "You must be associated with an organization to list equipment.");
            await LoadEquipmentAsync();
            return Page();
        }

        var orgId = Guid.Parse(orgIdClaim.Value);

        var equipment = new Equipment
        {
            OrganizationId = orgId,
            Name = Input.Name,
            Category = Input.Category,
            Manufacturer = Input.Manufacturer,
            Model = Input.Model,
            Description = Input.Description,
            Condition = Input.Condition,
            HourlyRate = Input.HourlyRate,
            DailyRate = Input.DailyRate,
            SecurityDeposit = Input.SecurityDeposit ?? 0,
            ImageUrl = Input.ImageUrl,
            Status = "available",
            IsListed = true
        };

        _context.Equipments.Add(equipment);
        await _context.SaveChangesAsync();

        StatusMessage = "Equipment listed successfully.";
        return RedirectToPage();
    }

    private async Task LoadEquipmentAsync()
    {
        var orgIdClaim = User.FindFirst("OrganizationId");
        if (orgIdClaim != null)
        {
            var orgId = Guid.Parse(orgIdClaim.Value);
            MyEquipment = await _context.Equipments
                .Where(e => e.OrganizationId == orgId)
                .OrderByDescending(e => e.CreatedAt)
                .ToListAsync();
        }
    }
}
