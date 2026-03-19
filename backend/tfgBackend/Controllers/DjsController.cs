using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tfgBackend.Data;

namespace tfgBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DjsController : ControllerBase
    {
        private readonly HeatrowDbContext _db;
        public DjsController(HeatrowDbContext db)
        {
            _db = db;
        }

        // GET /api/djs — público (para mostrar DJs en la web si lo necesitas)
        [HttpGet]
        public async Task<IActionResult> GetDjs()
        {
            var djs = await _db.Djs
                .Select(d => new {
                    d.Id,
                    d.Name,
                    d.Bio,
                    d.Image
                })
                .ToListAsync();

            return Ok(djs);
        }

        // POST /api/djs — solo admin
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> CreateDj([FromBody] DjRequest request)
        {
            var dj = new Dj
            {
                Name = request.Name,
                Bio = request.Bio,
                Image = request.Image
            };

            _db.Djs.Add(dj);
            await _db.SaveChangesAsync();

            return Ok(dj);
        }

        // PUT /api/djs/5 — solo admin
        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateDj(int id, [FromBody] DjRequest request)
        {
            var dj = await _db.Djs.FindAsync(id);
            if (dj == null) return NotFound();

            dj.Name = request.Name;
            dj.Bio = request.Bio;
            dj.Image = request.Image;

            await _db.SaveChangesAsync();
            return NoContent();
        }

        // DELETE /api/djs/5 — solo admin
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteDj(int id)
        {
            var dj = await _db.Djs.FindAsync(id);
            if (dj == null) return NotFound();

            _db.Djs.Remove(dj);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }

    public class DjRequest
    {
        public string Name { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
    }
}