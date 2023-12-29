using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodStore.Web.Models.Domain
{
    public class Product
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "please enter a product name ")]
        public string? ProductName { get; set; }
        [Required(ErrorMessage = "please enter a product Description ")]
        public string Description { get; set; } = String.Empty;
        //[Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Please enter positive price ")]
        [Column(TypeName = "decimal(8,2)")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "please specify a category")]
        public string? ProductImage { get; set; }
        public ICollection<ProductCategory> ProductCategories { get; set; }

        [NotMapped]
        public IFormFile? ImageFile { get; set; }
       

    }

}
