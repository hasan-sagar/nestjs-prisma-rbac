import { Body, Controller, Post,Get , UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { User } from '@prisma/client';
import { JwtAuthGuard } from './jwt.guard';
import { Roles } from './roles.decorator';
import { RoleGuard } from './role.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('register')
    async register (@Body() userData:UserDto):Promise<User>{
        return this.authService.register(userData)
    }

    @Post('login')
    async login(@Body() userData:UserDto){
        return this.authService.login(userData)
    }

    //we can declare and choose all admin and users by
    //@Roles('admin','users')
    @Roles('admin')
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Get('alluser')
    async allUsers():Promise<User[]>{
        return this.authService.allUser()
    }
}
