namespace bilhetesja_api.Profiles
{
    using AutoMapper;
    using bilhetesja_api.Entities;
    using bilhetesja_api.DTOs.Ticket;
    using bilhetesja_api.Helpers;
    using bilhetesja_api.DTOs.User;
    using bilhetesja_api.DTOs.TicketType;

    public class TicketProfile : Profile
    {
        public TicketProfile()
        {
            CreateMap<Ticket, TicketReadDto>();
            CreateMap<TicketCreateDto, Ticket>();
            CreateMap<TicketUpdateDto, Ticket>();
            CreateMap<User, UserReadDto>();
            CreateMap<TicketType, TicketTypeReadDto>();
            CreateMap<Ticket, TicketReadDto>()
            .ForMember(dest => dest.CodigoQRBase64,
                 opt => opt.MapFrom(src => Convert.ToBase64String(QrCodeHelper.GenerateQrCode(src.CodigoQR))))
            .ForMember(dest => dest.usuario,
                opt => opt.MapFrom(src => src.Usuario))
            .ForMember(dest => dest.TicketType,
            opt => opt.MapFrom(src => src.Tipo));
        }
    }

}
