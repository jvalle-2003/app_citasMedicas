import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

import { ToastType } from '../../constants/toast.constant'
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private modals: DynamicDialogRef[] = []; //* Debe de usarse como pila
  constructor(
    private toastService: ToastrService,
    private dialogService: DialogService
  ) {}

  showToast(
    message: string | undefined,
    type: ToastType = ToastType.SUCCESS,
    title?: string
  ) {
    switch (type) {
      case ToastType.SUCCESS:
        this.toastService.success(message, title);
        break;
      case ToastType.ERROR:
        this.toastService.error(message, title);
        break;
      case ToastType.WARNING:
        this.toastService.warning(message, title);
        break;
      case ToastType.INFO:
        this.toastService.info(message, title);
        break;
      default:
        break;
    }
  }
  clearToasts() {
    this.toastService.clear();
  }
  showComponent(component: any, options: DynamicDialogConfig) {
    const defaultOptions = {
      baseZIndex: 10000,

      ...options,
    };

    const componentOptions = { ...defaultOptions, ...options };

    const modalRef = this.dialogService.open(component, componentOptions);
    this.modals.push(modalRef);

    return modalRef;
  }
  closeComponent(response?: any) {
    if (this.modals.length > 0) {
      const ref = this.modals.pop();
      if (ref) {
        ref.close(response);
      }
    }
  }
  closeAll() {
    this.modals.forEach((modal) => modal.close());
    this.modals = [];
  }
}