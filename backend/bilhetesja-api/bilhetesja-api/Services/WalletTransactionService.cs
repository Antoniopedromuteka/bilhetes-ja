using bilhetesja_api.DTOs.Wallet;
using bilhetesja_api.Entities;
using bilhetesja_api.Repository.Interfaces;
using bilhetesja_api.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace bilhetesja_api.Services
{
    public class WalletTransactionService : IWalletTransactionService
    {
        private readonly IWalletTransactionRepository _transactionRepository;
        private readonly IWalletRepository _walletRepository;

        public WalletTransactionService(
            IWalletTransactionRepository transactionRepository,
            IWalletRepository walletRepository)
        {
            _transactionRepository = transactionRepository;
            _walletRepository = walletRepository;
        }

        public async Task<List<WalletTransaction>> GetUserTransactionsAsync(int userId)
        {
            var wallet = await _walletRepository.GetByUserIdAsync(userId)
                         ?? throw new Exception("Carteira não encontrada.");

            return await _transactionRepository.GetByWalletIdAsync(wallet.Id);
        }

        public async Task<List<WalletTransaction>> GetByFilterAsync(int userId, WalletTransactionFilterDTO filter)
        {
            var transactions = await _transactionRepository.GetByFilterAsync(userId, filter.Period);

            return transactions.ToList();
        }
    }

}
