using AutoMapper;
using bilhetesja_api.DTOs.OrganizerRequest;
using bilhetesja_api.Entities;
using bilhetesja_api.Repository.Interfaces;
using bilhetesja_api.Services.Interface;

namespace bilhetesja_api.Services
{
    public class OrganizerRequestService : IOrganizerRequestService
    {
        private readonly IOrganizerRequestRepository _repository;
        private readonly IMapper _mapper;

        public OrganizerRequestService(IOrganizerRequestRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<OrganizerRequestReadDto>> GetAllAsync()
        {
            var list = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<OrganizerRequestReadDto>>(list);
        }

        public async Task<OrganizerRequestReadDto?> GetByIdAsync(int id)
        {
            var item = await _repository.GetByIdAsync(id);
            return item == null ? null : _mapper.Map<OrganizerRequestReadDto>(item);
        }

        public async Task<OrganizerRequestReadDto> CreateAsync(OrganizerRequestCreateDto dto)
        {
            var request = _mapper.Map<OrganizerRequest>(dto);
            request.Status = StatusSolicitacao.Pendente;
            request.DataSolicitacao = DateTime.UtcNow;

            await _repository.AddAsync(request);
            await _repository.SaveChangesAsync();

            return _mapper.Map<OrganizerRequestReadDto>(request);
        }

        public async Task<bool> UpdateStatusAsync(int id, StatusSolicitacao novoStatus)
        {
            var request = await _repository.GetByIdAsync(id);
            if (request == null) return false;

            request.Status = novoStatus;
            return await _repository.SaveChangesAsync();
        }
    }

}
