using AutoMapper;
using FoodStore.Web.Models.Domain;
using FoodStore.Web.Repository.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FoodStore.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize("User")]
    public class OrderController : ControllerBase
    {
        private readonly DatabaseContext _db;
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public OrderController(DatabaseContext db,IOrderRepository orderService,IMapper mapper, IHttpContextAccessor httpContextAccessor,
            UserManager<IdentityUser> userManager)
        {
            _db = db;
            _orderRepository = orderService;
            _mapper = mapper;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
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
        public IActionResult PlaceOrder([FromBody] OrderDTO orderDTO)
        {
            if (orderDTO == null || orderDTO.Items == null || orderDTO.Items.Count == 0)
            {
                return BadRequest("Invalid order data.");
            }
            var userId = GetUserId();
            if (string.IsNullOrEmpty(userId))
                throw new Exception("User is not logged-in");

            var order = _mapper.Map<Order>(orderDTO);

            var orderItems = _mapper.Map<List<OrderItem>>(orderDTO.Items);
            _orderRepository.PlaceOrder(order, orderItems, userId);

            return Ok("Order placed successfully.");
        }
        private string GetUserId()
        {
            var principal = _httpContextAccessor.HttpContext.User;
            string userId = _userManager.GetUserId(principal);
            return userId;
        }
    }
}
