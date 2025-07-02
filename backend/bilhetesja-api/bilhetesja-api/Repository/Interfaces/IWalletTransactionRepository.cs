using bilhetesja_api.Entities;

namespace bilhetesja_api.Repository.Interfaces
{
    public interface IWalletTransactionRepository
    {
        Task AddAsync(WalletTransaction transaction);
        Task<List<WalletTransaction>> GetByWalletIdAsync(int walletId);

        Task<List<WalletTransaction>> GetByFilterAsync(int userId, string? period);
    }

}
