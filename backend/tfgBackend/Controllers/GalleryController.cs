using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tfgBackend.Data;

namespace tfgBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GalleryController : ControllerBase
    {
        private readonly HeatrowDbContext _db;
        private readonly IWebHostEnvironment _env;

        private static readonly string[] PhotoExt = { ".jpg", ".jpeg", ".png", ".webp" };
        private static readonly string[] VideoExt = { ".mp4", ".webm" };
        private const long MaxPhotoBytes = 10L * 1024 * 1024;
        private const long MaxVideoBytes = 100L * 1024 * 1024;

        public GalleryController(HeatrowDbContext db, IWebHostEnvironment env)
        {
            _db = db;
            _env = env;
        }

        // GET /api/gallery?type=photo|video
        [HttpGet]
        public async Task<IActionResult> GetItems([FromQuery] string? type)
        {
            var query = _db.GalleryItems.AsQueryable();
            if (!string.IsNullOrEmpty(type))
            {
                if (type != "photo" && type != "video")
                    return BadRequest(new { error = "type debe ser 'photo' o 'video'" });
                query = query.Where(i => i.Type == type);
            }

            var items = await query
                .OrderByDescending(i => i.CreatedAt)
                .Select(i => new {
                    i.Id,
                    i.Title,
                    i.Type,
                    FilePath = i.FilePath,
                    i.CreatedAt,
                    i.IsActive
                })
                .ToListAsync();

            return Ok(items);
        }

        // POST /api/gallery/upload
        [HttpPost("upload")]
        [Authorize(Roles = "admin")]
        [RequestSizeLimit(110L * 1024 * 1024)]
        public async Task<IActionResult> Upload([FromForm] string type, [FromForm] string? title, [FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { error = "Archivo requerido" });

            if (type != "photo" && type != "video")
                return BadRequest(new { error = "type debe ser 'photo' o 'video'" });

            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            var allowed = type == "photo" ? PhotoExt : VideoExt;
            if (!allowed.Contains(ext))
                return BadRequest(new { error = $"Extensión no permitida para {type}. Permitidas: {string.Join(", ", allowed)}" });

            var maxBytes = type == "photo" ? MaxPhotoBytes : MaxVideoBytes;
            if (file.Length > maxBytes)
            {
                var mb = maxBytes / (1024 * 1024);
                return BadRequest(new { error = $"Archivo demasiado grande. Máximo {mb}MB" });
            }

            var publicRoot = ResolvePublicRoot();
            var folder = Path.Combine(publicRoot, "gallery", type);
            Directory.CreateDirectory(folder);

            var fileName = $"{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid():N}{ext}";
            var diskPath = Path.Combine(folder, fileName);

            using (var stream = new FileStream(diskPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var item = new GalleryItem
            {
                Title = string.IsNullOrWhiteSpace(title) ? Path.GetFileNameWithoutExtension(file.FileName) : title,
                Type = type,
                FilePath = $"/gallery/{type}/{fileName}",
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };

            _db.GalleryItems.Add(item);
            await _db.SaveChangesAsync();

            return Ok(new {
                item.Id, item.Title, item.Type, item.FilePath, item.CreatedAt, item.IsActive
            });
        }

        // DELETE /api/gallery/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _db.GalleryItems.FindAsync(id);
            if (item == null) return NotFound();

            if (!string.IsNullOrEmpty(item.FilePath))
            {
                var publicRoot = ResolvePublicRoot();
                var rel = item.FilePath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar);
                var diskPath = Path.Combine(publicRoot, rel);
                try
                {
                    if (System.IO.File.Exists(diskPath))
                        System.IO.File.Delete(diskPath);
                }
                catch { /* no bloquear el borrado del registro si el archivo ya no existe */ }
            }

            _db.GalleryItems.Remove(item);
            await _db.SaveChangesAsync();
            return NoContent();
        }

        // PATCH /api/gallery/{id}/toggle
        [HttpPatch("{id}/toggle")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Toggle(int id)
        {
            var item = await _db.GalleryItems.FindAsync(id);
            if (item == null) return NotFound();

            item.IsActive = !item.IsActive;
            await _db.SaveChangesAsync();
            return Ok(new { item.Id, item.IsActive });
        }

        private string ResolvePublicRoot()
        {
            // public/ del proyecto Astro, dos niveles arriba del backend (backend/tfgBackend/ -> raíz)
            var candidate = Path.GetFullPath(Path.Combine(_env.ContentRootPath, "..", "..", "public"));
            if (Directory.Exists(candidate)) return candidate;

            // Fallback: wwwroot del backend
            var fallback = Path.Combine(_env.ContentRootPath, "wwwroot");
            Directory.CreateDirectory(fallback);
            return fallback;
        }
    }
}
