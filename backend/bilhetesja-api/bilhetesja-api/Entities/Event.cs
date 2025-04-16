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
        public string Nome { get; set; }

        public string Descricao { get; set; }

        [MaxLength(100)]
        public string Categoria { get; set; }

        [MaxLength(255)]
        public string Local { get; set; }

        public DateTime DataEvento { get; set; }

        public int LotacaoTotal { get; set; }

        public StatusEvento Status { get; set; }

        public int OrganizadorId { get; set; }
        public User Organizador { get; set; }

        public int? ImagemId { get; set; }
        public Image? Imagem { get; set; }

        public ICollection<TicketType> TiposBilhetes { get; set; }
    }

}
