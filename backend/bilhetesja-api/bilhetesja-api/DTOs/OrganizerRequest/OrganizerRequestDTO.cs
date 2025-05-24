using bilhetesja_api.Entities;

namespace bilhetesja_api.DTOs.OrganizerRequest
{
    public class OrganizerRequestDTO
    {
    }
    public class OrganizerRequestCreateDto
    {
        public int UsuarioId { get; set; } = 0;
    }

    public class OrganizerRequestReadDto
    {
        public int Id { get; set; } = 0;
        public string Status { get; set; } = string.Empty;
        public DateTime DataSolicitacao { get; set; } = DateTime.Now;
        public int UsuarioId { get; set; } = 0;
        public string NomeUsuario { get; set; } = string.Empty;
    }

    public class OrganizerRequestUpdateStatusDto
    {
        public StatusSolicitacao Status { get; set; } = StatusSolicitacao.Pendente;
    }

}
