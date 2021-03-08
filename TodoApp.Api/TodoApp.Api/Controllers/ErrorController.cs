using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using TodoApp.Api.Exceptions;

namespace TodoApp.Api.Controllers
{
    [ApiController]
    public class ErrorController : ControllerBase
    {
        [Route("/error-local-development")]
        public IActionResult ErrorLocalDevelopment(
            [FromServices] IWebHostEnvironment webHostEnvironment)
        {
            if (webHostEnvironment.EnvironmentName != "Development")
            {
                throw new InvalidOperationException(
                    "Invalid request.");
            }

            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();

            var error = context.Error;
            var statusCode = 500;

            if(error is NotFoundException)
            {
                statusCode = 404;
            }

            return Problem(
                detail: context.Error.StackTrace,
                title: context.Error.Message,
                statusCode: statusCode);
        }

        [Route("/error")]
        public IActionResult Error() => Problem();
    }
}
