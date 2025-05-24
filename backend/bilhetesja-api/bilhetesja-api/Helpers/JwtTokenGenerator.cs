using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using bilhetesja_api.Entities;
using Microsoft.IdentityModel.Tokens;

namespace bilhetesja_api.Helpers
{
 
    public class JwtTokenGenerator
    {
        private readonly IConfiguration _config;

        public JwtTokenGenerator(IConfiguration config)
        {
            _config = config;
        }

        public string GenerateToken(User user)
        {
            var claims = new[]
              {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("nome", user.Nome),
                new Claim(ClaimTypes.Role, user.TipoUsuario.ToString()) 
            };


            var keyString = _config["Jwt:Key"]
                ?? throw new InvalidOperationException("Jwt:Key não está configurado no appsettings.");
            var issuer = _config["Jwt:Issuer"]
                ?? throw new InvalidOperationException("Jwt:Issuer não está configurado no appsettings.");
            var audience = _config["Jwt:Audience"]
                ?? throw new InvalidOperationException("Jwt:Audience não está configurado no appsettings.");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }

}
