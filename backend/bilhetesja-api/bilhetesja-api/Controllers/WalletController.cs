using bilhetesja_api.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using bilhetesja_api.Extensions.bilhetesja_api.Extensions;
using bilhetesja_api.DTOs.Wallet;
using bilhetesja_api.Services;

namespace bilhetesja_api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class WalletController : ControllerBase
    {
        private readonly IWalletService _walletService;
        private readonly IWalletTransactionService _transactionService;

        public WalletController(IWalletService walletService, IWalletTransactionService transactionService)
        {
            _walletService = walletService;
            _transactionService = transactionService;
        }

        [HttpGet("balance")]
        public async Task<IActionResult> GetBalance()
        {
            var userId = User.GetUserId();
            var balance = await _walletService.GetBalanceAsync(userId);
            return Ok(new { balance });
        }

        [HttpGet("transactions")]
        public async Task<IActionResult> GetTransactions()
        {
            var userId = User.GetUserId();
            var transactions = await _transactionService.GetUserTransactionsAsync(userId);
            return Ok(transactions);
        }


        [HttpGet("filter")]
        public async Task<IActionResult> GetFilteredTransactions([FromQuery] WalletTransactionFilterDTO filter)
        {
            var userId = User.GetUserId();
            var result = await _transactionService.GetByFilterAsync(userId, filter);
            return Ok(result);
        }


    }

}


