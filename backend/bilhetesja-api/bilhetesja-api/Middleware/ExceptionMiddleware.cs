namespace bilhetesja_api.Middlewares
{
    using bilhetesja_api.DTOs.Auth;
    using bilhetesja_api.Exceptions;
    using System.Net;
    using System.Text.Json;

    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogWarning(ex, "Erro de autenticação.");
                await HandleExceptionAsync(context, HttpStatusCode.Unauthorized, ex.Message);
            }
            catch (HttpException ex)
            {
                _logger.LogWarning(ex, "Erro HTTP customizado.");
                await HandleExceptionAsync(context, (HttpStatusCode)ex.StatusCode, ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro interno.");
                await HandleExceptionAsync(context, HttpStatusCode.InternalServerError, "Ocorreu um erro interno.");
            }

        }

        private static Task HandleExceptionAsync(HttpContext context, HttpStatusCode statusCode, string message)
        {
            var response = new ErrorResponseDto
            {
                Status = (int)statusCode,
                Mensagem = message
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            var json = JsonSerializer.Serialize(response);
            return context.Response.WriteAsync(json);
        }
    }

}
