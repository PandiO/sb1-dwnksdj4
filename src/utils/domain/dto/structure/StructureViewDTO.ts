import { DistrictViewDTO, mapFieldDataToForm as mapDistrictFieldDataToForm } from "../district/DistrictViewDTO";
import { DominionViewDTO, mapFieldDataToForm as mapDominionFieldDataToForm } from "../dominion/DominionViewDTO";
import { StorageViewConciseDTO, mapFieldDataToForm as mapStorageFieldDataToForm } from "../item/StorageViewConciseDTO";

export interface StructureStreetViewDTO {
    id: number;
    name: string;
    districts: Map<number, string>;
}

export function mapStreetFieldDataToForm(data: any): StructureStreetViewDTO {
    var districts = new Map<number, string>();
    data.Districts?.forEach((d: any) => {
        districts.set(d.id, d.name);
    });

    return {
        id: data.Id,
        name: data.Name,
        districts: districts
    };
}

export interface StructureViewDTO extends DominionViewDTO {
    street?: StructureStreetViewDTO;
    streetNumber: number;
    district: DistrictViewDTO;
    storages: StorageViewConciseDTO[];
}

export function mapFieldDataToForm(data: any): StructureViewDTO {
    var dominionForm = mapDominionFieldDataToForm(data) as StructureViewDTO;
    var streetForm = data.Street ? mapStreetFieldDataToForm(data.Street) : undefined;
    var districtForm = data.District ? mapDistrictFieldDataToForm(data.District) : null;
    var storagesForm = data.storages ? data.storages.map(mapStorageFieldDataToForm) : null;

    return {
        ...dominionForm,
        street: streetForm,
        streetNumber: data.StreetNumber,
        district: districtForm,
        storages: storagesForm
    };
}