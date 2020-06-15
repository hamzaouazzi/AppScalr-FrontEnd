export interface UiElement {
  id: string; // 1
  icon?: string; // img/path
  name?: string; // Heading - inpiut
  type?: string; // h1 - inout
  classes?: string[]; // ['class1', 'class2']
  children?: string[];
  attributes: {
    name: string; // name placeholder
    value: string;
    options?:string[];
  }[];

}
