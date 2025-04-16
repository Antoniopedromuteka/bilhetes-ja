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
        }
    }

}
