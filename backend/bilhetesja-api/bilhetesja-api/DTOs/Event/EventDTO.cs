using bilhetesja_api.DTOs.User;
using bilhetesja_api.Entities;

namespace bilhetesja_api.DTOs.Event
{
    public class EventDTO
    {
    }

    public class EventCreateDto
    {
        public required string Nome { get; set; }
        public required string Descricao { get; set; }
        public required int CategoriaId { get; set; }
        public required string Local { get; set; }

        public required DateTime DataEvento { get; set; }
        public required int LotacaoTotal { get; set; }
        public required int OrganizadorId { get; set; }
        public int? ImagemId { get; set; }
    }

    public class EventUpdateDto : EventCreateDto
    {
        public StatusEvento Status { get; set; } = StatusEvento.Pendente;
    }

    public class EventReadDto
    {
        public int Id { get; set; } = 0;
        public string Nome { get; set; } = string.Empty;
        public int CategoriaId { get; set; }
        public DateTime DataEvento { get; set; }
        public string Descricao { get; set; } = string.Empty;

        public int LotacaoTotal { get; set; } = 0;
        public string Local { get; set; } = string.Empty;

        public StatusEvento Status { get; set; }

        public CategoryDto? Categoria { get; set; }
        public UserDto? Organizador { get; set; }
        public ImageDto? Imagem { get; set; }
        public ICollection<TipoBilheteDto>? TiposBilhetes { get; set; } = new List<TipoBilheteDto>();
    }

    public class CategoryDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
    }

    public class UserDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }

    public class ImageDto
    {
        public int Id { get; set; }
        public string Url { get; set; } = string.Empty;
    }

    public class TipoBilheteDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public decimal Preco { get; set; } = 0;
        public int Quantidade { get; set; } = 0;
        public int EventoId { get; set; }
    }

}
