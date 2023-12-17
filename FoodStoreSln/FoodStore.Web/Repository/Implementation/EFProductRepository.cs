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
        //old

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
        //old

        public bool CreateProduct(int categoryId, Product product)
        {
            var category = _context.Categories.Where(a => a.Id == categoryId).FirstOrDefault();
            
            var pokemonCategory = new ProductCategory()
            {
                Category = category,
                Product = product,
            };
            _context.Add(product);

            _context.Add(pokemonCategory);
            return Save();
        }
        public ICollection<Product> getProducts(int? categoryId = null)
        {
            IQueryable<Product> query = _context.Products;

            if (categoryId.HasValue)
            {
                query = query.Where(p => p.ProductCategories.Any(pc => pc.CategoryId == categoryId));
            }

            return query.OrderBy(p => p.Id).ToList();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public Product GetPokemonTrimToUpper(ProductDTO productCreate)
        {
            return getProducts().Where(c => c.ProductName.Trim().ToUpper() == productCreate.ProductName.TrimEnd().ToUpper())
                .FirstOrDefault();
        }

        public bool ProductExists(int pokeId)
        {
            throw new NotImplementedException();
        }

        public Product GetProduct(int id)
        {
            throw new NotImplementedException();
        }

        public Product GetProduct(string name)
        {
            throw new NotImplementedException();
        }
    }
}
