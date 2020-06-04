import {UiElement} from './UiElement.model';


export interface Project {
    id: number;
    title: string;
    screens: Screen[];
}


export interface Screen {
    id: number;
    title: string;
    components: UiElement[];
}
