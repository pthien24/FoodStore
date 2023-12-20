using FoodStore.Web.DTO;
using FoodStore.Web.Models.Domain;

namespace FoodStore.Web.Repository.Abstract
{
    public interface IProductRepository
    {
        Category GetCategory(int productId);
        ICollection<Product> getProducts(int? categoryId = null);
        Product GetPokemonTrimToUpper(ProductDTO pokemonCreate);
        bool CreateProduct( int categoryId, Product product);
        bool Save();
        bool ProductExists(int pokeId);
        Product GetProduct(int id);
        Product GetProduct(string name);

        bool UpdateProduct(int categoryId, Product product);
        bool DeleteProduct(Product product);
    }
}
