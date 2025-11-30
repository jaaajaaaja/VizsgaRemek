import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsLongerThan(
  minLength: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [minLength],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value === 'string' || Array.isArray(value)) {
            return value.length > args.constraints[0]
          }
          return false
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be longer than ${args.constraints[0]} characters`
        },
      },
    });
  };
}
