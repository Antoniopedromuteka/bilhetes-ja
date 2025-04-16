using bilhetesja_api.Entities;

namespace bilhetesja_api.DTOs.Ticket
{
    public class TicketCreateDto
    {
            public int UsuarioId { get; set; }
            public int TipoId { get; set; }
    }

    public class TicketReadDto
    {
        public int Id { get; set; }
        public string CodigoQR { get; set; }
        public DateTime DataCompra { get; set; }
        public StatusBilhete Status { get; set; }
        public int UsuarioId { get; set; }
        public int TipoId { get; set; }
        public string CodigoQRBase64 { get; set; }
    }

    public class TicketUpdateDto
    {
        public StatusBilhete Status { get; set; }
    }
}
