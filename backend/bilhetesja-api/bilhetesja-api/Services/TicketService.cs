namespace bilhetesja_api.Services
{
    using AutoMapper;
    using bilhetesja_api.DTOs.Ticket;
    using bilhetesja_api.Entities;
    using bilhetesja_api.Exceptions;
    using bilhetesja_api.Repository.Interfaces;
    using bilhetesja_api.Services.Interface;


    public class TicketService : ITicketService
    {
        private readonly ITicketRepository _repository;
        private readonly IMapper _mapper;

        public TicketService(ITicketRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TicketReadDto>> GetAllAsync()
        {
            var tickets = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<TicketReadDto>>(tickets);
        }

        public async Task<TicketReadDto?> GetByIdAsync(int id)
        {
            var ticket = await _repository.GetByIdAsync(id);
            return ticket == null ? null : _mapper.Map<TicketReadDto>(ticket);
        }

        public async Task<TicketReadDto> CreateAsync(TicketCreateDto dto)
        {
            var ticket = _mapper.Map<Ticket>(dto);
            ticket.DataCompra = DateTime.UtcNow;
            ticket.Status = StatusBilhete.Ativo;

            var codigo = Guid.NewGuid().ToString();
            ticket.CodigoQR = codigo;

            await _repository.AddAsync(ticket);
            await _repository.SaveChangesAsync();

            return _mapper.Map<TicketReadDto>(ticket);
        }


        public async Task<bool> UpdateAsync(int id, TicketUpdateDto dto)
        {
            var ticket = await _repository.GetByIdAsync(id);
            if (ticket == null) return false;

            _mapper.Map(dto, ticket);
            return await _repository.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var ticket = await _repository.GetByIdAsync(id);
            if (ticket == null) return false;

            _repository.Delete(ticket);
            return await _repository.SaveChangesAsync();
        }

        public async Task<IEnumerable<TicketReadDto>> GetAllAsync(StatusBilhete? status)
        {
            var tickets = await _repository.GetAllAsync(status);
            return _mapper.Map<IEnumerable<TicketReadDto>>(tickets);
        }

        public async Task<bool> UpdateStatusAsync(int ticketId, StatusBilhete novoStatus)
        {
            var ticket = await _repository.GetByIdAsync(ticketId);
            if (ticket == null)
                throw new HttpException(404, "Bilhete não encontrado");

            ticket.Status = novoStatus;
            await _repository.UpdateAsync(ticket);
            return true;
        }
    }

}
