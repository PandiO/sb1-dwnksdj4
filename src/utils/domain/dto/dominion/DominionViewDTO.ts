import { LocationViewDTO } from "../location/LocationViewDTO";
import { mapFieldDataToForm as mapLocationFieldDataToForm } from "../location/LocationViewDTO";

export interface DominionViewDTO {
    id: number;
    name: string;
    description: string;
    allowEntry: boolean;
    created: Date | null;
    wgRegionId: number;
    location: LocationViewDTO;
}

export function mapFieldDataToForm(data: any): DominionViewDTO | null {
    if (!data) return null;
    
    return {
        id: data.Id,
        name: data.Name,
        description: data.Description,
        allowEntry: data.AllowEntry,
        created: data.Created ? new Date(data.Created) : null,
        wgRegionId: data.WgRegionId,
        location: mapLocationFieldDataToForm(data.Location)
    };
}