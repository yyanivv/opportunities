import { IsString, IsArray, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { Provider, Source } from "@opportunities/shared";

class SourceDto implements Source {
  @IsString()
  type!: string;

  @IsString()
  providerType!: string;

  @IsArray()
  providers!: Provider;
}

export class TargetReqDto {
  @IsString()
  pipe!: string;


  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SourceDto)
  sources!: SourceDto[];
}
