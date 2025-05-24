using bilhetesja_api.Exceptions;
using bilhetesja_api.Services.Interface;
using Stripe;

namespace bilhetesja_api.Services
{
    public class StripeService : IStripeService
    {
        private readonly IConfiguration _config;

        public StripeService(IConfiguration config)
        {
            _config = config;
            StripeConfiguration.ApiKey = _config["Stripe:SecretKey"];
        }

        public async Task<string> ProcessarPagamentoAsync(decimal valor, string moeda, string descricao, string email, string tokenStripe)
        {
            var chargeOptions = new ChargeCreateOptions
            {
                Amount = (long)(valor * 100),
                Currency = moeda,
                Description = descricao,
                ReceiptEmail = email,
                Source = tokenStripe
            };

            var service = new ChargeService();
            var charge = await service.CreateAsync(chargeOptions);

            if (charge.Status != "succeeded")
                throw new HttpException(400, "Pagamento não autorizado pelo Stripe.");

            return charge.Id; 
        }
    }

}
