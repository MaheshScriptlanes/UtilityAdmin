import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CampaignDataComponent } from './campaign-data/campaign-data.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { EditContactComponent } from './contact-list/edit-contact/edit-contact.component';
import { OurProductComponent } from './our-product/our-product.component';
import { LoaListComponent } from './loa-list/loa-list.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { CampaignService } from './sharedApi/campaign.service';
import { AdvisoryComponent } from './advisory/advisory.component';
import { NewsComponent } from './news/news.component';
import { AddNewsComponent } from './news/add-news/add-news.component';
import { EditNewsComponent } from './news/edit-news/edit-news.component';
import { WhyUaComponent } from './why-ua/why-ua.component';
import { AuthInterceptor } from './sharedApi/auth-interceptor';
import { LoginService } from './sharedApi/login.service';
import { HomePageService } from './sharedApi/home-page.service';
import { ContactListService } from './sharedApi/contact-list.service';
import { LoaListService } from './sharedApi/loa-list.service';
import { TestiMonialsService } from './sharedApi/testi-monials.service';
import { ProductListService } from './sharedApi/product-list.service';
import { BlogsComponent } from './blogs/blogs.component';
import { AuthorsComponent } from './authors/authors.component';
import { CaseStudiesComponent } from './case-studies/case-studies.component';
import { OurPartnersComponent } from './our-partners/our-partners.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { WhyUaService } from './sharedApi/why-ua.service';
import { OurClientService } from './sharedApi/our-client.service';
import { AdvisoryService } from './sharedApi/advisory.service';
import { NewsSerService } from './sharedApi/news-ser.service';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { EditProductComponent } from './our-product/edit-product/edit-product.component';
import { AddProductComponent } from './our-product/add-product/add-product.component';
import { EditCaseStudyComponent } from './case-studies/edit-case-study/edit-case-study.component';
import { AddCaseStudyComponent } from './case-studies/add-case-study/add-case-study.component';
import { EditPartnerComponent } from './our-partners/edit-partner/edit-partner.component';
import { AddPartnerComponent } from './our-partners/add-partner/add-partner.component';
import { AddTestimonyComponent } from './testimonials/add-testimony/add-testimony.component';
import { EditTestimonyComponent } from './testimonials/edit-testimony/edit-testimony.component';
import { FaqsComponent } from './faqs/faqs.component';
import { FaqserviceService } from './sharedApi/faqservice.service';
import { DragDropDirective } from './drag-drop.directive';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AddAuthorComponent } from './authors/add-author/add-author.component';
import { EditAuthorComponent } from './authors/edit-author/edit-author.component';
import { DateFormatPipe } from './date-format.pipe';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SpinnerComponent } from './spinner/spinner.component';
import { PaginationService } from './sharedApi/pagination.service';
import { HeaderComponent } from './header/header.component';
import { SearchDataPipe } from './search-data.pipe';
import { DateTwoFormatPipe } from './date-two-format.pipe';
import { LoaderService } from './sharedApi/loader.service';
registerLocaleData(localeFr);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardViewComponent,
    NavbarComponent,
    HomePageComponent,
    CampaignDataComponent,
    ContactListComponent,
    EditContactComponent,
    OurProductComponent,
    LoaListComponent,
    TestimonialsComponent,
    AdvisoryComponent,
    NewsComponent,
    AddNewsComponent,
    EditNewsComponent,
    WhyUaComponent,
    BlogsComponent,
    AuthorsComponent,
    CaseStudiesComponent,
    OurPartnersComponent,
    AddBlogComponent,
    EditBlogComponent,
    EditProductComponent,
    AddProductComponent,
    EditCaseStudyComponent,
    AddCaseStudyComponent,
    EditPartnerComponent,
    AddPartnerComponent,
    AddTestimonyComponent,
    EditTestimonyComponent,
    FaqsComponent,
    DragDropDirective,
    AddAuthorComponent,
    EditAuthorComponent,
    DateFormatPipe,
    SpinnerComponent,
    HeaderComponent,
    SearchDataPipe,
    DateTwoFormatPipe,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    BrowserAnimationsModule,
    MatSnackBarModule
    
  ],
  providers: [CampaignService,LoginService,HomePageService,ContactListService,LoaListService,PaginationService,
    TestiMonialsService,ProductListService,WhyUaService,OurClientService,AdvisoryService,NewsSerService,FaqserviceService,DateFormatPipe,AuthGuard,CookieService,DateTwoFormatPipe,LoaderService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}, { provide: LOCALE_ID, useValue: 'fr-FR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
