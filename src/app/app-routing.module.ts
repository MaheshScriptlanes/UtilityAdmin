import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CampaignDataComponent } from './campaign-data/campaign-data.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { OurProductComponent } from './our-product/our-product.component';
import { LoaListComponent } from './loa-list/loa-list.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { AdvisoryComponent } from './advisory/advisory.component';
import { NewsComponent } from './news/news.component';
import { WhyUaComponent } from './why-ua/why-ua.component';
import { LoginComponent } from './login/login.component';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AuthorsComponent } from './authors/authors.component';
import { CaseStudiesComponent } from './case-studies/case-studies.component';
import { OurPartnersComponent } from './our-partners/our-partners.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { EditProductComponent } from './our-product/edit-product/edit-product.component';
import { AddProductComponent } from './our-product/add-product/add-product.component';
import { EditCaseStudyComponent } from './case-studies/edit-case-study/edit-case-study.component';
import { AddCaseStudyComponent } from './case-studies/add-case-study/add-case-study.component';
import { EditPartnerComponent } from './our-partners/edit-partner/edit-partner.component';
import { AddPartnerComponent } from './our-partners/add-partner/add-partner.component';
import { EditContactComponent } from './contact-list/edit-contact/edit-contact.component';
import { AddTestimonyComponent } from './testimonials/add-testimony/add-testimony.component';
import { EditTestimonyComponent } from './testimonials/edit-testimony/edit-testimony.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AddNewsComponent } from './news/add-news/add-news.component';
import { EditNewsComponent } from './news/edit-news/edit-news.component';
import { AddAuthorComponent } from './authors/add-author/add-author.component';
import { EditAuthorComponent } from './authors/edit-author/edit-author.component';
import { AuthGuard } from './auth.guard';
import { NetZeroAndCarbonComponent } from './our-services/net-zero-and-carbon/net-zero-and-carbon.component';
import { InvoiceValidationComponent } from './our-services/invoice-validation/invoice-validation.component';
import { VoidManagementComponent } from './our-services/void-management/void-management.component';
import { CustomerCareComponent } from './our-services/customer-care/customer-care.component';
import { AccountManagementComponent } from './our-services/account-management/account-management.component';
import { EnergyProcurementComponent } from './our-services/energy-procurement/energy-procurement.component';
import { OurHeritageComponent } from './about-us/our-heritage/our-heritage.component';
import { OurTeamComponent } from './about-us/our-team/our-team.component';
import { AddTeamMemberComponent } from './about-us/our-team/add-team-member/add-team-member.component';
import { CharityTenderComponent } from './charity-tender/charity-tender.component';
import { EducationSectorComponent } from './education-sector/education-sector.component';
import { OurCustomerComponent } from './education-sector/our-customer/our-customer.component';
import { AddReviewComponent } from './education-sector/our-customer/add-review/add-review.component';
import { ContactDataComponent } from './contact-data/contact-data.component';
import { ContactFormDataComponent } from './contact-form-data/contact-form-data.component';
import { ECardUsersComponent } from './e-card-users/e-card-users.component';
import { AddECardUserComponent } from './e-card-users/add-e-card-user/add-e-card-user.component';


const routes: Routes = [{path:'',component:LoginComponent},
  {path:'dashboard',component:DashboardViewComponent,canActivate:[AuthGuard],
  children:
  [
  {path:'home',component:HomePageComponent},
  {path:'campaign',component:CampaignDataComponent},
   {path:'contact',component:ContactListComponent},
   {path:'editContact',component:EditContactComponent},
   {path:'product',component:OurProductComponent},
     {path:'editProduct',component:EditProductComponent},
     {path:'addProduct',component:AddProductComponent},
   {path:'loalist',component:LoaListComponent},
   {path:'testimony',component:TestimonialsComponent},
   {path:'addTestimony',component:AddTestimonyComponent},
   {path:'editTestimony',component:EditTestimonyComponent},
   {path:'advisory',component:AdvisoryComponent},
   {path:"news",component:NewsComponent},
   {path:'addNews',component:AddNewsComponent},
   {path:'editNews',component:EditNewsComponent},
   {path:'faq',component:FaqsComponent},
   {path:'whyUa',component:WhyUaComponent},
   {path:'blogs',component:BlogsComponent},
   {path:'authors',component:AuthorsComponent},
   {path:'addAuthor',component:AddAuthorComponent},
   {path:'editAuthor',component:EditAuthorComponent},
   {path:'casestudy',component:CaseStudiesComponent},
   {path:'editCaseStudy',component:EditCaseStudyComponent},
   {path:'addCaseStudy',component:AddCaseStudyComponent},
   {path:'partner',component:OurPartnersComponent},
   {path:'editPartner',component:EditPartnerComponent},
   {path:'addPartner',component:AddPartnerComponent},
    {path:'addBlog',component:AddBlogComponent},
    {path:'editBlog',component:EditBlogComponent},
   {path:'invoice',component:InvoiceValidationComponent},
   {path:'netzerandcarbon',component:NetZeroAndCarbonComponent},
   {path:'voidmanagement',component:VoidManagementComponent},
   {path:'customercare',component:CustomerCareComponent},
   {path:'accountmanagement',component:AccountManagementComponent},
   {path:'energyprocurement',component:EnergyProcurementComponent},
   {path:'ourheritage',component:OurHeritageComponent},
   {path:'ourteam',component:OurTeamComponent},
   {path:'addteam',component:AddTeamMemberComponent},
   {path:'charitytender',component:CharityTenderComponent},
   {path:'edusector',component:EducationSectorComponent},
   {path:'ourcustomer',component:OurCustomerComponent},
   {path:'addreview',component:AddReviewComponent},
   {path:'contactdata',component:ContactDataComponent},
   {path:'contactformdata',component:ContactFormDataComponent},
   {path:'ecarduser',component:ECardUsersComponent},
   {path:'addecarduser',component:AddECardUserComponent},



  ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)] ,
  exports: [RouterModule]
})
export class AppRoutingModule { }
