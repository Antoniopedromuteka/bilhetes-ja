using System.ComponentModel.DataAnnotations;

namespace bilhetesja_api.Entities
{
    public enum TipoUsuario
    {
        Comprador,
        Organizador,
        Administrador
    }

    public class User
    {
        public int Id { get; set; }

        [Required, MaxLength(255)]
        public string Nome { get; set; }

        [Required, MaxLength(255)]
        public string Email { get; set; }

        [MaxLength(20)]
        public string? Telefone { get; set; }

        [Required]
        public string SenhaHash { get; set; }
        public int? ImagemId { get; set; }
        public Image? Imagem { get; set; }
        public DateTime DataCriacao { get; set; }

        public TipoUsuario TipoUsuario { get; set; }

        public ICollection<Event> EventosOrganizados { get; set; }
        public ICollection<Ticket> TicketsComprados { get; set; }
        public OrganizerRequest? OrganizerRequest { get; set; }

        public Wallet? Carteira { get; set; }
   
    }
}
