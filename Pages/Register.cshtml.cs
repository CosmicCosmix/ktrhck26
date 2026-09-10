using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Forex.Data;
using Forex.Data.Models;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace Forex.Pages;

public class RegisterModel : PageModel
{
    private readonly AppDbContext _context;

    public RegisterModel(AppDbContext context)
    {
        _context = context;
    }

    [BindProperty]
    [Required]
    public string FullName { get; set; } = string.Empty;

    [BindProperty]
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [BindProperty]
    [Required]
    [MinLength(6)]
    public string Password { get; set; } = string.Empty;

    [BindProperty]
    [Required]
    public string OrganizationName { get; set; } = string.Empty;

    [BindProperty]
    [Required]
    public string OrganizationType { get; set; } = string.Empty;

    public void OnGet()
    {
    }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
        {
            return Page();
        }

        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == Email);
        if (existingUser != null)
        {
            ModelState.AddModelError(string.Empty, "An account with this email already exists.");
            return Page();
        }

        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            // Create organization
            var org = new Organization
            {
                Name = OrganizationName,
                OrganizationType = OrganizationType,
                Email = Email,
                IsVerified = false // Needs admin verification
            };
            _context.Organizations.Add(org);
            await _context.SaveChangesAsync();

            // Create user
            var user = new User
            {
                Email = Email,
                FullName = FullName,
                OrganizationId = org.Id
            };
            
            var passwordHasher = new PasswordHasher<User>();
            user.PasswordHash = passwordHasher.HashPassword(user, Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            
            await transaction.CommitAsync();

            // Auto sign in
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim("OrganizationId", org.Id.ToString()),
                new Claim("OrganizationName", org.Name)
            };

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme, 
                new ClaimsPrincipal(claimsIdentity));

            return RedirectToPage("/Browse");
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            ModelState.AddModelError(string.Empty, "An error occurred during registration.");
            return Page();
        }
    }
}
