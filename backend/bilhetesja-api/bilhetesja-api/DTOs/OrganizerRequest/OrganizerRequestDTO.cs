using bilhetesja_api.Entities;

namespace bilhetesja_api.DTOs.OrganizerRequest
{
    public class OrganizerRequestDTO
    {
    }
    public class OrganizerRequestCreateDto
    {
        public int UsuarioId { get; set; }
    }

    public class OrganizerRequestReadDto
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public DateTime DataSolicitacao { get; set; }
        public int UsuarioId { get; set; }
        public string NomeUsuario { get; set; }
    }

    public class OrganizerRequestUpdateStatusDto
    {
        public StatusSolicitacao Status { get; set; }
    }

}
