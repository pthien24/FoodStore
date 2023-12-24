public class OrderDTO
{
    public string UserId { get; set; }
    public string CustomerName { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Country { get; set; }
    public string ProvinceOrCity { get; set; }
    public string District { get; set; }
    public string WardOrCommune { get; set; }
    public string SpecificAddress { get; set; }
    public string Note { get; set; }
    public List<OrderItemDTO> Items { get; set; }
}

public class OrderItemDTO
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}