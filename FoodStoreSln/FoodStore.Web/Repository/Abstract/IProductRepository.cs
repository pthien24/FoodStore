using FoodStore.Web.DTO;
using FoodStore.Web.Models.Domain;

namespace FoodStore.Web.Repository.Abstract
{
    public interface IProductRepository
    {
        //old 
        Task<bool> AddAsync(Product p);
        Task<IEnumerable<Product>> GetAllAsync();
        Task<Product> GetByIdAsync(int id);
        Task<bool> UpdateAsync(Product p);
        //old 



        ICollection<Product> getProducts(int? categoryId = null);
        Product GetPokemonTrimToUpper(ProductDTO pokemonCreate);
        bool CreateProduct( int categoryId, Product product);
        bool Save();
        bool ProductExists(int pokeId);
        Product GetProduct(int id);
        Product GetProduct(string name);
    }
}
