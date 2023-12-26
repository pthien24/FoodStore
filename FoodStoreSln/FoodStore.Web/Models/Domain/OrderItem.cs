using System.ComponentModel.DataAnnotations;

namespace FoodStore.Web.Models.Domain
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }

        public int ProductId { get; set; }
        public int Quantity { get; set; }
        [Required]
        public double UnitPrice { get; set; }

        public Order Order { get; set; }

        public Product Product { get; set; }
    }

}
