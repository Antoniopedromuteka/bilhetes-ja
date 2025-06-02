using bilhetesja_api.Entities;

namespace bilhetesja_api.Repository.Interfaces
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllAsync();
        Task<Category?> GetByIdAsync(int id);
        Task AddAsync(Category categoria);
        Task UpdateAsync(Category categoria);
        Task DeleteAsync(Category categoria);
    }
}
