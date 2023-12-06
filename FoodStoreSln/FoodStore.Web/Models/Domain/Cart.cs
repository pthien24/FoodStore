namespace FoodStore.Web.Models.Domain
{
    public class Cart
    {
        public List<CartItem> Items { get; set; } = new List<CartItem>();
    }

    public class CartItem
    {
        public int CartItemID { get; set; }
        public Product Product { get; set; } = new();
        public int Quantity { get; set; }
    }
}
