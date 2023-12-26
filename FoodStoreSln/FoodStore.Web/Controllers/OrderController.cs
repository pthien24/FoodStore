using AutoMapper;
using FoodStore.Web.DTO;
using FoodStore.Web.Models.Domain;
using FoodStore.Web.Repository.Abstract;
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
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IAuthService _auth;
        private readonly IMapper _mapper;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public OrderController(IOrderRepository orderService,IMapper mapper, IAuthService auth)
        {
            _orderRepository = orderService;
            _mapper = mapper;
            _auth = auth;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Order>))]
        public ActionResult<IEnumerable<Order>> GetOrdersWithItems()
        {
            var ordersWithItems = _orderRepository.GetOrdersWithItems();

            return Ok(ordersWithItems);
        }
        // Trong API Controller
        [HttpPost("PlaceOrder")]
        public async Task<IActionResult> PlaceOrder([FromBody] OrderDTO orderDTO)
        {
            var username = User.Identity.Name;
            Console.WriteLine("username : "+username);
            // Check if the username is available
            if (string.IsNullOrEmpty(username))
            {
                return BadRequest("Username not found in claims.");
            }
            var userId = await _auth.GetUserIdByUsername(username);
            if (orderDTO == null || orderDTO.Items == null || orderDTO.Items.Count == 0)
            {
                return BadRequest("Invalid order data.");
            }
            var order = _mapper.Map<Order>(orderDTO);
            var orderItems = _mapper.Map<List<OrderItem>>(orderDTO.Items);
            _orderRepository.PlaceOrder(order, orderItems,userId);
            return Ok("Order placed successfully.");
        }
       
    }
}
