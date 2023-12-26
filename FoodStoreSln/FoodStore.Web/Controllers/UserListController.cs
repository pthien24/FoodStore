using FoodStore.Web.DTO;
using FoodStore.Web.Models.Domain;
using FoodStore.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FoodStore.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = UserRoles.Admin + "," + UserRoles.User)]
    public class UserListController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<AuthenticationController> _logger;
        private readonly UserManager<ApiUser> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserListController(IAuthService authService, ILogger<AuthenticationController> logger, IHttpContextAccessor httpContextAccessor,
            UserManager<ApiUser> userManager)
        {
            _authService = authService;
            _logger = logger;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }
        [HttpGet]
        [Route("getUsers")]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var userList = await _authService.GetUsers();
                return Ok(userList);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("getid")]
        public async Task<IActionResult> Getid()
        {
            try
            {
                var username = User.Identity.Name;

                if (string.IsNullOrEmpty(username))
                {
                    return BadRequest("Username not found in claims.");
                }
                var userId = await _authService.GetUserIdByUsername(username);

                if (string.IsNullOrEmpty(userId))
                {
                    return NotFound("User ID not found for the given username.");
                }
                return Ok(new { UserId = userId });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}
