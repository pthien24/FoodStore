using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace FoodStore.Web.Models.Domain
{
    [Table("Order")]
    public class Order
    {
        public int Id { get; set; }
        [Required]
        public string UserId { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.UtcNow;
        [Required(ErrorMessage = "Order must have at least one item.")]
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

        [Required(ErrorMessage = "Please enter a Name")]
        public string? CustomerName { get; set; }

        [Required(ErrorMessage = "Please enter Phone")]
        public string? Phone { get; set; }

        [Required(ErrorMessage = "Please enter Email")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Please enter a country name")]
        public string? Country { get; set; }

        [Required(ErrorMessage = "Please enter a ProvinceOrCity")]
        public string? ProvinceOrCity { get; set; }

        [Required(ErrorMessage = "Please enter a District ")]
        public string? District { get; set; }

        [Required(ErrorMessage = "Please enter a Ward Or Commune")]
        public string? WardOrCommune { get; set; }

        [Required(ErrorMessage = "Please enter a Specific Address")]
        public string? SpecificAddress { get; set; }

        public string? Note { get; set; }

        [Required(ErrorMessage = "Please select a valid order status")]
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        [NotMapped]
        public decimal TotalAmount => OrderItems.Sum(item => item.Quantity * item.Product.Price);
    }

    public enum OrderStatus
    {
        Pending, // Đang xử lý
        Shipped, // Đã giao hàng
        Cancelled // Đã hủy
    }
}