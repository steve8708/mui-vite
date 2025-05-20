export interface CustomerType {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  status: "Active" | "Inactive";
  registeredDate: Date;
  customerType: "Standard" | "Premium";
}
