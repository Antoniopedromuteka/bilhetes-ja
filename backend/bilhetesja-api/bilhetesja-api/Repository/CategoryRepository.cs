using bilhetesja_api.Data;
using bilhetesja_api.Entities;
using bilhetesja_api.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace bilhetesja_api.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly BilheteJaDbContext _context;

        public CategoryRepository(BilheteJaDbContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetAllAsync()
       => await _context.Categories.ToListAsync();

        public async Task<Category?> GetByIdAsync(int id)
            => await _context.Categories.FindAsync(id);

        public async Task AddAsync(Category categoria)
        {
            _context.Categories.Add(categoria);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Category categoria)
        {
            _context.Categories.Update(categoria);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Category categoria)
        {
            _context.Categories.Remove(categoria);
            await _context.SaveChangesAsync();
        }
    }
}
