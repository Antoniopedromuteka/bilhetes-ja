using bilhetesja_api.Entities;

namespace bilhetesja_api.Repository.Interfaces
{
    public interface ITicketTypeRepository
    {
        Task<IEnumerable<TicketType>> GetAllAsync();
        Task<TicketType?> GetByIdAsync(int id);

        Task<IEnumerable<TicketType?>> GetByEventId(int id);
        Task AddAsync(TicketType ticketType);
        Task<bool> SaveChangesAsync();
        void Delete(TicketType ticketType);

        Task UpadteAsync(TicketType ticketType);

        Task <TicketType?> GetByIdWithoutRastrAsync(int id);

        Task<TicketType?> GetByIdWithoutRelationsAsync(int id);
        Task UpdateQuantityOnlyAsync(int id, int newQuantity);

    }

}
