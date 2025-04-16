namespace bilhetesja_api.Profiles
{
    using AutoMapper;
    using bilhetesja_api.DTOs.OrganizerRequest;
    using bilhetesja_api.Entities;

    public class OrganizerRequestProfile : Profile
    {
        public OrganizerRequestProfile()
        {
            CreateMap<OrganizerRequest, OrganizerRequestReadDto>()
                .ForMember(dest => dest.NomeUsuario, opt => opt.MapFrom(src => src.Usuario.Nome));

            CreateMap<OrganizerRequestCreateDto, OrganizerRequest>();
        }
    }

}
