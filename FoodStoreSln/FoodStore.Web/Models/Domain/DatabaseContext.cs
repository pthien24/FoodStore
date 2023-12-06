using Microsoft.EntityFrameworkCore;

namespace FoodStore.Web.Models.Domain
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext (DbContextOptions<DatabaseContext> options): base(options) { }
        public DbSet<Product>? Products { get; set; }
        public DbSet<Order>? Orders  { get; set; }
    }
}
