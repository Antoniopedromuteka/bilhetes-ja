using bilhetesja_api.DTOs.Category;
using bilhetesja_api.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace bilhetesja_api.Controllers
{
 
        [ApiController]
        [Route("[controller]")]
        public class CategoryController : ControllerBase
        {
            private readonly ICategoryService _service;

            public CategoryController(ICategoryService service)
            {
                _service = service;
            }

            [HttpGet]
            public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

            [HttpGet("{id}")]
            public async Task<IActionResult> Get(int id)
            {
                var result = await _service.GetByIdAsync(id);
                return result == null ? NotFound() : Ok(result);
            }

            [HttpPost]
            public async Task<IActionResult> Create(CreateCategoriaDto dto)
            {
                await _service.CreateAsync(dto);
                return Ok();
            }

            [HttpPut("{id}")]
            public async Task<IActionResult> Update(int id, UpdateCategoriaDto dto)
            {
                await _service.UpdateAsync(id, dto);
                return Ok();
            }

            [HttpDelete("{id}")]
            public async Task<IActionResult> Delete(int id)
            {
                await _service.DeleteAsync(id);
                return Ok();
            }
        }

    }
