using bilhetesja_api.DTOs.User;

namespace bilhetesja_api.Services.Interface
{
    public interface IUserService
    {
        Task<IEnumerable<UserReadDto>> GetAllAsync();
        Task<UserReadDto?> GetByIdAsync(int id);
        Task<UserReadDto> CreateAsync(UserCreateDto dto);
        Task<bool> UpdateAsync(int id, UserUpdateDto dto);
        Task<bool> DeleteAsync(int id);
        Task<UserMeDto?> GetMeAsync();

        Task UpdatePasswordAsync(int userId, UpdatePasswordDTO dto);
    }
}
