
import {Component} from "@angular/core";
import {CompanyService} from "../../services/company.service";
import {ActivatedRoute} from "@angular/router";
import {Company} from "../../entities/company";
    @Component({
        templateUrl: './company-edit.component.html',
        styleUrls: ['./company-edit.component.css'],
        providers:[  ]
    })


export class CompanyEditComponent{
        id: string;
        showDetails: string;

        constructor(
            private companyService: CompanyService,
            route: ActivatedRoute){

            route.params.subscribe(
                p => {
                    this.id = p['id'];
                    this.showDetails = p['showDetails'];
                    this.load(this.id);
                }
            )
        }

        company: Company;
        message: string;

        load(id: string): void {
            this.companyService
                .findById(id)
                .subscribe(
                    company => {
                        this.company = company;
                        this.message = "";
                    },
                    (err) => {
                        this.message = "Fehler beim Spreichern: " + err.text();
                    }
                )
        }

            save(): void{
            this
                .companyService
                .save(this.company)
                .subscribe(
                    company => {
                        this.company = company;
                        this.message = "Daten wurden gespeichert";
                    },
                    (err) => {
                        this.message = "Fehler beim Speichern: " + err.text();
                    }
                )
        }
}