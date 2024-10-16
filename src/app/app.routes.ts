import { Routes } from '@angular/router';
import { MyTasksComponent } from '../components/my-tasks/my-tasks.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';

export const routes: Routes = [
    {path:'',component:MyTasksComponent},
    {path:'my-tasks',component:MyTasksComponent},
    {path:'**',component:NotfoundComponent},

];
