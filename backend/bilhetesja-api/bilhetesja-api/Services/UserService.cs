using AutoMapper;
using bilhetesja_api.DTOs.User;
using bilhetesja_api.Entities;
using bilhetesja_api.Repository.Interfaces;
using bilhetesja_api.Services.Interface;
using FluentValidation;

namespace bilhetesja_api.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
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
    }

}
