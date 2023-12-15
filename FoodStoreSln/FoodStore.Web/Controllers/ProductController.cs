using FoodStore.Web.Models.Domain;
using FoodStore.Web.DTO;
using FoodStore.Web.Repository.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq.Dynamic.Core;
using System.Linq;

namespace FoodStore.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly IFileService _fileService;
        private readonly IProductRepository _productRepository;
        private readonly ILogger<ProductController> _logger;
        public ProductController(DatabaseContext context, IProductRepository productRepository,IFileService fs ,ILogger<ProductController> logger) 
        {
            this._context = context;
            this._productRepository = productRepository;
            this._fileService = fs;
            this._logger = logger;
        }
        [HttpGet(Name = "GetProducts")]
        [ResponseCache(Location = ResponseCacheLocation.Any, Duration = 60)]
        public async Task<RestDTO<Product[]>> Get(
            int pageIndex = 0,
            int pageSize = 3,
            string? sortColumn = "ProductName",
            string? sortOrder = "ASC",
            string? filterQuery = null,
            string? category = null,
            string? tag = null
            )
        {
            var query = await _productRepository.GetAllAsync();
            if (!string.IsNullOrEmpty(filterQuery))
            {
                query = query.Where(b => b.ProductName.Contains(filterQuery));
            }
            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(b => b.Category.Contains(category));
            }
            if (!string.IsNullOrEmpty(tag))
            {
                if (Enum.TryParse<ProductTag>(tag, out var tagEnum))
                {
                    query = query.Where(b => b.Tags == tagEnum);
                }
            }
            var recordcount = query.Count();
            var totalPages = (int)Math.Ceiling((double)recordcount / pageSize);
            var queryableProducts = query.AsQueryable();
            query = SortAndPaginateProducts(queryableProducts, sortColumn, sortOrder, pageIndex, pageSize);
            
            return new RestDTO<Product[]>()
            {
                Data =  query.ToArray(),
                PageIndex = pageIndex,
                PageSize = pageSize,
                RecordCount = recordcount,
                TotalPage = totalPages,
                Links = new List<LinkDTO>
                {
                    new LinkDTO(Url.Action(null ,"Product" ,null,Request.Scheme)!,"self","GET"),
                }
            };
        }

        private IQueryable<Product> SortAndPaginateProducts(
            IQueryable<Product> products,
            string sortColumn,
            string sortOrder,
            int pageIndex,
            int pageSize)
        {
            // Apply sorting logic
            products = products.OrderBy($"{sortColumn} {sortOrder}");

            // Apply pagination
            products = products.Skip(pageIndex * pageSize).Take(pageSize);

            return products;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromForm] Product p)
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

                var producResult = _productRepository.AddAsync(p);
                if (await producResult)
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

        [HttpGet("{id:int}", Name = "GetProductById")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);

            if (product == null)
            {
                return NotFound(); // 404 Not Found if product with given ID is not found
            }

            var link = new LinkDTO(
                Url.Link("GetProductById", new { id }),
                "self",
                "GET"
            );

            return Ok(new RestDTO<Product>
            {
                Data = product,
                Links = new List<LinkDTO> { link }
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] Product updatedProduct)
        {
            var status = new Status();

            if (!ModelState.IsValid)
            {
                status.StatusCode = 0;
                status.StatusMessage = "Please pass a valid status";
                return Ok(status);
            }

            try
            {
                var existingProduct = await _productRepository.GetByIdAsync(id);

                if (existingProduct == null)
                {
                    status.StatusCode = 0;
                    status.StatusMessage = "Product not found";
                    return Ok(status);
                }

                // Update properties of existing product with new values
                existingProduct.ProductName = updatedProduct.ProductName;
                existingProduct.Description = updatedProduct.Description;
                existingProduct.Category = updatedProduct.Category;
                existingProduct.Price = updatedProduct.Price;
                existingProduct.Tags = updatedProduct.Tags;

                if (updatedProduct.ImageFile != null)
                {
                    var fileResult = _fileService.SaveImage(updatedProduct.ImageFile);

                    if (fileResult.Item1 == 1)
                    {
                        existingProduct.ProductImage = fileResult.Item2;
                    }
                }
                else
                {
                    existingProduct.ProductImage = existingProduct.ProductImage;
                }
                // Call the update method from your repository
                var updateResult = await _productRepository.UpdateAsync(existingProduct);

                if (updateResult)
                {
                    status.StatusMessage = "Updated successfully";
                    status.StatusCode = 1;
                }
                else
                {
                    status.StatusMessage = "Error on updating product";
                    status.StatusCode = 0;
                }

                return Ok(status);
            }
            catch (Exception e)
            {
                // Log the exception if needed
                status.StatusCode = 0;
                status.StatusMessage = "Internal server error";
                return Ok(status);
            }
        }

        [HttpGet("categories", Name = "GetCategories")]
        public async Task<ActionResult<RestDTO<string[]>>> GetCategories()
        {
            var products = await _productRepository.GetAllAsync();
            var categories = products
                .Select(p => p.Category)
                .Distinct()
                .ToArray();


            return Ok(new RestDTO<string[]>
            {
                Data = categories,
                Links = new List<LinkDTO>
                {
                    new LinkDTO(Url.Action(null, "Product", null, Request.Scheme)!, "self", "GET"),
                }
            });
        }

        [HttpGet("tags", Name = "GetTags")]
        public ActionResult<RestDTO<string[]>> GetTags()
        {
            var tags = Enum.GetNames(typeof(ProductTag));

            return Ok(new RestDTO<string[]>
            {
                Data = tags,
                Links = new List<LinkDTO>
                {
                    new LinkDTO(Url.Action(null, "Product", null, Request.Scheme)!, "self", "GET"),
                }
            });
        }
    }
}
