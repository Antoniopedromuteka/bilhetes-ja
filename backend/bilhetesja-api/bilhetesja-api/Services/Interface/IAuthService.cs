using bilhetesja_api.DTOs.Auth;
using bilhetesja_api.DTOs.User;

namespace bilhetesja_api.Services.Interface
{
    public interface IAuthService
    {
        Task<AuthResponseDto> LoginAsync(AuthRequestDto dto);
        Task<AuthResponseDto> RegisterAsync(RegisterUserDto dto);
    }
}
