using bilhetesja_api.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace bilhetesja_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestarEmailController : ControllerBase
    {
        [HttpPost("")]
        public async Task<IActionResult> TestEmail([FromServices] IEmailService emailService)
        {
            await emailService.SendEmailAsync(
                "pedromuteka74@gmail.com",
                "Teste de envio",
                "<p>Isso é um <strong>teste</strong> de envio de e-mail via BilhetesJá</p>"
            );

            return Ok("Email enviado com sucesso!");
        }

    }
}
