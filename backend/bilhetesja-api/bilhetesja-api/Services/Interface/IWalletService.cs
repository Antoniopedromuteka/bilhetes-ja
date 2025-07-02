namespace bilhetesja_api.Services.Interface
{
    public interface IWalletService
    {
        Task<decimal> GetBalanceAsync(int userId);
    }
}
