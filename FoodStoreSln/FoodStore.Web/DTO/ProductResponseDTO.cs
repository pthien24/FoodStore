namespace FoodStore.Web.DTO
{
    public class ProductResponseDTO
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ProductImage { get; set; }
        public string CategoryName { get; set; }
    }
}
