import { Role } from "../interface/user.interface"

export class UserDto {
    readonly id:number
    readonly username:string
    readonly password:string
    readonly role:Role
}