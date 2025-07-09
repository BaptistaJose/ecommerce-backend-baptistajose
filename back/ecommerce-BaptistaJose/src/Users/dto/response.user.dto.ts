export class UserResponseDto {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    country?: string | undefined;
    city?: string | undefined;

    constructor(user: Partial<UserResponseDto>) {
       const { id, name, email, address, phone, country, city } = user;
        this.id = id ?? 1;
        this.name = name ?? "";
        this.email = email ?? "";
        this.address = address ?? "";
        this.phone = phone ?? "";
        this.country = country;
        this.city = city;
    }
}