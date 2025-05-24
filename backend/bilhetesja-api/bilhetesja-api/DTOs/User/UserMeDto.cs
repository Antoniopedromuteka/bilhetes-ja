namespace bilhetesja_api.DTOs.User
{
    public class UserMeDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Telefone { get; set; }
        public string TipoUsuario { get; set; } = string.Empty;
        public string? ImagemUrl { get; set; }
    }
}
