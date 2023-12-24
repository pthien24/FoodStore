using System.ComponentModel.DataAnnotations;

namespace FoodStore.Web.DTO
{
    public class EditUserRoleModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string NewRole { get; set; }
    }
}
