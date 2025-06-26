import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TicketTypeService } from '../../../app/core/services/ticketType.service';
import { ticket } from '../../../domain/models/event';
import { FormatMoneyService } from '../../../app/core/services/formatMoney.service';
import { AuthService } from '../../../app/core/services/auth.service';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from '../../../app/core/services/payment.service';
import {  FormsModule } from '@angular/forms';
import { ToastService } from '../../../app/core/services/toast.service';
import { LoaderService } from '../../../app/core/services/loader.service';
import { EmailService } from '../../../app/core/services/Email.service';
import { User } from '../../../domain/models/user';



const MODULES = [MatCheckboxModule, FormsModule];

@Component({
  selector: 'app-checkout',
  imports: [...MODULES],
  template: `<main class="w-full min-h-screen mt-[64px] max-w-[1280px] mx-auto px-3 lg:px-0">
    <div class="mt-20">
      <h2 class="text-3xl font-medium">Detalhes de pagamento</h2>
    </div>

    <div class="mt-10 space-y-4">
      <h2 class="text-xl font-medium">Informação pessoal</h2>
      <div
        class="grid grid-cols-3 gap-4 w-full min-h-[23rem] h-auto border rounded-md"
      >
        <form (ngSubmit)="processPayment()" class="flex flex-col col-span-2 gap-4 p-4">
          <div class="flex flex-col gap-1">
            <label>Nome</label>
            <input
              type="text"
              [(ngModel)]="nome"
              name="nome"
              [defaultValue]="nome"
              class="w-full h-12 border p-2 outline-none rounded-md"
              placeholder="Insira o seu nome"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label>Email</label>
            <input
              type="text"
              [(ngModel)]="email"
              name="email"
              class="w-full h-12 border p-2 outline-none rounded-md"
              placeholder="Insira o seu email"
            />
          </div>
          <div class="flex flex-col gap-1 w-full">
            <label>Métodos de pagamento</label>
            <mat-checkbox
              [disabled]="true"
              class="border w-full py-2 flex items-center rounded-md cursor-pointer"
              [checked]="true"
            >
              <div class="flex items-center gap-1 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-credit-card-icon lucide-credit-card"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
                <span class="text-sm w-full font-medium">VISA/MASTERCARD</span>
              </div>
            </mat-checkbox>

            <div class="w-full mt-10" id="card-element"></div>
          </div>
          <button type="submit" class="bg-primary text-white py-2 rounded-md cursor-pointer">
              <span class="text-sm w-full font-medium">Confirmar pagamento</span>
          </button>
        </form>
        <div class="border-l col-span-1">
          <div class="flex gap-4 p-4 items-center">
            <div class="max-w-[140px] bg-black w-full h-[10rem] rounded-md"></div>
            <div class="flex flex-col gap-2">
              <h2 class="text-lg font-medium">{{ ticket().event?.nome }}</h2>
              <p class="text-sm">Bilhete: {{ ticket().nome }}</p>
              <p class="text-2xl font-medium">{{ formatMoneyService.formatEuro(ticket().preco) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>`,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {
  nome: string = '';
  email: string = '';
  stripe: any;
  elements: any;
  cardElement: any;
  route = inject(ActivatedRoute);
  ticketId = signal<number>(0);
  ticket = signal<ticket | any>({});
  ticketTypeService = inject(TicketTypeService);
  formatMoneyService = inject(FormatMoneyService);
  userService = inject(AuthService);
  paymentService = inject(PaymentService);
  toastService = inject(ToastService)
  router = inject(Router);
  loadService = inject(LoaderService);
  emailService = inject(EmailService);
  hasUser = signal<boolean>(false);

  async ngOnInit(): Promise<void> {
    this.loadService.isLoading()
    this.route.params.subscribe((params) => {
      this.ticketId.set(Number(params['ticketId']));
    });

    this.ticketTypeService.getById(this.ticketId()).subscribe({
      next: (response) => {
        this.ticket.set(response);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.userService.usersMe().subscribe({
      next: (response) => {
        this.hasUser.set(true);
        this.nome = response.nome;
        this.email = response.email;

        console.log(response, "meu usuario");
      },
      error: (error) => {
        this.hasUser.set(false);
        this.router.navigate(['/auth/sign-in']);
      },

    });

    this.stripe = await loadStripe('pk_test_51LLophC1xRf0r2qDurkg6M2dFGRAuxFgVaeIha40YyKD8xT8qT2kRktUo1O4IkP2KrMpqjcpsMG7kjvBDTavKNtj00jIx7zZri');
    this.elements = this.stripe.elements();
    this.cardElement = this.elements.create('card');
    this.cardElement.mount('#card-element');

    this.loadService.hide()
  }

  async processPayment(){
    // if(!this.hasUser()){
    //   const senha = this.generatePassword()
    //   console.log(senha, ":::::::::::::::");
    //   const response = await this.createUser({nome: this.nome, email: this.email, senha: senha})
    //   if(!response){
    //     this.toastService.error('Falha ao criar conta.')
    //     return
    //   }
    // }
    await this.pagar()
  }

  async pagar() {
    this.loadService.show()
    const { paymentMethod, error } = await this.stripe!.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
      billing_details: { name: this.nome, email: this.email },
    });


    if (error || !paymentMethod) {
      alert('Erro ao criar método de pagamento.');
      this.loadService.hide()
      return;
    }

    this.paymentService
      .pay({
        nome: this.nome,
        email: this.email,
        paymentMethodId: paymentMethod.id,
        ticketTypeId: this.ticketId(),
      })
      .subscribe({
        next: async () => {
          this.router.navigate(['/dashboard/tickets']);
          this.toastService.success('Pagamento realizado com sucesso.')

          this.loadService.hide()
        },
        error: (error) => {
          this.toastService.error('Falha ao processar pagamento.'); this.loadService.hide()},
      });
  }


  async createUser({nome, email, senha}: {nome: string, email: string, senha: string}): Promise<User | any> {
    const response = await this.userService.registerUser({nome, email, senha: senha}).subscribe({
      next: (response) => {
        return response
      },
      error: (error) => {
          console.log(error);
        this.loadService.hide()
        throw new Error(error)
      },
    })

    return response;
  }

  generatePassword(){
    return Math.random().toString(36).slice(2);
  }
}
