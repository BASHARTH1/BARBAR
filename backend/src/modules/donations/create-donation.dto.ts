import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateDonationDto {
  @IsString()
  donorName!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  campaignSlug!: string;

  @IsNumber()
  @Min(1)
  amount!: number;

  @IsOptional()
  @IsBoolean()
  recurring?: boolean;

  @IsOptional()
  @IsString()
  message?: string;
}
