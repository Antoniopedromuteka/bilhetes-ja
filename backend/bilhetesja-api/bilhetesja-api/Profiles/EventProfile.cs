namespace bilhetesja_api.Profiles
{
    using AutoMapper;
    using bilhetesja_api.DTOs.Event;
    using bilhetesja_api.Entities;

    public class EventProfile : Profile
    {
        public EventProfile()
        {
            CreateMap<Event, EventReadDto>();
            CreateMap<EventCreateDto, Event>();
            CreateMap<EventUpdateDto, Event>();
            CreateMap<Event, EventReadDto>();
            CreateMap<Category, CategoryDto>();
            CreateMap<User, UserDto>();
            CreateMap<Image, ImageDto>();
            CreateMap<TicketType, TipoBilheteDto>()
                .ForMember(dest => dest.Preco, opt => opt.MapFrom(src => src.Preco.ToString("F2")));
        }
    }

}
