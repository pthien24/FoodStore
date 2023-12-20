using System.Linq.Dynamic.Core.Tokenizer;
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

        public bool ProductExists(int proid)
        {
            return _context.Products.Any(p => p.Id == proid);
        }

        public Product GetProduct(int id)
        {
            return _context.Products.Where(e => e.Id == id).FirstOrDefault();
        }

        public Product GetProduct(string name)
        {
            return _context.Products.Where(e => e.ProductName == name).FirstOrDefault();

        }

        public Category GetCategory(int productId)
        {
            var category = _context.Categories
                .FirstOrDefault(c => c.ProductCategories.Any(pc => pc.ProductId == productId));

            return category;
        }

        public bool UpdateProduct(int categoryId, Product product)
        {
            _context.Update(product);
            var productCategory = _context.ProductCategories
                .FirstOrDefault(pc => pc.ProductId == product.Id);

            if (productCategory != null)
            {
                // Remove the existing product category
                _context.Remove(productCategory);
            }

            // Create a new product category with the updated category
            var newProductCategory = new ProductCategory
            {
                ProductId = product.Id,
                CategoryId = categoryId
            };

            // Add the new product category
            _context.Add(newProductCategory);

            return Save();
        }
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
        public bool DeleteProduct(Product product)
        {
            _context.Remove(product);
            return Save();
        }
    }
}
