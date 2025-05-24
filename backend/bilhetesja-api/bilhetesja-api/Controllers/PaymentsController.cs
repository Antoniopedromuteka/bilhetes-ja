using bilhetesja_api.DTOs.Payment;
using bilhetesja_api.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace bilhetesja_api.Controllers
{
    [ApiController]
    [Route("/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePayment([FromBody] CreatePaymentRequestDto dto)
        {
            await _paymentService.ProcessarPagamentoAsync(dto);
            return Ok(new { message = "Pagamento realizado com sucesso." });
        }
    }

}
