using FoodStore.Web.Models.Domain;
using FoodStore.Web.Models.DTO;
using FoodStore.Web.Repository.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodStore.Web.Controllers
{
    [Route("api/[controller]/{action}")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IFileService _fileService;
        private readonly IProductRepository _productRepository;
        public ProductController(IProductRepository productRepository,IFileService fs) 
        {
            this._productRepository = productRepository;
            this._fileService = fs;
        }
        [HttpPost]
        public async Task<IActionResult>  Add([FromForm] Product p)
        {
            var status = new Status();

            if (!ModelState.IsValid)
            {
                status.StatusCode = 0;
                status.StatusMessage = "please pass a valid status";
                return Ok(status);
            }

            if (p.ImageFile != null)
            {
                var fileResult = _fileService.SaveImage(p.ImageFile);
                if (fileResult.Item1 == 1)
                {
                    p.ProductImage = fileResult.Item2;
                }

                var producResult = _productRepository.Add(p);
                if (producResult)
                {
                    status.StatusMessage = " added successfully";
                    status.StatusCode = 1;
                }
                else
                {
                    status.StatusMessage = "error on added product";
                    status.StatusCode = 0;
                }
            }
            return Ok(status);
        }
        [HttpGet]
        //public Task<IActionResult> GetAll()
        //{
        //    var product = _productRepository.Products;
        //    if (product.Any())
        //    {
        //        return Task.FromResult<IActionResult>(Ok(product));
        //    }
        //    else
        //    {
        //        return Task.FromResult<IActionResult>(NotFound("no product found"));
        //    }
        //}

        [HttpGet]
        public async Task<IActionResult> GetProducts(string? searchTerm, string? Category, int page = 1, int limit = 10)
        {
            var productsdResult = await _productRepository.GetProducts(searchTerm, Category, page, limit);

            // Add pagination headers to the response
            Response.Headers.Add("X-Total-Count", productsdResult.TotalCount.ToString());
            Response.Headers.Add("X-Total-Pages", productsdResult.TotalPages.ToString());
            return Ok(productsdResult.Products);
        }
    }
}
