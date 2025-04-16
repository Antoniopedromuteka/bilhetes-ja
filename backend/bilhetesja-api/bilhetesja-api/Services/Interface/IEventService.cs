using bilhetesja_api.DTOs.Event;

namespace bilhetesja_api.Services.Interface
{
    public interface IEventService
    {
        Task<IEnumerable<EventReadDto>> GetAllAsync();
        Task<EventReadDto?> GetByIdAsync(int id);
        Task<EventReadDto> CreateAsync(EventCreateDto dto);
        Task<bool> UpdateAsync(int id, EventUpdateDto dto);
        Task<bool> DeleteAsync(int id);
    }

}
