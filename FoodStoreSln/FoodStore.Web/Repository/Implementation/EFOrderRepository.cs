using FoodStore.Web.Models.Domain;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using FoodStore.Web.Repository.Abstract;

namespace FoodStore.Web.Repository.Implementation
{
    public class EFOrderRepository : IOrderRepository
    {
        private readonly DatabaseContext _dbContext;

        public EFOrderRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Order> GetOrdersWithItems()
        {
            return _dbContext.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .ThenInclude(p => p.ProductCategories)
                .ThenInclude(pc => pc.Category) // Include the Category navigation property
                .ToList();
        }
        
        public void PlaceOrder(Order order, List<OrderItem> orderItems, string userid)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {

                    // Add order to the database
                    _dbContext.Orders.Add(order);
                    _dbContext.SaveChanges();

                    // Associate order items with the order
                    foreach (var orderItem in orderItems)
                    {
                        orderItem.OrderId = order.OrderID; // Assuming OrderId is the foreign key
                        _dbContext.OrderItems.Add(orderItem);
                    }

                    _dbContext.SaveChanges();

                    // Commit the transaction if everything succeeds
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    // Log the error
                    Console.WriteLine($"Error placing order: {ex.Message}");

                    // Roll back the transaction
                    transaction.Rollback();
                }
            }
        }
    }
}