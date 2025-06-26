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

        public async Task<string> ProcessarPagamentoAsync(decimal valor, string moeda, string descricao, string email, string paymentMethodId)
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)(valor * 100),
                Currency = moeda,
                Description = descricao,
                ReceiptEmail = email,
                PaymentMethod = paymentMethodId,
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                     Enabled = true,
                     AllowRedirects = "never"
                }
            };

           
            var service = new PaymentIntentService();
            var paymentIntent = await service.CreateAsync(options);

            if (paymentIntent.Status == "requires_confirmation")
            {
                paymentIntent = await service.ConfirmAsync(paymentIntent.Id);
            }


            if (paymentIntent.Status != "succeeded")
            {
                throw new HttpException(400, $"PagamenSto não autorizado. Status: {paymentIntent.Status}");
            }

            return paymentIntent.Id;
        }
    }

}
