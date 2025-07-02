using bilhetesja_api.DTOs.Ticket;
using bilhetesja_api.Entities;
using bilhetesja_api.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bilhetesja_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService _service;

        public TicketController(ITicketService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TicketReadDto>>> GetAll([FromQuery] StatusBilhete? status)
        {
            var tickets = await _service.GetAllAsync(status);
            return Ok(tickets);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<TicketReadDto>> GetById(int id)
        {
            var ticket = await _service.GetByIdAsync(id);
            return ticket == null ? NotFound() : Ok(ticket);
        }

        [HttpGet("event/{id}")]
        public async Task<ActionResult<TicketReadDto>> GetByEventId(int id)
        {
            var ticket = await _service.GetByEventIdAsync(id);
            return ticket == null ? NotFound() : Ok(ticket);
        }


        [HttpGet("user/{id}")]
        public async Task<ActionResult<TicketReadDto>> GetByUserId(int id)
        {
            var ticket = await _service.GetByUserIdAsync(id);
            return ticket == null ? NotFound() : Ok(ticket);
        }

        [HttpPost]
        public async Task<ActionResult<TicketReadDto>> Create(TicketCreateDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TicketUpdateDto dto)
        {
            var updated = await _service.UpdateAsync(id, dto);
            return updated ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }

        [HttpPatch("{id}/cancel")]
        public async Task<IActionResult> Cancel(int id)
        {
            await _service.UpdateStatusAsync(id, StatusBilhete.Cancelado);
            return NoContent();
        }

        [HttpPatch("{id}/approve")]
        public async Task<IActionResult> Approve(int id)
        {
            await _service.UpdateStatusAsync(id, StatusBilhete.Utilizado);
            return NoContent();
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] TicketStatusUpdateDto dto)
        {
            await _service.UpdateStatusAsync(id, dto.Status);
            return NoContent();
        }
    }
}
