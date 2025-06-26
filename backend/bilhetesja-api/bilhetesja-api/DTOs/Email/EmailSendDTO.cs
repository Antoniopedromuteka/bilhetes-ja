using System.ComponentModel.DataAnnotations;

namespace bilhetesja_api.DTOs.Email
{
    public class EmailSendDTO
    {
        [Required(ErrorMessage = "O campo 'To' é obrigatório.")]
        [EmailAddress(ErrorMessage = "O campo 'To' deve ser um endereço de email válido.")]
        public string To { get; set; } = string.Empty;

        public string Subject { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
    }

}
