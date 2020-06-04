import { UiElement } from './UiElement.model';

export interface UiCategory {
    id: number;
    name: string;
    elements: UiElement[];
  }
