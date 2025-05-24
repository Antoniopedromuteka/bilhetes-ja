namespace bilhetesja_api.Services.Interface
{
    public interface IStripeService
    {
        Task<string> ProcessarPagamentoAsync(decimal valor, string moeda, string descricao, string email, string tokenStripe);
    }

}
