using FoodStore.Web.Models.Domain;
using FoodStore.Web.Repository.Abstract;

namespace FoodStore.Web.Repository.Implementation
{
    public class EFCategoryRepository : ICategoryRepository
    {
        private DatabaseContext _context;
        public EFCategoryRepository(DatabaseContext context)
        {
            _context = context;
        }
        public ICollection<Category> GetCategories()
        {
            return _context.Categories.OrderBy(x => x.Name).ToList();
        }

        public bool CreateCategory(Category category)
        {
            _context.Add(category);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public Category GetCategory(int id)
        {
            return _context.Categories.Where(e => e.Id == id).FirstOrDefault();
        }

        public ICollection<Product> GetPokemonByCategory(int categoryId)
        {
            return _context.ProductCategories.Where(e => e.CategoryId == categoryId)
                .Select(c => c.Product).ToList();
        }

        public bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }

        public bool UpdateCategory(Category category)
        {
            _context.Update(category);
            return Save();
        }

        public bool DeleteCategory(Category category)
        {
            _context.Remove(category);
            return Save();
        }
    }
}
