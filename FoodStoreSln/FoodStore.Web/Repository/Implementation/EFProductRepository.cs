using System.Reflection;
using System.Text;
using FoodStore.Web.DTO;
using FoodStore.Web.Models.Domain;
using FoodStore.Web.Repository.Abstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace FoodStore.Web.Repository.Implementation
{
    public class EFProductRepository : IProductRepository
    {
        private readonly DatabaseContext _context;

        public EFProductRepository(DatabaseContext context)
        {
            this._context = context;
        }
        public async Task<bool> AddAsync(Product p)
        {
            try
            {
                _context.Products.Add(p);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> GetByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<bool> UpdateAsync(Product p)
        {
            try
            {
                _context.Products.Update(p);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                // Log the exception or handle it appropriately
                return false;
            }
        }
    }
}
