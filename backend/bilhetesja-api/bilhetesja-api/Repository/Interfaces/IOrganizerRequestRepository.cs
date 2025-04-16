using bilhetesja_api.Entities;

namespace bilhetesja_api.Repository.Interfaces
{
    public interface IOrganizerRequestRepository
    {
        Task<IEnumerable<OrganizerRequest>> GetAllAsync();
        Task<OrganizerRequest?> GetByIdAsync(int id);
        Task AddAsync(OrganizerRequest request);
        Task<bool> SaveChangesAsync();
    }

}
