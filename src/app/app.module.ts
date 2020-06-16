import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpinnerInterceptor } from './services/spinner-interceptor';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { SpinnerService } from './services/spinner.service';
import { MatSidenavModule } from '@angular/material/sidenav';

// 設定ファイル
import { environment } from './../environments//environment';

// AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { MatListModule } from '@angular/material/list';
import { ListComponent } from './list/list.component';
import { ListHeaderComponent } from './component/list-header/list-header.component';
import { MainSideMenuComponent } from './component/main-side-menu/main-side-menu.component';
import { FolderListComponent } from './folder-list/folder-list.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { ForderListHeaderComponent } from './component/forder-list-header/forder-list-header.component';
import { FolderCreateModalComponent } from './component/folder-create-modal/folder-create-modal.component';
import { MatMenuModule } from '@angular/material/menu';
import { FolderChangeNameModalComponent } from './component/folder-change-name-modal/folder-change-name-modal.component';
import { MemoUpsertComponent } from './memo-upsert/memo-upsert.component';
import { UpsertFormComponent } from './component/upsert-form/upsert-form.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SpinnerComponent,
    LoginComponent,
    SignUpComponent,
    ListComponent,
    ListHeaderComponent,
    MainSideMenuComponent,
    FolderListComponent,
    ForderListHeaderComponent,
    FolderCreateModalComponent,
    FolderChangeNameModalComponent,
    MemoUpsertComponent,
    UpsertFormComponent,
    LandingPageComponent
  ],
  entryComponents: [FolderCreateModalComponent, FolderChangeNameModalComponent],
  imports: [
    BrowserModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatTableModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    SpinnerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
