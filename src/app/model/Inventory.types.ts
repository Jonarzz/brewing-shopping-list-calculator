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
  ITEMS = 'items',
}

export const availableUnitsForType = {
  [InventoryItemType.GRAIN]: [InventoryItemUnit.KILOGRAM, InventoryItemUnit.GRAM],
  [InventoryItemType.HOP]: [InventoryItemUnit.GRAM, InventoryItemUnit.KILOGRAM],
  [InventoryItemType.MISC]: [InventoryItemUnit.GRAM, InventoryItemUnit.ITEMS],
  [InventoryItemType.YEAST]: [InventoryItemUnit.PACKAGE]
};

export const defaultUnitForType = Object.entries(availableUnitsForType)
                                        .reduce((all, [type, units]) => {
                                          all[type] = units[0];
                                          return all;
                                        }, <Record<string, InventoryItemUnit>>{});

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
    this.unit = unit || defaultUnitForType[type];
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