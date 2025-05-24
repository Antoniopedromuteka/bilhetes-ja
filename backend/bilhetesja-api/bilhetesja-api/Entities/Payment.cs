using System.ComponentModel.DataAnnotations;

namespace bilhetesja_api.Entities
{
    public enum StatusPagamento
    {
        Sucesso,
        Falha
    }

    public class Payment
    {
        public int Id { get; set; }

        public decimal ValorTotal { get; set; }

        public decimal Comissao { get; set; }

        public decimal ValorLiquido { get; set; }

        [MaxLength(50)]
        public string Metodo { get; set; } = string.Empty;

        public StatusPagamento Status { get; set; }

        public string StripeId { get; set; } = string.Empty;

        public DateTime DataPagamento { get; set; }

        public int TicketId { get; set; }
        public Ticket Ticket { get; set; } = new Ticket();
    }

}
