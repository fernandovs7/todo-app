import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-checked-icon',
  standalone: true,
  imports: [
    CommonModule,
    LottieComponent
  ],
  templateUrl: './checked-icon.component.html',
  styleUrl: './checked-icon.component.scss'
})
export class CheckedIconComponent implements OnInit {

  private animationItem: AnimationItem | undefined;

  options: AnimationOptions = {
    path: '/assets/img/checked-animation.json',
    loop: false,
    autoplay: false
  };

  ngOnInit(): void {
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  playAnimation(): void {
    if (this.animationItem) {
      this.animationItem.play();
    }
  }



}
