using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using tfgBackend.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace tfgBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly HeatrowDbContext _db;
        public AuthController(HeatrowDbContext db)
        {
            _db = db;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {

            var user = await _db.Users.FirstOrDefaultAsync(u => u.Username == request.Username);


            if (user == null)
                return Unauthorized("Usuario o contraseña incorrectos");

            // Comparar el hash SHA256 de la contraseña
            var sha256 = System.Security.Cryptography.SHA256.Create();
            var passwordBytes = System.Text.Encoding.UTF8.GetBytes(request.Password);
            var hashBytes = sha256.ComputeHash(passwordBytes);
            var hashString = string.Concat(hashBytes.Select(b => b.ToString("x2")));




            if (!string.Equals(user.Password, hashString, System.StringComparison.OrdinalIgnoreCase))
                return Unauthorized("Usuario o contraseña incorrectos");

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };
            var identity = new ClaimsIdentity(claims, "MyCookieAuth");
            var principal = new ClaimsPrincipal(identity);
            await HttpContext.SignInAsync("MyCookieAuth", principal);
            return Ok(new { message = "Login correcto" });
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync("MyCookieAuth");
            return Ok(new { message = "Logout correcto" });
        }

        [HttpGet("me")]
        public IActionResult Me()
        {
            if (!User.Identity.IsAuthenticated)
                return Unauthorized();
            return Ok(new
            {
                username = User.Identity.Name,
                role = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value
            });
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
