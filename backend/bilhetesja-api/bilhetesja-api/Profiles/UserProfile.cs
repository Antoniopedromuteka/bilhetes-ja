using AutoMapper;
using bilhetesja_api.DTOs.User;
using bilhetesja_api.Entities;

namespace bilhetesja_api.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserCreateDto, User>();
            CreateMap<UserUpdateDto, User>().ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
            CreateMap<User, UserReadDto>();
        }
    }

}
