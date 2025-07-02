using bilhetesja_api.Data;
using bilhetesja_api.DTOs.Event;
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
            await _context.Events.Include(E => E.Categoria).Include(E => E.TiposBilhetes).Include(E => E.Organizador).Include(E => E.Imagem).ToListAsync();

        public async Task<Event?> GetByIdAsync(int id) =>
            await _context.Events.Include(E => E.Categoria).Include(E => E.TiposBilhetes).Include(E => E.Organizador).Include(E => E.Imagem).FirstOrDefaultAsync(E => E.Id == id);

        public async Task AddAsync(Event ev) =>
            await _context.Events.AddAsync(ev);

        public async Task<bool> SaveChangesAsync() =>
            await _context.SaveChangesAsync() > 0;

        public async Task CreateAsync(Event ev)
        {
            _context.Events.Add(ev);
            await _context.SaveChangesAsync();

        }

        public async Task<bool> UpdateAsync(Event ev)
        {
            _context.Events.Update(ev);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var eventR = await _context.Events.FindAsync(id);
            if (eventR == null) return false;

            _context.Events.Remove(eventR);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<User?> GetByOrganizerIdAsync(int organizerId) => await _context.Users.FindAsync(organizerId);

        public async Task<Category?> GetByCategoryIdAsync(int categoryId) => await _context.Categories.FindAsync(categoryId);

        public async Task<IEnumerable<Event>> GetEventByCategory(int categoryId)
        {
            return await _context.Events
                .Include(e => e.Categoria)
                .Include(e => e.TiposBilhetes)
                .Include(e => e.Organizador)
                .Include(e => e.Imagem)
                .Where(e => e.CategoriaId == categoryId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Event>> GetByFilterAsync(EventFilterDTO filter)
        {
            var query = _context.Events
            .Include(e => e.Categoria)
            .Include(e => e.Imagem)
            .Include(e => e.Organizador)
            .Include(e => e.TiposBilhetes)
            .AsQueryable();

            if (filter.CategoriaId.HasValue)
                query = query.Where(e => e.CategoriaId == filter.CategoriaId.Value);

            if (!string.IsNullOrWhiteSpace(filter.Local))
                query = query.Where(e => e.Local.ToLower().Contains(filter.Local.ToLower()));

            if(!string.IsNullOrWhiteSpace(filter.Nome))
                query = query.Where(e => e.Nome.ToLower().Contains(filter.Nome.ToLower()));

            return await query.ToListAsync();
        }

        public async Task<int> GetOrganizerIdByEventIdAsync(int eventId)
        {
            return await _context.Events
                .Where(e => e.Id == eventId)
                .Select(e => e.OrganizadorId)
                .FirstOrDefaultAsync();
        }

        public async Task<string?> GetEventNameByIdAsync(int eventId)
        {
            return await _context.Events
                .Where(e => e.Id == eventId)
                .Select(e => e.Nome)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Event?>> GetByUserIdAsync(int userId)
        {
            return await _context.Events
                .Include(e => e.Categoria)
                .Include(e => e.TiposBilhetes)
                .Include(e => e.Organizador)
                .Include(e => e.Imagem)
                .Where(e => e.OrganizadorId == userId)
                .ToListAsync();
        }
    }

}
