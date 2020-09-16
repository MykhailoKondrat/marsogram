type RoverName = "curiosity" | "opportunity" | "spirit";
type RoverCamera =
  | "FHAZ"
  | "RHAZ"
  | "MAST"
  | "CHEMCAM"
  | "MAHLI"
  | "MARDI"
  | "NAVCAM"
  | "PANCAM"
  | "MINITES";
interface Photo {
  imgSrc: string;
  earthDate: string;
}
interface Rover {
  name: RoverName;
  cameras: Array<RoverCamera>;
}
interface AvailableRovers {
  curiosity: Rover;
  opportunity: Rover;
  spirit: Rover;
}
/// Exports
export interface AppState {
  loading: boolean;
  currentPage: number;
  availableRovers: AvailableRovers;
  fetchedPhotos: Array<Photo> | [];
}
