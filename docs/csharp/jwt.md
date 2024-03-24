---
sidebar_position: 6
---

# JWT

JWT is not encrypted and anyone can access the claim. The only party holding the private key is the one that signed it.

## JWE

Simplest symmetry encryption below.

```csharp
public static string GenerateJWE(int userId)
{
    if (userId < 0)
    {
        return "";
    }
    
    var payload = new Dictionary<string, object>
    {
        { "userId", userId },
    };

    var secretKey = Encoding.UTF8.GetBytes(ConfigurationManager.AppSettings["JweSecretKey"]);

    var jweToken = JWT.Encode(payload, secretKey, JweAlgorithm.A256KW, JweEncryption.A256GCM);

    // var data = JWT.Decode(jweToken, secretKey, JweAlgorithm.A256KW, JweEncryption.A256GCM);

    return jweToken;
}
```
