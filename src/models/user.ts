import { Role } from "./roles";
export interface User {
   
    id?: number;
    username?: string;
    password?:string;
    roleName?: string;
    token?: string;
    roles?:Role;
}   