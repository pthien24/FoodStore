using FoodStore.Web.Models.Domain;

namespace FoodStore.Web.Repository.Abstract
{
    public interface ICategoryRepository
    {
        ICollection<Category> GetCategories();
        bool CreateCategory(Category category);
        bool Save();
        Category GetCategory(int id);
        ICollection<Product> GetPokemonByCategory(int categoryId);
        bool CategoryExists(int id);
        bool UpdateCategory(Category category);
        bool DeleteCategory(Category category);
    }
}
