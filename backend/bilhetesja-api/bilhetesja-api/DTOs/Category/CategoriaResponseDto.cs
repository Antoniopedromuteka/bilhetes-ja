namespace bilhetesja_api.DTOs.Category
{
    public class CategoriaResponseDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string? IconUrl { get; set; }
    }
}
