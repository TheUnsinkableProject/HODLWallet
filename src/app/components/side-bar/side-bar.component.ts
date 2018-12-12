import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var jQuery;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  constructor(private _router: Router) { }

  goToDash() {
    this._router.navigate(['dashboard']);
  }

  goToManageOffers() {
    this._router.navigate(['manage-offers']);
  }

  goToDeposit() {
    console.log("Here");
    this._router.navigate(['deposit']);
  }

  ngOnInit() {
    (function ($) {
      // Dropdown
      const menu = $('.js-item-menu');
      try {
        var sub_menu_is_showed = -1;

        for (let i = 0; i < menu.length; i++) {
          $(menu[i]).on('click', function (e) {
            e.preventDefault();
            $('.js-right-sidebar').removeClass('show-sidebar');
            if (jQuery.inArray(this, menu) === sub_menu_is_showed) {
              $(this).toggleClass('show-dropdown');
              sub_menu_is_showed = -1;
            } else {
              for (let i = 0; i < menu.length; i++) {
                $(menu[i]).removeClass('show-dropdown');
              }
              $(this).toggleClass('show-dropdown');
              sub_menu_is_showed = jQuery.inArray(this, menu);
            }
          });
        }
        $('.js-item-menu, .js-dropdown').click(function (event) {
          event.stopPropagation();
        });

        $('body,html').on('click', function () {
          for (let i = 0; i < menu.length; i++) {
            menu[i].classList.remove('show-dropdown');
          }
          sub_menu_is_showed = -1;
        });

      } catch (error) {
        console.log(error);
      }

      const wW = $(window).width();
      // Right Sidebar
      const right_sidebar = $('.js-right-sidebar');
      const sidebar_btn = $('.js-sidebar-btn');

      sidebar_btn.on('click', function (e) {
        e.preventDefault();
        for (let i = 0; i < menu.length; i++) {
          menu[i].classList.remove('show-dropdown');
        }
        sub_menu_is_showed = -1;
        right_sidebar.toggleClass('show-sidebar');
      });

      $('.js-right-sidebar, .js-sidebar-btn').click(function (event) {
        event.stopPropagation();
      });

      $('body,html').on('click', function () {
        right_sidebar.removeClass('show-sidebar');

      });


      // Sublist Sidebar
      try {
        const arrow = $('.js-arrow');
        arrow.each(function () {
          const that = $(this);
          that.on('click', function (e) {
            e.preventDefault();
            that.find('.arrow').toggleClass('up');
            that.toggleClass('open');
            that.parent().find('.js-sub-list').slideToggle('250');
          });
        });

      } catch (error) {
        console.log(error);
      }


      try {
        // Hamburger Menu
        $('.hamburger').on('click', function () {
          $(this).toggleClass('is-active');
          $('.navbar-mobile').slideToggle('500');
        });
        $('.navbar-mobile__list li.has-dropdown > a').on('click', function () {
          const dropdown = $(this).siblings('ul.navbar-mobile__dropdown');
          $(this).toggleClass('active');
          $(dropdown).slideToggle('500');
          return false;
        });
      } catch (error) {
        console.log(error);
      }
    })(jQuery);
  }
}
