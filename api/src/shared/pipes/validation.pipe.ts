import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass, classToPlain, deserialize, deserializeArray, serialize } from 'class-transformer';
import { ConstratinsErrorsDto } from '../dto/constraints-errors.dto';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    console.log(object)
    const errors = await validate(object);
    if (errors.length > 0) {
      
      let constraintsErrors = plainToClass(ConstratinsErrorsDto, errors, { excludeExtraneousValues: true })
      throw new BadRequestException(constraintsErrors);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}