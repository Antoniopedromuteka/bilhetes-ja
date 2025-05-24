using bilhetesja_api.Entities;

namespace bilhetesja_api.Repository.Interfaces
{
    public interface IWalletTransactionRepository
    {
        Task AddAsync(WalletTransaction transaction);
    }

}
