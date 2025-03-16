export interface ItemDTO {
    id: number;
    name: string;
    displayName?: string;
    basePrice: number;
    baseItemId?: number;
    categoryId: number;
    gradeId: number;
    itemtypeId: number;
    itemtypeName: string;
    blockData?: string;
    data: number;
}

export function mapFieldDataToForm(data: any): ItemDTO {
    return {
        id: data.Id,
        name: data.Name,
        displayName: data.DisplayName,
        basePrice: data.BasePrice,
        baseItemId: data.BaseItemId,
        categoryId: data.CategoryId,
        gradeId: data.GradeId,
        itemtypeId: data.ItemtypeId,
        itemtypeName: data.ItemtypeName,
        blockData: data.BlockData,
        data: data.Data
    };
}