namespace FoodStore.Web.Models.Domain
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }

        // Thêm khoá ngoại đến Order
        public int OrderId { get; set; }
        public Order Order { get; set; }

        public Product Product { get; set; }
    }

}
