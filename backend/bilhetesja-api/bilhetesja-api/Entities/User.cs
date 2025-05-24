using System.ComponentModel.DataAnnotations;

namespace bilhetesja_api.Entities
{
    public enum TipoUsuario
    {
        usuario = 0,
        Administrador = 1
    }

    public class User
    {
        public int Id { get; set; }

        [Required, MaxLength(255)]
        public string Nome { get; set; } = string.Empty;

        [Required, MaxLength(255)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(20)]
        public string? Telefone { get; set; }

        [Required]
        public string SenhaHash { get; set; } = string.Empty;
        public int? ImagemId { get; set; }
        public Image? Imagem { get; set; }
        public DateTime DataCriacao { get; set; }

        public TipoUsuario TipoUsuario { get; set; }

        public ICollection<Event> EventosOrganizados { get; set; } = new List<Event>();
        public ICollection<Ticket> TicketsComprados { get; set; } = new List<Ticket>();

        //public OrganizerRequest? OrganizerRequest { get; set; }

        public Wallet? Carteira { get; set; }
   
    }
}
