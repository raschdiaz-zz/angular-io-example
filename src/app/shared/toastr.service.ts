/*import { Injectable, ViewContainerRef, OnInit } from '@angular/core';

import { ToastsManager } from 'ng2-toastr';


@Injectable()
export class ToastrService {

  viewContainerRef


  public constructor(public toastr: ToastsManager, viewContainerRef: ViewContainerRef) {
    // You need this small hack in order to catch application root view container ref (ng2-bootstrap)
    this.viewContainerRef = viewContainerRef;

    // Breaking change solution for Angular v2.2.x
    // https://github.com/PointInside/ng2-toastr
    this.toastr.setRootViewContainerRef(viewContainerRef);
  }

  showSuccess(): void {
    this.toastr.success('You are awesome!', 'Success!');
  }

  showError(): void {
    this.toastr.error('This is not good!', 'Oops!');
  }

  showWarning(): void {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo(): void {
    this.toastr.info('Just some information for you.');
  }
  
  showCustom(): void {
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
  }

}
*/