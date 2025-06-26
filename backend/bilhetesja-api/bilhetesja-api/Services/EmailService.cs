using System.Net;
using System.Net.Mail;
using bilhetesja_api.Services.Interface;
using Microsoft.Extensions.Configuration;

namespace bilhetesja_api.Services
{

    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            var sender = _configuration["Email:Smtp:Sender"];
            if (string.IsNullOrWhiteSpace(sender))
                throw new Exception("O campo 'Sender' está vazio ou nulo.");

            Console.WriteLine("Sender carregado: " + sender);

            var smtpClient = new SmtpClient(_configuration["Email:Smtp:Host"])
            {
                Port = int.Parse(_configuration["Email:Smtp:Port"]!),
                Credentials = new NetworkCredential(
                    _configuration["Email:Smtp:Username"],
                    _configuration["Email:Smtp:Password"]
                ),
                EnableSsl = true
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(sender),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };

            mailMessage.To.Add(to);
            await smtpClient.SendMailAsync(mailMessage);
        }
    }

}
