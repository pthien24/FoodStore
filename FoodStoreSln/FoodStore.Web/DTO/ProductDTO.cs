using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FoodStore.Web.Models.Domain;

namespace FoodStore.Web.DTO
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string? ProductName { get; set; }
        public string Description { get; set; } = String.Empty;
        [Column(TypeName = "decimal(8,2)")]
        public decimal Price { get; set; }
        public string? ProductImage { get; set; } = String.Empty;
        [NotMapped]
        public IFormFile? ImageFile { get; set; }
    }
}
