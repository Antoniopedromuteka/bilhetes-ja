using bilhetesja_api.Entities;

namespace bilhetesja_api.Repository.Interfaces
{
    public interface ITicketTypeRepository
    {
        Task<IEnumerable<TicketType>> GetAllAsync();
        Task<TicketType?> GetByIdAsync(int id);
        Task AddAsync(TicketType ticketType);
        Task<bool> SaveChangesAsync();
        void Delete(TicketType ticketType);
    }

}
