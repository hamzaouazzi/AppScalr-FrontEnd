import {UiElement} from '../../studio/models/UiElement.model';


export class Project {
    app_id: number;
    app_name: string;
    app_desc:string;
    app_icon_url:string;
    last_modified:string;
    lastmodified:string;
    created_at:string;
    pages: Page[];
}

export class Page {
    page_id: number;
    ishomepage:boolean;
    last_modified:string;
    lastmodified:string;
    page_dom:string;
    route_url:string;
    title: string;
    app_id: number;
    components: UiElement[];
}
