namespace bilhetesja_api.Validators
{
    using bilhetesja_api.DTOs.User;
    using FluentValidation;

    public class UserUpdateDtoValidator : AbstractValidator<UserUpdateDto>
    {
        public UserUpdateDtoValidator()
        {
            RuleFor(x => x.Nome)
                .MaximumLength(255).WithMessage("O nome deve ter no máximo 255 caracteres.")
                .When(x => !string.IsNullOrWhiteSpace(x.Nome));

            RuleFor(x => x.Email)
                .MaximumLength(255).WithMessage("O email deve ter no máximo 255 caracteres.")
                .EmailAddress().WithMessage("Email inválido.")
                .When(x => !string.IsNullOrWhiteSpace(x.Email));

            RuleFor(x => x.Telefone)
                .MaximumLength(20).WithMessage("O telefone deve ter no máximo 20 caracteres.")
                .When(x => !string.IsNullOrWhiteSpace(x.Telefone));
        }
    }

}
