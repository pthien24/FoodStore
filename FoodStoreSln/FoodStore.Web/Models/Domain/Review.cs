namespace FoodStore.Web.Models.Domain
{
    public class Review
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }
        public string UserId { get; set; }
        public int PokemonId { get; set; }
        public ApiUser User { get; set; }
        public Product Product { get; set; }
    }
}
