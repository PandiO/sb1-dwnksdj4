export interface LocationViewDTO {
    id: number;
    x: number;
    y: number;
    z: number;
    pitch: number;
    yaw: number;
    worldName: string;
}

export function mapFieldDataToForm(data: any): LocationViewDTO {
    return {
        id: data.Id,
        x: data.X,
        y: data.Y,
        z: data.Z,
        pitch: data.Pitch,
        yaw: data.Yaw,
        worldName: data.WorldName
    };
}