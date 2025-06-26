using System.ComponentModel.DataAnnotations;

namespace bilhetesja_api.Entities
{
    public enum StatusEvento
    {
        Pendente,
        Aprovado,
        Rejeitado
    }

    public class Event
    {
        public int Id { get; set; }

        [Required, MaxLength(255)]
        public required string Nome { get; set; }

        public string Descricao { get; set; } = string.Empty;

        [MaxLength(255)]
        public string Local { get; set; } = string.Empty;

        public DateTime DataEvento { get; set; }

        public int LotacaoTotal { get; set; } = 0;

        public StatusEvento Status { get; set; } = StatusEvento.Aprovado;
        public int CategoriaId { get; set; }
        public Category? Categoria { get; set; }

        public int OrganizadorId { get; set; }
        public User? Organizador { get; set; }

        public int? ImagemId { get; set; }
        public Image? Imagem { get; set; }

        public ICollection<TicketType>? TiposBilhetes { get; set; } = new List<TicketType>();
    }

}
