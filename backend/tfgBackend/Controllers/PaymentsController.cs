using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace tfgBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        [HttpPost("create-intent")]
        public async Task<IActionResult> CreateIntent([FromBody] CreateIntentRequest request)
        {
            if (request.AmountCents < 50)
                return BadRequest(new { message = "El importe mínimo es 0,50 EUR" });

            var options = new PaymentIntentCreateOptions
            {
                Amount = request.AmountCents,
                Currency = "eur",
                PaymentMethodTypes = new List<string> { "card" },
            };

            var service = new PaymentIntentService();
            var intent = await service.CreateAsync(options);

            return Ok(new { clientSecret = intent.ClientSecret });
        }
    }

    public class CreateIntentRequest
    {
        public long AmountCents { get; set; }
    }
}
