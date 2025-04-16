using System.ComponentModel.DataAnnotations;

namespace bilhetesja_api.Entities
{
    public class TicketType
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Nome { get; set; }

        public decimal Preco { get; set; }

        public int Quantidade { get; set; }

        public int EventoId { get; set; }
        public Event Evento { get; set; }

        public ICollection<Ticket> Bilhetes { get; set; }
    }

}
