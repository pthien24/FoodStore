namespace FoodStore.Web.Models.Domain
{
    public class PagedProductResult
    {
        public IEnumerable<Product> Products { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }
    }
}
