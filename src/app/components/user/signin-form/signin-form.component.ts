import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { LoadingEventService } from 'src/app/services/loading-event.service';
import { LoggedEventService } from 'src/app/services/logged-event.service';
import { MyAuthenticationService } from 'src/app/services/my-authentication.service';
import { UserValidationService } from 'src/app/services/user/user-validation.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {

  public signUp = false;
  public auto = true;
  public form: FormGroup;
  public states: any = {
    username: {
      message: '',
      class: '',
    },
    password: {
      message: '',
      class: '',
    },
    confirm: {
      message: '',
      class: '',
    },
    passwordGroup: {
      message: '',
      class: '',
    }
  };

  private subscriptions: Subscription[] = [];

  private controlNames = ['username', 'passwordGroup', 'passwordGroup.password', 'passwordGroup.confirm'];

  constructor(
    private router: Router,
    private auth: MyAuthenticationService,
    private login: LoggedEventService,
    private fb: FormBuilder,
    private validations: UserValidationService,
    private _loading: LoadingEventService
  ) {
    this.form = this.initForm();
    this.signUp = false;
  }

  ngOnInit(): void { 
    this.signUp = false;
  }

  initForm() {
    // Profile Info Form Initialization
    return this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      passwordGroup: new FormGroup({
        password: new FormControl('', [Validators.required, Validators.pattern(/^(?=[^a-zA-Z]*[a-zA-Z])(?=\D*\d).{8,}$/)]),
        confirm: new FormControl('', [Validators.required]),
      }, this.validations.passwordCheck)
    });
  }

  parseForm(): User {
    console.log(this.form.get('username'));
    return new User(
      this.form.get('uid')?.value,
      this.form.get('firstname')?.value,
      this.form.get('middlename')?.value,
      this.form.get('lastname')?.value,
      this.form.get('username')?.value,
      this.form.get('passwordGroup.password')?.value
    )
  }

  initFormWatch(...controlNames: string[]) {
    controlNames.map(name => {
      const ctrl = this.form.get(name);
      if (ctrl !== null) {
        const c = ctrl.valueChanges.pipe(debounceTime(1000));
        const subscription = c.subscribe(() => {
          this.validations.setMessage(this.states, ctrl, name);
        });
        this.subscriptions.push(subscription);
      }
    });
  }

  onSwitchForm() {
    this.signUp = !this.signUp;
    this.auto = !this.auto;
    this.form.reset();
    if (this.signUp) {
      this.initFormWatch(...this.controlNames);
    }
    if (!this.signUp) {
      this.validations.resetStates(this.states, ...this.controlNames);
      this.subscriptions.map(subscription => {
        subscription.unsubscribe();
      })
    }
  }

  onSignIn() {
    this._loading.emitChange(true);
    localStorage.removeItem('user');

    const credentials = this.parseForm().credentials;

    this.auth.signIn(credentials).then(
      (ok) => {
        this.router.navigate(['bienvenida']);
      },
      (err) => {
        alert(err);
      }
    ).finally(() => { this._loading.emitChange(false) });
  }

  onSignUp() {
    this._loading.emitChange(true);
    localStorage.removeItem('user');

    const user = this.parseForm();

    if (this.validateForm(...this.controlNames)) {
      this.auth.signUp(user).then(
        (ok) => {
          this.router.navigate(['bienvenida']);
        },
        (err) => {
          alert(err);
        }
      ).finally(() => { this._loading.emitChange(false) });
    }
  }

  validateForm(...controlNames: string[]) {
    let hasErrors = false;
    controlNames.map(name => {
      this.validations.clearState(this.states, name);
      const c = this.form.get(name);
      if (c && c.errors) {
        let errorName = Object.keys(c.errors)[0];
        this.validations.setState(this.states, name, this.validations.getValidationState(errorName));
        hasErrors = true;
      }
    });
    return !hasErrors;
  }

  onAutoComplete() {
    this.form.get('username')?.patchValue("test@user.com");
    this.form.get('passwordGroup.password')?.patchValue("123456m!");
  }
}
