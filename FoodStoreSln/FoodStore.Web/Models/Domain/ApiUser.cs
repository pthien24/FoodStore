using Microsoft.AspNetCore.Identity;

namespace FoodStore.Web.Models.Domain
{
    public class ApiUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
