using Microsoft.EntityFrameworkCore;

namespace FoodStore.Web.Models.Domain
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext (DbContextOptions<DatabaseContext> options): base(options) { }
        public DbSet<Product>? Products { get; set; }
        public DbSet<Order>? Orders  { get; set; }
        public DbSet<Category>? Categories  { get; set; }
        public DbSet<ProductCategory>? ProductCategories  { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductCategory>()
                .HasKey(pc => new { pc.ProductId, pc.CategoryId });
            modelBuilder.Entity<ProductCategory>()
                .HasOne(p => p.Product)
                .WithMany(pc => pc.ProductCategories)
                .HasForeignKey(p => p.ProductId);
            modelBuilder.Entity<ProductCategory>()
                .HasOne(p => p.Category)
                .WithMany(pc => pc.ProductCategories)
                .HasForeignKey(c => c.CategoryId);

        }
    }
}
