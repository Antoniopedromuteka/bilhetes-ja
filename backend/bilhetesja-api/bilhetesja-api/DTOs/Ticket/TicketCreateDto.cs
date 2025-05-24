using bilhetesja_api.Entities;

namespace bilhetesja_api.DTOs.Ticket
{
    public class TicketCreateDto
    {
            public int UsuarioId { get; set; } = 0;
            public int TipoId { get; set; } = 0;
    }

    public class TicketReadDto
    {
        public int Id { get; set; }
        public string CodigoQR { get; set; } = string.Empty;
        public DateTime DataCompra { get; set; } = DateTime.Now;
        public StatusBilhete Status { get; set; } = StatusBilhete.Ativo;
        public int UsuarioId { get; set; } = 0;
        public int TipoId { get; set; }= 0;
        public string CodigoQRBase64 { get; set; } = string.Empty;
    }

    public class TicketUpdateDto
    {
        public StatusBilhete Status { get; set; } = StatusBilhete.Ativo;
    }
}
