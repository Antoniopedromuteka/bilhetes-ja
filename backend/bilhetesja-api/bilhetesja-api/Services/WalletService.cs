using bilhetesja_api.Repository.Interfaces;
using bilhetesja_api.Services.Interface;

namespace bilhetesja_api.Services
{
    public class WalletService : IWalletService
    {
        private readonly IWalletRepository _walletRepository;

        public WalletService(IWalletRepository walletRepository)
        {
            _walletRepository = walletRepository;
        }

        public async Task<decimal> GetBalanceAsync(int userId)
        {
            var wallet = await _walletRepository.GetByUserIdAsync(userId)
                         ?? throw new Exception("Carteira não encontrada.");

            return wallet.SaldoDisponivel;
        }
    }

}
