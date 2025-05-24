using bilhetesja_api.DTOs.Auth;
using bilhetesja_api.DTOs.User;
using bilhetesja_api.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace bilhetesja_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthRequestDto dto)
        {
            var response = await _authService.LoginAsync(dto);
            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto dto)
        {
            var response = await _authService.RegisterAsync(dto);
            return Ok(response);
        }
    }

}
