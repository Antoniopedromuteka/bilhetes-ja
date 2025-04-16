namespace bilhetesja_api.Validators
{
    using FluentValidation;
    using bilhetesja_api.DTOs.Ticket;

    public class TicketUpdateDtoValidator : AbstractValidator<TicketUpdateDto>
    {
        public TicketUpdateDtoValidator()
        {
            RuleFor(x => x.Status).IsInEnum();
        }
    }
}
