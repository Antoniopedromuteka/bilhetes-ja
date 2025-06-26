using bilhetesja_api.DTOs.Event;
using bilhetesja_api.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bilhetesja_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : ControllerBase
    {
        private readonly IEventService _service;

        public EventController(IEventService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventReadDto>>> GetAll() =>
            Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<ActionResult<EventReadDto>> GetById(int id)
        {
            var evento = await _service.GetByIdAsync(id);
            return evento == null ? NotFound() : Ok(evento);
        }

        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<EventReadDto>>> GetByCategory(int categoryId)
        {
            var eventos = await _service.GetEventByCategoryAsync(categoryId);
            return Ok(eventos);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<EventReadDto>> Create(EventCreateDto dto)
        {
            var evento = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = evento.Id }, evento);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, EventUpdateDto dto)
        {
            var success = await _service.UpdateAsync(id, dto);
            return success ? NoContent() : NotFound();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            return success ? NoContent() : NotFound();
        }

        [HttpGet("pesquisar")]
        public async Task<IActionResult> BuscarEventos([FromQuery] EventFilterDTO filtro)
        {
            var eventos = await _service.GetByFilterAsync(filtro);
            return Ok(eventos);
        }
    }

}
