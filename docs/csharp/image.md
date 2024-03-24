---
sidebar_position: 5
---

# Image

```csharp
private async Task<GeneralApiResponse<List<string>>> UploadImage(
        ISender sender,
        [FromForm] IFormFileCollection fileCollection,
    )
```

```csharp
using Application.Common.Interfaces;
using Azure.Storage.Blobs;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;

namespace Infrastructure;

class AzureStorageManager : IStorageManager
{
    public BlobContainerClient Container { get; }

    public AzureStorageManager(BlobContainerClient container)
    {
        Container = container;
    }

    public async Task<List<string>> UploadFiles(UploadFileDto dto)
    {
        var urls = new List<string>();
        foreach (var formFile in dto.FileCollection)
        {
            // Load image
            using var memoryStream = new MemoryStream();
            await formFile.CopyToAsync(memoryStream);
            memoryStream.Position = 0;

            using var image = await Image.LoadAsync(memoryStream);
            memoryStream.Position = 0;

            // Configure WebP encoder
            // Perform the conversion to WebP format
            using var webpMemoryStream = new MemoryStream();
            var webpEncoder = new WebpEncoder() { FileFormat = WebpFileFormatType.Lossy, Quality = 90 };
            await image.SaveAsync(webpMemoryStream, webpEncoder);
            webpMemoryStream.Position = 0;

            // Upload
            var fileName = DateTime.UtcNow.ToString("yyyyMMddHHmmssffff") + "_" + Guid.NewGuid();
            var blob = Container.GetBlobClient($"{dto.Folder}/{fileName}.webp");
            await blob.UploadAsync(webpMemoryStream);

            urls.Add(blob.Uri.AbsoluteUri);
        }
        return urls;
    }
}
```