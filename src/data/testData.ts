import { LocationCreateDTO, iLocationCreateDTO } from '../utils/domain/dto/LocationCreateDTO';
import { DominionCreateDTO } from '../utils/domain/dto/DominionCreateDTO';
import { TownCreateDTO } from '../utils/domain/dto/TownCreateDTO';
import { DistrictCreateDTO } from '../utils/domain/dto/DistrictCreateDTO';
import { StreetCreateDTO } from '../utils/domain/dto/StreetCreateDTO';
import { StructureCreateDTO } from '../utils/domain/dto/StructureCreateDTO';

// Basic location for reuse
const createLocation = (id: number, x: number, y: number, z: number, yaw: number = 0, pitch: number = 0): iLocationCreateDTO => ({
  Id: id,
  X: x,
  Y: y,
  Z: z,
  Yaw: yaw,
  Pitch: pitch,
  WorldName: 'world'
});

// Create Streets
const mainStreet: StreetCreateDTO = {
  Id: 1,
  Name: "Main Street",
  DistrictId: undefined, // Will be set after district creation
  District: undefined
};

const highStreet: StreetCreateDTO = {
  Id: 2,
  Name: "High Street",
  DistrictId: undefined,
  District: undefined
};

// Create Town
const town: TownCreateDTO = {
  Id: 1,
  Name: "Riverside",
  Description: "A peaceful town by the river",
  Created: new Date("2024-03-15T10:00:00Z"),
  LocationId: 1,
  LocationCreateDTO: createLocation(1, 100, 64, 100),
  AllowEntry: true,
  WgRegionId: 1,
  RequiredTitle: 1
};

// Create Districts
const northDistrict: DistrictCreateDTO = {
  Id: 2,
  Name: "North District",
  Description: "The northern residential area",
  Created: new Date("2024-03-15T10:30:00Z"),
  LocationId: 2,
  LocationCreateDTO: createLocation(2, 150, 64, 50),
  AllowEntry: true,
  WgRegionId: 2,
  TownId: town.Id,
  Town: town
};

const southDistrict: DistrictCreateDTO = {
  Id: 3,
  Name: "South District",
  Description: "The southern commercial district",
  Created: new Date("2024-03-15T11:00:00Z"),
  LocationId: 3,
  LocationCreateDTO: createLocation(3, 50, 64, 150),
  AllowEntry: true,
  WgRegionId: 3,
  TownId: town.Id,
  Town: town
};

// Update street district references
mainStreet.DistrictId = northDistrict.Id;
mainStreet.District = northDistrict;
highStreet.DistrictId = southDistrict.Id;
highStreet.District = southDistrict;

// Create Structures
const structure1: StructureCreateDTO = {
  Id: 4,
  Name: "Town Hall",
  Description: "The central administrative building",
  Created: new Date("2024-03-15T12:00:00Z"),
  LocationId: 4,
  LocationCreateDTO: createLocation(4, 155, 64, 55),
  AllowEntry: true,
  WgRegionId: 4,
  DistrictId: northDistrict.Id,
  District: northDistrict,
  StreetId: mainStreet.Id,
  Street: mainStreet,
  StreetNumber: 1
};

const structure2: StructureCreateDTO = {
  Id: 5,
  Name: "Market",
  Description: "The main marketplace",
  Created: new Date("2024-03-15T12:30:00Z"),
  LocationId: 5,
  LocationCreateDTO: createLocation(5, 45, 64, 145),
  AllowEntry: true,
  WgRegionId: 5,
  DistrictId: southDistrict.Id,
  District: southDistrict,
  StreetId: highStreet.Id,
  Street: highStreet,
  StreetNumber: 2
};

const structure3: StructureCreateDTO = {
  Id: 6,
  Name: "Library",
  Description: "Public library and archive",
  Created: new Date("2024-03-15T13:00:00Z"),
  LocationId: 6,
  LocationCreateDTO: createLocation(6, 160, 64, 60),
  AllowEntry: true,
  WgRegionId: 6,
  DistrictId: northDistrict.Id,
  District: northDistrict,
  StreetId: mainStreet.Id,
  Street: mainStreet,
  StreetNumber: 3
};

// Export all created objects
export const testData = {
  town,
  districts: {
    northDistrict,
    southDistrict
  },
  streets: {
    mainStreet,
    highStreet
  },
  structures: {
    structure1,
    structure2,
    structure3
  }
};