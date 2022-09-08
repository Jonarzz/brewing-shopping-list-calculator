export enum InventoryItemType {
  GRAIN = 'Grains',
  HOP = 'Hops',
  YEAST = 'Yeast',
  MISC = 'Misc'
}

export enum InventoryItemUnit {
  KILOGRAM = 'kg',
  GRAM = 'g',
  PACKAGE = 'pkg',
}

export const unitForType = (type: InventoryItemType) => {
  switch (type) {
    case InventoryItemType.GRAIN:
      return InventoryItemUnit.KILOGRAM;
    case InventoryItemType.HOP:
    case InventoryItemType.MISC:
      return InventoryItemUnit.GRAM;
    case InventoryItemType.YEAST:
      return InventoryItemUnit.PACKAGE;
  }
};

export class InventoryItem {
  type: InventoryItemType;
  name: string;
  amount: number;
  unit: InventoryItemUnit;

  constructor(type: InventoryItemType,
              name: string,
              amount: number,
              unit?: InventoryItemUnit | null) {
    this.type = type;
    this.name = name;
    this.amount = Math.round(amount * 10) / 10;
    this.unit = unit || unitForType(type);
  }

  static grain(name: string, amount: number, unit?: InventoryItemUnit) {
    return new InventoryItem(InventoryItemType.GRAIN, name, amount, unit);
  }

  static hop(name: string, amount: number, unit?: InventoryItemUnit) {
    return new InventoryItem(InventoryItemType.HOP, name, amount, unit);
  }

  static yeast(name: string, amount: number, unit?: InventoryItemUnit) {
    return new InventoryItem(InventoryItemType.YEAST, name, amount, unit);
  }
}