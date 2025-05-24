using System.ComponentModel.DataAnnotations;

namespace bilhetesja_api.Entities
{
    public class Image
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public required string Url { get; set; }

        [MaxLength(255)]
        public required string NomeArquivo { get; set; }

        public long Tamanho { get; set; }

        public DateTime DataUpload { get; set; }

        public ICollection<Event>? Eventos { get; set; }
        public ICollection<User>? Usuarios { get; set; }
    }

}
