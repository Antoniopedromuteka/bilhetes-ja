using bilhetesja_api.Data;
using bilhetesja_api.Entities;
using bilhetesja_api.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace bilhetesja_api.Repository
{
    public class TicketTypeRepository : ITicketTypeRepository
    {
        private readonly BilheteJaDbContext _context;

        public TicketTypeRepository(BilheteJaDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TicketType>> GetAllAsync()
        {
            return await _context.TicketTypes.Include(t => t.Evento).ToListAsync();
        }

        public async Task<TicketType?> GetByIdAsync(int id)
        {
            return await _context.TicketTypes.Include(t => t.Evento).FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task AddAsync(TicketType ticketType)
        {
            await _context.TicketTypes.AddAsync(ticketType);
        }

        public void Delete(TicketType ticketType)
        {
            _context.TicketTypes.Remove(ticketType);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }

}
