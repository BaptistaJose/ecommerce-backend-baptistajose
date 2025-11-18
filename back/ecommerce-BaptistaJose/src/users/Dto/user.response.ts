export class UserResponse {
  id: string;
  email: string;
  name: string;
  address: string;
  phone: string;
  country?: string | undefined;
  city?: string | undefined;

  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.address = user.address;
    this.phone = user.phone;
    this.country = user.country;
    this.city = user.city;
  }
}
