namespace bilhetesja_api.DTOs.User
{
    public class UserMeDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Telefone { get; set; }
        public string TipoUsuario { get; set; } = string.Empty;
        public string? ImagemUrl { get; set; }
        public WalletDto? Carteira { get; set; }
        public List<EventoResumoDto> EventosOrganizados { get; set; } = new();
        public List<TicketResumoDto> TicketsComprados { get; set; } = new();
    }

    public class EventoResumoDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public DateTime Data { get; set; }
    }

    public class TicketResumoDto
    {
        public int Id { get; set; }
        public string Codigo { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public int EventoId { get; set; }
    }

    public class WalletDto
    {
        public int Id { get; set; }
        public decimal Saldo { get; set; }
    }

}
