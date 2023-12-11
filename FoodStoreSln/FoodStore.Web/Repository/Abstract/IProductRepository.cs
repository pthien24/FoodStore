using FoodStore.Web.DTO;
using FoodStore.Web.Models.Domain;

namespace FoodStore.Web.Repository.Abstract
{
    public interface IProductRepository
    {
        Task<bool> AddAsync(Product p);
        Task<IEnumerable<Product>> GetAllAsync();
        Task<Product> GetByIdAsync(int id);
        Task<bool> UpdateAsync(Product p);
    }
}
