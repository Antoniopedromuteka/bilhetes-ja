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
        public required string Categoria { get; set; }
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
        public string Categoria { get; set; } = string.Empty;
        public DateTime DataEvento { get; set; }
        public int LotacaoTotal { get; set; } = 0;
        public StatusEvento Status { get; set; }
    }


}
