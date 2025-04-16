using bilhetesja_api.Entities;

namespace bilhetesja_api.DTOs.Event
{
    public class EventDTO
    {
    }

    public class EventCreateDto
    {
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public string Categoria { get; set; }
        public string Local { get; set; }
        public DateTime DataEvento { get; set; }
        public int LotacaoTotal { get; set; }
        public int OrganizadorId { get; set; }
        public int? ImagemId { get; set; }
    }

    public class EventUpdateDto : EventCreateDto
    {
        public StatusEvento Status { get; set; }
    }

    public class EventReadDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Categoria { get; set; }
        public DateTime DataEvento { get; set; }
        public int LotacaoTotal { get; set; }
        public StatusEvento Status { get; set; }
    }


}
