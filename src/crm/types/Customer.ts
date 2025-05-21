export interface CustomerAddress {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
  postcode: string | number;
}

export interface CustomerName {
  title: string;
  first: string;
  last: string;
}

export interface CustomerPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface Customer {
  id: string;
  gender: string;
  name: CustomerName;
  email: string;
  phone: string;
  cell: string;
  location: {
    address: CustomerAddress;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  picture: CustomerPicture;
  nat: string;
}

export interface CustomerFormData {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cell: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
}
