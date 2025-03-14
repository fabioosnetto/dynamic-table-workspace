// Selectable
export interface iSelectable {
  groupId: number | string;
  itemId:  number | string;
}

// Selection
export interface iSelection extends Set<number | string> {

}

// Selected
export interface iSelected {
  group    : number | string;
  selected : Set<number | string>
}

export interface iSelectionEvent {
  selected  : boolean;
  selection : iSelected;
  trackBy   : iSelectable;
}