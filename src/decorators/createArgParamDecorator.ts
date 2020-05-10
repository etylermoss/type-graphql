import { ResolverData } from "../interfaces";
import { getMetadataStorage } from "../metadata/getMetadataStorage";
import { getParamInfo } from "../helpers/params";
import { SymbolKeysNotSupportedError } from "../errors";
import { ArgOptions } from "./Arg";
import { ReturnTypeFunc } from "./types";

export function createArgParamDecorator<TContextType = {}>(
  name: string,
  resolver: (resolverData: ResolverData<TContextType>, argValue: Promise<any>) => void,
  returnTypeFunc: ReturnTypeFunc,
  options?: ArgOptions,
): ParameterDecorator {
  return (prototype, propertyKey, parameterIndex) => {
    if (typeof propertyKey === "symbol") {
      throw new SymbolKeysNotSupportedError();
    }
    getMetadataStorage().collectHandlerParamMetadata({
      kind: "customArg",
      name,
      description: options?.description,
      target: prototype.constructor,
      methodName: propertyKey,
      index: parameterIndex,
      resolver,
      ...getParamInfo({
        prototype,
        propertyKey,
        parameterIndex,
        returnTypeFunc,
        options,
        argName: name,
      }),
    });
  };
}
