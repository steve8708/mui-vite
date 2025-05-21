export interface CustomerName {
  title: string;
  first: string;
  last: string;
}

export interface CustomerLocation {
  city: string;
  state: string;
  country: string;
}

export interface CustomerPicture {
  thumbnail: string;
  medium: string;
  large: string;
}

export interface CustomerLogin {
  uuid: string;
  username: string;
}

export interface CustomerEmail {
  email: string;
}

export interface CustomerPhone {
  phone: string;
  cell: string;
}

export interface CustomerRegistered {
  date: string;
  age: number;
}

export interface Customer {
  login: CustomerLogin;
  name: CustomerName;
  email: string;
  location: CustomerLocation;
  phone: string;
  cell: string;
  picture: CustomerPicture;
  registered: CustomerRegistered;
}

export interface RandomUserResponse {
  results: Customer[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}
