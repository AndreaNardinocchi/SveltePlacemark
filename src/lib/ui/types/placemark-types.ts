export interface Session {
  email: string;
  name: string;
  _id: string;
  token: string;
}

export interface User {
  firstName: string;
  lastName: string;
  userLat: string;
  userLong: string;
  country: string;
  street: string;
  addressCode: string;
  DOB: string;
  phoneNumber: string;
  email: string;
  password: string;
  createdTimeStamp: string;
  _id: string;
}

export interface Category {
  // thisUserCategory: Placemark;
  thisUserCategory: Placemark[];
  placemarks: Placemark[];
  // placemarks?: Placemark[];
  title: string;
  notes: string;
  // img: string;
  image: string;
  userid: string;
  _id?: string;
}

export interface Placemark {
  categoryId: string;
  title: string;
  lat: string;
  long: string;
  address: string;
  country: string;
  phone: string;
  website: string;
  visited: string;
  description: string;
  // https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays
  img?: string[]; // img is optional and can be undefined
  _id?: string;
}

export interface DataSet {
  labels: string[];
  datasets: [{ values: number[] }];
}
