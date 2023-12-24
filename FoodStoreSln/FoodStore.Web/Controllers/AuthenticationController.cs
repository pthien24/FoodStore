﻿using FoodStore.Web.DTO;
using FoodStore.Web.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodStore.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<AuthenticationController> _logger;

        public AuthenticationController(IAuthService authService, ILogger<AuthenticationController> logger)
        {
            _authService = authService;
            _logger = logger;
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Invalid payload");
                var (status, message) = await _authService.Login(model);
                if (status == 0)
                    return BadRequest(message);
                return Ok(message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("registeration")]
        public async Task<IActionResult> Register(RegistrationModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Invalid payload");
                var (status, message) = await _authService.Registeration(model, UserRoles.Admin);
                if (status == 0)
                {
                    return BadRequest(message);
                }
                return CreatedAtAction(nameof(Register), model);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
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

        [HttpPost("UpdateUserRole")]
        public async Task<IActionResult> UpdateUserRole([FromBody] EditUserRoleModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _authService.UpdateUserRole(model.Username, model.NewRole);

                if (result.Item1 == 1)
                {
                    return Ok(new { Message = result.Item2 });
                }
                else
                {
                    return BadRequest(new { Error = result.Item2 });
                }
            }

            return BadRequest(new { Error = "Invalid model state" });
        }

        [HttpGet("GetUserRoles/{username}")]
        public async Task<IActionResult> GetUserRoles(string username)
        {
            var userRoles = await _authService.GetUserRoles(username);

            if (userRoles != null)
            {
                return Ok(new { Roles = userRoles });
            }
            else
            {
                return NotFound(new { Error = "User not found" });
            }
        }
    }
}
