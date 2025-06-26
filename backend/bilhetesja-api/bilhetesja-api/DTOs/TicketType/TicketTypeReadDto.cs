using bilhetesja_api.DTOs.Event;

namespace bilhetesja_api.DTOs.TicketType
{
    public class TicketTypeReadDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public decimal Preco { get; set; }
        public int Quantidade { get; set; }
        public int EventoId { get; set; }
        public string EventoNome { get; set; } = string.Empty;
        public EventReadDto? Event { get; set; }
    }

    public class TicketTypeBasicInfo
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public decimal Preco { get; set; }
        public int Quantidade { get; set; }
        public int EventoId { get; set; }
    }

}
