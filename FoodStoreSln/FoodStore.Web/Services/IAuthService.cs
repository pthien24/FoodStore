using FoodStore.Web.DTO;
using FoodStore.Web.Models.Domain;

namespace FoodStore.Web.Services
{
    public interface IAuthService
    {
        Task<(int, string)> Registeration(RegistrationModel model, string role);
        Task<(int, string)> Login(LoginModel model);
        Task<List<ApiUser>> GetUsers();
        Task<(int, string)> UpdateUserRole(string username, string newRole);
        Task<List<string>> GetUserRoles(string username);
    }
}
