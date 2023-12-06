using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace FoodStore.Web.Models.Domain
{
    public class Order
    {
        [BindNever]
        public int OrderID { get; set; }

        [BindNever]
        [Required(ErrorMessage = "Order must have at least one item.")]
        public ICollection<CartItem> Items { get; set; } = new List<CartItem>();

        [Required(ErrorMessage = "Please enter a Name")]
        public string? Name { get; set; }

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
        public OrderStatus Status { get; set; }
    }

    public enum OrderStatus
    {
        Pending, // Đang xử lý
        Shipped, // Đã giao hàng
        Cancelled // Đã hủy
    }
}