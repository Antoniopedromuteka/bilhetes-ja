using bilhetesja_api.DTOs.OrganizerRequest;
using bilhetesja_api.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace bilhetesja_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrganizerRequestController : ControllerBase
    {
        private readonly IOrganizerRequestService _service;

        public OrganizerRequestController(IOrganizerRequestService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrganizerRequestReadDto>>> GetAll() =>
            Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<ActionResult<OrganizerRequestReadDto>> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<OrganizerRequestReadDto>> Create(OrganizerRequestCreateDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, OrganizerRequestUpdateStatusDto dto)
        {
            var success = await _service.UpdateStatusAsync(id, dto.Status);
            return success ? NoContent() : NotFound();
        }
    }

}
