namespace bilhetesja_api.DTOs.Payment
{
    public class PaymentResponseDto
    {
        public string StripePaymentId { get; set; } = string.Empty;
        public bool Sucesso { get; set; }
        public string Mensagem { get; set; } = string.Empty;
    }

}
