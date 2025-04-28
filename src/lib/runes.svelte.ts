export const subTitle = $state({ text: "" });
export const loggedInUser = $state({
  firstName: "",
  lastName: "",
  userLat: "",
  userLong: "",
  country: "",
  street: "",
  addressCode: "",
  DOB: "",
  phoneNumber: "",
  email: "",
  password: "",
  name: "",
  token: "",
  _id: ""
});

export const user = $state({
  firstName: "",
  lastName: "",
  userLat: "",
  userLong: "",
  country: "",
  street: "",
  addressCode: "",
  DOB: "",
  phoneNumber: "",
  email: "",
  password: "",
  _id: ""
});

export const category = $state({
  title: "",
  notes: "",
  userId: "",
  image: "",
  // img: "",
  _id: ""
});

export const placemark = $state({
  title: "",
  lat: "",
  long: "",
  address: "",
  country: "",
  phone: "",
  website: "",
  visited: "",
  description: "",
  img: "",
  _id: ""
});
