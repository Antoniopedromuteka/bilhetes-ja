using System.ComponentModel.DataAnnotations;

namespace bilhetesja_api.DTOs.Payment
{
    public class CreatePaymentRequestDto
    {
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        public int TicketTypeId { get; set; }

        [Required]
        public string PaymentMethodId { get; set; } // ID gerado pelo Stripe
    }

}
