import { ItemDTO, mapFieldDataToForm as mapItemFieldDataToForm } from "./ItemDTO";

export interface StorageItemDTO {
    storageId: number;
    itemId: number;
    amount?: number;
    item?: ItemDTO;
}

export function mapFieldDataToForm(data: any): StorageItemDTO {
    var itemForm = data.Item ? mapItemFieldDataToForm(data.Item) : undefined;
    return {
        storageId: data.StorageId,
        itemId: data.ItemId,
        amount: data.Amount,
        item: itemForm
    };
}
// Compare this snippet from src/utils/domain/dto/item/ItemDTO.ts: