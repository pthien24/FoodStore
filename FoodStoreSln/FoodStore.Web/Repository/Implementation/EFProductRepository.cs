using System.Reflection;
using System.Text;
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

        public IQueryable<Product>? Products => _context.Products;

        public bool Add(Product p)
        {
            try
            {
                _context.Products.Add(p);
                _context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<PagedProductResult> GetProducts(string? searchTerm, string? Category ,  int page, int limit)
        {
            IQueryable<Product>? products =_context.Products;

            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                searchTerm = searchTerm.Trim().ToLower();
                products = products
                    .Where(p => p.ProductName.ToLower().Contains(searchTerm)
                                || p.Description.ToLower().Contains(searchTerm)
                                || p.Category.ToLower().Contains(searchTerm));
            }

            if (!string.IsNullOrWhiteSpace(Category))
            {
                var categoryFilter = Category.Trim().ToLower();
                products = products
                    .Where(p => p.Category.ToLower() == categoryFilter);
            }

            var totalCount = await products.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)limit);

            var pagedProducts = await products
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            var pagedProductData = new PagedProductResult
            {
                Products = pagedProducts,
                TotalCount = totalCount,
                TotalPages = totalPages
            };

            return pagedProductData;
        }
    }
}
