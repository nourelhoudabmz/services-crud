import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  form!: FormGroup;
  constructor(public postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.form.controls;
  }
  submit() {
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((res: any) => {
      console.log('Post created successfully!');
      this.router.navigateByUrl('post/index');
    })
  }

}