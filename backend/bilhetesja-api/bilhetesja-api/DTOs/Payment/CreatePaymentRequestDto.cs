using System.ComponentModel.DataAnnotations;

namespace bilhetesja_api.DTOs.Payment
{
    public class CreatePaymentRequestDto
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Nome { get; set; } = string.Empty;

        [Required]
        public int TicketTypeId { get; set; }

        [Required]
        public string PaymentMethodId { get; set; } = string.Empty; // ID gerado pelo Stripe
    }

}
