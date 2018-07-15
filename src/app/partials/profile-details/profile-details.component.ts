import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  @ViewChild('inputPicture') inputPicture: ElementRef;
  @ViewChild('profilePicture') profilePicture: ElementRef;
  @ViewChild('editPictureModal') editPictureModal: ElementRef;
  @ViewChild('cropPicture') cropPicture: ElementRef;

  pictureCroppie: Croppie;

  pictureIsLoading:boolean = false;
  formIsLoading:boolean = false;

  constructor() { }

  ngOnInit() {

    //init semantic ui components
    this.initUI();
  }

  initUI() {

    //date
    $('#dob_calender').calendar({
      type: 'date'
    });

    //modal initialization
    $(this.editPictureModal.nativeElement).modal({
      onApprove: () => {
        this.profilePictureIsLoading = true;
        this.changePicture().then(
          () => {
            this.profilePictureIsLoading = false;
          }
        )
      },
    })

  }

  /**Dimmer */
  dim(context) {
    $(context).dimmer('show');
  }

  reveal(context) {
    $(context).dimmer('hide');
  }
  /**/

  browsePicture() {
    this.inputPicture.nativeElement.click();
  }

  selectPicture(files:File[]) {
    let file = files[0];

    if(file && file.type === 'image/jpeg' && FileReader) {
      let fr = new FileReader();

      fr.onload = () => {

        //open dedit modal
        this.editPicture(fr.result);
        
      }

      fr.readAsDataURL(file);
    }
  }

  editPicture(url:string) {

    //init croppie if not initialized
    if(!this.pictureCroppie) {
      this.pictureCroppie = new Croppie(this.cropPicture.nativeElement, {
        boundary: {width: 250, height: 250},
        viewport: {width: 200, height: 200, type: 'circle'}
      });
    }
    this.pictureCroppie.bind({
      url: url
    });

    //open modal
    $(this.editPictureModal.nativeElement).modal("show");
  }

  async changePicture() {
    const result = await this.pictureCroppie.result({
      type: 'base64',
      size: { width: 500, height: 500 }
    });

    this.profilePicture.nativeElement.src = result;
  }

}
