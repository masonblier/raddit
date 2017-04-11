import { Component, ChangeDetectorRef } from '@angular/core';

/**
  App Component
*/
@Component({
  moduleId: module.id,
  selector: 'raddit-app',
  templateUrl: './app.component.html',
})
export class AppComponent  {
  name = 'RadditApp';

  constructor(private cdref: ChangeDetectorRef) { }

  onDataChange(nextData: any) {
    this.cdref.detectChanges();
  }
}
