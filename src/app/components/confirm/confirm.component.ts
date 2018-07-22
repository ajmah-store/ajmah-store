import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Confirm } from '../../models/confirm.model';
import { Store } from '@ngxs/store';
import { DismissConfirm } from '../../store/actions/ui.actions';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit, OnDestroy {

  @Input() confirm: Confirm;

  @ViewChild('modal') modal: ElementRef;

  constructor(private store: Store) { }

  ngOnInit() {

    $(this.modal.nativeElement).modal({
      onApprove: this.confirm.okButton.onClick,
      onDeny: this.confirm.cancelButton.onClick,
      onHidden: () => {
        //dismiss confirm
        this.store.dispatch(new DismissConfirm(this.confirm));

      }
    });

    //show modal
    $(this.modal.nativeElement).modal('show');

  }

  ngOnDestroy() {

    $(this.modal.nativeElement).modal('hide');

  }

}
