using Microsoft.EntityFrameworkCore;
using Forex.Data.Models;

namespace Forex.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Organization> Organizations { get; set; } = null!;
    public DbSet<Equipment> Equipments { get; set; } = null!;
    public DbSet<EquipmentAvailability> EquipmentAvailabilities { get; set; } = null!;
    public DbSet<Booking> Bookings { get; set; } = null!;
    public DbSet<Transaction> Transactions { get; set; } = null!;
    public DbSet<UsageRecord> UsageRecords { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Disable EF Core migrations altering schema (map exactly to existing db)
        
        modelBuilder.Entity<Organization>(entity =>
        {
            entity.HasKey(e => e.Id);
        });

        modelBuilder.Entity<Equipment>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Organization)
                  .WithMany()
                  .HasForeignKey(e => e.OrganizationId);
        });

        modelBuilder.Entity<EquipmentAvailability>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Equipment)
                  .WithMany()
                  .HasForeignKey(e => e.EquipmentId);
        });

        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Equipment)
                  .WithMany()
                  .HasForeignKey(e => e.EquipmentId);
            entity.HasOne(e => e.RenterOrganization)
                  .WithMany()
                  .HasForeignKey(e => e.RenterOrganizationId);
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Booking)
                  .WithMany()
                  .HasForeignKey(e => e.BookingId);
            entity.HasOne(e => e.Equipment)
                  .WithMany()
                  .HasForeignKey(e => e.EquipmentId);
            entity.HasOne(e => e.PayerOrganization)
                  .WithMany()
                  .HasForeignKey(e => e.PayerOrganizationId);
        });

        modelBuilder.Entity<UsageRecord>(entity =>
        {
            entity.HasKey(e => e.Id);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Organization)
                  .WithMany()
                  .HasForeignKey(e => e.OrganizationId);
        });
    }
}
