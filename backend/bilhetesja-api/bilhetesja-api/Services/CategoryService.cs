using bilhetesja_api.DTOs.Category;
using bilhetesja_api.Entities;
using bilhetesja_api.Repository.Interfaces;
using bilhetesja_api.Services.Interface;

namespace bilhetesja_api.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repo;

        public CategoryService(ICategoryRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<CategoriaResponseDto>> GetAllAsync()
        {
            var categorias = await _repo.GetAllAsync();
            return categorias.Select(c => new CategoriaResponseDto
            {
                Id = c.Id,
                Nome = c.Nome,
                IconUrl = c.IconUrl
            }).ToList();
        }

        public async Task<CategoriaResponseDto?> GetByIdAsync(int id)
        {
            var categoria = await _repo.GetByIdAsync(id);
            if (categoria == null) return null;

            return new CategoriaResponseDto
            {
                Id = categoria.Id,
                Nome = categoria.Nome,
                IconUrl = categoria.IconUrl
            };
        }

        public async Task CreateAsync(CreateCategoriaDto dto)
        {
            var categoria = new Category { Nome = dto.Nome, IconUrl = dto.IconUrl };
            await _repo.AddAsync(categoria);
        }

        public async Task UpdateAsync(int id, UpdateCategoriaDto dto)
        {
            var categoria = await _repo.GetByIdAsync(id);
            if (categoria == null) throw new Exception("Categoria não encontrada");

            categoria.Nome = dto.Nome;
            categoria.IconUrl = dto.IconUrl;
            await _repo.UpdateAsync(categoria);
        }

        public async Task DeleteAsync(int id)
        {
            var categoria = await _repo.GetByIdAsync(id);
            if (categoria == null) throw new Exception("Categoria não encontrada");

            await _repo.DeleteAsync(categoria);
        }
    }
}
