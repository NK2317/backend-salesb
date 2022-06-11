import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { SalesModule } from './sales/sales.module';
import { ClientModule } from './client/client.module';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';
import { CashCutModule } from './cash-cut/cash-cut.module';

@Module({
  imports: [
    ProductModule,
    PrismaModule,
    CategoryModule,
    OrderModule,
    SalesModule,
    ClientModule,
    UserModule,
    LoginModule,
    AuthModule,
    CashCutModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
