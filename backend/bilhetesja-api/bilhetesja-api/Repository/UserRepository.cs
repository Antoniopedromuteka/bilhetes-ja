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
            await _context.Users.Include(U => U.Imagem).FirstOrDefaultAsync(U => U.Id == id);

        public async Task CreateAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(User user)
        {
            _context.Users.Update(user);
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
    }

}
