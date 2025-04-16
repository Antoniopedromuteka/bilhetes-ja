namespace bilhetesja_api.Profiles
{
    using AutoMapper;
    using bilhetesja_api.Entities;
    using bilhetesja_api.DTOs.Ticket;
    using bilhetesja_api.Helpers;

    public class TicketProfile : Profile
    {
        public TicketProfile()
        {
            CreateMap<Ticket, TicketReadDto>();
            CreateMap<TicketCreateDto, Ticket>();
            CreateMap<TicketUpdateDto, Ticket>();
            CreateMap<Ticket, TicketReadDto>()
           .ForMember(dest => dest.CodigoQRBase64, opt => opt.MapFrom(src => Convert.ToBase64String(QrCodeHelper.GenerateQrCode(src.CodigoQR))));
        }
    }

}
