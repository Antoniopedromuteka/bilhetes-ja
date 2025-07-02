using bilhetesja_api.DTOs.User;
using FluentValidation;

namespace bilhetesja_api.Validators
{
   
    public class UpdatePasswordValidator : AbstractValidator<UpdatePasswordDTO>
    {
        public UpdatePasswordValidator()
        {
            RuleFor(x => x.CurrentPassword)
                .NotEmpty().WithMessage("A senha actual é obrigatória.");

            RuleFor(x => x.NewPassword)
                .NotEmpty().WithMessage("A nova senha é obrigatória.")
                .MinimumLength(6).WithMessage("A nova senha deve ter no mínimo 6 caracteres.");

            RuleFor(x => x.ConfirmPassword)
                .Equal(x => x.NewPassword).WithMessage("A confirmação da senha não coincide.");
        }
    }

}
