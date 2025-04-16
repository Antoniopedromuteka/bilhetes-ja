using bilhetesja_api.DTOs.TicketType;
using FluentValidation;

namespace bilhetesja_api.Validators
{
    public class TicketTypeUpdateDtoValidator : AbstractValidator<TicketTypeUpdateDto>
    {
        public TicketTypeUpdateDtoValidator()
        {
            RuleFor(x => x.Nome).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Preco).GreaterThan(0);
            RuleFor(x => x.Quantidade).GreaterThan(0);
        }
    }

}
