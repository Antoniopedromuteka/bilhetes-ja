import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, ListUser } from '../../../../app/core/services/auth.service';
import { ToastService } from '../../../../app/core/services/toast.service';

const COMPONENTS = [
  BreadcrumbComponent
];

@Component({
  selector: 'app-settings',
  imports: [...COMPONENTS, ReactiveFormsModule],
  template: `
    <main>
      <app-breadcrumb [breadcrumbItems]="breadcrumbItems" />
      <section class="w-full">
        <div class="mt-4">
          <h2 class="text-2xl font-medium">Meus dados</h2>
        </div>
        <section class="w-full grid grid-cols-1 lg:grid-cols-3  gap-6 mt-5">
          <div class="col-span-1 border h-40 bg-white flex items-center px-5 rounded-md">
            <div class="w-24 h-24 rounded-md bg-gray-200 flex items-center justify-center">
              <span class="text-gray-950">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
              </span>
            </div>
          </div>
          <form [formGroup]="formUser" (ngSubmit)="handleUpdate()" class="col-span-1 lg:col-span-2 p-6 border bg-white rounded-md h-[20rem] flex flex-col justify-between gap-2">
            <h2 class="text-xl font-medium">Dados pesooais</h2>
            <div class="flex w-full items-center gap-2 mt-2">
              <div class="w-full flex flex-col gap-1">
                <label for="nome" class="block text-sm font-medium text-gray-700">Nome Completo</label>
                <input type="text" name="nome" id="nome" formControlName="nome" class="w-full h-10 rounded-md bg-gray-100 focus:outline-1 px-2" />
              </div>
              <div class="w-full flex flex-col gap-1">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input  type="email" name="email" id="email" formControlName="email" class="w-full h-10 rounded-md bg-gray-100 focus:outline-1 px-2" />
              </div>
            </div>
            <div class="w-full flex flex-col gap-1">
                <label for="telefone" class="block text-sm font-medium text-gray-700">Telefone</label>
                <input type="text" name="telefone" id="telefone" formControlName="telefone" class="w-full h-10 rounded-md bg-gray-100 focus:outline-1 px-2" />
            </div>

            <div class="max-w-xs w-full">
              <button type="submit" class="bg-primary cursor-pointer text-white w-24 h-10 rounded-md">Salvar</button>
            </div>
          </form>
        </section>
      </section>
      <form [formGroup]="formUpdatePassword" (ngSubmit)="handleUpdatePassword()" class="w-full max-w-[820px] rounded-md ml-auto bg-white h-72 mt-5 p-6 flex justify-between flex-col gap-2">
        <h2 class="text-xl font-medium">Informações de senha</h2>
        <div class="flex gap-2">
        <div class="w-full flex flex-col gap-1">
          <label for="currentPassword" class="block text-sm font-medium text-gray-700">Senha Actual</label>
          <input  type="password" name="currentPassword" id="currentPassword" formControlName="currentPassword" class="w-full max-w-sm h-10 rounded-md bg-gray-100 focus:outline-1 px-2" />
        </div>
        <div class="w-full flex flex-col gap-1">
          <label for="newPassword" class="block text-sm font-medium text-gray-700">Nova Senha</label>
          <input  type="password" name="newPassword" id="newPassword" formControlName="newPassword" class="w-full max-w-sm h-10 rounded-md bg-gray-100 focus:outline-1 px-2" />
        </div>
        </div>
        <div class="w-full flex flex-col gap-1">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar Senha</label>
          <input type="password" name="confirmPassword" id="confirmPassword"  formControlName="confirmPassword" class="w-full max-w-sm h-10 rounded-md bg-gray-100 focus:outline-1 px-2" />
        </div>
        <div class="max-w-xs w-full">
          <button type="submit" class="bg-primary cursor-pointer text-white w-24 h-10 rounded-md">Salvar</button>
        </div>
      </form>
    </main>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  formUser!: FormGroup;
  formUpdatePassword!: FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  toastService = inject(ToastService);
  breadcrumbItems = {
    label: 'Painel',
    url: '/dashboard',
    items: [
      {
        label: 'Configurações',
        url: '/dashboard/profile',
      },
    ],
  };

  constructor(){
    this.formUser = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      id: ['', Validators.required]
    })

    this.formUpdatePassword = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.authService.usersMe().subscribe((user) => {
      this.formUser.get('nome')?.setValue(user?.nome);
      this.formUser.get('email')?.setValue(user?.email);
      this.formUser.get('telefone')?.setValue(user?.telefone);
      this.formUser.get('id')?.setValue(Number(user?.id));
    })
  }

  ngOnchages(): void {
    this.authService.usersMe().subscribe((user) => {
      this.formUser.get('nome')?.setValue(user?.nome);
      this.formUser.get('email')?.setValue(user?.email);
      this.formUser.get('telefone')?.setValue(user?.telefone);
      this.formUser.get('id')?.setValue(Number(user?.id));
    })
  }

  handleUpdate(): void {
    if(this.formUser.invalid){
      return;
    }

    const {nome, email, telefone, id} = this.formUser.value;
    this.authService.updateUser({id, nome, email, telefone}).subscribe({
      next: () => {
        this.toastService.success('Dados atualizados com sucesso!');
        this.formUser.reset();
        this.ngOnchages();
      },
      error: (error) => {
        this.toastService.error('Erro ao atualizar dados!');
        console.log(error);
      },
    });
  }

  handleUpdatePassword(): void {
    if(this.formUpdatePassword.invalid){
      return
    }

    const {currentPassword, newPassword, confirmPassword} = this.formUpdatePassword.value;
    this.authService.updatePassword({currentPassword, newPassword, confirmPassword}).subscribe({
      next: () => {
        this.toastService.success('Senha atualizada com sucesso!');
        this.formUpdatePassword.reset();
      },
      error: (error) => {
        this.toastService.error('Erro ao atualizar senha!');
        console.log(error);
      },
    });
  }
}
