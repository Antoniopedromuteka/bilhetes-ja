namespace bilhetesja_api.Entities
{
    public enum StatusBilhete
    {
        Ativo,
        Cancelado,
        Utilizado
    }

    public class Ticket
    {
        public int Id { get; set; }

        public string CodigoQR { get; set; } = string.Empty;

        public DateTime DataCompra { get; set; }

        public StatusBilhete Status { get; set; }

        public int UsuarioId { get; set; }
        public User Usuario { get; set; } = new User();

        public int TipoId { get; set; }
        public TicketType? Tipo { get; set; }

        public Payment? Pagamento { get; set; }
    }

}
