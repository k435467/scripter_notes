---
sidebar_position: 2
---

# App_Start

## Global.asax.cs

Register global filters.

```csharp
public class GlobalExceptionFilterAttribute: ExceptionFilterAttribute
{
  public override void OnException(HttpActionExecutedContext context)
  {
    var exception = context.Exception.
    context.Response = context.Request.CreateResponse(HttpStatusCode.BadRequest, new 
    {
      Code = exception.Source ?? "SYSTEM_ERROR",
      Message = exception.Message,
    });
  }
}
```
