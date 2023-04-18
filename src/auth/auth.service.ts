import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { User } from '@prisma/client';
import {sign} from 'jsonwebtoken'

@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService){}

    async register(userDto : UserDto):Promise<User>{
        return this.prisma.user.create({
            data:userDto
        })
    }

    async login({username,password}:UserDto){
        const user = await this.prisma.user.findUnique({
            where:{username:username}
        })
        if(!user){
            throw new NotFoundException('Invalid data')
        }
        const checkPassword = user.password === password
        if(!checkPassword){
            throw new NotFoundException('Invalid Password')
        }
        const token = sign({...user},'secret')

        return { user:{...user,token} };
    }

    async allUser():Promise<User[]>{
        return this.prisma.user.findMany()
    }
}
