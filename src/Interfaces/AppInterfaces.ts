export type RoverName = "curiosity" | "opportunity" | "spirit" | "";
export type RoverCamera =
  | "FHAZ"
  | "RHAZ"
  | "MAST"
  | "CHEMCAM"
  | "MAHLI"
  | "MARDI"
  | "NAVCAM"
  | "PANCAM"
  | "MINITES"
  | "";

interface Rover {
  name: RoverName;
  cameras: Array<RoverCamera>;
}

/// Exports
export interface AppSlice {
  loading: boolean;
  currentPage: number;
  hasMoreToLoad: boolean;
  availableRovers: Array<Rover>;
  fetchedPhotos: [];
  currentRequest: {
    rover: RoverName;
    camera: RoverCamera;
    sol: number;
  };
  errorMessage?: string;
}
export interface AppState {
  appSlice: AppSlice;
}
export interface FetchDataParams {
  rover: RoverName;
  camera: RoverCamera;
  sol: number;
  currentPage: number;
  intendedError?: string | "";
}
