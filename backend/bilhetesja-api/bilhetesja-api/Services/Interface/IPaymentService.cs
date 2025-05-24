using bilhetesja_api.DTOs.Payment;

namespace bilhetesja_api.Services.Interface
{
    public interface IPaymentService
    {
        Task ProcessarPagamentoAsync(CreatePaymentRequestDto dto);
    }

}
