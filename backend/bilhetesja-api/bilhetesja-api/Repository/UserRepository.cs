using bilhetesja_api.Data;
using bilhetesja_api.Entities;
using bilhetesja_api.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace bilhetesja_api.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly BilheteJaDbContext _context;

        public UserRepository(BilheteJaDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllAsync() =>
            await _context.Users.Include(U => U.Imagem).ToListAsync();

        public async Task<User?> GetByIdAsync(int id) =>
            await _context.Users.Include(U => U.Imagem).Include(U => U.TicketsComprados).Include(U => U.Carteira).FirstOrDefaultAsync(U => U.Id == id);

        public async Task CreateAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(User user)
        {
            if (await _context.Users.AnyAsync(u => u.Email == user.Email && u.Id != user.Id))
            {
                throw new InvalidOperationException("E-mail já está em uso");
            }

            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> GetOrganizerByEventIdAsync(int eventId)
        {
            return await _context.Events
                .Where(e => e.Id == eventId)
                .Select(e => e.Organizador)
                .FirstOrDefaultAsync();
        }

        public async Task<int> GetIdByEmailAsync(string email)
        {
            return await _context.Users
                .Where(u => u.Email == email)
                .Select(u => u.Id)
                .FirstOrDefaultAsync();
        }

    }
}
