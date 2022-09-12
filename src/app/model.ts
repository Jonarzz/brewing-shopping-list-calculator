export enum InventoryItemType {
  GRAINS = 'Grains',
  HOPS = 'Hops',
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
  [InventoryItemType.GRAINS]: [InventoryItemUnit.KILOGRAM, InventoryItemUnit.GRAM],
  [InventoryItemType.HOPS]: [InventoryItemUnit.GRAM, InventoryItemUnit.KILOGRAM],
  [InventoryItemType.MISC]: [InventoryItemUnit.GRAM, InventoryItemUnit.ITEMS],
  [InventoryItemType.YEAST]: [InventoryItemUnit.PACKAGE]
};

export const defaultUnitForType = Object.entries(availableUnitsForType)
                                        .reduce((all, [type, units]) => {
                                          all[type] = units[0];
                                          return all;
                                        }, <Record<string, InventoryItemUnit>>{});

const _recalculateUnits = (amount: number,
                           sourceUnit: InventoryItemUnit,
                           targetUnit: InventoryItemUnit): number => {
  switch (sourceUnit) {
    case InventoryItemUnit.GRAM:
      if (targetUnit === InventoryItemUnit.KILOGRAM) {
        return amount / 1000;
      }
      return amount;
    case InventoryItemUnit.KILOGRAM:
      if (targetUnit === InventoryItemUnit.GRAM) {
        return amount * 1000;
      }
      return amount;
    default:
      throw `Unit ${sourceUnit} cannot be recalculated to ${targetUnit}`;
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
    this.unit = unit || defaultUnitForType[type];
  }

  static grain(name: string, amount: number, unit?: InventoryItemUnit) {
    return new InventoryItem(InventoryItemType.GRAINS, name, amount, unit);
  }

  static hop(name: string, amount: number, unit?: InventoryItemUnit) {
    return new InventoryItem(InventoryItemType.HOPS, name, amount, unit);
  }

  static yeast(name: string, amount: number, unit?: InventoryItemUnit) {
    return new InventoryItem(InventoryItemType.YEAST, name, amount, unit);
  }

  mergedWith = (other: InventoryItem) => {
    const recalculated = _recalculateUnits(other.amount, other.unit, this.unit);
    // gotta love JS
    const sum = (+this.amount) + (+recalculated);
    return new InventoryItem(this.type, this.name, sum, this.unit);
  };

  diffItem = (other: InventoryItem) => {
    const recalculated = _recalculateUnits(other.amount, other.unit, this.unit);
    const difference = this.amount - recalculated;
    return new InventoryItem(this.type, this.name, difference, this.unit);
  };
}
