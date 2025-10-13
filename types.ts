
export enum ViewType {
  FRONT = 'Front',
  BACK = 'Back',
  LEFT = 'Left',
  RIGHT = 'Right',
  TOP = 'Top',
  BOTTOM = 'Bottom',
}

export interface GeneratedImage {
  view: ViewType;
  src: string | null;
}

export interface ViewConfig {
    type: ViewType;
    prompt: string;
}
