using AutoMapper;
using bilhetesja_api.DTOs.Event;
using bilhetesja_api.Entities;
using bilhetesja_api.Repository.Interfaces;
using bilhetesja_api.Services.Interface;

namespace bilhetesja_api.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _repository;
        private readonly IMapper _mapper;

        public EventService(IEventRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<EventReadDto>> GetAllAsync()
        {
            var eventos = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<EventReadDto>>(eventos);
        }

        public async Task<EventReadDto?> GetByIdAsync(int id)
        {
            var evento = await _repository.GetByIdAsync(id);
            return evento == null ? null : _mapper.Map<EventReadDto>(evento);
        }

        public async Task<EventReadDto> CreateAsync(EventCreateDto dto)
        {
            var evento = _mapper.Map<Event>(dto);
            await _repository.CreateAsync(evento);
            await _repository.SaveChangesAsync();
            return _mapper.Map<EventReadDto>(evento);
        }

        public async Task<bool> UpdateAsync(int id, EventUpdateDto dto)
        {
            var evento = await _repository.GetByIdAsync(id);
            if (evento == null) return false;

            _mapper.Map(dto, evento);
            await _repository.UpdateAsync(evento);
            return await _repository.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var evento = await _repository.GetByIdAsync(id);
            if (evento == null) return false;

            await _repository.DeleteAsync(id);
            return await _repository.SaveChangesAsync();
        }
    }

}
