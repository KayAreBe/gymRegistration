import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  selectedGender!: string;
  genders: string[] = ["Male", "Female"];
  packages: string[] = ["Monthly", "Quarterly", "Yearly"];
  importantList: string[] = [
    "Toxic Fat reduction",
    "Energy and Endurance",
    "Building Lean Muscle",
    "Healthier Digestive System",
    "Sugar Craving Body",
    "Fitness"
  ]

  registrationForm!: FormGroup;
  private userIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(private fb: FormBuilder, private api: UserService, private toastService: NgToastService, private activatedRoute: ActivatedRoute, private router: Router){}


  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmi_result: [''],
      gender: [''],
      require_trainer: [''],
      package: [''],
      important: [''],
      have_gym_before: [''],
      enquiry_date: ['']
    });
    this.registrationForm.controls['height'].valueChanges.subscribe(res => {
      this.calculateBmi(res);
    });

    this.activatedRoute.params.subscribe(val => {
      this.userIdToUpdate = val['id'];
      if (this.userIdToUpdate) {
        this.isUpdateActive = true;
        this.api.getUserById(this.userIdToUpdate)
          .subscribe({
            next: (res) => {
              this.fillFormToUpdate(res);
            },
            error: (err) => {
              console.log(err);
            }
          })
      }
    })
  }

  submit() {
    this.api.createUser(this.registrationForm.value)
      .subscribe(res => {
        this.toastService.success({ detail: 'SUCCESS', summary: 'Registration Successful', duration: 3000 });
        this.registrationForm.reset();
      });
  }

  fillFormToUpdate(user: User) {
    this.registrationForm.setValue({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmi_result: user.bmi_result,
      gender: user.gender,
      require_trainer: user.require_trainer,
      package: user.package,
      important: user.important,
      have_gym_before: user.have_gym_before,
      enquiry_date: user.enquiry_date
    })
  }

  update() {
    this.api.updateUser(this.registrationForm.value, this.userIdToUpdate)
      .subscribe(res => {
        this.toastService.success({ detail: 'SUCCESS', summary: 'User Details Updated Successful', duration: 3000 });
        this.router.navigate(['enquiries']);
        this.registrationForm.reset();
      });
  }

  calculateBmi(value: number) {
    const weight = this.registrationForm.value.weight; // weight in kilograms
    const height = value; // height in meters
    const bmi = weight / (height * height);
    this.registrationForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registrationForm.controls['bmi_result'].patchValue("Underweight");
        break;
      case (bmi >= 18.5 && bmi < 25):
        this.registrationForm.controls['bmi_result'].patchValue("Normal");
        break;
      case (bmi >= 25 && bmi < 30):
        this.registrationForm.controls['bmi_result'].patchValue("Overweight");
        break;

      default:
        this.registrationForm.controls['bmi_result'].patchValue("Obese");
        break;
    }
  }
}