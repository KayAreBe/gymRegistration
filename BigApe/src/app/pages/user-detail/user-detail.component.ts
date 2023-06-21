import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{

  userId!: number;
  userDetails!: User;
  constructor(private activatedRoute: ActivatedRoute, private api: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.userId = val['id'];
      this.fetchUserDetails(this.userId);
    })
  }

  fetchUserDetails(userId: number) {
    this.api.getUserById(userId)
      .subscribe({
        next: (res) => {
          this.userDetails = res;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

}
