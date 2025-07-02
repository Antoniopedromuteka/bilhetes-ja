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
            return await _context.Tickets
                .Include(t => t.Tipo)
                .FirstOrDefaultAsync(t => t.Id == id);
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
            _context.Entry(ticket).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Tickets.AnyAsync(t => t.Id == id);
        }


        public async Task<IEnumerable<Ticket?>> GetByEventId(int id)
        {
           return await _context.Tickets
             .AsNoTracking()
            .Include(t => t.Tipo)
            .Include(t => t.Usuario)
            .Where(t => t!.Tipo!.Evento!.Id == id)
            .ToListAsync();
        }

        public async Task<IEnumerable<Ticket?>> GetByUserId(int id)
        {
            return await _context.Tickets
                .AsNoTracking()
                .Include(t => t.Tipo)
                .Include(t => t.Usuario)
                .Where(t => t.UsuarioId == id)
                .ToListAsync();
        }
    }

}
