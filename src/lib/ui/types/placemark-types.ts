export interface Session {
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
  // createdTimeStamp: string;
  _id?: string;
}

export interface Category {
  title: string;
  // notes: string;
  // // img: string;
  // image: string;
  // userid: string;
  _id?: string;
}
