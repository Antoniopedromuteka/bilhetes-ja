namespace bilhetesja_api.Services.Interface
{
    using bilhetesja_api.DTOs.Ticket;
    using bilhetesja_api.Entities;

    public interface ITicketService
    {
        Task<IEnumerable<TicketReadDto>> GetAllAsync();
        Task<TicketReadDto?> GetByIdAsync(int id);
        Task<TicketReadDto> CreateAsync(TicketCreateDto dto);
        Task<bool> UpdateAsync(int id, TicketUpdateDto dto);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<TicketReadDto>> GetAllAsync(StatusBilhete? status);

    }

}
