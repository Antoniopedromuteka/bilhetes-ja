using bilhetesja_api.DTOs.OrganizerRequest;
using bilhetesja_api.Entities;

namespace bilhetesja_api.Services.Interface
{
    public interface IOrganizerRequestService
    {
        Task<IEnumerable<OrganizerRequestReadDto>> GetAllAsync();
        Task<OrganizerRequestReadDto?> GetByIdAsync(int id);
        Task<OrganizerRequestReadDto> CreateAsync(OrganizerRequestCreateDto dto);
        Task<bool> UpdateStatusAsync(int id, StatusSolicitacao novoStatus);
    }

}
