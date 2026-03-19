using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tfgBackend.Data;

namespace tfgBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly HeatrowDbContext _db;
        public EventsController(HeatrowDbContext db)
        {
            _db = db;
        }

        // GET /api/events — público
        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            var events = await _db.Events
                .Include(e => e.events_djs)
                    .ThenInclude(ed => ed.Dj)
                .OrderBy(e => e.Date)
                .Select(e => new {
                    e.Id,
                    e.Title,
                    e.Description,
                    e.Date,
                    e.Location,
                    e.Image,
                    e.Dice_Link,
                    Djs = e.events_djs.Select(ed => new { ed.Dj.Id, ed.Dj.Name })
                })
                .ToListAsync();

            return Ok(events);
        }

        // GET /api/events/5 — público
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvent(int id)
        {
            var ev = await _db.Events
                .Include(e => e.events_djs)
                    .ThenInclude(ed => ed.Dj)
                .Where(e => e.Id == id)
                .Select(e => new {
                    e.Id,
                    e.Title,
                    e.Description,
                    e.Date,
                    e.Location,
                    e.Image,
                    e.Dice_Link,
                    Djs = e.events_djs.Select(ed => new { ed.Dj.Id, ed.Dj.Name })
                })
                .FirstOrDefaultAsync();

            if (ev == null) return NotFound();
            return Ok(ev);
        }

        // POST /api/events — solo admin
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> CreateEvent([FromBody] EventRequest request)
        {
            var ev = new Event
            {
                Title = request.Title,
                Description = request.Description,
                Date = request.Date,
                Location = request.Location,
                Image = request.Image,
                Dice_Link = request.Dice_Link,
                Created_At = DateTime.UtcNow
            };

            _db.Events.Add(ev);
            await _db.SaveChangesAsync();

            // Asignar DJs si vienen en la request
            if (request.dj_ids != null && request.dj_ids.Any())
            {
                foreach (var dj_id in request.dj_ids)
                {
                    _db.events_djs.Add(new EventDj { event_id = ev.Id, dj_id = dj_id });
                }
                await _db.SaveChangesAsync();
            }

            return CreatedAtAction(nameof(GetEvent), new { id = ev.Id }, ev);
        }

        // PUT /api/events/5 — solo admin
        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateEvent(int id, [FromBody] EventRequest request)
        {
            var ev = await _db.Events.Include(e => e.events_djs).FirstOrDefaultAsync(e => e.Id == id);
            if (ev == null) return NotFound();

            ev.Title = request.Title;
            ev.Description = request.Description;
            ev.Date = request.Date;
            ev.Location = request.Location;
            ev.Image = request.Image;
            ev.Dice_Link = request.Dice_Link;

            // Reemplazar DJs
            if (request.dj_ids != null)
            {
                _db.events_djs.RemoveRange(ev.events_djs);
                foreach (var dj_id in request.dj_ids)
                {
                    _db.events_djs.Add(new EventDj { event_id = ev.Id, dj_id = dj_id });
                }
            }

            await _db.SaveChangesAsync();
            return NoContent();
        }

        // DELETE /api/events/5 — solo admin
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var ev = await _db.Events.FindAsync(id);
            if (ev == null) return NotFound();

            _db.Events.Remove(ev);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }

    // DTO para crear/editar eventos
    public class EventRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string Image { get; set; }
        public string Dice_Link { get; set; }
        public List<int> dj_ids { get; set; } // IDs de los DJs asignados
    }
}