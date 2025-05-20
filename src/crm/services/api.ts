import { CustomerType } from "../types/customer";

// Define the randomuser.me API response types
interface RandomUserName {
  title: string;
  first: string;
  last: string;
}

interface RandomUserLogin {
  uuid: string;
  username: string;
}

interface RandomUserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface RandomUserLocation {
  city: string;
  state: string;
  country: string;
}

interface RandomUserEmail {
  email: string;
}

interface RandomUserPhone {
  phone: string;
  cell: string;
}

interface RandomUserResult {
  gender: string;
  name: RandomUserName;
  location: RandomUserLocation;
  email: string;
  login: RandomUserLogin;
  phone: string;
  cell: string;
  picture: RandomUserPicture;
  nat: string;
  registered: {
    date: string;
    age: number;
  };
}

interface RandomUserResponse {
  results: RandomUserResult[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

/**
 * Fetches customer data from the randomuser.me API
 * @param count Number of customers to fetch
 * @returns Promise with customer data
 */
export const fetchCustomers = async (count = 50): Promise<CustomerType[]> => {
  try {
    const response = await fetch(
      `https://randomuser.me/api/?results=${count}&inc=name,email,login,phone,picture,location,registered,nat&noinfo`,
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: RandomUserResponse = await response.json();

    // Transform the API response to our CustomerType format
    return data.results.map((user) => ({
      id: user.login.uuid,
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      phone: user.phone,
      location: `${user.location.city}, ${user.location.country}`,
      avatar: user.picture.thumbnail,
      status: Math.random() > 0.3 ? "Active" : "Inactive", // Randomly assign status
      registeredDate: new Date(user.registered.date),
      customerType: Math.random() > 0.7 ? "Premium" : "Standard", // Randomly assign customer type
    }));
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};
