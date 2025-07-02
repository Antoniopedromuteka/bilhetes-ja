using bilhetesja_api.DTOs.Wallet;
using bilhetesja_api.Entities;

namespace bilhetesja_api.Services.Interface
{
    public interface IWalletTransactionService
    {
        Task<List<WalletTransaction>> GetUserTransactionsAsync(int userId);
        Task<List<WalletTransaction>> GetByFilterAsync(int userId, WalletTransactionFilterDTO filter);

    }
}
