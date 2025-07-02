using bilhetesja_api.Data;
using bilhetesja_api.DTOs.TicketType;
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
            return await _context.TicketTypes
                .AsNoTracking()
                .Include(t => t.Evento)
                .ThenInclude(e => e!.Organizador)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<TicketType?> GetByIdWithoutRastrAsync(int id)
        {
            return await _context.TicketTypes
                .AsNoTracking()
                .FirstOrDefaultAsync(t => t.Id == id);
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

        public async Task UpadteAsync(TicketType ticketType)
        {
            var existing = await _context.TicketTypes
                .AsNoTracking()
                .FirstOrDefaultAsync(t => t.Id == ticketType.Id);

            if (existing == null) throw new Exception("TicketType não encontrado");

            _context.Entry(existing).CurrentValues.SetValues(ticketType);

            _context.Entry(existing).State = EntityState.Modified;

            await _context.SaveChangesAsync();
        }


        public async Task<TicketType?> GetByIdWithoutRelationsAsync(int id)
        {
            return await _context.TicketTypes
                .AsNoTracking()
                .Select(t => new TicketType 
                {
                    Id = t.Id,
                    Nome = t.Nome,
                    Preco = t.Preco,
                    Quantidade = t.Quantidade,
                    EventoId = t.EventoId 
                })
                .FirstOrDefaultAsync(t => t.Id == id);
        }


        public async Task UpdateQuantityOnlyAsync(int id, int newQuantity)
        {
            await _context.Database.ExecuteSqlInterpolatedAsync(
                $"UPDATE TicketTypes SET Quantidade = {newQuantity} WHERE Id = {id}"
            );
        }

        public async Task<IEnumerable<TicketType?>> GetByEventId(int id)
        {

            return await _context.TicketTypes
                .AsNoTracking()
                .Include(t => t.Evento)
                .ThenInclude(e => e!.Organizador)
                .Where(t => t.EventoId == id)
                .ToListAsync();
        }
    }

}
