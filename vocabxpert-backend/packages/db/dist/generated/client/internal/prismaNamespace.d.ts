import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
/**
 * Prisma Errors
 */
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
/**
 * Re-export of sql-template-tag
 */
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
/**
 * Decimal.js
 */
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
/**
* Extensions
*/
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
/**
 * Prisma Client JS version: 7.8.0
 * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
 */
export declare const prismaVersion: PrismaVersion;
/**
 * Utility Types
 */
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: runtime.DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: runtime.JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
/**
 * From ts-toolbelt
 */
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
/**
 * Like `Pick`, but additionally can also accept an array of keys
 */
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
/**
 * Exclude all keys with underscores
 */
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly User: "User";
    readonly Interest: "Interest";
    readonly UserInterest: "UserInterest";
    readonly VocabList: "VocabList";
    readonly Vocab: "Vocab";
    readonly VocabExample: "VocabExample";
    readonly VocabNote: "VocabNote";
    readonly VocabReview: "VocabReview";
    readonly VocabProgress: "VocabProgress";
    readonly StudySession: "StudySession";
    readonly StudyExercise: "StudyExercise";
    readonly StudyAttempt: "StudyAttempt";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "interest" | "userInterest" | "vocabList" | "vocab" | "vocabExample" | "vocabNote" | "vocabReview" | "vocabProgress" | "studySession" | "studyExercise" | "studyAttempt";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        Interest: {
            payload: Prisma.$InterestPayload<ExtArgs>;
            fields: Prisma.InterestFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.InterestFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterestPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.InterestFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterestPayload>;
                };
                findFirst: {
                    args: Prisma.InterestFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterestPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.InterestFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterestPayload>;
                };
                findMany: {
                    args: Prisma.InterestFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterestPayload>[];
                };
                create: {
                    args: Prisma.InterestCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterestPayload>;
                };
                createMany: {
                    args: Prisma.InterestCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.InterestCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterestPayload>[];
                };
                delete: {
                    args: Prisma.InterestDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterestPayload>;
                };
                update: {
                    args: Prisma.InterestUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterestPayload>;
                };
                deleteMany: {
                    args: Prisma.InterestDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.InterestUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.InterestUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterestPayload>[];
                };
                upsert: {
                    args: Prisma.InterestUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InterestPayload>;
                };
                aggregate: {
                    args: Prisma.InterestAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInterest>;
                };
                groupBy: {
                    args: Prisma.InterestGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InterestGroupByOutputType>[];
                };
                count: {
                    args: Prisma.InterestCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InterestCountAggregateOutputType> | number;
                };
            };
        };
        UserInterest: {
            payload: Prisma.$UserInterestPayload<ExtArgs>;
            fields: Prisma.UserInterestFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserInterestFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInterestPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserInterestFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInterestPayload>;
                };
                findFirst: {
                    args: Prisma.UserInterestFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInterestPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserInterestFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInterestPayload>;
                };
                findMany: {
                    args: Prisma.UserInterestFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInterestPayload>[];
                };
                create: {
                    args: Prisma.UserInterestCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInterestPayload>;
                };
                createMany: {
                    args: Prisma.UserInterestCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserInterestCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInterestPayload>[];
                };
                delete: {
                    args: Prisma.UserInterestDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInterestPayload>;
                };
                update: {
                    args: Prisma.UserInterestUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInterestPayload>;
                };
                deleteMany: {
                    args: Prisma.UserInterestDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserInterestUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserInterestUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInterestPayload>[];
                };
                upsert: {
                    args: Prisma.UserInterestUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInterestPayload>;
                };
                aggregate: {
                    args: Prisma.UserInterestAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUserInterest>;
                };
                groupBy: {
                    args: Prisma.UserInterestGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserInterestGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserInterestCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserInterestCountAggregateOutputType> | number;
                };
            };
        };
        VocabList: {
            payload: Prisma.$VocabListPayload<ExtArgs>;
            fields: Prisma.VocabListFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VocabListFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabListPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VocabListFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabListPayload>;
                };
                findFirst: {
                    args: Prisma.VocabListFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabListPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VocabListFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabListPayload>;
                };
                findMany: {
                    args: Prisma.VocabListFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabListPayload>[];
                };
                create: {
                    args: Prisma.VocabListCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabListPayload>;
                };
                createMany: {
                    args: Prisma.VocabListCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VocabListCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabListPayload>[];
                };
                delete: {
                    args: Prisma.VocabListDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabListPayload>;
                };
                update: {
                    args: Prisma.VocabListUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabListPayload>;
                };
                deleteMany: {
                    args: Prisma.VocabListDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VocabListUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VocabListUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabListPayload>[];
                };
                upsert: {
                    args: Prisma.VocabListUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabListPayload>;
                };
                aggregate: {
                    args: Prisma.VocabListAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVocabList>;
                };
                groupBy: {
                    args: Prisma.VocabListGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VocabListGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VocabListCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VocabListCountAggregateOutputType> | number;
                };
            };
        };
        Vocab: {
            payload: Prisma.$VocabPayload<ExtArgs>;
            fields: Prisma.VocabFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VocabFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VocabFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabPayload>;
                };
                findFirst: {
                    args: Prisma.VocabFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VocabFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabPayload>;
                };
                findMany: {
                    args: Prisma.VocabFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabPayload>[];
                };
                create: {
                    args: Prisma.VocabCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabPayload>;
                };
                createMany: {
                    args: Prisma.VocabCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VocabCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabPayload>[];
                };
                delete: {
                    args: Prisma.VocabDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabPayload>;
                };
                update: {
                    args: Prisma.VocabUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabPayload>;
                };
                deleteMany: {
                    args: Prisma.VocabDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VocabUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VocabUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabPayload>[];
                };
                upsert: {
                    args: Prisma.VocabUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabPayload>;
                };
                aggregate: {
                    args: Prisma.VocabAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVocab>;
                };
                groupBy: {
                    args: Prisma.VocabGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VocabGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VocabCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VocabCountAggregateOutputType> | number;
                };
            };
        };
        VocabExample: {
            payload: Prisma.$VocabExamplePayload<ExtArgs>;
            fields: Prisma.VocabExampleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VocabExampleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabExamplePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VocabExampleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabExamplePayload>;
                };
                findFirst: {
                    args: Prisma.VocabExampleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabExamplePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VocabExampleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabExamplePayload>;
                };
                findMany: {
                    args: Prisma.VocabExampleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabExamplePayload>[];
                };
                create: {
                    args: Prisma.VocabExampleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabExamplePayload>;
                };
                createMany: {
                    args: Prisma.VocabExampleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VocabExampleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabExamplePayload>[];
                };
                delete: {
                    args: Prisma.VocabExampleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabExamplePayload>;
                };
                update: {
                    args: Prisma.VocabExampleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabExamplePayload>;
                };
                deleteMany: {
                    args: Prisma.VocabExampleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VocabExampleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VocabExampleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabExamplePayload>[];
                };
                upsert: {
                    args: Prisma.VocabExampleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabExamplePayload>;
                };
                aggregate: {
                    args: Prisma.VocabExampleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVocabExample>;
                };
                groupBy: {
                    args: Prisma.VocabExampleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VocabExampleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VocabExampleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VocabExampleCountAggregateOutputType> | number;
                };
            };
        };
        VocabNote: {
            payload: Prisma.$VocabNotePayload<ExtArgs>;
            fields: Prisma.VocabNoteFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VocabNoteFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabNotePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VocabNoteFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabNotePayload>;
                };
                findFirst: {
                    args: Prisma.VocabNoteFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabNotePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VocabNoteFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabNotePayload>;
                };
                findMany: {
                    args: Prisma.VocabNoteFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabNotePayload>[];
                };
                create: {
                    args: Prisma.VocabNoteCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabNotePayload>;
                };
                createMany: {
                    args: Prisma.VocabNoteCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VocabNoteCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabNotePayload>[];
                };
                delete: {
                    args: Prisma.VocabNoteDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabNotePayload>;
                };
                update: {
                    args: Prisma.VocabNoteUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabNotePayload>;
                };
                deleteMany: {
                    args: Prisma.VocabNoteDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VocabNoteUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VocabNoteUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabNotePayload>[];
                };
                upsert: {
                    args: Prisma.VocabNoteUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabNotePayload>;
                };
                aggregate: {
                    args: Prisma.VocabNoteAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVocabNote>;
                };
                groupBy: {
                    args: Prisma.VocabNoteGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VocabNoteGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VocabNoteCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VocabNoteCountAggregateOutputType> | number;
                };
            };
        };
        VocabReview: {
            payload: Prisma.$VocabReviewPayload<ExtArgs>;
            fields: Prisma.VocabReviewFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VocabReviewFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabReviewPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VocabReviewFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabReviewPayload>;
                };
                findFirst: {
                    args: Prisma.VocabReviewFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabReviewPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VocabReviewFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabReviewPayload>;
                };
                findMany: {
                    args: Prisma.VocabReviewFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabReviewPayload>[];
                };
                create: {
                    args: Prisma.VocabReviewCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabReviewPayload>;
                };
                createMany: {
                    args: Prisma.VocabReviewCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VocabReviewCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabReviewPayload>[];
                };
                delete: {
                    args: Prisma.VocabReviewDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabReviewPayload>;
                };
                update: {
                    args: Prisma.VocabReviewUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabReviewPayload>;
                };
                deleteMany: {
                    args: Prisma.VocabReviewDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VocabReviewUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VocabReviewUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabReviewPayload>[];
                };
                upsert: {
                    args: Prisma.VocabReviewUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabReviewPayload>;
                };
                aggregate: {
                    args: Prisma.VocabReviewAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVocabReview>;
                };
                groupBy: {
                    args: Prisma.VocabReviewGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VocabReviewGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VocabReviewCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VocabReviewCountAggregateOutputType> | number;
                };
            };
        };
        VocabProgress: {
            payload: Prisma.$VocabProgressPayload<ExtArgs>;
            fields: Prisma.VocabProgressFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VocabProgressFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabProgressPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VocabProgressFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabProgressPayload>;
                };
                findFirst: {
                    args: Prisma.VocabProgressFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabProgressPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VocabProgressFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabProgressPayload>;
                };
                findMany: {
                    args: Prisma.VocabProgressFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabProgressPayload>[];
                };
                create: {
                    args: Prisma.VocabProgressCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabProgressPayload>;
                };
                createMany: {
                    args: Prisma.VocabProgressCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VocabProgressCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabProgressPayload>[];
                };
                delete: {
                    args: Prisma.VocabProgressDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabProgressPayload>;
                };
                update: {
                    args: Prisma.VocabProgressUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabProgressPayload>;
                };
                deleteMany: {
                    args: Prisma.VocabProgressDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VocabProgressUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VocabProgressUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabProgressPayload>[];
                };
                upsert: {
                    args: Prisma.VocabProgressUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VocabProgressPayload>;
                };
                aggregate: {
                    args: Prisma.VocabProgressAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVocabProgress>;
                };
                groupBy: {
                    args: Prisma.VocabProgressGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VocabProgressGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VocabProgressCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VocabProgressCountAggregateOutputType> | number;
                };
            };
        };
        StudySession: {
            payload: Prisma.$StudySessionPayload<ExtArgs>;
            fields: Prisma.StudySessionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.StudySessionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudySessionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.StudySessionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudySessionPayload>;
                };
                findFirst: {
                    args: Prisma.StudySessionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudySessionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.StudySessionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudySessionPayload>;
                };
                findMany: {
                    args: Prisma.StudySessionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudySessionPayload>[];
                };
                create: {
                    args: Prisma.StudySessionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudySessionPayload>;
                };
                createMany: {
                    args: Prisma.StudySessionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.StudySessionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudySessionPayload>[];
                };
                delete: {
                    args: Prisma.StudySessionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudySessionPayload>;
                };
                update: {
                    args: Prisma.StudySessionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudySessionPayload>;
                };
                deleteMany: {
                    args: Prisma.StudySessionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.StudySessionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.StudySessionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudySessionPayload>[];
                };
                upsert: {
                    args: Prisma.StudySessionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudySessionPayload>;
                };
                aggregate: {
                    args: Prisma.StudySessionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateStudySession>;
                };
                groupBy: {
                    args: Prisma.StudySessionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StudySessionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.StudySessionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StudySessionCountAggregateOutputType> | number;
                };
            };
        };
        StudyExercise: {
            payload: Prisma.$StudyExercisePayload<ExtArgs>;
            fields: Prisma.StudyExerciseFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.StudyExerciseFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyExercisePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.StudyExerciseFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyExercisePayload>;
                };
                findFirst: {
                    args: Prisma.StudyExerciseFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyExercisePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.StudyExerciseFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyExercisePayload>;
                };
                findMany: {
                    args: Prisma.StudyExerciseFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyExercisePayload>[];
                };
                create: {
                    args: Prisma.StudyExerciseCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyExercisePayload>;
                };
                createMany: {
                    args: Prisma.StudyExerciseCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.StudyExerciseCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyExercisePayload>[];
                };
                delete: {
                    args: Prisma.StudyExerciseDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyExercisePayload>;
                };
                update: {
                    args: Prisma.StudyExerciseUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyExercisePayload>;
                };
                deleteMany: {
                    args: Prisma.StudyExerciseDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.StudyExerciseUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.StudyExerciseUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyExercisePayload>[];
                };
                upsert: {
                    args: Prisma.StudyExerciseUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyExercisePayload>;
                };
                aggregate: {
                    args: Prisma.StudyExerciseAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateStudyExercise>;
                };
                groupBy: {
                    args: Prisma.StudyExerciseGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StudyExerciseGroupByOutputType>[];
                };
                count: {
                    args: Prisma.StudyExerciseCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StudyExerciseCountAggregateOutputType> | number;
                };
            };
        };
        StudyAttempt: {
            payload: Prisma.$StudyAttemptPayload<ExtArgs>;
            fields: Prisma.StudyAttemptFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.StudyAttemptFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyAttemptPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.StudyAttemptFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyAttemptPayload>;
                };
                findFirst: {
                    args: Prisma.StudyAttemptFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyAttemptPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.StudyAttemptFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyAttemptPayload>;
                };
                findMany: {
                    args: Prisma.StudyAttemptFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyAttemptPayload>[];
                };
                create: {
                    args: Prisma.StudyAttemptCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyAttemptPayload>;
                };
                createMany: {
                    args: Prisma.StudyAttemptCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.StudyAttemptCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyAttemptPayload>[];
                };
                delete: {
                    args: Prisma.StudyAttemptDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyAttemptPayload>;
                };
                update: {
                    args: Prisma.StudyAttemptUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyAttemptPayload>;
                };
                deleteMany: {
                    args: Prisma.StudyAttemptDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.StudyAttemptUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.StudyAttemptUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyAttemptPayload>[];
                };
                upsert: {
                    args: Prisma.StudyAttemptUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StudyAttemptPayload>;
                };
                aggregate: {
                    args: Prisma.StudyAttemptAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateStudyAttempt>;
                };
                groupBy: {
                    args: Prisma.StudyAttemptGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StudyAttemptGroupByOutputType>[];
                };
                count: {
                    args: Prisma.StudyAttemptCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StudyAttemptCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
/**
 * Enums
 */
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly nativeLanguage: "nativeLanguage";
    readonly targetLanguage: "targetLanguage";
    readonly level: "level";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const InterestScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type InterestScalarFieldEnum = (typeof InterestScalarFieldEnum)[keyof typeof InterestScalarFieldEnum];
export declare const UserInterestScalarFieldEnum: {
    readonly userId: "userId";
    readonly interestId: "interestId";
};
export type UserInterestScalarFieldEnum = (typeof UserInterestScalarFieldEnum)[keyof typeof UserInterestScalarFieldEnum];
export declare const VocabListScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly name: "name";
    readonly isDefault: "isDefault";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VocabListScalarFieldEnum = (typeof VocabListScalarFieldEnum)[keyof typeof VocabListScalarFieldEnum];
export declare const VocabScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly listId: "listId";
    readonly word: "word";
    readonly translation: "translation";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly wordNormalized: "wordNormalized";
};
export type VocabScalarFieldEnum = (typeof VocabScalarFieldEnum)[keyof typeof VocabScalarFieldEnum];
export declare const VocabExampleScalarFieldEnum: {
    readonly id: "id";
    readonly vocabId: "vocabId";
    readonly text: "text";
};
export type VocabExampleScalarFieldEnum = (typeof VocabExampleScalarFieldEnum)[keyof typeof VocabExampleScalarFieldEnum];
export declare const VocabNoteScalarFieldEnum: {
    readonly id: "id";
    readonly vocabId: "vocabId";
    readonly text: "text";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VocabNoteScalarFieldEnum = (typeof VocabNoteScalarFieldEnum)[keyof typeof VocabNoteScalarFieldEnum];
export declare const VocabReviewScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly vocabId: "vocabId";
    readonly outcome: "outcome";
    readonly createdAt: "createdAt";
};
export type VocabReviewScalarFieldEnum = (typeof VocabReviewScalarFieldEnum)[keyof typeof VocabReviewScalarFieldEnum];
export declare const VocabProgressScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly vocabId: "vocabId";
    readonly ease: "ease";
    readonly interval: "interval";
    readonly repetitions: "repetitions";
    readonly streak: "streak";
    readonly lastOutcome: "lastOutcome";
    readonly lastReviewedAt: "lastReviewedAt";
    readonly nextDueAt: "nextDueAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VocabProgressScalarFieldEnum = (typeof VocabProgressScalarFieldEnum)[keyof typeof VocabProgressScalarFieldEnum];
export declare const StudySessionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly listId: "listId";
    readonly exerciseType: "exerciseType";
    readonly scope: "scope";
    readonly limit: "limit";
    readonly direction: "direction";
    readonly vocabIds: "vocabIds";
    readonly currentIndex: "currentIndex";
    readonly createdAt: "createdAt";
    readonly finishedAt: "finishedAt";
    readonly enabledExerciseTypes: "enabledExerciseTypes";
};
export type StudySessionScalarFieldEnum = (typeof StudySessionScalarFieldEnum)[keyof typeof StudySessionScalarFieldEnum];
export declare const StudyExerciseScalarFieldEnum: {
    readonly id: "id";
    readonly sessionId: "sessionId";
    readonly userId: "userId";
    readonly vocabId: "vocabId";
    readonly type: "type";
    readonly payload: "payload";
    readonly createdAt: "createdAt";
};
export type StudyExerciseScalarFieldEnum = (typeof StudyExerciseScalarFieldEnum)[keyof typeof StudyExerciseScalarFieldEnum];
export declare const StudyAttemptScalarFieldEnum: {
    readonly id: "id";
    readonly exerciseId: "exerciseId";
    readonly userId: "userId";
    readonly response: "response";
    readonly outcome: "outcome";
    readonly aiScore: "aiScore";
    readonly aiFeedback: "aiFeedback";
    readonly aiVerdict: "aiVerdict";
    readonly aiModel: "aiModel";
    readonly aiLatencyMs: "aiLatencyMs";
    readonly createdAt: "createdAt";
};
export type StudyAttemptScalarFieldEnum = (typeof StudyAttemptScalarFieldEnum)[keyof typeof StudyAttemptScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: runtime.JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
/**
 * Field references
 */
/**
 * Reference to a field of type 'String'
 */
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
/**
 * Reference to a field of type 'String[]'
 */
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
/**
 * Reference to a field of type 'TargetLevel'
 */
export type EnumTargetLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TargetLevel'>;
/**
 * Reference to a field of type 'TargetLevel[]'
 */
export type ListEnumTargetLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TargetLevel[]'>;
/**
 * Reference to a field of type 'DateTime'
 */
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
/**
 * Reference to a field of type 'DateTime[]'
 */
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
/**
 * Reference to a field of type 'Boolean'
 */
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
/**
 * Reference to a field of type 'ReviewOutcome'
 */
export type EnumReviewOutcomeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewOutcome'>;
/**
 * Reference to a field of type 'ReviewOutcome[]'
 */
export type ListEnumReviewOutcomeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewOutcome[]'>;
/**
 * Reference to a field of type 'Float'
 */
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
/**
 * Reference to a field of type 'Float[]'
 */
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
/**
 * Reference to a field of type 'Int'
 */
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
/**
 * Reference to a field of type 'Int[]'
 */
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
/**
 * Reference to a field of type 'ExerciseType'
 */
export type EnumExerciseTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExerciseType'>;
/**
 * Reference to a field of type 'ExerciseType[]'
 */
export type ListEnumExerciseTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExerciseType[]'>;
/**
 * Reference to a field of type 'StudyScope'
 */
export type EnumStudyScopeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StudyScope'>;
/**
 * Reference to a field of type 'StudyScope[]'
 */
export type ListEnumStudyScopeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StudyScope[]'>;
/**
 * Reference to a field of type 'Json'
 */
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
/**
 * Reference to a field of type 'QueryMode'
 */
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
/**
 * Batch Payload for updateMany & deleteMany & createMany
 */
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-pg`.
     */
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl: string;
    adapter?: never;
}) & {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
    /**
     * Optional maximum size for the query plan cache. If not provided, a default size will be used.
     * A value of `0` can be used to disable the cache entirely. A higher cache size can improve
     * performance for applications that execute a large number of unique queries, while a smaller
     * cache size can reduce memory usage.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   queryPlanCacheMaxSize: 100,
     * })
     * ```
     */
    queryPlanCacheMaxSize?: number;
};
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    interest?: Prisma.InterestOmit;
    userInterest?: Prisma.UserInterestOmit;
    vocabList?: Prisma.VocabListOmit;
    vocab?: Prisma.VocabOmit;
    vocabExample?: Prisma.VocabExampleOmit;
    vocabNote?: Prisma.VocabNoteOmit;
    vocabReview?: Prisma.VocabReviewOmit;
    vocabProgress?: Prisma.VocabProgressOmit;
    studySession?: Prisma.StudySessionOmit;
    studyExercise?: Prisma.StudyExerciseOmit;
    studyAttempt?: Prisma.StudyAttemptOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
/**
 * `PrismaClient` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
//# sourceMappingURL=prismaNamespace.d.ts.map