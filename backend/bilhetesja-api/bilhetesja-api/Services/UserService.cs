using AutoMapper;
using bilhetesja_api.DTOs.User;
using bilhetesja_api.Entities;
using bilhetesja_api.Repository.Interfaces;
using bilhetesja_api.Services.Interface;
using FluentValidation;
using System.Security.Claims;

namespace bilhetesja_api.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContext;

        public UserService(IUserRepository repository, IMapper mapper, IHttpContextAccessor httpContext)
        {
            _repository = repository;
            _mapper = mapper;
            _httpContext = httpContext;
        }

        public async Task<IEnumerable<UserReadDto>> GetAllAsync()
        {
            var users = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<UserReadDto>>(users);
        }

        public async Task<UserReadDto?> GetByIdAsync(int id)
        {
            var user = await _repository.GetByIdAsync(id);
            return user == null ? null : _mapper.Map<UserReadDto>(user);
        }

        public async Task<UserReadDto> CreateAsync(UserCreateDto dto)
        {
            var emailExists = await _repository.EmailExistsAsync(dto.Email);
            if (emailExists)
                throw new ValidationException("Este email já está em uso.");
            var user = _mapper.Map<User>(dto);
            user.DataCriacao = DateTime.UtcNow;
            user.SenhaHash = BCrypt.Net.BCrypt.HashPassword(dto.Senha);
            await _repository.CreateAsync(user);
            return _mapper.Map<UserReadDto>(user);
        }

        public async Task<bool> UpdateAsync(int id, UserUpdateDto dto)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user == null) return false;

            _mapper.Map(dto, user);
            await _repository.UpdateAsync(user);
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }

        public async Task<UserMeDto?> GetMeAsync()
        {
            var userIdClaim = _httpContext.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null) return null;

            var user = await _repository.GetByIdAsync(int.Parse(userIdClaim));
            if (user == null) return null;

            return new UserMeDto
            {
                Id = user.Id,
                Nome = user.Nome,
                Email = user.Email,
                Telefone = user.Telefone,
                TipoUsuario = user.TipoUsuario.ToString(),
                ImagemUrl = user.Imagem?.Url
            };
        }

    }

}
