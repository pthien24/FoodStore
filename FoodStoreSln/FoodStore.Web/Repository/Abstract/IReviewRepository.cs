using FoodStore.Web.Models.Domain;

namespace FoodStore.Web.Repository.Abstract
{
    public interface IReviewRepository
    {
        ICollection<Review> GetReviews();
        ICollection<Review> GetReviewsOfAProduct(int pokeId);
        Review GetReview(int reviewId);
        bool CreateReview(Review review);
        bool Save();
    }
}
