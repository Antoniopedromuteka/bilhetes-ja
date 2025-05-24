namespace bilhetesja_api.Controllers
{
    using global::bilhetesja_api.Data;
    using global::bilhetesja_api.DTOs.Upload;
    using global::bilhetesja_api.Entities;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System;

    namespace bilhetesja_api.Controllers
    {
        [Authorize]
        [ApiController]
        [Route("[controller]")]
        public class ImageController : ControllerBase
        {
            private readonly IWebHostEnvironment _env;
            private readonly BilheteJaDbContext _context;

            public ImageController(IWebHostEnvironment env, BilheteJaDbContext context)
            {
                _env = env;
                _context = context;
            }

            [HttpPost("upload")]
            public async Task<IActionResult> Upload([FromForm] ImageUploadDto dto)
            {
                var arquivo = dto.Arquivo;

                if (arquivo == null || arquivo.Length == 0)
                    return BadRequest("Nenhum arquivo enviado.");

                var uploadsPath = Path.Combine(_env.WebRootPath, "uploads");

                if (!Directory.Exists(uploadsPath))
                    Directory.CreateDirectory(uploadsPath);

                var nomeArquivo = Guid.NewGuid().ToString() + Path.GetExtension(arquivo.FileName);
                var filePath = Path.Combine(uploadsPath, nomeArquivo);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await arquivo.CopyToAsync(stream);
                }

                var image = new Image
                {
                    Url = $"/uploads/{nomeArquivo}",
                    NomeArquivo = arquivo.FileName,
                    Tamanho = arquivo.Length,
                    DataUpload = DateTime.UtcNow
                };

                _context.Images.Add(image);
                await _context.SaveChangesAsync();

                return Ok(image);
            }


            [HttpDelete("{id}")]
            public async Task<IActionResult> Delete(int id)
            {
                var image = await _context.Images.FindAsync(id);

                if (image == null)
                    return NotFound("Imagem não encontrada.");

                var filePath = Path.Combine(_env.WebRootPath, image.Url.TrimStart('/').Replace("/", Path.DirectorySeparatorChar.ToString()));

                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath); 
                }

                _context.Images.Remove(image); 
                await _context.SaveChangesAsync();

                return NoContent();
            }

        }
    }

}
