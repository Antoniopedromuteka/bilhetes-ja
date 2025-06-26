using bilhetesja_api.DTOs.Email;
using bilhetesja_api.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace bilhetesja_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmailController : ControllerBase
    {
        public readonly IEmailService _emailService;
        public EmailController(IEmailService emailService) {
            _emailService = emailService;
        }

        [HttpPost("")]
        public async Task<IActionResult> TestEmail([FromBody] EmailSendDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _emailService.SendEmailAsync(dto.To, dto.Subject, dto.Body);
            return Ok("Email enviado com sucesso!");
        }

    }
}
