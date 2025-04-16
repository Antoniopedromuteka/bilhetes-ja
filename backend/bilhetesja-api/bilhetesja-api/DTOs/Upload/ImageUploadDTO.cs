using System.ComponentModel.DataAnnotations;

namespace bilhetesja_api.DTOs.Upload
{
    public class ImageUploadDto
    {
        [Required]
        public IFormFile Arquivo { get; set; }
    }

}
