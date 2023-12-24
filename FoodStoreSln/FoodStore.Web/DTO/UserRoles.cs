namespace FoodStore.Web.DTO
{
    public class UserRoles
    {
        public const string Admin = "Admin";
        public const string User = "User";
        public static bool IsValidRole(string role)
        {
            return role == Admin || role == User;
        }
    }
}
