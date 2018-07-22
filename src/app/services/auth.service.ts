import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User, USER_TYPES } from '../models/user.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { COLLECTIONS, STORAGE } from '../constants';
import { Observable, Subscription, EMPTY } from 'rxjs';
import { map, mergeMap, first, take } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { CreateAlert, DismissAlert } from '../store/actions/ui.actions';
import { ALERT_TYPES, Alert } from '../models/alert.model';
import { Router } from '@angular/router';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { UploadMetadata, UploadTaskSnapshot } from 'angularfire2/storage/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private store: Store,
    private router: Router,
    private storage: AngularFireStorage
  ) {

    //observe authstate changes and redirect accordingly
    // this.afAuth.auth.onAuthStateChanged(

    //   authState => {

    //     //redirect to login
    //     if(authState === null) this.router.navigate(['store']);

    //     //redirect to
    //     else this.router.navigate(['store/profile']);
    //   }

    // );

  }

  /**
   * Authentication state
   */
  get authState$(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  /**
   * Get current user
   */
  get currentUser$(): Observable<User> {
    
    return this.afAuth.user.pipe(mergeMap(
      user => {

        //return firebase document as user observable
        if(user) {

          //map to user
          return this.db.collection(COLLECTIONS.USERS).doc(user.uid).valueChanges().pipe(map(

            (userData: any) => {

              if(userData.dob) userData.dob = userData.dob.toDate()

              return userData;
            }
          ));
        }

        else if(user === null) return EMPTY;

      }
    ));

  }

  /**
   * Create a new user using email and password.
   * @param user New user to be registered
   * @param password Password of the new account
   */
  async createAccount(user: User, password: string) {
    
    try {

      //create account
      const user_credentials = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, password);

      //update display name
      await user_credentials.user.updateProfile({
        displayName: `${user.first_name} ${user.last_name}`,
        photoURL: null
      });

      //set id of the user as the uid
      user.id = user_credentials.user.uid;

      //set user type as normal
      user.type = USER_TYPES.NORMAL;

      //create a corresponding firestore document for user
      await this.db.collection(COLLECTIONS.USERS).doc(user.id).set(user);

      //send verification mail
      await user_credentials.user.sendEmailVerification();

      //redirect to profile
      this.router.navigate(['store/profile']);

      //create success alert
      const alert: Alert = {
        type: ALERT_TYPES.SUCCESS,
        title: 'Account Creation Successfull',
        content: `Your account ${user.first_name} ${user.last_name} is ready.`,
        icon: 'user plus'
      };

      //dispatch action
      this.store.dispatch(new CreateAlert(alert))

      //dismiss alert after 3 seconds
      setTimeout(
        () => this.store.dispatch(new DismissAlert(alert)),
        3000
      );

      //return user ceredentials
      return user_credentials;
 
    }

    catch(error) {

      //send alert
      const alert: Alert = {
        title: "Account creation failed!",
        content: error.message || error,
        icon: 'exclamation circle',
        type: ALERT_TYPES.ERROR
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 seconds
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);

      //log error
      console.error(error);

    }

  }//createAccount

  /**
   * Login user using email and password
   * @param credentials An object with email and password 
   */
  async login(email:string, password:string) {

    //try loging in using email and password
    try {

      const user_credentials = await this.afAuth.auth.signInWithEmailAndPassword(email, password);

      //redirect to profile page
      this.router.navigate(['store/profile']);

      return user_credentials;

    }

    catch(error) {

      //send alert
      const alert: Alert = {
        title: "User Login failed!",
        content: error.message || error,
        icon: 'exclamation circle',
        type: ALERT_TYPES.ERROR
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 seconds
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);

      //log error
      console.error(error);

    }

  }//login

  /**
   * Resend verification mail.
   */
  resendVerificationMail() {
    //check if user already verified their mail
    if(this.afAuth.auth.currentUser.emailVerified) {

      //send alert
      const alert: Alert = {
        title: "Email already verified",
        content: 'There is no need to resend the mail since th user has already completed verification',
        icon: 'thumbs down',
        type: ALERT_TYPES.WARNING
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 seconds
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);

      //log warning
      console.warn('User has already verified the mail.');

      //throw error
      throw new Error('User has already verified the mail.');
    }


    else {

      //send verification mail
      return this.afAuth.auth.currentUser.sendEmailVerification();
    }

  }

  /**
   * Send password reset code to user's mail
   */
  async sendPasswordResetMail(email: string) {

    try {

      //send password reset email
      await this.afAuth.auth.sendPasswordResetEmail(email);

    }

    catch(error) {

      //alert error
      const alert = {
        type: ALERT_TYPES.ERROR,
        title: "Couldn't process your request.",
        content: error.message || error,
        icon: 'exclamation circle'
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 seconds
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);


      //console error
      console.error(error);

    }

  }//resendVerificationMail

/**
 * Confirm Password Reset
 * @param code Verification code send to users email
 * @param newPassword The password that should replace old one.
 */
  async confirmPasswordReset(code: string, newPassword: string) {

    try {

      //confirm password reset
      await this.afAuth.auth.confirmPasswordReset(code, newPassword);

      //alert success
      const alert = {
        type: ALERT_TYPES.SUCCESS,
        title: 'Password Reset',
        content: `Successfully reset your account password. Login using the new password to continue.`,
        icon: 'check circle'
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 seconds
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);

    }

    catch(error) {

      //alert error
      const alert = {
        type: ALERT_TYPES.ERROR,
        title: 'Failed!',
        content: error.message || error,
        icon: 'exclamation circle'
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 seconds
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);

      //console error
      console.error(error);

    }
    
  }//confirmPasswordReset

  /**
   * Update user profile
   * @param data user data to be updated
   * @param profilePicture new profile picture of the user
   */
  async updateProfile(data: Partial<User>, profilePicture?: Blob) {

    try {

      //get current user
      const user = await this.afAuth.authState.pipe(first(user => user != undefined)).toPromise();

      //Update profile picture
      
      if(profilePicture) {

        const path = `${STORAGE.USERS}/${user.uid}`;

        //create metadata
        const metadata: UploadMetadata = {
          customMetadata: {
            userId: user.uid
          },
          contentType: 'image/jpeg'
        };

        //upload picture and get download URL
        data.photoURL = await this.uploadPicture(path, profilePicture, metadata);

      }

      //update auth user profile
      await user.updateProfile({
        displayName: `${data.first_name} ${data.last_name}`,
        photoURL: data.photoURL
      });

      //update firestore doc
      await this.db.collection(COLLECTIONS.USERS).doc(user.uid).update(data);

      //alert success
      const alert = {
        type: ALERT_TYPES.SUCCESS,
        title: 'Profile Updated',
        content: `Successfully updated your profile ${user.email}.`,
        icon: 'check circle'
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 seconds
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);

    }

    catch(error) {

      //alert error
      const alert = {
        type: ALERT_TYPES.ERROR,
        title: 'Profile Update Failed',
        content: error.message || error,
        icon: 'exclamation circle'
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 seconds
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);


      //console error
      console.error(error);

    }

  }//updateProfile

  /**
   * Update email address of a user
   * @param newEmail The new email of the user.
   * @param password Password to reauthenticate the user.
   */
  async updateEmail(newEmail, password) {

    try {

      //get current user
      const user = await this.afAuth.authState.pipe(first(user => user!==undefined)).toPromise();

      //reauthenticate
      await this.afAuth.auth.signInWithEmailAndPassword(user.email, password);

      //updateEmail
      await user.updateEmail(newEmail);

      //update firestore
      await this.db.collection(COLLECTIONS.USERS).doc(user.uid).update({
        email: newEmail
      });

      //alert success
      const alert = {
        type: ALERT_TYPES.SUCCESS,
        title: 'Email Updated',
        content: `Successfully updated your email to ${newEmail}.`,
        icon: 'check circle'
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 seconds
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);
      
    }

    catch(error) {

      //alert error
      const alert = {
        type: ALERT_TYPES.ERROR,
        title: 'Email Update Failed',
        content: error.message || error,
        icon: 'exclamation circle'
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 seconds
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);


      //console error
      console.error(error);

    }//error
  }

  async updatePassword(curPassword:string, newPassword:string) {

    try {

      //check if both passwords are same
      if(curPassword === newPassword) throw new Error('The new password must not be same as the current one');

      //get current user
      const user = await this.afAuth.authState.pipe(first(user => user!==undefined)).toPromise();
      
      //reauthenticate user
      await this.afAuth.auth.signInWithEmailAndPassword(user.email, curPassword);

      //update password
      await user.updatePassword(newPassword);

      //alert success
      const alert: Alert = {
        type: ALERT_TYPES.SUCCESS,
        title: 'Password Updated',
        content: `Successfully updated your password for the account at ${user.email}`,
        icon: 'key'
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 sec
      setTimeout(() => {this.store.dispatch(new DismissAlert(alert));}, 3000);

    }

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

      //console error
      console.error(error);

    }

  }

  /**
   * Logout currently logged in user.
   */
  async logout() {

    try {

      //sign out user
      await this.afAuth.auth.signOut();

      //redirect to home
      this.router.navigate(['store']);

    }

    catch(error) {

      ///send alert
      const alert: Alert = {
        title: "Cannot signout user",
        content: error.message || error,
        icon: 'user times',
        type: ALERT_TYPES.ERROR
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 seconds
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);
      
    }

  }//logout



  //                 //
  // Private methods //
  //                 //

  /**
   * 
   * @param path Storage path to upload picture
   * @param picture Picture to be uploaded
   * @returns downloadURL of the uploaded picture
   */
  private async uploadPicture(path: string, picture: Blob, metadata: UploadMetadata): Promise<string> {

    //declare an angularfire upload task
    let uploadTask: AngularFireUploadTask;

    //start uploading
    uploadTask = this.storage.upload(path, picture, metadata);

    //wait for upload to complete
    const snap: UploadTaskSnapshot = await uploadTask.then(snap => snap);

    //return download URL
    return snap.ref.getDownloadURL();

  }
  
}
