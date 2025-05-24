using bilhetesja_api.DTOs.Auth;
using bilhetesja_api.DTOs.User;
using bilhetesja_api.Entities;
using bilhetesja_api.Exceptions;
using bilhetesja_api.Helpers;
using bilhetesja_api.Repository.Interfaces;
using bilhetesja_api.Services.Interface;

namespace bilhetesja_api.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtTokenGenerator _tokenGenerator;

        public AuthService(IUserRepository userRepository, JwtTokenGenerator tokenGenerator)
        {
            _userRepository = userRepository;
            _tokenGenerator = tokenGenerator;
        }

        public async Task<AuthResponseDto> LoginAsync(AuthRequestDto dto)
        {
            var user = await _userRepository.GetByEmailAsync(dto.Email);
            if (user == null || !PasswordHasher.Verify(dto.Senha, user.SenhaHash))
                throw new UnauthorizedAccessException("Credenciais inválidas.");

            var token = _tokenGenerator.GenerateToken(user);

            return new AuthResponseDto
            {
                Token = token,
                UserId = user.Id,
                Nome = user.Nome,
                Email = user.Email,
                TipoUsuario = user.TipoUsuario.ToString()
            };
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterUserDto dto)
        {
            if (await _userRepository.EmailExistsAsync(dto.Email))
                throw new HttpException(400, "Email já está em uso.");

            var user = new User
            {
                Nome = dto.Nome,
                Email = dto.Email,
                Telefone = dto.Telefone,
                SenhaHash = PasswordHasher.Hash(dto.Senha),
                TipoUsuario = TipoUsuario.usuario,
                DataCriacao = DateTime.UtcNow
            };

            await _userRepository.CreateAsync(user);

            var token = _tokenGenerator.GenerateToken(user);

            return new AuthResponseDto
            {
                Token = token,
                UserId = user.Id,
                Nome = user.Nome,
                Email = user.Email,
                TipoUsuario = user.TipoUsuario.ToString()
            };
        }
    }

}
