using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tfgBackend.Data;

namespace tfgBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubscribersController : ControllerBase
    {
        private readonly HeatrowDbContext _db;
        public SubscribersController(HeatrowDbContext db)
        {
            _db = db;
        }

        // POST /api/subscribers — público (formulario de suscripción de la web)
        [HttpPost]
        public async Task<IActionResult> Subscribe([FromBody] SubscribeRequest request)
        {
            var exists = await _db.Subscribers.AnyAsync(s => s.Email == request.Email);
            if (exists)
                return Conflict(new { message = "Este email ya está suscrito" });


            var subscriber = new Subscriber
            {
                Email = request.Email,
                SubscribedAt = DateTime.UtcNow,
                Active = true
            };

            _db.Subscribers.Add(subscriber);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Suscripción correcta" });
        }

        // GET /api/subscribers — solo admin
        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetSubscribers()
        {

            var subscribers = await _db.Subscribers
                .OrderByDescending(s => s.SubscribedAt)
                .Select(s => new {
                    s.Id,
                    s.Email,
                    SubscribedAt = s.SubscribedAt,
                    s.Active
                })
                .ToListAsync();

            return Ok(subscribers);
        }

        // PUT /api/subscribers/5/toggle — solo admin (activar/desactivar)
        [HttpPut("{id}/toggle")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> ToggleSubscriber(int id)
        {
            var subscriber = await _db.Subscribers.FindAsync(id);
            if (subscriber == null) return NotFound();

            subscriber.Active = !subscriber.Active;
            await _db.SaveChangesAsync();

            return Ok(new { subscriber.Id, subscriber.Email, subscriber.Active });
        }

        // DELETE /api/subscribers/5 — solo admin
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteSubscriber(int id)
        {
            var subscriber = await _db.Subscribers.FindAsync(id);
            if (subscriber == null) return NotFound();

            _db.Subscribers.Remove(subscriber);
            await _db.SaveChangesAsync();

            return NoContent();
        }

        // GET /api/subscribers/emails — solo admin, devuelve emails activos
        [HttpGet("emails")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetActiveEmails()
        {
            var emails = await _db.Subscribers
                .Where(s => s.Active)
                .Select(s => s.Email)
                .ToListAsync();

            return Ok(emails);
        }

        // GET /api/subscribers/unsubscribe?email=xxx — público
        [HttpGet("unsubscribe")]
        [AllowAnonymous]
        public async Task<IActionResult> Unsubscribe([FromQuery] string email)
        {
            var subscriber = await _db.Subscribers.FirstOrDefaultAsync(s => s.Email == email);
            if (subscriber == null) return NotFound();

            subscriber.Active = false;
            await _db.SaveChangesAsync();

            return Ok(new { message = "Baja correcta" });
        }
    }

    public class SubscribeRequest
    {
        public string Email { get; set; }
    }


}