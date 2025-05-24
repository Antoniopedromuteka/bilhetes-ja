namespace bilhetesja_api.DTOs.TicketType
{
    public class TicketTypeUpdateDto
    {
        public string Nome { get; set; } = string.Empty;
        public decimal Preco { get; set; } = 0;
        public int Quantidade { get; set; } = 0;
    }

}
