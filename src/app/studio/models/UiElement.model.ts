
  
  export interface UiElement{
    id: number; //1
    icon: string; //img/path
    name: string; // Heading - inpiut
    type: string; //h1 - inout
    classes: string[]; // ['class1', 'class2']
    attrs: {
      key: string; //name placeholder
      value: string; //headingParagraph this is a placeholder
    }[];
  }