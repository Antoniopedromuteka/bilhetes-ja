namespace bilhetesja_api.DTOs.TicketType
{
    public class TicketTypeCreateDto
    {
        public string Nome { get; set; }
        public decimal Preco { get; set; }
        public int Quantidade { get; set; }
        public int EventoId { get; set; }
    }

}
