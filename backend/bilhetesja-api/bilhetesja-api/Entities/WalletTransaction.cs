namespace bilhetesja_api.Entities
{
    public class WalletTransaction
    {
        public int Id { get; set; }

        public decimal Valor { get; set; }

        public string Descricao { get; set; } = string.Empty;

        public DateTime Data { get; set; }

        public required int WalletId { get; set; }
        public Wallet? Wallet { get; set; }

        public int? EventoId { get; set; }
        public Event? Evento { get; set; }

        public int? TicketId { get; set; }
        public Ticket? Ticket { get; set; }
    }

}
