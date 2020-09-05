import * as ct from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { ClassTransformOptions } from 'class-transformer/ClassTransformOptions';

const _oldPlainToClass = ct.plainToClass;

export function plainToClass<T, V>(
  cls: ClassType<T>,
  plain: V[],
  options?: ClassTransformOptions,
): T[];
export function plainToClass<T, V>(
  cls: ClassType<T>,
  plain: V,
  options?: ClassTransformOptions,
): T;
export function plainToClass<T, V>(
  cls: ClassType<T>,
  plain: V | V[],
  options?: ClassTransformOptions,
): T | T[] {
  if (!options) {
    options = {
      excludeExtraneousValues: true,
    };
  }
  return _oldPlainToClass(cls, plain as any, options);
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore-next-line
ct.plainToClass = plainToClass;

// class A {
//   @Exclude({
//     toPlainOnly: true
//   })
//   @Expose()
//   a!: string;
//   @Expose()
//   b!: string;
// }
// const abc = ct.plainToClass(A, {
//   a: 1,
//   b: 2
// });
// const def = ct.classToPlain(abc);
// console.log(abc);