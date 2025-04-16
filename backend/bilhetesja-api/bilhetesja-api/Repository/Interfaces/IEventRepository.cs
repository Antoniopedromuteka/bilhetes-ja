using bilhetesja_api.Entities;

namespace bilhetesja_api.Repository.Interfaces
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetAllAsync();
        Task<Event?> GetByIdAsync(int id);
        Task CreateAsync(Event ev);
        Task UpdateAsync(Event ev);
        Task<bool> DeleteAsync(int id);
        Task<bool> SaveChangesAsync();
    }

}
