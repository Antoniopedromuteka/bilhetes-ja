namespace bilhetesja_api.Validators
{
    using bilhetesja_api.DTOs.OrganizerRequest;
    using FluentValidation;

    public class OrganizerRequestCreateDtoValidator : AbstractValidator<OrganizerRequestCreateDto>
    {
        public OrganizerRequestCreateDtoValidator()
        {
            RuleFor(x => x.UsuarioId).NotEmpty().WithMessage("O ID do usuário é obrigatório.");
        }
    }

}
