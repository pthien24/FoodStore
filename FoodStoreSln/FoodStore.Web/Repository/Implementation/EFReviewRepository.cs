using AutoMapper;
using FoodStore.Web.DTO;
using FoodStore.Web.Models.Domain;
using FoodStore.Web.Repository.Abstract;
using Microsoft.EntityFrameworkCore;

namespace FoodStore.Web.Repository.Implementation
{
    public class EFReviewRepository : IReviewRepository
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;

        public EFReviewRepository(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public bool CreateReview(Review review)
        {
            _context.Add(review);
            return Save();
        }

        public Review GetReview(int reviewId)
        {
            return _context.Reviews.Where(r => r.Id == reviewId).FirstOrDefault();
        }

        public ICollection<Review> GetReviews()
        {
            return _context.Reviews.ToList();
        }

        public ICollection<Review> GetReviewsOfAProduct(int pokeId)
        {
            var reviews = _context.Reviews
        .Include(r => r.User)
        .Include(r => r.Product)
        .Where(r => r.Product.Id == pokeId)
        .ToList();

            return _mapper.Map<List<Review>>(reviews);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}
