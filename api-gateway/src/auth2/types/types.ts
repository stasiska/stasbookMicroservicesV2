import { ApiProperty } from '@nestjs/swagger';
export type User = {
    id: string;
    email: string;
    password: string;
    displayName: string;
    picture: string | null;
    role: string;
    isVerified: boolean;
    isTwoFactorEnabled: boolean;
    method: string;
    createdAt: Date;
    updatedAt: Date;
}


export class UserDto {
  @ApiProperty(
    { 
        description: 'ID пользователя',
         example: '1' 
    }
  )
  id: string;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'stas@gmail.com'
  })
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'password123'
  })
  password: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Stas'
  })
  displayName: string;

  @ApiProperty({ nullable: true })
  picture: string | null;

  @ApiProperty({
    description: 'Роль пользователя',
    example: 'user'
  })
  role: string;

  @ApiProperty({
    description: 'Подтвержден ли пользователь',
    example: true
  })
  isVerified: boolean;

  @ApiProperty({
    description: 'Включена ли двухфакторная аутентификация',
    example: false
  })
  isTwoFactorEnabled: boolean;

  @ApiProperty({
    description: 'Метод аутентификации',
    example: 'CREDENTIALS, GOOGLE, FACEBOOK'
  })
  method: string;

  @ApiProperty({
    description: 'Дата создания пользователя',
    example: '2023-10-01T00:00:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Дата обновления пользователя',
    example: '2023-10-01T00:00:00.000Z'
  })
  updatedAt: Date;
}
