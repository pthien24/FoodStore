using FoodStore.Web.Models.Domain;

namespace FoodStore.Web.Repository.Abstract
{
    public interface IProductRepository
    {
        bool Add(Product p);
        //IQueryable<Product>? Products { get; }

        Task<PagedProductResult> GetProducts(string? tern, string? category, int page, int limit);
    }
}
