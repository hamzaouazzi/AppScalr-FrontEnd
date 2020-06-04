import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

export const CONSTANTES = {
    urls: {
        auth_url: `${environment.base_url}/auth/login/v2`,
        fetch_categories_url: `${environment.base_url}/categories`,
    },
    HTTP_HEADERS: {

            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),

    },
};
