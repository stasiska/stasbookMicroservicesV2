import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { RegistrationDto } from 'src/auth2/types/auth_service';

const registerDto: RegistrationDto = {
  name: 'stas',
  email: 'stas@gmail.com',
  password: '123456789',
  passwordRepeat: '123456789'
}


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

  });

  afterAll(async () => {
    
    await app.close();
  })

  it('GET auth-service/oauth/connect/google', async () => {
    const res = await request(app.getHttpServer())
      .get('/auth-service/oauth/connect/google')
      .expect(200)
      
      expect(res.body).toHaveProperty('url')
  });

  it('POST /auth-service/registration', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth-service/registration')
      .send(registerDto)
      .expect(201)

      expect(res.body).toHaveProperty('message')
  })
});
