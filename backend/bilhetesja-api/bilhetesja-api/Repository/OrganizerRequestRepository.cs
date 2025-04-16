using bilhetesja_api.Data;
using bilhetesja_api.Entities;
using bilhetesja_api.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace bilhetesja_api.Repository
{
    public class OrganizerRequestRepository : IOrganizerRequestRepository
    {
        private readonly BilheteJaDbContext _context;

        public OrganizerRequestRepository(BilheteJaDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<OrganizerRequest>> GetAllAsync()
        {
            return await _context.OrganizerRequests
                .Include(r => r.Usuario)
                .ToListAsync();
        }

        public async Task<OrganizerRequest?> GetByIdAsync(int id)
        {
            return await _context.OrganizerRequests
                .Include(r => r.Usuario)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task AddAsync(OrganizerRequest request)
        {
            await _context.OrganizerRequests.AddAsync(request);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }

}
