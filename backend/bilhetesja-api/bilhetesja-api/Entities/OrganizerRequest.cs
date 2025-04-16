namespace bilhetesja_api.Entities
{
    public enum StatusSolicitacao
    {
        Pendente,
        Aprovado,
        Rejeitado
    }

    public class OrganizerRequest
    {
        public int Id { get; set; }

        public StatusSolicitacao Status { get; set; }

        public DateTime DataSolicitacao { get; set; }

        public int UsuarioId { get; set; }
        public User Usuario { get; set; }
    }

}
