export interface UiElement {
  id: string; // 1
  icon?: string; // img/path
  name?: string; // Heading - inpiut
  type?: string; // h1 - inout
  classes?: string[]; // ['class1', 'class2']
  children?: any[];
  attributes: {
    name: string;
    value: string;
  }[];

}
