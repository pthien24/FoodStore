namespace FoodStore.Web.DTO
{
    public class LoginResponseDto
    {
        public ApiUserDto Data { get; set; }
        public string Token { get; set; }
        public List<string> Role { get; set; }
    }
}
