import { createArgParamDecorator, ArgOptions, ReturnTypeFunc, ForbiddenError } from "../../../src";

// sample implementation of custom argument decorator
// in a real world application, argValue might be checked against the db
export function AllowedRecipe(
  name: string,
  returnTypeFunc: ReturnTypeFunc,
  options?: ArgOptions,
): ParameterDecorator {
  return createArgParamDecorator(
    name,
    async (resolverData, argValue) => {
      if ((await argValue) !== "Recipe 1") {
        throw new ForbiddenError();
      }
      return argValue;
    },
    returnTypeFunc,
    options,
  );
}
