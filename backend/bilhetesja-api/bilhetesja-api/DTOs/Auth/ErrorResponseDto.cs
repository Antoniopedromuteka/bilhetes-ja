namespace bilhetesja_api.DTOs.Auth
{
    public class ErrorResponseDto
    {
        public int Status { get; set; }
        public string Mensagem { get; set; } = string.Empty;
    }
}
