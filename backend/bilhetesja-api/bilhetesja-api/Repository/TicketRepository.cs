namespace bilhetesja_api.Repository
{
    using bilhetesja_api.Data;
    using bilhetesja_api.Entities;
    using bilhetesja_api.Repository.Interfaces;
    using Microsoft.EntityFrameworkCore;

    public class TicketRepository : ITicketRepository
    {
        private readonly BilheteJaDbContext _context;

        public TicketRepository(BilheteJaDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Ticket>> GetAllAsync()
        {
            return await _context.Tickets.ToListAsync();
        }

        public async Task<Ticket?> GetByIdAsync(int id)
        {
            return await _context.Tickets.FindAsync(id);
        }

        public async Task AddAsync(Ticket ticket)
        {
            await _context.Tickets.AddAsync(ticket);
        }

        public void Delete(Ticket ticket)
        {
            _context.Tickets.Remove(ticket);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Ticket>> GetAllAsync(StatusBilhete? status)
        {
            var query = _context.Tickets.AsQueryable();

            if (status.HasValue)
            {
                query = query.Where(t => t.Status == status.Value);
            }

            return await query.ToListAsync();
        }

        public async Task UpdateAsync(Ticket ticket)
        {
            _context.Tickets.Update(ticket);
            await _context.SaveChangesAsync();
        }
    }

}
