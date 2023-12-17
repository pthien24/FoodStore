using FoodStore.Web.Models.Domain;
using FoodStore.Web.DTO;
using FoodStore.Web.Repository.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq.Dynamic.Core;
using System.Linq;
using AutoMapper;

namespace FoodStore.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;
        private readonly IProductRepository _productRepository;
        private readonly ILogger<ProductController> _logger;
        public ProductController(DatabaseContext context, 
            IProductRepository productRepository,
            IFileService fs ,
            ILogger<ProductController> logger,
            IMapper mapper
        ) 
        {
            this._context = context;
            this._productRepository = productRepository;
            this._fileService = fs;
            this._logger = logger;
            this._mapper = mapper;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Product>))]
        public RestDTO<ProductDTO[]> GetProducts(
            [FromQuery(Name = "page")] int pageIndex = 0,
            [FromQuery(Name = "size")] int pageSize = 3,
            [FromQuery(Name = "sort")] string? sortColumn = "ProductName",
            [FromQuery(Name = "order")] string? sortOrder = "ASC",
            [FromQuery(Name = "filter")] string? filterQuery = null,
            [FromQuery(Name = "category")] int? category = null
            )   
        {
            var products = _productRepository.getProducts(category);
            var productDTOs = _mapper.Map<List<ProductDTO>>(products);

            if (!string.IsNullOrEmpty(filterQuery))
            {
                productDTOs = productDTOs.Where(b => b.ProductName.Contains(filterQuery)).ToList();
            }
            //var products = _productRepository.GetProductsByCategory(categoryId);


            var recordcount = productDTOs.Count();
            var totalPages = (int)Math.Ceiling((double)recordcount / pageSize);

            // Sorting
            productDTOs = SortProducts(productDTOs, sortColumn, sortOrder);

            // Pagination
            var paginatedProducts = productDTOs.Skip(pageIndex * pageSize).Take(pageSize).ToArray();
            return new RestDTO<ProductDTO[]>()
            {
                Data = paginatedProducts,
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

        private List<ProductDTO> SortProducts(List<ProductDTO> products, string sortColumn, string sortOrder)
        {
            
            if (sortOrder == "ASC")
            {
                products = products.OrderBy(p => p.GetType().GetProperty(sortColumn)?.GetValue(p, null)).ToList();
            }
            else
            {
                products = products.OrderByDescending(p => p.GetType().GetProperty(sortColumn)?.GetValue(p, null)).ToList();
            }

            return products;
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateProduct( [FromQuery] int catId, [FromForm] ProductDTO productCreate)
        {
            var status = new Status();

            if (productCreate == null)
                return BadRequest(ModelState);
            
            if (productCreate.ImageFile != null)
            {
                var fileResult = _fileService.SaveImage(productCreate.ImageFile);
                if (fileResult.Item1 == 1)
                {
                    productCreate.ProductImage = fileResult.Item2;
                }
                var productMap = _mapper.Map<Product>(productCreate);
                var productResult = _productRepository.CreateProduct(catId, productMap);
                
                if ( productResult)
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
                existingProduct.Price = updatedProduct.Price;

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

       
    }
}
