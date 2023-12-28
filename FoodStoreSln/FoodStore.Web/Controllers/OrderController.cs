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
        public RestDTO<Order[]> GetOrdersWithItems()
        {
            var ordersWithItems = _orderRepository.GetOrdersWithItems();

            return new RestDTO<Order[]>()
            {
                Data = ordersWithItems.ToArray(),
                PageIndex = null,
                PageSize = null,
                RecordCount = null,
                TotalPage = null,
                Links = new List<LinkDTO>
                {
                    new LinkDTO(Url.Action(null ,"Order" ,null,Request.Scheme)!,"self","GET"),
                }
            };
        }
        [HttpPut("update-status/{orderId}/{newStatus}")]
        public IActionResult UpdateOrderStatus(int orderId, OrderStatus newStatus)
        {
            try
            {
                _orderRepository.UpdateOrderStatus(orderId, newStatus);
                return Ok(new { Message = "Order status updated successfully." });
            }
            catch (Exception ex)
            {
                // Log the error
                Console.WriteLine($"Error updating order status: {ex.Message}");
                return StatusCode(500, new { Error = "Internal Server Error" });
            }
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

        [HttpGet("{id}")]
        public RestDTO<Order> GetOrderById(int id)
        { 
            var order = _orderRepository.GetOrderById(id);

            return new RestDTO<Order>()
            {
                Data = order,
                PageIndex = null,
                PageSize = null,
                RecordCount = null,
                TotalPage = null,
                Links = new List<LinkDTO>
                {
                    new LinkDTO(Url.Action(null ,"Order" ,null,Request.Scheme)!,"self","GET"),
                }
            };
        }
        [HttpGet("user/{userId}")]
        public RestDTO<Order[]> GetOrdersByUserId(string userId)
        {
            var ordersByUserId = _orderRepository.GetOrdersByUserId(userId);

            return new RestDTO<Order[]>()
            {
                Data = ordersByUserId.ToArray(),
                PageIndex = null,
                PageSize = null,
                RecordCount = null,
                TotalPage = null,
                Links = new List<LinkDTO>
        {
            new LinkDTO(Url.Action(null ,"Order" ,null,Request.Scheme)!,"self","GET"),
        }
            };
        }
    }
}
