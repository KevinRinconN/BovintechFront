export interface Operator {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  img?: string;
  rol: string;
}

export interface Lot {
  id: string;
  name: string;
  description?: string;
  operator?: Operator;
  numberCattle: number;
}

export interface Bovine {
  id: string;
  img: string;
  weight: string;
  dateOfBirth: string;
  distinctiveTrait: string;
  gender: string;
  breed: string;
  brand: string;
  lastWeight: number;
  lastWeightImage: string;
  stage: string;
}

export interface BirthRecord {
  lastBirth: string;
  estimatedDateBirth: string;
  offspring: string;
  abortions: string;
  birth: {
    id: string;
    birthDate: string;
    inseminationDate: string;
    dam: {
      id: 3;
      dateOfBirth: string;
      distinctiveTrait: string;
      gender: string;
      breed: string;
      brand: string;
    };
    sire: {
      id: 2;
      dateOfBirth: string;
      distinctiveTrait: string;
      gender: string;
      breed: string;
      brand: string;
      lastWeightImage: string;
    };
    calf: string;
    status: string;
    abortionReason: string;
    abortion: boolean;
  };
}

export interface Records {
  id: string;
  img: string;
  weight: number;
  dateOfRecord: string;
}

export interface DetailsBovine {
  id: string;
  img: string;
  weight: string;
  dateOfBirth: string;
  distinctiveTrait: string;
  gender: string;
  breed: string;
  brand: string;
  lastWeight: number;
  lastWeightImage: string;
  stage: string;
  offspring: number;
  sire: BovineParent;
  dam: BovineParent;
}

export interface BovineParent {
  id: string;
  gender: string;
  breed: string;
  brand: string;
  lastWeightImage: string;
}
