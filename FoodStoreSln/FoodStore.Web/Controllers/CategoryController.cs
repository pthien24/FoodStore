using AutoMapper;
using FoodStore.Web.DTO;
using FoodStore.Web.Models.Domain;
using FoodStore.Web.Repository.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.NetworkInformation;

namespace FoodStore.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        public CategoryController(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(RestDTO<List<CategoryDTO>>))] // Update the type here
        public ActionResult<RestDTO<List<CategoryDTO>>> GetCategories()
        {
            var categories = _mapper.Map<List<CategoryDTO>>(_categoryRepository.GetCategories());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var restDto = new RestDTO<List<CategoryDTO>> // Update the type here
            {
                Data = categories,
                Links = new List<LinkDTO>
                {
                    new LinkDTO(Url.Action(null, "Category", null, Request.Scheme)!, "self", "GET"),
                }
            };

            return Ok(restDto);
        }
        [HttpGet("{categoryId}")]
        [ProducesResponseType(200, Type = typeof(RestDTO<Category>))]
        [ProducesResponseType(400)]
        public ActionResult<RestDTO<CategoryDTO>> GetCategory(int categoryId)
        {
            if (!_categoryRepository.CategoryExists(categoryId))
                return NotFound();

            var category = _mapper.Map<CategoryDTO>(_categoryRepository.GetCategory(categoryId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var restDto = new RestDTO<CategoryDTO> // Update the type here
            {
                Data = category,
                Links = new List<LinkDTO>
                {
                    new LinkDTO(Url.Action(null, "Category", null, Request.Scheme)!, "self", "GET"),
                }
            };

            return Ok(restDto);
        }
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateCategory([FromBody] CategoryDTO categoryCreate)
        {
            var status = new Status();

            if (categoryCreate == null)
                return BadRequest(ModelState);

            var category = _categoryRepository.GetCategories()
                .Where(c => c.Name.Trim().ToUpper() == categoryCreate.Name.TrimEnd().ToUpper())
                .FirstOrDefault();

            if (category != null)
            {
                ModelState.AddModelError("", "Category already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var categoryMap = _mapper.Map<Category>(categoryCreate);

            if (!_categoryRepository.CreateCategory(categoryMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            status.StatusMessage = "Updated successfully";
            status.StatusCode = 1;
            return Ok(status);
        }
        [HttpGet("Product/{categoryId}")]
        [ProducesResponseType(200, Type = typeof(RestDTO<List<ProductDTO>>))]
        [ProducesResponseType(400)]
        public ActionResult<RestDTO<ProductDTO[]>> GetProductByCategoryId(int categoryId)
        {
            var products = _mapper.Map<List<ProductDTO>>(
                _categoryRepository.GetPokemonByCategory(categoryId)).ToArray();

            if (!ModelState.IsValid)
                return BadRequest();

            var restDto =  new RestDTO<ProductDTO[]>()
            {
                Data = products,
                Links = new List<LinkDTO>
                {
                    new LinkDTO(Url.Action(null ,"Product" ,null,Request.Scheme)!,"self","GET"),
                }
            };
            return restDto;
        }

        [HttpPut("{categoryId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateCategory(int categoryId, [FromBody] CategoryDTO updatedCategory)
        {
            var status = new Status();
            if (updatedCategory == null)
            {
                status.StatusCode = 0;
                status.StatusMessage = "Please enter id";
                return Ok(status);
            }

            if (categoryId != updatedCategory.Id)
            {
                status.StatusCode = 0;
                status.StatusMessage = "Category not found";
                return Ok(status);
            }
            var categoryMap = _mapper.Map<Category>(updatedCategory);
            if (_categoryRepository.UpdateCategory(categoryMap))
            {
                ModelState.AddModelError("", "something went wrong updating the category");
            }
            status.StatusMessage = "Updated successfully";
            status.StatusCode = 1;
            return Ok(status);

        }

        [HttpDelete("{categoryId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteCategory(int categoryId)
        {
            var status = new Status();
            if (!_categoryRepository.CategoryExists(categoryId))
            {
                return NotFound();
            }

            var categoryTodelte = _categoryRepository.GetCategory(categoryId);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_categoryRepository.DeleteCategory(categoryTodelte))
            {
                ModelState.AddModelError("","something went wrong deleting category");
            }
            status.StatusMessage = "delete successfully";
            status.StatusCode = 1;
            return Ok(status);
        }
    }
}
