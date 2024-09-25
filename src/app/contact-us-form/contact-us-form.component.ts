import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.css']
})
export class ContactUsFormComponent {
  address: string = 'Elmansoura, Eldakhlia, Egypt';
  phone: string = '01112263392';
  email: string = 'info@example.com';

  onSubmit(form: any) {
    if (form.valid) {
      const name = form.value.name;
      const email = form.value.email;
      const subject = form.value.subject;
      const message = form.value.message;

      const mailtoLink = `mailto:omarsesa.os@gmail.com?subject=${encodeURIComponent(subject)}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AMessage: ${encodeURIComponent(message)}`;

      window.location.href = mailtoLink;
    }
  }
}


