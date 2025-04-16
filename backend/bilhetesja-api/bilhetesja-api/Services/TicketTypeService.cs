using AutoMapper;
using bilhetesja_api.DTOs.TicketType;
using bilhetesja_api.Entities;
using bilhetesja_api.Repository.Interfaces;
using bilhetesja_api.Services.Interface;

namespace bilhetesja_api.Services
{
    public class TicketTypeService : ITicketTypeService
    {
        private readonly ITicketTypeRepository _repository;
        private readonly IMapper _mapper;

        public TicketTypeService(ITicketTypeRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TicketTypeReadDto>> GetAllAsync()
        {
            var list = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<TicketTypeReadDto>>(list);
        }

        public async Task<TicketTypeReadDto?> GetByIdAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            return entity == null ? null : _mapper.Map<TicketTypeReadDto>(entity);
        }

        public async Task<TicketTypeReadDto> CreateAsync(TicketTypeCreateDto dto)
        {
            var entity = _mapper.Map<TicketType>(dto);
            await _repository.AddAsync(entity);
            await _repository.SaveChangesAsync();
            return _mapper.Map<TicketTypeReadDto>(entity);
        }

        public async Task<bool> UpdateAsync(int id, TicketTypeUpdateDto dto)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return false;

            _mapper.Map(dto, entity);
            return await _repository.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _repository.GetByIdAsync(id);
            if (entity == null) return false;

            _repository.Delete(entity);
            return await _repository.SaveChangesAsync();
        }
    }

}
