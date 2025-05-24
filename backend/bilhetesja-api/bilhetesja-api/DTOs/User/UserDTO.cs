using bilhetesja_api.Entities;
using System.ComponentModel.DataAnnotations;

namespace bilhetesja_api.DTOs.User
{

    public class UserCreateDto
    {
        [Required, MaxLength(255)]
        public required string Nome { get; set; }

        [Required, MaxLength(255)]
        public required string Email { get; set; }

        [MaxLength(20)]
        public string? Telefone { get; set; }

        [Required]
        public required string Senha { get; set; }

        public TipoUsuario TipoUsuario { get; set; }
    }

    public class UserReadDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Telefone { get; set; }
        public TipoUsuario TipoUsuario { get; set; }
    }

    public class UserUpdateDto
    {
        [MaxLength(255)]
        public string Nome { get; set; } = string.Empty;

        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(20)]
        public string? Telefone { get; set; }
    }


}
