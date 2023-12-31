﻿using FoodStore.Web.Models.Domain;

namespace FoodStore.Web.Repository.Abstract
{
    public interface IOrderRepository
    {
        void PlaceOrder(Order order, List<OrderItem> orderItems, string orderid);
        IEnumerable<Order> GetOrdersWithItems();
        Order GetOrderById(int orderId);
        void UpdateOrderStatus(int orderId, OrderStatus newStatus);

        IEnumerable<Order> GetOrdersByUserId(string userId);
    }
}