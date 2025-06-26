using bilhetesja_api.Entities;

namespace bilhetesja_api.Repository.Interfaces
{
    public interface IWalletRepository
    {
        Task<Wallet?> GetByUserIdAsync(int userId);
        Task AddAsync(Wallet wallet);
        Task UpdateAsync(Wallet wallet);

        Task UpdateBalanceAsync(int id, decimal amountToAdd);

        Task <int> GetOrCreateWalletIdAsync(int id);
    }
}
