import { UserDto } from "./userDto.model";

export interface Message {
    id: number;
    user: UserDto;
    contentMessage: string;
    createOn: Date;
}