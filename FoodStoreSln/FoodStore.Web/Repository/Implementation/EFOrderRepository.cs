﻿using FoodStore.Web.Models.Domain;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using FoodStore.Web.Repository.Abstract;
using FoodStore.Web.Services;

namespace FoodStore.Web.Repository.Implementation
{
    public class EFOrderRepository : IOrderRepository
    {
        private readonly DatabaseContext _dbContext;
        private readonly IAuthService _auth;
        public EFOrderRepository(DatabaseContext dbContext , IAuthService auth)
        {
            _dbContext = dbContext;
            _auth = auth;
        }
        public void UpdateOrderStatus(int orderId, OrderStatus newStatus)
        {
            try
            {
                var orderToUpdate = _dbContext.Orders.FirstOrDefault(o => o.Id == orderId);

                if (orderToUpdate != null)
                {
                    orderToUpdate.Status = newStatus;
                    _dbContext.SaveChanges();
                }
                else
                {
                    Console.WriteLine($"Order with ID {orderId} not found.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating order status: {ex.Message}");
            }
        }
        public Order GetOrderById(int orderId)
        {
            return _dbContext.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .FirstOrDefault(o => o.Id == orderId);
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
        public IEnumerable<Order> GetOrdersByUserId(string userId)
        {
            return _dbContext.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .ThenInclude(p => p.ProductCategories)
                .ThenInclude(pc => pc.Category)
                .ToList();
        }
        public void PlaceOrder(Order order, List<OrderItem> orderItems ,string orderid)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    order.UserId = orderid;
                    _dbContext.Orders.Add(order);
                    _dbContext.SaveChanges();
                    foreach (var orderItem in orderItems)
                    {
                        orderItem.OrderId = order.Id; 
                        _dbContext.OrderItems.Add(orderItem);
                    }
                    _dbContext.SaveChanges();
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