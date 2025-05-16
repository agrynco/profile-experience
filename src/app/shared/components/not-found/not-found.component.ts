import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="not-found">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  `,
  styles: ['.not-found { text-align: center; padding: 20px; }']
})
export class NotFoundComponent {}