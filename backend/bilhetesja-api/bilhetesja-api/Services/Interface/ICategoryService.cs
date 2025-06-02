using bilhetesja_api.DTOs.Category;

namespace bilhetesja_api.Services.Interface
{
    public interface ICategoryService
    {
            Task<List<CategoriaResponseDto>> GetAllAsync();
            Task<CategoriaResponseDto?> GetByIdAsync(int id);
            Task CreateAsync(CreateCategoriaDto dto);
            Task UpdateAsync(int id, UpdateCategoriaDto dto);
            Task DeleteAsync(int id);
    }
}
