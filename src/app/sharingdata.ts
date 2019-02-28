import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner'
import {map} from 'rxjs/operators'

@Injectable()

export class sharingData {
    public startupprofile:any = {}
    public dashview:boolean
    public course:any
    public assign_view:boolean


    public showdashboard():any{
        if(window.location.pathname == '/admin/dashboard'){
            this.dashview = true
        }else{
            this.dashview = false
        }
        return this.dashview
    }
}