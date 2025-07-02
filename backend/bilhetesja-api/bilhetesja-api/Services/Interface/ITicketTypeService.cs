using bilhetesja_api.DTOs.TicketType;

namespace bilhetesja_api.Services.Interface
{
    public interface ITicketTypeService
    {
        Task<IEnumerable<TicketTypeReadDto>> GetAllAsync();
        Task<TicketTypeReadDto?> GetByIdAsync(int id);
        Task<TicketTypeReadDto> CreateAsync(TicketTypeCreateDto dto);
        Task<bool> UpdateAsync(int id, TicketTypeUpdateDto dto);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<TicketTypeReadDto?>> GetByEventIdAsync(int id);
    }

}
