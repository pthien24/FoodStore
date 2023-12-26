using FoodStore.Web.DTO;
using FoodStore.Web.Models.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FoodStore.Web.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApiUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;

        public AuthService(UserManager<ApiUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;

        }
        public async Task<(int, string)> Registeration(RegistrationModel model, string role)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return (0, "User already exists");

            ApiUser user = new()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username,
                FirstName = model.FirstName,
                LastName = model.LastName,
            };
            var createUserResult = await userManager.CreateAsync(user, model.Password);
            if (!createUserResult.Succeeded)
                return (0, "User creation failed! Please check user details and try again.");

            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));

            if (await roleManager.RoleExistsAsync(role))
                await userManager.AddToRoleAsync(user, role);

            return (1, "User created successfully!");
        }

        public async Task<(int, LoginResponseDto)> Login(LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if (user == null)
                return (0, null);
            if (!await userManager.CheckPasswordAsync(user, model.Password))
                return (0, null);

            var userRoles = await userManager.GetRolesAsync(user);
            var authClaims = new List<Claim>
            {
               new Claim(ClaimTypes.Name, user.UserName),
               new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }
            string token = GenerateToken(authClaims);

            var userDto = new ApiUserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                LastName = user.LastName,
                FistName = user.FirstName,
            };
            var loginResponse = new LoginResponseDto
            {
                Token = token,
                Data = userDto,
            };
            return (1, loginResponse);
        }


        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWTKey:Secret"]));
            var _TokenExpiryTimeInHour = Convert.ToInt64(_configuration["JWTKey:TokenExpiryTimeInHour"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _configuration["JWTKey:ValidIssuer"],
                Audience = _configuration["JWTKey:ValidAudience"],
                //Expires = DateTime.UtcNow.AddHours(_TokenExpiryTimeInHour),
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<List<ApiUser>> GetUsers()
        {
            var users = await userManager.Users.ToListAsync();
            return users;
        }

        public async Task<(int, string)> UpdateUserRole(string username, string newRole)
        {
            // Check if the role is valid
            if (!UserRoles.IsValidRole(newRole))
                return (0, "Invalid role");

            var user = await userManager.FindByNameAsync(username);

            if (user == null)
                return (0, "User not found");

            var currentRoles = await userManager.GetRolesAsync(user);

            if (currentRoles.Contains(newRole))
                return (0, $"User already has the role '{newRole}'");

            // Check if the role exists
            if (!await roleManager.RoleExistsAsync(newRole))
            {
                // Role doesn't exist, create it
                var createRoleResult = await roleManager.CreateAsync(new IdentityRole(newRole));

                if (!createRoleResult.Succeeded)
                    return (0, $"Failed to create the role '{newRole}'");
            }

            // Remove existing roles
            var removeRolesResult = await userManager.RemoveFromRolesAsync(user, currentRoles);

            if (!removeRolesResult.Succeeded)
                return (0, "Failed to remove existing roles");

            // Add the new role
            var addRoleResult = await userManager.AddToRoleAsync(user, newRole);

            if (!addRoleResult.Succeeded)
                return (0, "Failed to add the new role");

            return (1, "User role updated successfully");
        }

        public async Task<List<string>> GetUserRoles(string username)
        {
            var user = await userManager.FindByNameAsync(username);

            if (user == null)
            {
                // Handle the case where the user is not found
                return null;
            }

            var userRoles = await userManager.GetRolesAsync(user);

            return userRoles.ToList();
        }

        public async Task<string> GetUserIdByUsername(string username)
        {
            var user = await userManager.FindByNameAsync(username);

            return user?.Id;
        }

    }
}
