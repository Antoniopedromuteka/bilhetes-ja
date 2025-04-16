using bilhetesja_api.Data;
using bilhetesja_api.Entities;
using bilhetesja_api.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace bilhetesja_api.Repository
{
    public class EventRepository : IEventRepository
    {
        private readonly BilheteJaDbContext _context;

        public EventRepository(BilheteJaDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Event>> GetAllAsync() =>
            await _context.Events.Include(E => E.Imagem).ToListAsync();

        public async Task<Event?> GetByIdAsync(int id) =>
            await _context.Events.Include(E => E.Imagem).FirstOrDefaultAsync(E => E.Id == id);

        public async Task AddAsync(Event ev) =>
            await _context.Events.AddAsync(ev);

        public async Task<bool> SaveChangesAsync() =>
            await _context.SaveChangesAsync() > 0;

        public async Task CreateAsync(Event ev)
        {
            _context.Events.Add(ev);
            await _context.SaveChangesAsync();

        }

        public async Task UpdateAsync(Event ev)
        {
            _context.Events.Update(ev);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var eventR = await _context.Events.FindAsync(id);
            if (eventR == null) return false;

            _context.Events.Remove(eventR);
            await _context.SaveChangesAsync();
            return true;
        }
    }

}
