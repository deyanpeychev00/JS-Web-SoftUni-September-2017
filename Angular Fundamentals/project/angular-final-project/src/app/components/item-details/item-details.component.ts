import {Component, OnInit} from '@angular/core';
import {CatalogService} from "../../services/catalog-service/catalog.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ToastrService} from "../../services/toastr-service/toastr.service";
import {LocationsService} from "../../services/locations-service/locations.service";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  itemId: string;
  item;
  itemLocations;

  constructor(private catalogService: CatalogService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private locationsService: LocationsService) {
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.itemId = params['id'];
    });

    const res = await this.catalogService.getItemDetails(this.itemId);
    if (res.error) {
      this.toastr.errorToast((res.description ? res.description : 'Unknown error occured. Please try again'));
    } else {
      this.toastr.successToast('Details loaded.');
      this.item = res;
      // const map =
    }
  }

}
