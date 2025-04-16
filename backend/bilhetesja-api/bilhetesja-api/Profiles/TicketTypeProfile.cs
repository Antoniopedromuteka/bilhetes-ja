using AutoMapper;
using bilhetesja_api.DTOs.TicketType;
using bilhetesja_api.Entities;

namespace bilhetesja_api.Profiles
{
    public class TicketTypeProfile : Profile
    {
        public TicketTypeProfile()
        {
            CreateMap<TicketType, TicketTypeReadDto>()
                .ForMember(dest => dest.EventoNome, opt => opt.MapFrom(src => src.Evento.Nome));
            CreateMap<TicketTypeCreateDto, TicketType>();
            CreateMap<TicketTypeUpdateDto, TicketType>();
        }
    }

}
