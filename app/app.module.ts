import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoginComponent } from './login/login.component';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { HomeComponent } from './dasboard/home/home.component';
import { HeaderComponent } from './dasboard/header/header.component';
import {MatTabsModule} from '@angular/material/tabs';
// import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import { AboutComponent } from './dasboard/about/about.component';
import { ContactComponent } from './dasboard/contact/contact.component';
import { CartComponent } from './dasboard/cart/cart.component';
import { UserComponent } from './dasboard/user/user.component';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
// import { PipePipe } from './pipe/pipe.pipe';
// import { FilterPipePipe } from './pipe/filter-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    ContactComponent,
    CartComponent,
    UserComponent,
    FilterPipePipe,
    // PipePipe,
    // FilterPipePipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    
    // MatTabsModule
    // MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    MatIconModule,
MatButtonModule,
MatToolbarModule,
MatGridListModule,
MatCardModule,
MatCheckboxModule,
MatMenuModule,
MatTableModule

  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    provideHttpClient(withInterceptorsFromDi()), 
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
