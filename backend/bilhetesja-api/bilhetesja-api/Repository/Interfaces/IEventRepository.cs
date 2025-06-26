using bilhetesja_api.DTOs.Event;
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

        Task<User> GetByOrganizerIdAsync(int organizerId);
        Task<Category> GetByCategoryIdAsync(int categoryId);

        Task<IEnumerable<Event>> GetByFilterAsync(EventFilterDTO filter);
        Task<IEnumerable<Event>> GetEventByCategory(int categoryId);

        Task<int> GetOrganizerIdByEventIdAsync(int eventId);

        Task<string?> GetEventNameByIdAsync(int eventId);

    }

}
