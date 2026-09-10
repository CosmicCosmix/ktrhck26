using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Forex.Data;
using Forex.Data.Models;
using Microsoft.AspNetCore.Authorization;

namespace Forex.Pages;

[Authorize]
public class BrowseModel : PageModel
{
    private readonly AppDbContext _context;

    public BrowseModel(AppDbContext context)
    {
        _context = context;
    }

    public List<Equipment> Equipments { get; set; } = new();
    public List<string> Categories { get; set; } = new();

    [BindProperty(SupportsGet = true)]
    public string? Category { get; set; }

    [BindProperty(SupportsGet = true)]
    public string? Search { get; set; }

    public string? SelectedCategory => Category;
    public string? SearchQuery => Search;

    public async Task OnGetAsync()
    {
        Categories = await _context.Equipments
            .Select(e => e.Category)
            .Distinct()
            .OrderBy(c => c)
            .ToListAsync();

        var query = _context.Equipments
            .Include(e => e.Organization)
            .Where(e => e.IsListed && e.Status == "available");

        if (!string.IsNullOrEmpty(Category))
        {
            query = query.Where(e => e.Category == Category);
        }

        if (!string.IsNullOrEmpty(Search))
        {
            query = query.Where(e => e.Name.ToLower().Contains(Search.ToLower()));
        }

        Equipments = await query
            .OrderByDescending(e => e.CreatedAt)
            .ToListAsync();
    }
}
