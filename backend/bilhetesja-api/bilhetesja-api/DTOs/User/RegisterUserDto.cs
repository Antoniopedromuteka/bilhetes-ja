namespace bilhetesja_api.DTOs.User
{
    public class RegisterUserDto
    {
        public required string Nome { get; set; }
        public required string Email { get; set; }
        public string Telefone { get; set; } = string.Empty;
        public required string Senha { get; set; }
    }
}
