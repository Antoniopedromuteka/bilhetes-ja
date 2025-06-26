using bilhetesja_api.Entities;

namespace bilhetesja_api.Repository.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User?> GetByIdAsync(int id);
        Task CreateAsync(User user);
        Task UpdateAsync(User user);
        Task<bool> DeleteAsync(int id);
        Task<bool> EmailExistsAsync(string email);
        Task<User?> GetByEmailAsync(string email);

        Task<User?> GetOrganizerByEventIdAsync(int eventId);
        Task<int> GetIdByEmailAsync(string email);
    }

}
