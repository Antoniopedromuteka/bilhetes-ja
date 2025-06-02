using System.ComponentModel.DataAnnotations;

namespace bilhetesja_api.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Nome { get; set; } = null!;

        [MaxLength(500)]
        public string? IconUrl { get; set; } = string.Empty;
        public ICollection<Event> Eventos { get; set; } = new List<Event>();
    }
}
