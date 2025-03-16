import { StorageItemDTO, mapFieldDataToForm as mapStorageItemFieldDataToForm } from "./StorageItemDTO";

export interface StorageViewConciseDTO {
    id: number;
    name: string;
    capacityMax: number;
    capacity: number;
    itemAmountMax: number;
    itemAmount: number;
    structureId?: number;
    structureName?: string;
    userId?: string;
    userName?: string;
    contents?: StorageItemDTO[];
}

export function mapFieldDataToForm(data: any): StorageViewConciseDTO {
    var contentsForm = data.Contents ? data.Contents.map(mapStorageItemFieldDataToForm) : null;

    return {
        id: data.Id,
        name: data.Name,
        capacityMax: data.CapacityMax,
        capacity: data.Capacity,
        itemAmountMax: data.ItemAmountMax,
        itemAmount: data.ItemAmount,
        structureId: data.StructureId,
        structureName: data.StructureName,
        userId: data.UserId,
        userName: data.UserName,
        contents: contentsForm
    };
}