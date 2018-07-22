import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { REGEXP } from '../../constants';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { formatDate } from '../../helpers';
import { ALERT_TYPES, Alert } from '../../models/alert.model';
import { Store } from '@ngxs/store';
import { CreateAlert, DismissAlert } from '../../store/actions/ui.actions';

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

  @Input() user: User;

  pictureCroppie: Croppie;

  pictureIsLoading:boolean = false;
  formIsLoading:boolean = false;

  //hold the blob data after picture is changed
  imgBlob: Blob;

  //form groups
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private store: Store
  ) { }

  ngOnInit() {

    console.log(this.user);

    //init semantic ui components
    this.initUI();

    //init formgroup
    this.createProfileForm();

  }


  initUI() {

    //select dropdown
    $('select.dropdown').dropdown();

    //modal initialization
    $(this.editPictureModal.nativeElement).modal({
      onApprove: () => {
        this.pictureIsLoading = true;
        this.changePicture().then(
          () => {
            this.pictureIsLoading = false;
          }
        )
      },
    });

    //lazy load profile picture
    $(this.profilePicture.nativeElement).visibility({
      type: 'image',
      transition: 'fade in',
      duration: 1000
    });

  }

  /**
   * Create profileForm group
   */
  createProfileForm() {

    this.profileForm = this.fb.group({
      'first_name': [this.user.first_name, Validators.compose([Validators.required, Validators.pattern(REGEXP.name)])],
      'last_name': [this.user.last_name, Validators.compose([Validators.required, Validators.pattern(REGEXP.name)])],
      'email': [this.user.email, Validators.compose([Validators.required, Validators.pattern(REGEXP.email)])],
      'phone': [this.user.phone, Validators.compose([Validators.required, Validators.pattern(REGEXP.phone)])],
      'gender': [this.user.gender || 'male', Validators.pattern('(male)|(female)|(other)')],
      'dob': [this.user.dob || '']
    });

  }

  /**
   * Check if a form is invalid and dirty
   */
  isInvalid(formControlName: string) {

    const control = this.profileForm.controls[formControlName];

    return control.invalid && control.dirty

  }

  /**Dimmer */
  dim(context) {
    $(context).dimmer('show');
  }

  reveal(context) {
    $(context).dimmer('hide');
  }
  /**/

  /**
   * Trigger input:file
   */
  browsePicture() {
    this.inputPicture.nativeElement.click();
  }

  /**
   * Select a picture from files.
   * @param files List of files recieved from input:file
   */
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

  /**
   * Open Edit Picture Modal
   * @param url url of the picture
   */
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

  /**
   * Confirm picture change
   */
  async changePicture() {

    //read result from croppie as url
    const result = await this.pictureCroppie.result({
      type: 'base64',
      size: { width: 500, height: 500 }
    });

    //set preview
    this.profilePicture.nativeElement.src = result;

    //read result as blob
    this.imgBlob = await this.pictureCroppie.result({
      type: 'blob',
      size: { width: 500, height: 500 }
    });

  }


  /**
   * Update user profile.
   */
  async updateProfile() {
    
    try {

      //check if form is valid or not
      if(this.profileForm.invalid) throw new Error('Invalid Credentials.');

      //get data from form
      const formData = this.profileForm.value;

      //write data to userData
      const userData:Partial<User> = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        gender: formData.gender,
        dob: formData.dob,
        phone: formData.phone.trim()
      };

      console.log(userData);

      //start loading
      this.formIsLoading = true;

      //update profile
      await this.auth.updateProfile(userData, this.imgBlob);

      //reset imgBlob
      this.imgBlob = null;

    }//try

    catch(error) {

      //alert error
      const alert: Alert = {
        type: ALERT_TYPES.ERROR,
        title: 'Error!',
        content: error || error.message,
        icon: 'exclamation circle'
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 sec
      setTimeout(() => {this.store.dispatch(new DismissAlert(alert));}, 3000);

    }//catch

    finally {

      //stop loading
      this.formIsLoading = false;

    }//finally
    
  }

}
