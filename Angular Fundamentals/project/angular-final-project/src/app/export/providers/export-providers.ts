import {ToastrService} from "../../services/toastr-service/toastr.service";
import {RouterAuthService} from "../../services/router-auth-service/router-auth.service";
import {AuthService} from "../../services/auth-service/auth.service";
import {CatalogService} from "../../services/catalog-service/catalog.service";
import {LocationsService} from "../../services/locations-service/locations.service";
import {AdminService} from "../../services/admin/admin.service";

export const ProvidersExport = [
  ToastrService,
  RouterAuthService,
  AuthService,
  CatalogService,
  LocationsService,
  AdminService
];
