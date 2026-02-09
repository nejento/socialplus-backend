
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Network
 * 
 */
export type Network = $Result.DefaultSelection<Prisma.$NetworkPayload>
/**
 * Model NetworkToken
 * 
 */
export type NetworkToken = $Result.DefaultSelection<Prisma.$NetworkTokenPayload>
/**
 * Model NetworksUsers
 * 
 */
export type NetworksUsers = $Result.DefaultSelection<Prisma.$NetworksUsersPayload>
/**
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>
/**
 * Model PostEditor
 * 
 */
export type PostEditor = $Result.DefaultSelection<Prisma.$PostEditorPayload>
/**
 * Model Attachment
 * 
 */
export type Attachment = $Result.DefaultSelection<Prisma.$AttachmentPayload>
/**
 * Model Content
 * 
 */
export type Content = $Result.DefaultSelection<Prisma.$ContentPayload>
/**
 * Model PostedContent
 * 
 */
export type PostedContent = $Result.DefaultSelection<Prisma.$PostedContentPayload>
/**
 * Model PostedContentAttachment
 * 
 */
export type PostedContentAttachment = $Result.DefaultSelection<Prisma.$PostedContentAttachmentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.network`: Exposes CRUD operations for the **Network** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Networks
    * const networks = await prisma.network.findMany()
    * ```
    */
  get network(): Prisma.NetworkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.networkToken`: Exposes CRUD operations for the **NetworkToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NetworkTokens
    * const networkTokens = await prisma.networkToken.findMany()
    * ```
    */
  get networkToken(): Prisma.NetworkTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.networksUsers`: Exposes CRUD operations for the **NetworksUsers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NetworksUsers
    * const networksUsers = await prisma.networksUsers.findMany()
    * ```
    */
  get networksUsers(): Prisma.NetworksUsersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postEditor`: Exposes CRUD operations for the **PostEditor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostEditors
    * const postEditors = await prisma.postEditor.findMany()
    * ```
    */
  get postEditor(): Prisma.PostEditorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attachment`: Exposes CRUD operations for the **Attachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attachments
    * const attachments = await prisma.attachment.findMany()
    * ```
    */
  get attachment(): Prisma.AttachmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.content`: Exposes CRUD operations for the **Content** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contents
    * const contents = await prisma.content.findMany()
    * ```
    */
  get content(): Prisma.ContentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postedContent`: Exposes CRUD operations for the **PostedContent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostedContents
    * const postedContents = await prisma.postedContent.findMany()
    * ```
    */
  get postedContent(): Prisma.PostedContentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postedContentAttachment`: Exposes CRUD operations for the **PostedContentAttachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostedContentAttachments
    * const postedContentAttachments = await prisma.postedContentAttachment.findMany()
    * ```
    */
  get postedContentAttachment(): Prisma.PostedContentAttachmentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

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
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
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

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Network: 'Network',
    NetworkToken: 'NetworkToken',
    NetworksUsers: 'NetworksUsers',
    Post: 'Post',
    PostEditor: 'PostEditor',
    Attachment: 'Attachment',
    Content: 'Content',
    PostedContent: 'PostedContent',
    PostedContentAttachment: 'PostedContentAttachment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "network" | "networkToken" | "networksUsers" | "post" | "postEditor" | "attachment" | "content" | "postedContent" | "postedContentAttachment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Network: {
        payload: Prisma.$NetworkPayload<ExtArgs>
        fields: Prisma.NetworkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NetworkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NetworkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworkPayload>
          }
          findFirst: {
            args: Prisma.NetworkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NetworkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworkPayload>
          }
          findMany: {
            args: Prisma.NetworkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworkPayload>[]
          }
          create: {
            args: Prisma.NetworkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworkPayload>
          }
          createMany: {
            args: Prisma.NetworkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.NetworkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworkPayload>
          }
          update: {
            args: Prisma.NetworkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworkPayload>
          }
          deleteMany: {
            args: Prisma.NetworkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NetworkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NetworkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworkPayload>
          }
          aggregate: {
            args: Prisma.NetworkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNetwork>
          }
          groupBy: {
            args: Prisma.NetworkGroupByArgs<ExtArgs>
            result: $Utils.Optional<NetworkGroupByOutputType>[]
          }
          count: {
            args: Prisma.NetworkCountArgs<ExtArgs>
            result: $Utils.Optional<NetworkCountAggregateOutputType> | number
          }
        }
      }
      NetworkToken: {
        payload: Prisma.$NetworkTokenPayload<ExtArgs>
        fields: Prisma.NetworkTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NetworkTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworkTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NetworkTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworkTokenPayload>
          }
          findFirst: {
            args: Prisma.NetworkTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworkTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NetworkTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworkTokenPayload>
          }
          findMany: {
            args: Prisma.NetworkTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworkTokenPayload>[]
          }
          create: {
            args: Prisma.NetworkTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworkTokenPayload>
          }
          createMany: {
            args: Prisma.NetworkTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.NetworkTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworkTokenPayload>
          }
          update: {
            args: Prisma.NetworkTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworkTokenPayload>
          }
          deleteMany: {
            args: Prisma.NetworkTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NetworkTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NetworkTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworkTokenPayload>
          }
          aggregate: {
            args: Prisma.NetworkTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNetworkToken>
          }
          groupBy: {
            args: Prisma.NetworkTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<NetworkTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.NetworkTokenCountArgs<ExtArgs>
            result: $Utils.Optional<NetworkTokenCountAggregateOutputType> | number
          }
        }
      }
      NetworksUsers: {
        payload: Prisma.$NetworksUsersPayload<ExtArgs>
        fields: Prisma.NetworksUsersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NetworksUsersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworksUsersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NetworksUsersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworksUsersPayload>
          }
          findFirst: {
            args: Prisma.NetworksUsersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworksUsersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NetworksUsersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworksUsersPayload>
          }
          findMany: {
            args: Prisma.NetworksUsersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworksUsersPayload>[]
          }
          create: {
            args: Prisma.NetworksUsersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworksUsersPayload>
          }
          createMany: {
            args: Prisma.NetworksUsersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.NetworksUsersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworksUsersPayload>
          }
          update: {
            args: Prisma.NetworksUsersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworksUsersPayload>
          }
          deleteMany: {
            args: Prisma.NetworksUsersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NetworksUsersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NetworksUsersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NetworksUsersPayload>
          }
          aggregate: {
            args: Prisma.NetworksUsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNetworksUsers>
          }
          groupBy: {
            args: Prisma.NetworksUsersGroupByArgs<ExtArgs>
            result: $Utils.Optional<NetworksUsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.NetworksUsersCountArgs<ExtArgs>
            result: $Utils.Optional<NetworksUsersCountAggregateOutputType> | number
          }
        }
      }
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      PostEditor: {
        payload: Prisma.$PostEditorPayload<ExtArgs>
        fields: Prisma.PostEditorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostEditorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostEditorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostEditorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostEditorPayload>
          }
          findFirst: {
            args: Prisma.PostEditorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostEditorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostEditorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostEditorPayload>
          }
          findMany: {
            args: Prisma.PostEditorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostEditorPayload>[]
          }
          create: {
            args: Prisma.PostEditorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostEditorPayload>
          }
          createMany: {
            args: Prisma.PostEditorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PostEditorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostEditorPayload>
          }
          update: {
            args: Prisma.PostEditorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostEditorPayload>
          }
          deleteMany: {
            args: Prisma.PostEditorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostEditorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PostEditorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostEditorPayload>
          }
          aggregate: {
            args: Prisma.PostEditorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostEditor>
          }
          groupBy: {
            args: Prisma.PostEditorGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostEditorGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostEditorCountArgs<ExtArgs>
            result: $Utils.Optional<PostEditorCountAggregateOutputType> | number
          }
        }
      }
      Attachment: {
        payload: Prisma.$AttachmentPayload<ExtArgs>
        fields: Prisma.AttachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          findFirst: {
            args: Prisma.AttachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          findMany: {
            args: Prisma.AttachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>[]
          }
          create: {
            args: Prisma.AttachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          createMany: {
            args: Prisma.AttachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AttachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          update: {
            args: Prisma.AttachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          deleteMany: {
            args: Prisma.AttachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AttachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentPayload>
          }
          aggregate: {
            args: Prisma.AttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttachment>
          }
          groupBy: {
            args: Prisma.AttachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttachmentCountArgs<ExtArgs>
            result: $Utils.Optional<AttachmentCountAggregateOutputType> | number
          }
        }
      }
      Content: {
        payload: Prisma.$ContentPayload<ExtArgs>
        fields: Prisma.ContentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          findFirst: {
            args: Prisma.ContentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          findMany: {
            args: Prisma.ContentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>[]
          }
          create: {
            args: Prisma.ContentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          createMany: {
            args: Prisma.ContentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ContentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          update: {
            args: Prisma.ContentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          deleteMany: {
            args: Prisma.ContentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContentPayload>
          }
          aggregate: {
            args: Prisma.ContentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContent>
          }
          groupBy: {
            args: Prisma.ContentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContentCountArgs<ExtArgs>
            result: $Utils.Optional<ContentCountAggregateOutputType> | number
          }
        }
      }
      PostedContent: {
        payload: Prisma.$PostedContentPayload<ExtArgs>
        fields: Prisma.PostedContentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostedContentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostedContentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostedContentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostedContentPayload>
          }
          findFirst: {
            args: Prisma.PostedContentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostedContentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostedContentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostedContentPayload>
          }
          findMany: {
            args: Prisma.PostedContentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostedContentPayload>[]
          }
          create: {
            args: Prisma.PostedContentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostedContentPayload>
          }
          createMany: {
            args: Prisma.PostedContentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PostedContentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostedContentPayload>
          }
          update: {
            args: Prisma.PostedContentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostedContentPayload>
          }
          deleteMany: {
            args: Prisma.PostedContentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostedContentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PostedContentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostedContentPayload>
          }
          aggregate: {
            args: Prisma.PostedContentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostedContent>
          }
          groupBy: {
            args: Prisma.PostedContentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostedContentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostedContentCountArgs<ExtArgs>
            result: $Utils.Optional<PostedContentCountAggregateOutputType> | number
          }
        }
      }
      PostedContentAttachment: {
        payload: Prisma.$PostedContentAttachmentPayload<ExtArgs>
        fields: Prisma.PostedContentAttachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostedContentAttachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostedContentAttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostedContentAttachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostedContentAttachmentPayload>
          }
          findFirst: {
            args: Prisma.PostedContentAttachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostedContentAttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostedContentAttachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostedContentAttachmentPayload>
          }
          findMany: {
            args: Prisma.PostedContentAttachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostedContentAttachmentPayload>[]
          }
          create: {
            args: Prisma.PostedContentAttachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostedContentAttachmentPayload>
          }
          createMany: {
            args: Prisma.PostedContentAttachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PostedContentAttachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostedContentAttachmentPayload>
          }
          update: {
            args: Prisma.PostedContentAttachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostedContentAttachmentPayload>
          }
          deleteMany: {
            args: Prisma.PostedContentAttachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostedContentAttachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PostedContentAttachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostedContentAttachmentPayload>
          }
          aggregate: {
            args: Prisma.PostedContentAttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostedContentAttachment>
          }
          groupBy: {
            args: Prisma.PostedContentAttachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostedContentAttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostedContentAttachmentCountArgs<ExtArgs>
            result: $Utils.Optional<PostedContentAttachmentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
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
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    network?: NetworkOmit
    networkToken?: NetworkTokenOmit
    networksUsers?: NetworksUsersOmit
    post?: PostOmit
    postEditor?: PostEditorOmit
    attachment?: AttachmentOmit
    content?: ContentOmit
    postedContent?: PostedContentOmit
    postedContentAttachment?: PostedContentAttachmentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    networks: number
    posts: number
    users_has_networks: number
    PostEditor: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    networks?: boolean | UserCountOutputTypeCountNetworksArgs
    posts?: boolean | UserCountOutputTypeCountPostsArgs
    users_has_networks?: boolean | UserCountOutputTypeCountUsers_has_networksArgs
    PostEditor?: boolean | UserCountOutputTypeCountPostEditorArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNetworksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NetworkWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUsers_has_networksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NetworksUsersWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPostEditorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostEditorWhereInput
  }


  /**
   * Count Type NetworkCountOutputType
   */

  export type NetworkCountOutputType = {
    network_tokens: number
    posted_content: number
    users_has_networks: number
  }

  export type NetworkCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    network_tokens?: boolean | NetworkCountOutputTypeCountNetwork_tokensArgs
    posted_content?: boolean | NetworkCountOutputTypeCountPosted_contentArgs
    users_has_networks?: boolean | NetworkCountOutputTypeCountUsers_has_networksArgs
  }

  // Custom InputTypes
  /**
   * NetworkCountOutputType without action
   */
  export type NetworkCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworkCountOutputType
     */
    select?: NetworkCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NetworkCountOutputType without action
   */
  export type NetworkCountOutputTypeCountNetwork_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NetworkTokenWhereInput
  }

  /**
   * NetworkCountOutputType without action
   */
  export type NetworkCountOutputTypeCountPosted_contentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostedContentWhereInput
  }

  /**
   * NetworkCountOutputType without action
   */
  export type NetworkCountOutputTypeCountUsers_has_networksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NetworksUsersWhereInput
  }


  /**
   * Count Type PostCountOutputType
   */

  export type PostCountOutputType = {
    attachments: number
    contents: number
    posted_content: number
    PostEditor: number
  }

  export type PostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attachments?: boolean | PostCountOutputTypeCountAttachmentsArgs
    contents?: boolean | PostCountOutputTypeCountContentsArgs
    posted_content?: boolean | PostCountOutputTypeCountPosted_contentArgs
    PostEditor?: boolean | PostCountOutputTypeCountPostEditorArgs
  }

  // Custom InputTypes
  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCountOutputType
     */
    select?: PostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttachmentWhereInput
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountContentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContentWhereInput
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountPosted_contentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostedContentWhereInput
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountPostEditorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostEditorWhereInput
  }


  /**
   * Count Type AttachmentCountOutputType
   */

  export type AttachmentCountOutputType = {
    posted_content_has_attachments: number
  }

  export type AttachmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posted_content_has_attachments?: boolean | AttachmentCountOutputTypeCountPosted_content_has_attachmentsArgs
  }

  // Custom InputTypes
  /**
   * AttachmentCountOutputType without action
   */
  export type AttachmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttachmentCountOutputType
     */
    select?: AttachmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AttachmentCountOutputType without action
   */
  export type AttachmentCountOutputTypeCountPosted_content_has_attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostedContentAttachmentWhereInput
  }


  /**
   * Count Type ContentCountOutputType
   */

  export type ContentCountOutputType = {
    posted_content: number
  }

  export type ContentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posted_content?: boolean | ContentCountOutputTypeCountPosted_contentArgs
  }

  // Custom InputTypes
  /**
   * ContentCountOutputType without action
   */
  export type ContentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContentCountOutputType
     */
    select?: ContentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContentCountOutputType without action
   */
  export type ContentCountOutputTypeCountPosted_contentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostedContentWhereInput
  }


  /**
   * Count Type PostedContentCountOutputType
   */

  export type PostedContentCountOutputType = {
    posted_content_has_attachments: number
  }

  export type PostedContentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posted_content_has_attachments?: boolean | PostedContentCountOutputTypeCountPosted_content_has_attachmentsArgs
  }

  // Custom InputTypes
  /**
   * PostedContentCountOutputType without action
   */
  export type PostedContentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContentCountOutputType
     */
    select?: PostedContentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostedContentCountOutputType without action
   */
  export type PostedContentCountOutputTypeCountPosted_content_has_attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostedContentAttachmentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    displayname: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    displayname: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    displayname: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    displayname?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    displayname?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    displayname?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    username: string
    password: string
    displayname: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    displayname?: boolean
    networks?: boolean | User$networksArgs<ExtArgs>
    posts?: boolean | User$postsArgs<ExtArgs>
    users_has_networks?: boolean | User$users_has_networksArgs<ExtArgs>
    PostEditor?: boolean | User$PostEditorArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    displayname?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "displayname", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    networks?: boolean | User$networksArgs<ExtArgs>
    posts?: boolean | User$postsArgs<ExtArgs>
    users_has_networks?: boolean | User$users_has_networksArgs<ExtArgs>
    PostEditor?: boolean | User$PostEditorArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      networks: Prisma.$NetworkPayload<ExtArgs>[]
      posts: Prisma.$PostPayload<ExtArgs>[]
      users_has_networks: Prisma.$NetworksUsersPayload<ExtArgs>[]
      PostEditor: Prisma.$PostEditorPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      /**
       * ID uživatele
       */
      id: number
      /**
       * Přihlašovací uživatelské jméno
       */
      username: string
      /**
       * Přihlašovací heslo
       */
      password: string
      /**
       * Zobrazované jméno
       */
      displayname: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    networks<T extends User$networksArgs<ExtArgs> = {}>(args?: Subset<T, User$networksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NetworkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    posts<T extends User$postsArgs<ExtArgs> = {}>(args?: Subset<T, User$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users_has_networks<T extends User$users_has_networksArgs<ExtArgs> = {}>(args?: Subset<T, User$users_has_networksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NetworksUsersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    PostEditor<T extends User$PostEditorArgs<ExtArgs> = {}>(args?: Subset<T, User$PostEditorArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostEditorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly displayname: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.networks
   */
  export type User$networksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Network
     */
    select?: NetworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Network
     */
    omit?: NetworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkInclude<ExtArgs> | null
    where?: NetworkWhereInput
    orderBy?: NetworkOrderByWithRelationInput | NetworkOrderByWithRelationInput[]
    cursor?: NetworkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NetworkScalarFieldEnum | NetworkScalarFieldEnum[]
  }

  /**
   * User.posts
   */
  export type User$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * User.users_has_networks
   */
  export type User$users_has_networksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworksUsers
     */
    select?: NetworksUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworksUsers
     */
    omit?: NetworksUsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworksUsersInclude<ExtArgs> | null
    where?: NetworksUsersWhereInput
    orderBy?: NetworksUsersOrderByWithRelationInput | NetworksUsersOrderByWithRelationInput[]
    cursor?: NetworksUsersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NetworksUsersScalarFieldEnum | NetworksUsersScalarFieldEnum[]
  }

  /**
   * User.PostEditor
   */
  export type User$PostEditorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostEditor
     */
    select?: PostEditorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostEditor
     */
    omit?: PostEditorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostEditorInclude<ExtArgs> | null
    where?: PostEditorWhereInput
    orderBy?: PostEditorOrderByWithRelationInput | PostEditorOrderByWithRelationInput[]
    cursor?: PostEditorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostEditorScalarFieldEnum | PostEditorScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Network
   */

  export type AggregateNetwork = {
    _count: NetworkCountAggregateOutputType | null
    _avg: NetworkAvgAggregateOutputType | null
    _sum: NetworkSumAggregateOutputType | null
    _min: NetworkMinAggregateOutputType | null
    _max: NetworkMaxAggregateOutputType | null
  }

  export type NetworkAvgAggregateOutputType = {
    id: number | null
    owner_id: number | null
  }

  export type NetworkSumAggregateOutputType = {
    id: number | null
    owner_id: number | null
  }

  export type NetworkMinAggregateOutputType = {
    id: number | null
    owner_id: number | null
    network_type: string | null
    network_name: string | null
    note: string | null
  }

  export type NetworkMaxAggregateOutputType = {
    id: number | null
    owner_id: number | null
    network_type: string | null
    network_name: string | null
    note: string | null
  }

  export type NetworkCountAggregateOutputType = {
    id: number
    owner_id: number
    network_type: number
    network_name: number
    note: number
    _all: number
  }


  export type NetworkAvgAggregateInputType = {
    id?: true
    owner_id?: true
  }

  export type NetworkSumAggregateInputType = {
    id?: true
    owner_id?: true
  }

  export type NetworkMinAggregateInputType = {
    id?: true
    owner_id?: true
    network_type?: true
    network_name?: true
    note?: true
  }

  export type NetworkMaxAggregateInputType = {
    id?: true
    owner_id?: true
    network_type?: true
    network_name?: true
    note?: true
  }

  export type NetworkCountAggregateInputType = {
    id?: true
    owner_id?: true
    network_type?: true
    network_name?: true
    note?: true
    _all?: true
  }

  export type NetworkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Network to aggregate.
     */
    where?: NetworkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Networks to fetch.
     */
    orderBy?: NetworkOrderByWithRelationInput | NetworkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NetworkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Networks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Networks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Networks
    **/
    _count?: true | NetworkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NetworkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NetworkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NetworkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NetworkMaxAggregateInputType
  }

  export type GetNetworkAggregateType<T extends NetworkAggregateArgs> = {
        [P in keyof T & keyof AggregateNetwork]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNetwork[P]>
      : GetScalarType<T[P], AggregateNetwork[P]>
  }




  export type NetworkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NetworkWhereInput
    orderBy?: NetworkOrderByWithAggregationInput | NetworkOrderByWithAggregationInput[]
    by: NetworkScalarFieldEnum[] | NetworkScalarFieldEnum
    having?: NetworkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NetworkCountAggregateInputType | true
    _avg?: NetworkAvgAggregateInputType
    _sum?: NetworkSumAggregateInputType
    _min?: NetworkMinAggregateInputType
    _max?: NetworkMaxAggregateInputType
  }

  export type NetworkGroupByOutputType = {
    id: number
    owner_id: number
    network_type: string
    network_name: string
    note: string | null
    _count: NetworkCountAggregateOutputType | null
    _avg: NetworkAvgAggregateOutputType | null
    _sum: NetworkSumAggregateOutputType | null
    _min: NetworkMinAggregateOutputType | null
    _max: NetworkMaxAggregateOutputType | null
  }

  type GetNetworkGroupByPayload<T extends NetworkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NetworkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NetworkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NetworkGroupByOutputType[P]>
            : GetScalarType<T[P], NetworkGroupByOutputType[P]>
        }
      >
    >


  export type NetworkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    owner_id?: boolean
    network_type?: boolean
    network_name?: boolean
    note?: boolean
    network_tokens?: boolean | Network$network_tokensArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
    posted_content?: boolean | Network$posted_contentArgs<ExtArgs>
    users_has_networks?: boolean | Network$users_has_networksArgs<ExtArgs>
    _count?: boolean | NetworkCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["network"]>



  export type NetworkSelectScalar = {
    id?: boolean
    owner_id?: boolean
    network_type?: boolean
    network_name?: boolean
    note?: boolean
  }

  export type NetworkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "owner_id" | "network_type" | "network_name" | "note", ExtArgs["result"]["network"]>
  export type NetworkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    network_tokens?: boolean | Network$network_tokensArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
    posted_content?: boolean | Network$posted_contentArgs<ExtArgs>
    users_has_networks?: boolean | Network$users_has_networksArgs<ExtArgs>
    _count?: boolean | NetworkCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $NetworkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Network"
    objects: {
      network_tokens: Prisma.$NetworkTokenPayload<ExtArgs>[]
      users: Prisma.$UserPayload<ExtArgs>
      posted_content: Prisma.$PostedContentPayload<ExtArgs>[]
      users_has_networks: Prisma.$NetworksUsersPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      /**
       * ID sociální sítě
       */
      id: number
      /**
       * Majitel sociální sítě
       */
      owner_id: number
      /**
       * Typ sociální sítě (např. "facebook", "twitter", "instagram")
       */
      network_type: string
      /**
       * Název sociální sítě
       */
      network_name: string
      /**
       * Poznámka k sociální síti
       */
      note: string | null
    }, ExtArgs["result"]["network"]>
    composites: {}
  }

  type NetworkGetPayload<S extends boolean | null | undefined | NetworkDefaultArgs> = $Result.GetResult<Prisma.$NetworkPayload, S>

  type NetworkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NetworkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NetworkCountAggregateInputType | true
    }

  export interface NetworkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Network'], meta: { name: 'Network' } }
    /**
     * Find zero or one Network that matches the filter.
     * @param {NetworkFindUniqueArgs} args - Arguments to find a Network
     * @example
     * // Get one Network
     * const network = await prisma.network.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NetworkFindUniqueArgs>(args: SelectSubset<T, NetworkFindUniqueArgs<ExtArgs>>): Prisma__NetworkClient<$Result.GetResult<Prisma.$NetworkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Network that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NetworkFindUniqueOrThrowArgs} args - Arguments to find a Network
     * @example
     * // Get one Network
     * const network = await prisma.network.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NetworkFindUniqueOrThrowArgs>(args: SelectSubset<T, NetworkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NetworkClient<$Result.GetResult<Prisma.$NetworkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Network that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkFindFirstArgs} args - Arguments to find a Network
     * @example
     * // Get one Network
     * const network = await prisma.network.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NetworkFindFirstArgs>(args?: SelectSubset<T, NetworkFindFirstArgs<ExtArgs>>): Prisma__NetworkClient<$Result.GetResult<Prisma.$NetworkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Network that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkFindFirstOrThrowArgs} args - Arguments to find a Network
     * @example
     * // Get one Network
     * const network = await prisma.network.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NetworkFindFirstOrThrowArgs>(args?: SelectSubset<T, NetworkFindFirstOrThrowArgs<ExtArgs>>): Prisma__NetworkClient<$Result.GetResult<Prisma.$NetworkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Networks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Networks
     * const networks = await prisma.network.findMany()
     * 
     * // Get first 10 Networks
     * const networks = await prisma.network.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const networkWithIdOnly = await prisma.network.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NetworkFindManyArgs>(args?: SelectSubset<T, NetworkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NetworkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Network.
     * @param {NetworkCreateArgs} args - Arguments to create a Network.
     * @example
     * // Create one Network
     * const Network = await prisma.network.create({
     *   data: {
     *     // ... data to create a Network
     *   }
     * })
     * 
     */
    create<T extends NetworkCreateArgs>(args: SelectSubset<T, NetworkCreateArgs<ExtArgs>>): Prisma__NetworkClient<$Result.GetResult<Prisma.$NetworkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Networks.
     * @param {NetworkCreateManyArgs} args - Arguments to create many Networks.
     * @example
     * // Create many Networks
     * const network = await prisma.network.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NetworkCreateManyArgs>(args?: SelectSubset<T, NetworkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Network.
     * @param {NetworkDeleteArgs} args - Arguments to delete one Network.
     * @example
     * // Delete one Network
     * const Network = await prisma.network.delete({
     *   where: {
     *     // ... filter to delete one Network
     *   }
     * })
     * 
     */
    delete<T extends NetworkDeleteArgs>(args: SelectSubset<T, NetworkDeleteArgs<ExtArgs>>): Prisma__NetworkClient<$Result.GetResult<Prisma.$NetworkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Network.
     * @param {NetworkUpdateArgs} args - Arguments to update one Network.
     * @example
     * // Update one Network
     * const network = await prisma.network.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NetworkUpdateArgs>(args: SelectSubset<T, NetworkUpdateArgs<ExtArgs>>): Prisma__NetworkClient<$Result.GetResult<Prisma.$NetworkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Networks.
     * @param {NetworkDeleteManyArgs} args - Arguments to filter Networks to delete.
     * @example
     * // Delete a few Networks
     * const { count } = await prisma.network.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NetworkDeleteManyArgs>(args?: SelectSubset<T, NetworkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Networks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Networks
     * const network = await prisma.network.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NetworkUpdateManyArgs>(args: SelectSubset<T, NetworkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Network.
     * @param {NetworkUpsertArgs} args - Arguments to update or create a Network.
     * @example
     * // Update or create a Network
     * const network = await prisma.network.upsert({
     *   create: {
     *     // ... data to create a Network
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Network we want to update
     *   }
     * })
     */
    upsert<T extends NetworkUpsertArgs>(args: SelectSubset<T, NetworkUpsertArgs<ExtArgs>>): Prisma__NetworkClient<$Result.GetResult<Prisma.$NetworkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Networks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkCountArgs} args - Arguments to filter Networks to count.
     * @example
     * // Count the number of Networks
     * const count = await prisma.network.count({
     *   where: {
     *     // ... the filter for the Networks we want to count
     *   }
     * })
    **/
    count<T extends NetworkCountArgs>(
      args?: Subset<T, NetworkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NetworkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Network.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NetworkAggregateArgs>(args: Subset<T, NetworkAggregateArgs>): Prisma.PrismaPromise<GetNetworkAggregateType<T>>

    /**
     * Group by Network.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NetworkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NetworkGroupByArgs['orderBy'] }
        : { orderBy?: NetworkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NetworkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNetworkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Network model
   */
  readonly fields: NetworkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Network.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NetworkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    network_tokens<T extends Network$network_tokensArgs<ExtArgs> = {}>(args?: Subset<T, Network$network_tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NetworkTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    posted_content<T extends Network$posted_contentArgs<ExtArgs> = {}>(args?: Subset<T, Network$posted_contentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostedContentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users_has_networks<T extends Network$users_has_networksArgs<ExtArgs> = {}>(args?: Subset<T, Network$users_has_networksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NetworksUsersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Network model
   */
  interface NetworkFieldRefs {
    readonly id: FieldRef<"Network", 'Int'>
    readonly owner_id: FieldRef<"Network", 'Int'>
    readonly network_type: FieldRef<"Network", 'String'>
    readonly network_name: FieldRef<"Network", 'String'>
    readonly note: FieldRef<"Network", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Network findUnique
   */
  export type NetworkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Network
     */
    select?: NetworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Network
     */
    omit?: NetworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkInclude<ExtArgs> | null
    /**
     * Filter, which Network to fetch.
     */
    where: NetworkWhereUniqueInput
  }

  /**
   * Network findUniqueOrThrow
   */
  export type NetworkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Network
     */
    select?: NetworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Network
     */
    omit?: NetworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkInclude<ExtArgs> | null
    /**
     * Filter, which Network to fetch.
     */
    where: NetworkWhereUniqueInput
  }

  /**
   * Network findFirst
   */
  export type NetworkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Network
     */
    select?: NetworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Network
     */
    omit?: NetworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkInclude<ExtArgs> | null
    /**
     * Filter, which Network to fetch.
     */
    where?: NetworkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Networks to fetch.
     */
    orderBy?: NetworkOrderByWithRelationInput | NetworkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Networks.
     */
    cursor?: NetworkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Networks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Networks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Networks.
     */
    distinct?: NetworkScalarFieldEnum | NetworkScalarFieldEnum[]
  }

  /**
   * Network findFirstOrThrow
   */
  export type NetworkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Network
     */
    select?: NetworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Network
     */
    omit?: NetworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkInclude<ExtArgs> | null
    /**
     * Filter, which Network to fetch.
     */
    where?: NetworkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Networks to fetch.
     */
    orderBy?: NetworkOrderByWithRelationInput | NetworkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Networks.
     */
    cursor?: NetworkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Networks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Networks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Networks.
     */
    distinct?: NetworkScalarFieldEnum | NetworkScalarFieldEnum[]
  }

  /**
   * Network findMany
   */
  export type NetworkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Network
     */
    select?: NetworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Network
     */
    omit?: NetworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkInclude<ExtArgs> | null
    /**
     * Filter, which Networks to fetch.
     */
    where?: NetworkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Networks to fetch.
     */
    orderBy?: NetworkOrderByWithRelationInput | NetworkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Networks.
     */
    cursor?: NetworkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Networks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Networks.
     */
    skip?: number
    distinct?: NetworkScalarFieldEnum | NetworkScalarFieldEnum[]
  }

  /**
   * Network create
   */
  export type NetworkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Network
     */
    select?: NetworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Network
     */
    omit?: NetworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkInclude<ExtArgs> | null
    /**
     * The data needed to create a Network.
     */
    data: XOR<NetworkCreateInput, NetworkUncheckedCreateInput>
  }

  /**
   * Network createMany
   */
  export type NetworkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Networks.
     */
    data: NetworkCreateManyInput | NetworkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Network update
   */
  export type NetworkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Network
     */
    select?: NetworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Network
     */
    omit?: NetworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkInclude<ExtArgs> | null
    /**
     * The data needed to update a Network.
     */
    data: XOR<NetworkUpdateInput, NetworkUncheckedUpdateInput>
    /**
     * Choose, which Network to update.
     */
    where: NetworkWhereUniqueInput
  }

  /**
   * Network updateMany
   */
  export type NetworkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Networks.
     */
    data: XOR<NetworkUpdateManyMutationInput, NetworkUncheckedUpdateManyInput>
    /**
     * Filter which Networks to update
     */
    where?: NetworkWhereInput
    /**
     * Limit how many Networks to update.
     */
    limit?: number
  }

  /**
   * Network upsert
   */
  export type NetworkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Network
     */
    select?: NetworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Network
     */
    omit?: NetworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkInclude<ExtArgs> | null
    /**
     * The filter to search for the Network to update in case it exists.
     */
    where: NetworkWhereUniqueInput
    /**
     * In case the Network found by the `where` argument doesn't exist, create a new Network with this data.
     */
    create: XOR<NetworkCreateInput, NetworkUncheckedCreateInput>
    /**
     * In case the Network was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NetworkUpdateInput, NetworkUncheckedUpdateInput>
  }

  /**
   * Network delete
   */
  export type NetworkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Network
     */
    select?: NetworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Network
     */
    omit?: NetworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkInclude<ExtArgs> | null
    /**
     * Filter which Network to delete.
     */
    where: NetworkWhereUniqueInput
  }

  /**
   * Network deleteMany
   */
  export type NetworkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Networks to delete
     */
    where?: NetworkWhereInput
    /**
     * Limit how many Networks to delete.
     */
    limit?: number
  }

  /**
   * Network.network_tokens
   */
  export type Network$network_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworkToken
     */
    select?: NetworkTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworkToken
     */
    omit?: NetworkTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkTokenInclude<ExtArgs> | null
    where?: NetworkTokenWhereInput
    orderBy?: NetworkTokenOrderByWithRelationInput | NetworkTokenOrderByWithRelationInput[]
    cursor?: NetworkTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NetworkTokenScalarFieldEnum | NetworkTokenScalarFieldEnum[]
  }

  /**
   * Network.posted_content
   */
  export type Network$posted_contentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContent
     */
    select?: PostedContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContent
     */
    omit?: PostedContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentInclude<ExtArgs> | null
    where?: PostedContentWhereInput
    orderBy?: PostedContentOrderByWithRelationInput | PostedContentOrderByWithRelationInput[]
    cursor?: PostedContentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostedContentScalarFieldEnum | PostedContentScalarFieldEnum[]
  }

  /**
   * Network.users_has_networks
   */
  export type Network$users_has_networksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworksUsers
     */
    select?: NetworksUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworksUsers
     */
    omit?: NetworksUsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworksUsersInclude<ExtArgs> | null
    where?: NetworksUsersWhereInput
    orderBy?: NetworksUsersOrderByWithRelationInput | NetworksUsersOrderByWithRelationInput[]
    cursor?: NetworksUsersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NetworksUsersScalarFieldEnum | NetworksUsersScalarFieldEnum[]
  }

  /**
   * Network without action
   */
  export type NetworkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Network
     */
    select?: NetworkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Network
     */
    omit?: NetworkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkInclude<ExtArgs> | null
  }


  /**
   * Model NetworkToken
   */

  export type AggregateNetworkToken = {
    _count: NetworkTokenCountAggregateOutputType | null
    _avg: NetworkTokenAvgAggregateOutputType | null
    _sum: NetworkTokenSumAggregateOutputType | null
    _min: NetworkTokenMinAggregateOutputType | null
    _max: NetworkTokenMaxAggregateOutputType | null
  }

  export type NetworkTokenAvgAggregateOutputType = {
    network_id: number | null
  }

  export type NetworkTokenSumAggregateOutputType = {
    network_id: number | null
  }

  export type NetworkTokenMinAggregateOutputType = {
    network_id: number | null
    token_name: string | null
    token: string | null
  }

  export type NetworkTokenMaxAggregateOutputType = {
    network_id: number | null
    token_name: string | null
    token: string | null
  }

  export type NetworkTokenCountAggregateOutputType = {
    network_id: number
    token_name: number
    token: number
    _all: number
  }


  export type NetworkTokenAvgAggregateInputType = {
    network_id?: true
  }

  export type NetworkTokenSumAggregateInputType = {
    network_id?: true
  }

  export type NetworkTokenMinAggregateInputType = {
    network_id?: true
    token_name?: true
    token?: true
  }

  export type NetworkTokenMaxAggregateInputType = {
    network_id?: true
    token_name?: true
    token?: true
  }

  export type NetworkTokenCountAggregateInputType = {
    network_id?: true
    token_name?: true
    token?: true
    _all?: true
  }

  export type NetworkTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NetworkToken to aggregate.
     */
    where?: NetworkTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NetworkTokens to fetch.
     */
    orderBy?: NetworkTokenOrderByWithRelationInput | NetworkTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NetworkTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NetworkTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NetworkTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NetworkTokens
    **/
    _count?: true | NetworkTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NetworkTokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NetworkTokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NetworkTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NetworkTokenMaxAggregateInputType
  }

  export type GetNetworkTokenAggregateType<T extends NetworkTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateNetworkToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNetworkToken[P]>
      : GetScalarType<T[P], AggregateNetworkToken[P]>
  }




  export type NetworkTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NetworkTokenWhereInput
    orderBy?: NetworkTokenOrderByWithAggregationInput | NetworkTokenOrderByWithAggregationInput[]
    by: NetworkTokenScalarFieldEnum[] | NetworkTokenScalarFieldEnum
    having?: NetworkTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NetworkTokenCountAggregateInputType | true
    _avg?: NetworkTokenAvgAggregateInputType
    _sum?: NetworkTokenSumAggregateInputType
    _min?: NetworkTokenMinAggregateInputType
    _max?: NetworkTokenMaxAggregateInputType
  }

  export type NetworkTokenGroupByOutputType = {
    network_id: number
    token_name: string
    token: string
    _count: NetworkTokenCountAggregateOutputType | null
    _avg: NetworkTokenAvgAggregateOutputType | null
    _sum: NetworkTokenSumAggregateOutputType | null
    _min: NetworkTokenMinAggregateOutputType | null
    _max: NetworkTokenMaxAggregateOutputType | null
  }

  type GetNetworkTokenGroupByPayload<T extends NetworkTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NetworkTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NetworkTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NetworkTokenGroupByOutputType[P]>
            : GetScalarType<T[P], NetworkTokenGroupByOutputType[P]>
        }
      >
    >


  export type NetworkTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    network_id?: boolean
    token_name?: boolean
    token?: boolean
    networks?: boolean | NetworkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["networkToken"]>



  export type NetworkTokenSelectScalar = {
    network_id?: boolean
    token_name?: boolean
    token?: boolean
  }

  export type NetworkTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"network_id" | "token_name" | "token", ExtArgs["result"]["networkToken"]>
  export type NetworkTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    networks?: boolean | NetworkDefaultArgs<ExtArgs>
  }

  export type $NetworkTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NetworkToken"
    objects: {
      networks: Prisma.$NetworkPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      /**
       * ID sociální sítě
       */
      network_id: number
      /**
       * Název tokenu
       */
      token_name: string
      /**
       * Token
       */
      token: string
    }, ExtArgs["result"]["networkToken"]>
    composites: {}
  }

  type NetworkTokenGetPayload<S extends boolean | null | undefined | NetworkTokenDefaultArgs> = $Result.GetResult<Prisma.$NetworkTokenPayload, S>

  type NetworkTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NetworkTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NetworkTokenCountAggregateInputType | true
    }

  export interface NetworkTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NetworkToken'], meta: { name: 'NetworkToken' } }
    /**
     * Find zero or one NetworkToken that matches the filter.
     * @param {NetworkTokenFindUniqueArgs} args - Arguments to find a NetworkToken
     * @example
     * // Get one NetworkToken
     * const networkToken = await prisma.networkToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NetworkTokenFindUniqueArgs>(args: SelectSubset<T, NetworkTokenFindUniqueArgs<ExtArgs>>): Prisma__NetworkTokenClient<$Result.GetResult<Prisma.$NetworkTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NetworkToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NetworkTokenFindUniqueOrThrowArgs} args - Arguments to find a NetworkToken
     * @example
     * // Get one NetworkToken
     * const networkToken = await prisma.networkToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NetworkTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, NetworkTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NetworkTokenClient<$Result.GetResult<Prisma.$NetworkTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NetworkToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkTokenFindFirstArgs} args - Arguments to find a NetworkToken
     * @example
     * // Get one NetworkToken
     * const networkToken = await prisma.networkToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NetworkTokenFindFirstArgs>(args?: SelectSubset<T, NetworkTokenFindFirstArgs<ExtArgs>>): Prisma__NetworkTokenClient<$Result.GetResult<Prisma.$NetworkTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NetworkToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkTokenFindFirstOrThrowArgs} args - Arguments to find a NetworkToken
     * @example
     * // Get one NetworkToken
     * const networkToken = await prisma.networkToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NetworkTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, NetworkTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__NetworkTokenClient<$Result.GetResult<Prisma.$NetworkTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NetworkTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NetworkTokens
     * const networkTokens = await prisma.networkToken.findMany()
     * 
     * // Get first 10 NetworkTokens
     * const networkTokens = await prisma.networkToken.findMany({ take: 10 })
     * 
     * // Only select the `network_id`
     * const networkTokenWithNetwork_idOnly = await prisma.networkToken.findMany({ select: { network_id: true } })
     * 
     */
    findMany<T extends NetworkTokenFindManyArgs>(args?: SelectSubset<T, NetworkTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NetworkTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NetworkToken.
     * @param {NetworkTokenCreateArgs} args - Arguments to create a NetworkToken.
     * @example
     * // Create one NetworkToken
     * const NetworkToken = await prisma.networkToken.create({
     *   data: {
     *     // ... data to create a NetworkToken
     *   }
     * })
     * 
     */
    create<T extends NetworkTokenCreateArgs>(args: SelectSubset<T, NetworkTokenCreateArgs<ExtArgs>>): Prisma__NetworkTokenClient<$Result.GetResult<Prisma.$NetworkTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NetworkTokens.
     * @param {NetworkTokenCreateManyArgs} args - Arguments to create many NetworkTokens.
     * @example
     * // Create many NetworkTokens
     * const networkToken = await prisma.networkToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NetworkTokenCreateManyArgs>(args?: SelectSubset<T, NetworkTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a NetworkToken.
     * @param {NetworkTokenDeleteArgs} args - Arguments to delete one NetworkToken.
     * @example
     * // Delete one NetworkToken
     * const NetworkToken = await prisma.networkToken.delete({
     *   where: {
     *     // ... filter to delete one NetworkToken
     *   }
     * })
     * 
     */
    delete<T extends NetworkTokenDeleteArgs>(args: SelectSubset<T, NetworkTokenDeleteArgs<ExtArgs>>): Prisma__NetworkTokenClient<$Result.GetResult<Prisma.$NetworkTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NetworkToken.
     * @param {NetworkTokenUpdateArgs} args - Arguments to update one NetworkToken.
     * @example
     * // Update one NetworkToken
     * const networkToken = await prisma.networkToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NetworkTokenUpdateArgs>(args: SelectSubset<T, NetworkTokenUpdateArgs<ExtArgs>>): Prisma__NetworkTokenClient<$Result.GetResult<Prisma.$NetworkTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NetworkTokens.
     * @param {NetworkTokenDeleteManyArgs} args - Arguments to filter NetworkTokens to delete.
     * @example
     * // Delete a few NetworkTokens
     * const { count } = await prisma.networkToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NetworkTokenDeleteManyArgs>(args?: SelectSubset<T, NetworkTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NetworkTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NetworkTokens
     * const networkToken = await prisma.networkToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NetworkTokenUpdateManyArgs>(args: SelectSubset<T, NetworkTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one NetworkToken.
     * @param {NetworkTokenUpsertArgs} args - Arguments to update or create a NetworkToken.
     * @example
     * // Update or create a NetworkToken
     * const networkToken = await prisma.networkToken.upsert({
     *   create: {
     *     // ... data to create a NetworkToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NetworkToken we want to update
     *   }
     * })
     */
    upsert<T extends NetworkTokenUpsertArgs>(args: SelectSubset<T, NetworkTokenUpsertArgs<ExtArgs>>): Prisma__NetworkTokenClient<$Result.GetResult<Prisma.$NetworkTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NetworkTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkTokenCountArgs} args - Arguments to filter NetworkTokens to count.
     * @example
     * // Count the number of NetworkTokens
     * const count = await prisma.networkToken.count({
     *   where: {
     *     // ... the filter for the NetworkTokens we want to count
     *   }
     * })
    **/
    count<T extends NetworkTokenCountArgs>(
      args?: Subset<T, NetworkTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NetworkTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NetworkToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NetworkTokenAggregateArgs>(args: Subset<T, NetworkTokenAggregateArgs>): Prisma.PrismaPromise<GetNetworkTokenAggregateType<T>>

    /**
     * Group by NetworkToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworkTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NetworkTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NetworkTokenGroupByArgs['orderBy'] }
        : { orderBy?: NetworkTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NetworkTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNetworkTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NetworkToken model
   */
  readonly fields: NetworkTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NetworkToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NetworkTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    networks<T extends NetworkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NetworkDefaultArgs<ExtArgs>>): Prisma__NetworkClient<$Result.GetResult<Prisma.$NetworkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NetworkToken model
   */
  interface NetworkTokenFieldRefs {
    readonly network_id: FieldRef<"NetworkToken", 'Int'>
    readonly token_name: FieldRef<"NetworkToken", 'String'>
    readonly token: FieldRef<"NetworkToken", 'String'>
  }
    

  // Custom InputTypes
  /**
   * NetworkToken findUnique
   */
  export type NetworkTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworkToken
     */
    select?: NetworkTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworkToken
     */
    omit?: NetworkTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkTokenInclude<ExtArgs> | null
    /**
     * Filter, which NetworkToken to fetch.
     */
    where: NetworkTokenWhereUniqueInput
  }

  /**
   * NetworkToken findUniqueOrThrow
   */
  export type NetworkTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworkToken
     */
    select?: NetworkTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworkToken
     */
    omit?: NetworkTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkTokenInclude<ExtArgs> | null
    /**
     * Filter, which NetworkToken to fetch.
     */
    where: NetworkTokenWhereUniqueInput
  }

  /**
   * NetworkToken findFirst
   */
  export type NetworkTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworkToken
     */
    select?: NetworkTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworkToken
     */
    omit?: NetworkTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkTokenInclude<ExtArgs> | null
    /**
     * Filter, which NetworkToken to fetch.
     */
    where?: NetworkTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NetworkTokens to fetch.
     */
    orderBy?: NetworkTokenOrderByWithRelationInput | NetworkTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NetworkTokens.
     */
    cursor?: NetworkTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NetworkTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NetworkTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NetworkTokens.
     */
    distinct?: NetworkTokenScalarFieldEnum | NetworkTokenScalarFieldEnum[]
  }

  /**
   * NetworkToken findFirstOrThrow
   */
  export type NetworkTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworkToken
     */
    select?: NetworkTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworkToken
     */
    omit?: NetworkTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkTokenInclude<ExtArgs> | null
    /**
     * Filter, which NetworkToken to fetch.
     */
    where?: NetworkTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NetworkTokens to fetch.
     */
    orderBy?: NetworkTokenOrderByWithRelationInput | NetworkTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NetworkTokens.
     */
    cursor?: NetworkTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NetworkTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NetworkTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NetworkTokens.
     */
    distinct?: NetworkTokenScalarFieldEnum | NetworkTokenScalarFieldEnum[]
  }

  /**
   * NetworkToken findMany
   */
  export type NetworkTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworkToken
     */
    select?: NetworkTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworkToken
     */
    omit?: NetworkTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkTokenInclude<ExtArgs> | null
    /**
     * Filter, which NetworkTokens to fetch.
     */
    where?: NetworkTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NetworkTokens to fetch.
     */
    orderBy?: NetworkTokenOrderByWithRelationInput | NetworkTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NetworkTokens.
     */
    cursor?: NetworkTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NetworkTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NetworkTokens.
     */
    skip?: number
    distinct?: NetworkTokenScalarFieldEnum | NetworkTokenScalarFieldEnum[]
  }

  /**
   * NetworkToken create
   */
  export type NetworkTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworkToken
     */
    select?: NetworkTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworkToken
     */
    omit?: NetworkTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a NetworkToken.
     */
    data: XOR<NetworkTokenCreateInput, NetworkTokenUncheckedCreateInput>
  }

  /**
   * NetworkToken createMany
   */
  export type NetworkTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NetworkTokens.
     */
    data: NetworkTokenCreateManyInput | NetworkTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NetworkToken update
   */
  export type NetworkTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworkToken
     */
    select?: NetworkTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworkToken
     */
    omit?: NetworkTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a NetworkToken.
     */
    data: XOR<NetworkTokenUpdateInput, NetworkTokenUncheckedUpdateInput>
    /**
     * Choose, which NetworkToken to update.
     */
    where: NetworkTokenWhereUniqueInput
  }

  /**
   * NetworkToken updateMany
   */
  export type NetworkTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NetworkTokens.
     */
    data: XOR<NetworkTokenUpdateManyMutationInput, NetworkTokenUncheckedUpdateManyInput>
    /**
     * Filter which NetworkTokens to update
     */
    where?: NetworkTokenWhereInput
    /**
     * Limit how many NetworkTokens to update.
     */
    limit?: number
  }

  /**
   * NetworkToken upsert
   */
  export type NetworkTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworkToken
     */
    select?: NetworkTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworkToken
     */
    omit?: NetworkTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the NetworkToken to update in case it exists.
     */
    where: NetworkTokenWhereUniqueInput
    /**
     * In case the NetworkToken found by the `where` argument doesn't exist, create a new NetworkToken with this data.
     */
    create: XOR<NetworkTokenCreateInput, NetworkTokenUncheckedCreateInput>
    /**
     * In case the NetworkToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NetworkTokenUpdateInput, NetworkTokenUncheckedUpdateInput>
  }

  /**
   * NetworkToken delete
   */
  export type NetworkTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworkToken
     */
    select?: NetworkTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworkToken
     */
    omit?: NetworkTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkTokenInclude<ExtArgs> | null
    /**
     * Filter which NetworkToken to delete.
     */
    where: NetworkTokenWhereUniqueInput
  }

  /**
   * NetworkToken deleteMany
   */
  export type NetworkTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NetworkTokens to delete
     */
    where?: NetworkTokenWhereInput
    /**
     * Limit how many NetworkTokens to delete.
     */
    limit?: number
  }

  /**
   * NetworkToken without action
   */
  export type NetworkTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworkToken
     */
    select?: NetworkTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworkToken
     */
    omit?: NetworkTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworkTokenInclude<ExtArgs> | null
  }


  /**
   * Model NetworksUsers
   */

  export type AggregateNetworksUsers = {
    _count: NetworksUsersCountAggregateOutputType | null
    _avg: NetworksUsersAvgAggregateOutputType | null
    _sum: NetworksUsersSumAggregateOutputType | null
    _min: NetworksUsersMinAggregateOutputType | null
    _max: NetworksUsersMaxAggregateOutputType | null
  }

  export type NetworksUsersAvgAggregateOutputType = {
    networks_id: number | null
    granter_id: number | null
    grantee_id: number | null
  }

  export type NetworksUsersSumAggregateOutputType = {
    networks_id: number | null
    granter_id: number | null
    grantee_id: number | null
  }

  export type NetworksUsersMinAggregateOutputType = {
    networks_id: number | null
    granter_id: number | null
    grantee_id: number | null
    permission: string | null
  }

  export type NetworksUsersMaxAggregateOutputType = {
    networks_id: number | null
    granter_id: number | null
    grantee_id: number | null
    permission: string | null
  }

  export type NetworksUsersCountAggregateOutputType = {
    networks_id: number
    granter_id: number
    grantee_id: number
    permission: number
    _all: number
  }


  export type NetworksUsersAvgAggregateInputType = {
    networks_id?: true
    granter_id?: true
    grantee_id?: true
  }

  export type NetworksUsersSumAggregateInputType = {
    networks_id?: true
    granter_id?: true
    grantee_id?: true
  }

  export type NetworksUsersMinAggregateInputType = {
    networks_id?: true
    granter_id?: true
    grantee_id?: true
    permission?: true
  }

  export type NetworksUsersMaxAggregateInputType = {
    networks_id?: true
    granter_id?: true
    grantee_id?: true
    permission?: true
  }

  export type NetworksUsersCountAggregateInputType = {
    networks_id?: true
    granter_id?: true
    grantee_id?: true
    permission?: true
    _all?: true
  }

  export type NetworksUsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NetworksUsers to aggregate.
     */
    where?: NetworksUsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NetworksUsers to fetch.
     */
    orderBy?: NetworksUsersOrderByWithRelationInput | NetworksUsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NetworksUsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NetworksUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NetworksUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NetworksUsers
    **/
    _count?: true | NetworksUsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NetworksUsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NetworksUsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NetworksUsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NetworksUsersMaxAggregateInputType
  }

  export type GetNetworksUsersAggregateType<T extends NetworksUsersAggregateArgs> = {
        [P in keyof T & keyof AggregateNetworksUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNetworksUsers[P]>
      : GetScalarType<T[P], AggregateNetworksUsers[P]>
  }




  export type NetworksUsersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NetworksUsersWhereInput
    orderBy?: NetworksUsersOrderByWithAggregationInput | NetworksUsersOrderByWithAggregationInput[]
    by: NetworksUsersScalarFieldEnum[] | NetworksUsersScalarFieldEnum
    having?: NetworksUsersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NetworksUsersCountAggregateInputType | true
    _avg?: NetworksUsersAvgAggregateInputType
    _sum?: NetworksUsersSumAggregateInputType
    _min?: NetworksUsersMinAggregateInputType
    _max?: NetworksUsersMaxAggregateInputType
  }

  export type NetworksUsersGroupByOutputType = {
    networks_id: number
    granter_id: number
    grantee_id: number
    permission: string
    _count: NetworksUsersCountAggregateOutputType | null
    _avg: NetworksUsersAvgAggregateOutputType | null
    _sum: NetworksUsersSumAggregateOutputType | null
    _min: NetworksUsersMinAggregateOutputType | null
    _max: NetworksUsersMaxAggregateOutputType | null
  }

  type GetNetworksUsersGroupByPayload<T extends NetworksUsersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NetworksUsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NetworksUsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NetworksUsersGroupByOutputType[P]>
            : GetScalarType<T[P], NetworksUsersGroupByOutputType[P]>
        }
      >
    >


  export type NetworksUsersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    networks_id?: boolean
    granter_id?: boolean
    grantee_id?: boolean
    permission?: boolean
    networks?: boolean | NetworkDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["networksUsers"]>



  export type NetworksUsersSelectScalar = {
    networks_id?: boolean
    granter_id?: boolean
    grantee_id?: boolean
    permission?: boolean
  }

  export type NetworksUsersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"networks_id" | "granter_id" | "grantee_id" | "permission", ExtArgs["result"]["networksUsers"]>
  export type NetworksUsersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    networks?: boolean | NetworkDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NetworksUsersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NetworksUsers"
    objects: {
      networks: Prisma.$NetworkPayload<ExtArgs>
      users: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      /**
       * ID sociální sítě, ke které je udělován přístup
       */
      networks_id: number
      /**
       * ID uživatele, který oprávnění přiděluje
       */
      granter_id: number
      /**
       * ID uživatele, kterému je přidělováno oprávnění
       */
      grantee_id: number
      /**
       * Oprávnění (např. "read", "write", "admin")
       */
      permission: string
    }, ExtArgs["result"]["networksUsers"]>
    composites: {}
  }

  type NetworksUsersGetPayload<S extends boolean | null | undefined | NetworksUsersDefaultArgs> = $Result.GetResult<Prisma.$NetworksUsersPayload, S>

  type NetworksUsersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NetworksUsersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NetworksUsersCountAggregateInputType | true
    }

  export interface NetworksUsersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NetworksUsers'], meta: { name: 'NetworksUsers' } }
    /**
     * Find zero or one NetworksUsers that matches the filter.
     * @param {NetworksUsersFindUniqueArgs} args - Arguments to find a NetworksUsers
     * @example
     * // Get one NetworksUsers
     * const networksUsers = await prisma.networksUsers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NetworksUsersFindUniqueArgs>(args: SelectSubset<T, NetworksUsersFindUniqueArgs<ExtArgs>>): Prisma__NetworksUsersClient<$Result.GetResult<Prisma.$NetworksUsersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NetworksUsers that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NetworksUsersFindUniqueOrThrowArgs} args - Arguments to find a NetworksUsers
     * @example
     * // Get one NetworksUsers
     * const networksUsers = await prisma.networksUsers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NetworksUsersFindUniqueOrThrowArgs>(args: SelectSubset<T, NetworksUsersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NetworksUsersClient<$Result.GetResult<Prisma.$NetworksUsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NetworksUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworksUsersFindFirstArgs} args - Arguments to find a NetworksUsers
     * @example
     * // Get one NetworksUsers
     * const networksUsers = await prisma.networksUsers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NetworksUsersFindFirstArgs>(args?: SelectSubset<T, NetworksUsersFindFirstArgs<ExtArgs>>): Prisma__NetworksUsersClient<$Result.GetResult<Prisma.$NetworksUsersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NetworksUsers that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworksUsersFindFirstOrThrowArgs} args - Arguments to find a NetworksUsers
     * @example
     * // Get one NetworksUsers
     * const networksUsers = await prisma.networksUsers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NetworksUsersFindFirstOrThrowArgs>(args?: SelectSubset<T, NetworksUsersFindFirstOrThrowArgs<ExtArgs>>): Prisma__NetworksUsersClient<$Result.GetResult<Prisma.$NetworksUsersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NetworksUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworksUsersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NetworksUsers
     * const networksUsers = await prisma.networksUsers.findMany()
     * 
     * // Get first 10 NetworksUsers
     * const networksUsers = await prisma.networksUsers.findMany({ take: 10 })
     * 
     * // Only select the `networks_id`
     * const networksUsersWithNetworks_idOnly = await prisma.networksUsers.findMany({ select: { networks_id: true } })
     * 
     */
    findMany<T extends NetworksUsersFindManyArgs>(args?: SelectSubset<T, NetworksUsersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NetworksUsersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NetworksUsers.
     * @param {NetworksUsersCreateArgs} args - Arguments to create a NetworksUsers.
     * @example
     * // Create one NetworksUsers
     * const NetworksUsers = await prisma.networksUsers.create({
     *   data: {
     *     // ... data to create a NetworksUsers
     *   }
     * })
     * 
     */
    create<T extends NetworksUsersCreateArgs>(args: SelectSubset<T, NetworksUsersCreateArgs<ExtArgs>>): Prisma__NetworksUsersClient<$Result.GetResult<Prisma.$NetworksUsersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NetworksUsers.
     * @param {NetworksUsersCreateManyArgs} args - Arguments to create many NetworksUsers.
     * @example
     * // Create many NetworksUsers
     * const networksUsers = await prisma.networksUsers.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NetworksUsersCreateManyArgs>(args?: SelectSubset<T, NetworksUsersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a NetworksUsers.
     * @param {NetworksUsersDeleteArgs} args - Arguments to delete one NetworksUsers.
     * @example
     * // Delete one NetworksUsers
     * const NetworksUsers = await prisma.networksUsers.delete({
     *   where: {
     *     // ... filter to delete one NetworksUsers
     *   }
     * })
     * 
     */
    delete<T extends NetworksUsersDeleteArgs>(args: SelectSubset<T, NetworksUsersDeleteArgs<ExtArgs>>): Prisma__NetworksUsersClient<$Result.GetResult<Prisma.$NetworksUsersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NetworksUsers.
     * @param {NetworksUsersUpdateArgs} args - Arguments to update one NetworksUsers.
     * @example
     * // Update one NetworksUsers
     * const networksUsers = await prisma.networksUsers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NetworksUsersUpdateArgs>(args: SelectSubset<T, NetworksUsersUpdateArgs<ExtArgs>>): Prisma__NetworksUsersClient<$Result.GetResult<Prisma.$NetworksUsersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NetworksUsers.
     * @param {NetworksUsersDeleteManyArgs} args - Arguments to filter NetworksUsers to delete.
     * @example
     * // Delete a few NetworksUsers
     * const { count } = await prisma.networksUsers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NetworksUsersDeleteManyArgs>(args?: SelectSubset<T, NetworksUsersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NetworksUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworksUsersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NetworksUsers
     * const networksUsers = await prisma.networksUsers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NetworksUsersUpdateManyArgs>(args: SelectSubset<T, NetworksUsersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one NetworksUsers.
     * @param {NetworksUsersUpsertArgs} args - Arguments to update or create a NetworksUsers.
     * @example
     * // Update or create a NetworksUsers
     * const networksUsers = await prisma.networksUsers.upsert({
     *   create: {
     *     // ... data to create a NetworksUsers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NetworksUsers we want to update
     *   }
     * })
     */
    upsert<T extends NetworksUsersUpsertArgs>(args: SelectSubset<T, NetworksUsersUpsertArgs<ExtArgs>>): Prisma__NetworksUsersClient<$Result.GetResult<Prisma.$NetworksUsersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NetworksUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworksUsersCountArgs} args - Arguments to filter NetworksUsers to count.
     * @example
     * // Count the number of NetworksUsers
     * const count = await prisma.networksUsers.count({
     *   where: {
     *     // ... the filter for the NetworksUsers we want to count
     *   }
     * })
    **/
    count<T extends NetworksUsersCountArgs>(
      args?: Subset<T, NetworksUsersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NetworksUsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NetworksUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworksUsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NetworksUsersAggregateArgs>(args: Subset<T, NetworksUsersAggregateArgs>): Prisma.PrismaPromise<GetNetworksUsersAggregateType<T>>

    /**
     * Group by NetworksUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NetworksUsersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NetworksUsersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NetworksUsersGroupByArgs['orderBy'] }
        : { orderBy?: NetworksUsersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NetworksUsersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNetworksUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NetworksUsers model
   */
  readonly fields: NetworksUsersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NetworksUsers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NetworksUsersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    networks<T extends NetworkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NetworkDefaultArgs<ExtArgs>>): Prisma__NetworkClient<$Result.GetResult<Prisma.$NetworkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NetworksUsers model
   */
  interface NetworksUsersFieldRefs {
    readonly networks_id: FieldRef<"NetworksUsers", 'Int'>
    readonly granter_id: FieldRef<"NetworksUsers", 'Int'>
    readonly grantee_id: FieldRef<"NetworksUsers", 'Int'>
    readonly permission: FieldRef<"NetworksUsers", 'String'>
  }
    

  // Custom InputTypes
  /**
   * NetworksUsers findUnique
   */
  export type NetworksUsersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworksUsers
     */
    select?: NetworksUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworksUsers
     */
    omit?: NetworksUsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworksUsersInclude<ExtArgs> | null
    /**
     * Filter, which NetworksUsers to fetch.
     */
    where: NetworksUsersWhereUniqueInput
  }

  /**
   * NetworksUsers findUniqueOrThrow
   */
  export type NetworksUsersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworksUsers
     */
    select?: NetworksUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworksUsers
     */
    omit?: NetworksUsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworksUsersInclude<ExtArgs> | null
    /**
     * Filter, which NetworksUsers to fetch.
     */
    where: NetworksUsersWhereUniqueInput
  }

  /**
   * NetworksUsers findFirst
   */
  export type NetworksUsersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworksUsers
     */
    select?: NetworksUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworksUsers
     */
    omit?: NetworksUsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworksUsersInclude<ExtArgs> | null
    /**
     * Filter, which NetworksUsers to fetch.
     */
    where?: NetworksUsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NetworksUsers to fetch.
     */
    orderBy?: NetworksUsersOrderByWithRelationInput | NetworksUsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NetworksUsers.
     */
    cursor?: NetworksUsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NetworksUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NetworksUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NetworksUsers.
     */
    distinct?: NetworksUsersScalarFieldEnum | NetworksUsersScalarFieldEnum[]
  }

  /**
   * NetworksUsers findFirstOrThrow
   */
  export type NetworksUsersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworksUsers
     */
    select?: NetworksUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworksUsers
     */
    omit?: NetworksUsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworksUsersInclude<ExtArgs> | null
    /**
     * Filter, which NetworksUsers to fetch.
     */
    where?: NetworksUsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NetworksUsers to fetch.
     */
    orderBy?: NetworksUsersOrderByWithRelationInput | NetworksUsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NetworksUsers.
     */
    cursor?: NetworksUsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NetworksUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NetworksUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NetworksUsers.
     */
    distinct?: NetworksUsersScalarFieldEnum | NetworksUsersScalarFieldEnum[]
  }

  /**
   * NetworksUsers findMany
   */
  export type NetworksUsersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworksUsers
     */
    select?: NetworksUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworksUsers
     */
    omit?: NetworksUsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworksUsersInclude<ExtArgs> | null
    /**
     * Filter, which NetworksUsers to fetch.
     */
    where?: NetworksUsersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NetworksUsers to fetch.
     */
    orderBy?: NetworksUsersOrderByWithRelationInput | NetworksUsersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NetworksUsers.
     */
    cursor?: NetworksUsersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NetworksUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NetworksUsers.
     */
    skip?: number
    distinct?: NetworksUsersScalarFieldEnum | NetworksUsersScalarFieldEnum[]
  }

  /**
   * NetworksUsers create
   */
  export type NetworksUsersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworksUsers
     */
    select?: NetworksUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworksUsers
     */
    omit?: NetworksUsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworksUsersInclude<ExtArgs> | null
    /**
     * The data needed to create a NetworksUsers.
     */
    data: XOR<NetworksUsersCreateInput, NetworksUsersUncheckedCreateInput>
  }

  /**
   * NetworksUsers createMany
   */
  export type NetworksUsersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NetworksUsers.
     */
    data: NetworksUsersCreateManyInput | NetworksUsersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NetworksUsers update
   */
  export type NetworksUsersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworksUsers
     */
    select?: NetworksUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworksUsers
     */
    omit?: NetworksUsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworksUsersInclude<ExtArgs> | null
    /**
     * The data needed to update a NetworksUsers.
     */
    data: XOR<NetworksUsersUpdateInput, NetworksUsersUncheckedUpdateInput>
    /**
     * Choose, which NetworksUsers to update.
     */
    where: NetworksUsersWhereUniqueInput
  }

  /**
   * NetworksUsers updateMany
   */
  export type NetworksUsersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NetworksUsers.
     */
    data: XOR<NetworksUsersUpdateManyMutationInput, NetworksUsersUncheckedUpdateManyInput>
    /**
     * Filter which NetworksUsers to update
     */
    where?: NetworksUsersWhereInput
    /**
     * Limit how many NetworksUsers to update.
     */
    limit?: number
  }

  /**
   * NetworksUsers upsert
   */
  export type NetworksUsersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworksUsers
     */
    select?: NetworksUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworksUsers
     */
    omit?: NetworksUsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworksUsersInclude<ExtArgs> | null
    /**
     * The filter to search for the NetworksUsers to update in case it exists.
     */
    where: NetworksUsersWhereUniqueInput
    /**
     * In case the NetworksUsers found by the `where` argument doesn't exist, create a new NetworksUsers with this data.
     */
    create: XOR<NetworksUsersCreateInput, NetworksUsersUncheckedCreateInput>
    /**
     * In case the NetworksUsers was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NetworksUsersUpdateInput, NetworksUsersUncheckedUpdateInput>
  }

  /**
   * NetworksUsers delete
   */
  export type NetworksUsersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworksUsers
     */
    select?: NetworksUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworksUsers
     */
    omit?: NetworksUsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworksUsersInclude<ExtArgs> | null
    /**
     * Filter which NetworksUsers to delete.
     */
    where: NetworksUsersWhereUniqueInput
  }

  /**
   * NetworksUsers deleteMany
   */
  export type NetworksUsersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NetworksUsers to delete
     */
    where?: NetworksUsersWhereInput
    /**
     * Limit how many NetworksUsers to delete.
     */
    limit?: number
  }

  /**
   * NetworksUsers without action
   */
  export type NetworksUsersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NetworksUsers
     */
    select?: NetworksUsersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NetworksUsers
     */
    omit?: NetworksUsersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NetworksUsersInclude<ExtArgs> | null
  }


  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostAvgAggregateOutputType = {
    id: number | null
    creator_id: number | null
  }

  export type PostSumAggregateOutputType = {
    id: number | null
    creator_id: number | null
  }

  export type PostMinAggregateOutputType = {
    id: number | null
    creator_id: number | null
  }

  export type PostMaxAggregateOutputType = {
    id: number | null
    creator_id: number | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    creator_id: number
    _all: number
  }


  export type PostAvgAggregateInputType = {
    id?: true
    creator_id?: true
  }

  export type PostSumAggregateInputType = {
    id?: true
    creator_id?: true
  }

  export type PostMinAggregateInputType = {
    id?: true
    creator_id?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    creator_id?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    creator_id?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: number
    creator_id: number
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    creator_id?: boolean
    attachments?: boolean | Post$attachmentsArgs<ExtArgs>
    contents?: boolean | Post$contentsArgs<ExtArgs>
    posted_content?: boolean | Post$posted_contentArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
    PostEditor?: boolean | Post$PostEditorArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>



  export type PostSelectScalar = {
    id?: boolean
    creator_id?: boolean
  }

  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "creator_id", ExtArgs["result"]["post"]>
  export type PostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attachments?: boolean | Post$attachmentsArgs<ExtArgs>
    contents?: boolean | Post$contentsArgs<ExtArgs>
    posted_content?: boolean | Post$posted_contentArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
    PostEditor?: boolean | Post$PostEditorArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {
      attachments: Prisma.$AttachmentPayload<ExtArgs>[]
      contents: Prisma.$ContentPayload<ExtArgs>[]
      posted_content: Prisma.$PostedContentPayload<ExtArgs>[]
      users: Prisma.$UserPayload<ExtArgs>
      PostEditor: Prisma.$PostEditorPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      /**
       * ID příspěvku
       */
      id: number
      /**
       * ID uživatele, který příspěvek vytvořil
       */
      creator_id: number
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attachments<T extends Post$attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Post$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    contents<T extends Post$contentsArgs<ExtArgs> = {}>(args?: Subset<T, Post$contentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    posted_content<T extends Post$posted_contentArgs<ExtArgs> = {}>(args?: Subset<T, Post$posted_contentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostedContentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    PostEditor<T extends Post$PostEditorArgs<ExtArgs> = {}>(args?: Subset<T, Post$PostEditorArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostEditorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Post model
   */
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'Int'>
    readonly creator_id: FieldRef<"Post", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Post.attachments
   */
  export type Post$attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    where?: AttachmentWhereInput
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    cursor?: AttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Post.contents
   */
  export type Post$contentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Content
     */
    omit?: ContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    where?: ContentWhereInput
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    cursor?: ContentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContentScalarFieldEnum | ContentScalarFieldEnum[]
  }

  /**
   * Post.posted_content
   */
  export type Post$posted_contentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContent
     */
    select?: PostedContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContent
     */
    omit?: PostedContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentInclude<ExtArgs> | null
    where?: PostedContentWhereInput
    orderBy?: PostedContentOrderByWithRelationInput | PostedContentOrderByWithRelationInput[]
    cursor?: PostedContentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostedContentScalarFieldEnum | PostedContentScalarFieldEnum[]
  }

  /**
   * Post.PostEditor
   */
  export type Post$PostEditorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostEditor
     */
    select?: PostEditorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostEditor
     */
    omit?: PostEditorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostEditorInclude<ExtArgs> | null
    where?: PostEditorWhereInput
    orderBy?: PostEditorOrderByWithRelationInput | PostEditorOrderByWithRelationInput[]
    cursor?: PostEditorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostEditorScalarFieldEnum | PostEditorScalarFieldEnum[]
  }

  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
  }


  /**
   * Model PostEditor
   */

  export type AggregatePostEditor = {
    _count: PostEditorCountAggregateOutputType | null
    _avg: PostEditorAvgAggregateOutputType | null
    _sum: PostEditorSumAggregateOutputType | null
    _min: PostEditorMinAggregateOutputType | null
    _max: PostEditorMaxAggregateOutputType | null
  }

  export type PostEditorAvgAggregateOutputType = {
    posts_id: number | null
    editor_id: number | null
  }

  export type PostEditorSumAggregateOutputType = {
    posts_id: number | null
    editor_id: number | null
  }

  export type PostEditorMinAggregateOutputType = {
    posts_id: number | null
    editor_id: number | null
  }

  export type PostEditorMaxAggregateOutputType = {
    posts_id: number | null
    editor_id: number | null
  }

  export type PostEditorCountAggregateOutputType = {
    posts_id: number
    editor_id: number
    _all: number
  }


  export type PostEditorAvgAggregateInputType = {
    posts_id?: true
    editor_id?: true
  }

  export type PostEditorSumAggregateInputType = {
    posts_id?: true
    editor_id?: true
  }

  export type PostEditorMinAggregateInputType = {
    posts_id?: true
    editor_id?: true
  }

  export type PostEditorMaxAggregateInputType = {
    posts_id?: true
    editor_id?: true
  }

  export type PostEditorCountAggregateInputType = {
    posts_id?: true
    editor_id?: true
    _all?: true
  }

  export type PostEditorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostEditor to aggregate.
     */
    where?: PostEditorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostEditors to fetch.
     */
    orderBy?: PostEditorOrderByWithRelationInput | PostEditorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostEditorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostEditors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostEditors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostEditors
    **/
    _count?: true | PostEditorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostEditorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostEditorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostEditorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostEditorMaxAggregateInputType
  }

  export type GetPostEditorAggregateType<T extends PostEditorAggregateArgs> = {
        [P in keyof T & keyof AggregatePostEditor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostEditor[P]>
      : GetScalarType<T[P], AggregatePostEditor[P]>
  }




  export type PostEditorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostEditorWhereInput
    orderBy?: PostEditorOrderByWithAggregationInput | PostEditorOrderByWithAggregationInput[]
    by: PostEditorScalarFieldEnum[] | PostEditorScalarFieldEnum
    having?: PostEditorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostEditorCountAggregateInputType | true
    _avg?: PostEditorAvgAggregateInputType
    _sum?: PostEditorSumAggregateInputType
    _min?: PostEditorMinAggregateInputType
    _max?: PostEditorMaxAggregateInputType
  }

  export type PostEditorGroupByOutputType = {
    posts_id: number
    editor_id: number
    _count: PostEditorCountAggregateOutputType | null
    _avg: PostEditorAvgAggregateOutputType | null
    _sum: PostEditorSumAggregateOutputType | null
    _min: PostEditorMinAggregateOutputType | null
    _max: PostEditorMaxAggregateOutputType | null
  }

  type GetPostEditorGroupByPayload<T extends PostEditorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostEditorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostEditorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostEditorGroupByOutputType[P]>
            : GetScalarType<T[P], PostEditorGroupByOutputType[P]>
        }
      >
    >


  export type PostEditorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    posts_id?: boolean
    editor_id?: boolean
    posts?: boolean | PostDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postEditor"]>



  export type PostEditorSelectScalar = {
    posts_id?: boolean
    editor_id?: boolean
  }

  export type PostEditorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"posts_id" | "editor_id", ExtArgs["result"]["postEditor"]>
  export type PostEditorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | PostDefaultArgs<ExtArgs>
    users?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PostEditorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostEditor"
    objects: {
      posts: Prisma.$PostPayload<ExtArgs>
      users: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      /**
       * ID příspěvku, který editor spravuje
       */
      posts_id: number
      /**
       * ID uživatele, který je editorem příspěvku
       */
      editor_id: number
    }, ExtArgs["result"]["postEditor"]>
    composites: {}
  }

  type PostEditorGetPayload<S extends boolean | null | undefined | PostEditorDefaultArgs> = $Result.GetResult<Prisma.$PostEditorPayload, S>

  type PostEditorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostEditorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostEditorCountAggregateInputType | true
    }

  export interface PostEditorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostEditor'], meta: { name: 'PostEditor' } }
    /**
     * Find zero or one PostEditor that matches the filter.
     * @param {PostEditorFindUniqueArgs} args - Arguments to find a PostEditor
     * @example
     * // Get one PostEditor
     * const postEditor = await prisma.postEditor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostEditorFindUniqueArgs>(args: SelectSubset<T, PostEditorFindUniqueArgs<ExtArgs>>): Prisma__PostEditorClient<$Result.GetResult<Prisma.$PostEditorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostEditor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostEditorFindUniqueOrThrowArgs} args - Arguments to find a PostEditor
     * @example
     * // Get one PostEditor
     * const postEditor = await prisma.postEditor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostEditorFindUniqueOrThrowArgs>(args: SelectSubset<T, PostEditorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostEditorClient<$Result.GetResult<Prisma.$PostEditorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostEditor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostEditorFindFirstArgs} args - Arguments to find a PostEditor
     * @example
     * // Get one PostEditor
     * const postEditor = await prisma.postEditor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostEditorFindFirstArgs>(args?: SelectSubset<T, PostEditorFindFirstArgs<ExtArgs>>): Prisma__PostEditorClient<$Result.GetResult<Prisma.$PostEditorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostEditor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostEditorFindFirstOrThrowArgs} args - Arguments to find a PostEditor
     * @example
     * // Get one PostEditor
     * const postEditor = await prisma.postEditor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostEditorFindFirstOrThrowArgs>(args?: SelectSubset<T, PostEditorFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostEditorClient<$Result.GetResult<Prisma.$PostEditorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostEditors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostEditorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostEditors
     * const postEditors = await prisma.postEditor.findMany()
     * 
     * // Get first 10 PostEditors
     * const postEditors = await prisma.postEditor.findMany({ take: 10 })
     * 
     * // Only select the `posts_id`
     * const postEditorWithPosts_idOnly = await prisma.postEditor.findMany({ select: { posts_id: true } })
     * 
     */
    findMany<T extends PostEditorFindManyArgs>(args?: SelectSubset<T, PostEditorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostEditorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostEditor.
     * @param {PostEditorCreateArgs} args - Arguments to create a PostEditor.
     * @example
     * // Create one PostEditor
     * const PostEditor = await prisma.postEditor.create({
     *   data: {
     *     // ... data to create a PostEditor
     *   }
     * })
     * 
     */
    create<T extends PostEditorCreateArgs>(args: SelectSubset<T, PostEditorCreateArgs<ExtArgs>>): Prisma__PostEditorClient<$Result.GetResult<Prisma.$PostEditorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostEditors.
     * @param {PostEditorCreateManyArgs} args - Arguments to create many PostEditors.
     * @example
     * // Create many PostEditors
     * const postEditor = await prisma.postEditor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostEditorCreateManyArgs>(args?: SelectSubset<T, PostEditorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PostEditor.
     * @param {PostEditorDeleteArgs} args - Arguments to delete one PostEditor.
     * @example
     * // Delete one PostEditor
     * const PostEditor = await prisma.postEditor.delete({
     *   where: {
     *     // ... filter to delete one PostEditor
     *   }
     * })
     * 
     */
    delete<T extends PostEditorDeleteArgs>(args: SelectSubset<T, PostEditorDeleteArgs<ExtArgs>>): Prisma__PostEditorClient<$Result.GetResult<Prisma.$PostEditorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostEditor.
     * @param {PostEditorUpdateArgs} args - Arguments to update one PostEditor.
     * @example
     * // Update one PostEditor
     * const postEditor = await prisma.postEditor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostEditorUpdateArgs>(args: SelectSubset<T, PostEditorUpdateArgs<ExtArgs>>): Prisma__PostEditorClient<$Result.GetResult<Prisma.$PostEditorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostEditors.
     * @param {PostEditorDeleteManyArgs} args - Arguments to filter PostEditors to delete.
     * @example
     * // Delete a few PostEditors
     * const { count } = await prisma.postEditor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostEditorDeleteManyArgs>(args?: SelectSubset<T, PostEditorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostEditors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostEditorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostEditors
     * const postEditor = await prisma.postEditor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostEditorUpdateManyArgs>(args: SelectSubset<T, PostEditorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PostEditor.
     * @param {PostEditorUpsertArgs} args - Arguments to update or create a PostEditor.
     * @example
     * // Update or create a PostEditor
     * const postEditor = await prisma.postEditor.upsert({
     *   create: {
     *     // ... data to create a PostEditor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostEditor we want to update
     *   }
     * })
     */
    upsert<T extends PostEditorUpsertArgs>(args: SelectSubset<T, PostEditorUpsertArgs<ExtArgs>>): Prisma__PostEditorClient<$Result.GetResult<Prisma.$PostEditorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostEditors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostEditorCountArgs} args - Arguments to filter PostEditors to count.
     * @example
     * // Count the number of PostEditors
     * const count = await prisma.postEditor.count({
     *   where: {
     *     // ... the filter for the PostEditors we want to count
     *   }
     * })
    **/
    count<T extends PostEditorCountArgs>(
      args?: Subset<T, PostEditorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostEditorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostEditor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostEditorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostEditorAggregateArgs>(args: Subset<T, PostEditorAggregateArgs>): Prisma.PrismaPromise<GetPostEditorAggregateType<T>>

    /**
     * Group by PostEditor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostEditorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostEditorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostEditorGroupByArgs['orderBy'] }
        : { orderBy?: PostEditorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostEditorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostEditorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostEditor model
   */
  readonly fields: PostEditorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostEditor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostEditorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    posts<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostEditor model
   */
  interface PostEditorFieldRefs {
    readonly posts_id: FieldRef<"PostEditor", 'Int'>
    readonly editor_id: FieldRef<"PostEditor", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PostEditor findUnique
   */
  export type PostEditorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostEditor
     */
    select?: PostEditorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostEditor
     */
    omit?: PostEditorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostEditorInclude<ExtArgs> | null
    /**
     * Filter, which PostEditor to fetch.
     */
    where: PostEditorWhereUniqueInput
  }

  /**
   * PostEditor findUniqueOrThrow
   */
  export type PostEditorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostEditor
     */
    select?: PostEditorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostEditor
     */
    omit?: PostEditorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostEditorInclude<ExtArgs> | null
    /**
     * Filter, which PostEditor to fetch.
     */
    where: PostEditorWhereUniqueInput
  }

  /**
   * PostEditor findFirst
   */
  export type PostEditorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostEditor
     */
    select?: PostEditorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostEditor
     */
    omit?: PostEditorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostEditorInclude<ExtArgs> | null
    /**
     * Filter, which PostEditor to fetch.
     */
    where?: PostEditorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostEditors to fetch.
     */
    orderBy?: PostEditorOrderByWithRelationInput | PostEditorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostEditors.
     */
    cursor?: PostEditorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostEditors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostEditors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostEditors.
     */
    distinct?: PostEditorScalarFieldEnum | PostEditorScalarFieldEnum[]
  }

  /**
   * PostEditor findFirstOrThrow
   */
  export type PostEditorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostEditor
     */
    select?: PostEditorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostEditor
     */
    omit?: PostEditorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostEditorInclude<ExtArgs> | null
    /**
     * Filter, which PostEditor to fetch.
     */
    where?: PostEditorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostEditors to fetch.
     */
    orderBy?: PostEditorOrderByWithRelationInput | PostEditorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostEditors.
     */
    cursor?: PostEditorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostEditors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostEditors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostEditors.
     */
    distinct?: PostEditorScalarFieldEnum | PostEditorScalarFieldEnum[]
  }

  /**
   * PostEditor findMany
   */
  export type PostEditorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostEditor
     */
    select?: PostEditorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostEditor
     */
    omit?: PostEditorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostEditorInclude<ExtArgs> | null
    /**
     * Filter, which PostEditors to fetch.
     */
    where?: PostEditorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostEditors to fetch.
     */
    orderBy?: PostEditorOrderByWithRelationInput | PostEditorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostEditors.
     */
    cursor?: PostEditorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostEditors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostEditors.
     */
    skip?: number
    distinct?: PostEditorScalarFieldEnum | PostEditorScalarFieldEnum[]
  }

  /**
   * PostEditor create
   */
  export type PostEditorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostEditor
     */
    select?: PostEditorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostEditor
     */
    omit?: PostEditorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostEditorInclude<ExtArgs> | null
    /**
     * The data needed to create a PostEditor.
     */
    data: XOR<PostEditorCreateInput, PostEditorUncheckedCreateInput>
  }

  /**
   * PostEditor createMany
   */
  export type PostEditorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostEditors.
     */
    data: PostEditorCreateManyInput | PostEditorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostEditor update
   */
  export type PostEditorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostEditor
     */
    select?: PostEditorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostEditor
     */
    omit?: PostEditorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostEditorInclude<ExtArgs> | null
    /**
     * The data needed to update a PostEditor.
     */
    data: XOR<PostEditorUpdateInput, PostEditorUncheckedUpdateInput>
    /**
     * Choose, which PostEditor to update.
     */
    where: PostEditorWhereUniqueInput
  }

  /**
   * PostEditor updateMany
   */
  export type PostEditorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostEditors.
     */
    data: XOR<PostEditorUpdateManyMutationInput, PostEditorUncheckedUpdateManyInput>
    /**
     * Filter which PostEditors to update
     */
    where?: PostEditorWhereInput
    /**
     * Limit how many PostEditors to update.
     */
    limit?: number
  }

  /**
   * PostEditor upsert
   */
  export type PostEditorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostEditor
     */
    select?: PostEditorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostEditor
     */
    omit?: PostEditorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostEditorInclude<ExtArgs> | null
    /**
     * The filter to search for the PostEditor to update in case it exists.
     */
    where: PostEditorWhereUniqueInput
    /**
     * In case the PostEditor found by the `where` argument doesn't exist, create a new PostEditor with this data.
     */
    create: XOR<PostEditorCreateInput, PostEditorUncheckedCreateInput>
    /**
     * In case the PostEditor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostEditorUpdateInput, PostEditorUncheckedUpdateInput>
  }

  /**
   * PostEditor delete
   */
  export type PostEditorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostEditor
     */
    select?: PostEditorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostEditor
     */
    omit?: PostEditorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostEditorInclude<ExtArgs> | null
    /**
     * Filter which PostEditor to delete.
     */
    where: PostEditorWhereUniqueInput
  }

  /**
   * PostEditor deleteMany
   */
  export type PostEditorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostEditors to delete
     */
    where?: PostEditorWhereInput
    /**
     * Limit how many PostEditors to delete.
     */
    limit?: number
  }

  /**
   * PostEditor without action
   */
  export type PostEditorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostEditor
     */
    select?: PostEditorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostEditor
     */
    omit?: PostEditorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostEditorInclude<ExtArgs> | null
  }


  /**
   * Model Attachment
   */

  export type AggregateAttachment = {
    _count: AttachmentCountAggregateOutputType | null
    _avg: AttachmentAvgAggregateOutputType | null
    _sum: AttachmentSumAggregateOutputType | null
    _min: AttachmentMinAggregateOutputType | null
    _max: AttachmentMaxAggregateOutputType | null
  }

  export type AttachmentAvgAggregateOutputType = {
    id: number | null
    posts_id: number | null
  }

  export type AttachmentSumAggregateOutputType = {
    id: number | null
    posts_id: number | null
  }

  export type AttachmentMinAggregateOutputType = {
    id: number | null
    posts_id: number | null
    path: string | null
  }

  export type AttachmentMaxAggregateOutputType = {
    id: number | null
    posts_id: number | null
    path: string | null
  }

  export type AttachmentCountAggregateOutputType = {
    id: number
    posts_id: number
    path: number
    _all: number
  }


  export type AttachmentAvgAggregateInputType = {
    id?: true
    posts_id?: true
  }

  export type AttachmentSumAggregateInputType = {
    id?: true
    posts_id?: true
  }

  export type AttachmentMinAggregateInputType = {
    id?: true
    posts_id?: true
    path?: true
  }

  export type AttachmentMaxAggregateInputType = {
    id?: true
    posts_id?: true
    path?: true
  }

  export type AttachmentCountAggregateInputType = {
    id?: true
    posts_id?: true
    path?: true
    _all?: true
  }

  export type AttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attachment to aggregate.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attachments
    **/
    _count?: true | AttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttachmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttachmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttachmentMaxAggregateInputType
  }

  export type GetAttachmentAggregateType<T extends AttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttachment[P]>
      : GetScalarType<T[P], AggregateAttachment[P]>
  }




  export type AttachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttachmentWhereInput
    orderBy?: AttachmentOrderByWithAggregationInput | AttachmentOrderByWithAggregationInput[]
    by: AttachmentScalarFieldEnum[] | AttachmentScalarFieldEnum
    having?: AttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttachmentCountAggregateInputType | true
    _avg?: AttachmentAvgAggregateInputType
    _sum?: AttachmentSumAggregateInputType
    _min?: AttachmentMinAggregateInputType
    _max?: AttachmentMaxAggregateInputType
  }

  export type AttachmentGroupByOutputType = {
    id: number
    posts_id: number
    path: string
    _count: AttachmentCountAggregateOutputType | null
    _avg: AttachmentAvgAggregateOutputType | null
    _sum: AttachmentSumAggregateOutputType | null
    _min: AttachmentMinAggregateOutputType | null
    _max: AttachmentMaxAggregateOutputType | null
  }

  type GetAttachmentGroupByPayload<T extends AttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], AttachmentGroupByOutputType[P]>
        }
      >
    >


  export type AttachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    posts_id?: boolean
    path?: boolean
    posts?: boolean | PostDefaultArgs<ExtArgs>
    posted_content_has_attachments?: boolean | Attachment$posted_content_has_attachmentsArgs<ExtArgs>
    _count?: boolean | AttachmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attachment"]>



  export type AttachmentSelectScalar = {
    id?: boolean
    posts_id?: boolean
    path?: boolean
  }

  export type AttachmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "posts_id" | "path", ExtArgs["result"]["attachment"]>
  export type AttachmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | PostDefaultArgs<ExtArgs>
    posted_content_has_attachments?: boolean | Attachment$posted_content_has_attachmentsArgs<ExtArgs>
    _count?: boolean | AttachmentCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AttachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Attachment"
    objects: {
      posts: Prisma.$PostPayload<ExtArgs>
      posted_content_has_attachments: Prisma.$PostedContentAttachmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      /**
       * ID attachmentu
       */
      id: number
      /**
       * ID příspěvku, kterému attachment patří
       */
      posts_id: number
      /**
       * Cesta k souboru attachmentu
       */
      path: string
    }, ExtArgs["result"]["attachment"]>
    composites: {}
  }

  type AttachmentGetPayload<S extends boolean | null | undefined | AttachmentDefaultArgs> = $Result.GetResult<Prisma.$AttachmentPayload, S>

  type AttachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttachmentCountAggregateInputType | true
    }

  export interface AttachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attachment'], meta: { name: 'Attachment' } }
    /**
     * Find zero or one Attachment that matches the filter.
     * @param {AttachmentFindUniqueArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttachmentFindUniqueArgs>(args: SelectSubset<T, AttachmentFindUniqueArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttachmentFindUniqueOrThrowArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindFirstArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttachmentFindFirstArgs>(args?: SelectSubset<T, AttachmentFindFirstArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindFirstOrThrowArgs} args - Arguments to find a Attachment
     * @example
     * // Get one Attachment
     * const attachment = await prisma.attachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attachments
     * const attachments = await prisma.attachment.findMany()
     * 
     * // Get first 10 Attachments
     * const attachments = await prisma.attachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attachmentWithIdOnly = await prisma.attachment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttachmentFindManyArgs>(args?: SelectSubset<T, AttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attachment.
     * @param {AttachmentCreateArgs} args - Arguments to create a Attachment.
     * @example
     * // Create one Attachment
     * const Attachment = await prisma.attachment.create({
     *   data: {
     *     // ... data to create a Attachment
     *   }
     * })
     * 
     */
    create<T extends AttachmentCreateArgs>(args: SelectSubset<T, AttachmentCreateArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attachments.
     * @param {AttachmentCreateManyArgs} args - Arguments to create many Attachments.
     * @example
     * // Create many Attachments
     * const attachment = await prisma.attachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttachmentCreateManyArgs>(args?: SelectSubset<T, AttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Attachment.
     * @param {AttachmentDeleteArgs} args - Arguments to delete one Attachment.
     * @example
     * // Delete one Attachment
     * const Attachment = await prisma.attachment.delete({
     *   where: {
     *     // ... filter to delete one Attachment
     *   }
     * })
     * 
     */
    delete<T extends AttachmentDeleteArgs>(args: SelectSubset<T, AttachmentDeleteArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attachment.
     * @param {AttachmentUpdateArgs} args - Arguments to update one Attachment.
     * @example
     * // Update one Attachment
     * const attachment = await prisma.attachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttachmentUpdateArgs>(args: SelectSubset<T, AttachmentUpdateArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attachments.
     * @param {AttachmentDeleteManyArgs} args - Arguments to filter Attachments to delete.
     * @example
     * // Delete a few Attachments
     * const { count } = await prisma.attachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttachmentDeleteManyArgs>(args?: SelectSubset<T, AttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attachments
     * const attachment = await prisma.attachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttachmentUpdateManyArgs>(args: SelectSubset<T, AttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Attachment.
     * @param {AttachmentUpsertArgs} args - Arguments to update or create a Attachment.
     * @example
     * // Update or create a Attachment
     * const attachment = await prisma.attachment.upsert({
     *   create: {
     *     // ... data to create a Attachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attachment we want to update
     *   }
     * })
     */
    upsert<T extends AttachmentUpsertArgs>(args: SelectSubset<T, AttachmentUpsertArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Attachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentCountArgs} args - Arguments to filter Attachments to count.
     * @example
     * // Count the number of Attachments
     * const count = await prisma.attachment.count({
     *   where: {
     *     // ... the filter for the Attachments we want to count
     *   }
     * })
    **/
    count<T extends AttachmentCountArgs>(
      args?: Subset<T, AttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttachmentAggregateArgs>(args: Subset<T, AttachmentAggregateArgs>): Prisma.PrismaPromise<GetAttachmentAggregateType<T>>

    /**
     * Group by Attachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttachmentGroupByArgs['orderBy'] }
        : { orderBy?: AttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Attachment model
   */
  readonly fields: AttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    posts<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    posted_content_has_attachments<T extends Attachment$posted_content_has_attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Attachment$posted_content_has_attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostedContentAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Attachment model
   */
  interface AttachmentFieldRefs {
    readonly id: FieldRef<"Attachment", 'Int'>
    readonly posts_id: FieldRef<"Attachment", 'Int'>
    readonly path: FieldRef<"Attachment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Attachment findUnique
   */
  export type AttachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment findUniqueOrThrow
   */
  export type AttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment findFirst
   */
  export type AttachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attachments.
     */
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Attachment findFirstOrThrow
   */
  export type AttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachment to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attachments.
     */
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Attachment findMany
   */
  export type AttachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter, which Attachments to fetch.
     */
    where?: AttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attachments to fetch.
     */
    orderBy?: AttachmentOrderByWithRelationInput | AttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attachments.
     */
    cursor?: AttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attachments.
     */
    skip?: number
    distinct?: AttachmentScalarFieldEnum | AttachmentScalarFieldEnum[]
  }

  /**
   * Attachment create
   */
  export type AttachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Attachment.
     */
    data: XOR<AttachmentCreateInput, AttachmentUncheckedCreateInput>
  }

  /**
   * Attachment createMany
   */
  export type AttachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attachments.
     */
    data: AttachmentCreateManyInput | AttachmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Attachment update
   */
  export type AttachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Attachment.
     */
    data: XOR<AttachmentUpdateInput, AttachmentUncheckedUpdateInput>
    /**
     * Choose, which Attachment to update.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment updateMany
   */
  export type AttachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attachments.
     */
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyInput>
    /**
     * Filter which Attachments to update
     */
    where?: AttachmentWhereInput
    /**
     * Limit how many Attachments to update.
     */
    limit?: number
  }

  /**
   * Attachment upsert
   */
  export type AttachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Attachment to update in case it exists.
     */
    where: AttachmentWhereUniqueInput
    /**
     * In case the Attachment found by the `where` argument doesn't exist, create a new Attachment with this data.
     */
    create: XOR<AttachmentCreateInput, AttachmentUncheckedCreateInput>
    /**
     * In case the Attachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttachmentUpdateInput, AttachmentUncheckedUpdateInput>
  }

  /**
   * Attachment delete
   */
  export type AttachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
    /**
     * Filter which Attachment to delete.
     */
    where: AttachmentWhereUniqueInput
  }

  /**
   * Attachment deleteMany
   */
  export type AttachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attachments to delete
     */
    where?: AttachmentWhereInput
    /**
     * Limit how many Attachments to delete.
     */
    limit?: number
  }

  /**
   * Attachment.posted_content_has_attachments
   */
  export type Attachment$posted_content_has_attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContentAttachment
     */
    select?: PostedContentAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContentAttachment
     */
    omit?: PostedContentAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentAttachmentInclude<ExtArgs> | null
    where?: PostedContentAttachmentWhereInput
    orderBy?: PostedContentAttachmentOrderByWithRelationInput | PostedContentAttachmentOrderByWithRelationInput[]
    cursor?: PostedContentAttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostedContentAttachmentScalarFieldEnum | PostedContentAttachmentScalarFieldEnum[]
  }

  /**
   * Attachment without action
   */
  export type AttachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attachment
     */
    select?: AttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attachment
     */
    omit?: AttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentInclude<ExtArgs> | null
  }


  /**
   * Model Content
   */

  export type AggregateContent = {
    _count: ContentCountAggregateOutputType | null
    _avg: ContentAvgAggregateOutputType | null
    _sum: ContentSumAggregateOutputType | null
    _min: ContentMinAggregateOutputType | null
    _max: ContentMaxAggregateOutputType | null
  }

  export type ContentAvgAggregateOutputType = {
    id: number | null
    posts_id: number | null
  }

  export type ContentSumAggregateOutputType = {
    id: number | null
    posts_id: number | null
  }

  export type ContentMinAggregateOutputType = {
    id: number | null
    posts_id: number | null
    content: string | null
  }

  export type ContentMaxAggregateOutputType = {
    id: number | null
    posts_id: number | null
    content: string | null
  }

  export type ContentCountAggregateOutputType = {
    id: number
    posts_id: number
    content: number
    _all: number
  }


  export type ContentAvgAggregateInputType = {
    id?: true
    posts_id?: true
  }

  export type ContentSumAggregateInputType = {
    id?: true
    posts_id?: true
  }

  export type ContentMinAggregateInputType = {
    id?: true
    posts_id?: true
    content?: true
  }

  export type ContentMaxAggregateInputType = {
    id?: true
    posts_id?: true
    content?: true
  }

  export type ContentCountAggregateInputType = {
    id?: true
    posts_id?: true
    content?: true
    _all?: true
  }

  export type ContentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Content to aggregate.
     */
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     */
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contents
    **/
    _count?: true | ContentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContentMaxAggregateInputType
  }

  export type GetContentAggregateType<T extends ContentAggregateArgs> = {
        [P in keyof T & keyof AggregateContent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContent[P]>
      : GetScalarType<T[P], AggregateContent[P]>
  }




  export type ContentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContentWhereInput
    orderBy?: ContentOrderByWithAggregationInput | ContentOrderByWithAggregationInput[]
    by: ContentScalarFieldEnum[] | ContentScalarFieldEnum
    having?: ContentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContentCountAggregateInputType | true
    _avg?: ContentAvgAggregateInputType
    _sum?: ContentSumAggregateInputType
    _min?: ContentMinAggregateInputType
    _max?: ContentMaxAggregateInputType
  }

  export type ContentGroupByOutputType = {
    id: number
    posts_id: number
    content: string
    _count: ContentCountAggregateOutputType | null
    _avg: ContentAvgAggregateOutputType | null
    _sum: ContentSumAggregateOutputType | null
    _min: ContentMinAggregateOutputType | null
    _max: ContentMaxAggregateOutputType | null
  }

  type GetContentGroupByPayload<T extends ContentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContentGroupByOutputType[P]>
            : GetScalarType<T[P], ContentGroupByOutputType[P]>
        }
      >
    >


  export type ContentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    posts_id?: boolean
    content?: boolean
    posts?: boolean | PostDefaultArgs<ExtArgs>
    posted_content?: boolean | Content$posted_contentArgs<ExtArgs>
    _count?: boolean | ContentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["content"]>



  export type ContentSelectScalar = {
    id?: boolean
    posts_id?: boolean
    content?: boolean
  }

  export type ContentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "posts_id" | "content", ExtArgs["result"]["content"]>
  export type ContentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | PostDefaultArgs<ExtArgs>
    posted_content?: boolean | Content$posted_contentArgs<ExtArgs>
    _count?: boolean | ContentCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ContentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Content"
    objects: {
      posts: Prisma.$PostPayload<ExtArgs>
      posted_content: Prisma.$PostedContentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      /**
       * ID obsahu jednotlivých příspěvků
       */
      id: number
      /**
       * ID postu, ke kterému obsah příspěvku patří
       */
      posts_id: number
      /**
       * Obsah příspěvku
       */
      content: string
    }, ExtArgs["result"]["content"]>
    composites: {}
  }

  type ContentGetPayload<S extends boolean | null | undefined | ContentDefaultArgs> = $Result.GetResult<Prisma.$ContentPayload, S>

  type ContentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContentCountAggregateInputType | true
    }

  export interface ContentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Content'], meta: { name: 'Content' } }
    /**
     * Find zero or one Content that matches the filter.
     * @param {ContentFindUniqueArgs} args - Arguments to find a Content
     * @example
     * // Get one Content
     * const content = await prisma.content.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContentFindUniqueArgs>(args: SelectSubset<T, ContentFindUniqueArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Content that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContentFindUniqueOrThrowArgs} args - Arguments to find a Content
     * @example
     * // Get one Content
     * const content = await prisma.content.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContentFindUniqueOrThrowArgs>(args: SelectSubset<T, ContentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Content that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentFindFirstArgs} args - Arguments to find a Content
     * @example
     * // Get one Content
     * const content = await prisma.content.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContentFindFirstArgs>(args?: SelectSubset<T, ContentFindFirstArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Content that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentFindFirstOrThrowArgs} args - Arguments to find a Content
     * @example
     * // Get one Content
     * const content = await prisma.content.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContentFindFirstOrThrowArgs>(args?: SelectSubset<T, ContentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contents
     * const contents = await prisma.content.findMany()
     * 
     * // Get first 10 Contents
     * const contents = await prisma.content.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contentWithIdOnly = await prisma.content.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContentFindManyArgs>(args?: SelectSubset<T, ContentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Content.
     * @param {ContentCreateArgs} args - Arguments to create a Content.
     * @example
     * // Create one Content
     * const Content = await prisma.content.create({
     *   data: {
     *     // ... data to create a Content
     *   }
     * })
     * 
     */
    create<T extends ContentCreateArgs>(args: SelectSubset<T, ContentCreateArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contents.
     * @param {ContentCreateManyArgs} args - Arguments to create many Contents.
     * @example
     * // Create many Contents
     * const content = await prisma.content.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContentCreateManyArgs>(args?: SelectSubset<T, ContentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Content.
     * @param {ContentDeleteArgs} args - Arguments to delete one Content.
     * @example
     * // Delete one Content
     * const Content = await prisma.content.delete({
     *   where: {
     *     // ... filter to delete one Content
     *   }
     * })
     * 
     */
    delete<T extends ContentDeleteArgs>(args: SelectSubset<T, ContentDeleteArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Content.
     * @param {ContentUpdateArgs} args - Arguments to update one Content.
     * @example
     * // Update one Content
     * const content = await prisma.content.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContentUpdateArgs>(args: SelectSubset<T, ContentUpdateArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contents.
     * @param {ContentDeleteManyArgs} args - Arguments to filter Contents to delete.
     * @example
     * // Delete a few Contents
     * const { count } = await prisma.content.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContentDeleteManyArgs>(args?: SelectSubset<T, ContentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contents
     * const content = await prisma.content.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContentUpdateManyArgs>(args: SelectSubset<T, ContentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Content.
     * @param {ContentUpsertArgs} args - Arguments to update or create a Content.
     * @example
     * // Update or create a Content
     * const content = await prisma.content.upsert({
     *   create: {
     *     // ... data to create a Content
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Content we want to update
     *   }
     * })
     */
    upsert<T extends ContentUpsertArgs>(args: SelectSubset<T, ContentUpsertArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentCountArgs} args - Arguments to filter Contents to count.
     * @example
     * // Count the number of Contents
     * const count = await prisma.content.count({
     *   where: {
     *     // ... the filter for the Contents we want to count
     *   }
     * })
    **/
    count<T extends ContentCountArgs>(
      args?: Subset<T, ContentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Content.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContentAggregateArgs>(args: Subset<T, ContentAggregateArgs>): Prisma.PrismaPromise<GetContentAggregateType<T>>

    /**
     * Group by Content.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContentGroupByArgs['orderBy'] }
        : { orderBy?: ContentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Content model
   */
  readonly fields: ContentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Content.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    posts<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    posted_content<T extends Content$posted_contentArgs<ExtArgs> = {}>(args?: Subset<T, Content$posted_contentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostedContentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Content model
   */
  interface ContentFieldRefs {
    readonly id: FieldRef<"Content", 'Int'>
    readonly posts_id: FieldRef<"Content", 'Int'>
    readonly content: FieldRef<"Content", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Content findUnique
   */
  export type ContentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Content
     */
    omit?: ContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter, which Content to fetch.
     */
    where: ContentWhereUniqueInput
  }

  /**
   * Content findUniqueOrThrow
   */
  export type ContentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Content
     */
    omit?: ContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter, which Content to fetch.
     */
    where: ContentWhereUniqueInput
  }

  /**
   * Content findFirst
   */
  export type ContentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Content
     */
    omit?: ContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter, which Content to fetch.
     */
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     */
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contents.
     */
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contents.
     */
    distinct?: ContentScalarFieldEnum | ContentScalarFieldEnum[]
  }

  /**
   * Content findFirstOrThrow
   */
  export type ContentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Content
     */
    omit?: ContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter, which Content to fetch.
     */
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     */
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contents.
     */
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contents.
     */
    distinct?: ContentScalarFieldEnum | ContentScalarFieldEnum[]
  }

  /**
   * Content findMany
   */
  export type ContentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Content
     */
    omit?: ContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter, which Contents to fetch.
     */
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     */
    orderBy?: ContentOrderByWithRelationInput | ContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contents.
     */
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     */
    skip?: number
    distinct?: ContentScalarFieldEnum | ContentScalarFieldEnum[]
  }

  /**
   * Content create
   */
  export type ContentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Content
     */
    omit?: ContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * The data needed to create a Content.
     */
    data: XOR<ContentCreateInput, ContentUncheckedCreateInput>
  }

  /**
   * Content createMany
   */
  export type ContentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contents.
     */
    data: ContentCreateManyInput | ContentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Content update
   */
  export type ContentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Content
     */
    omit?: ContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * The data needed to update a Content.
     */
    data: XOR<ContentUpdateInput, ContentUncheckedUpdateInput>
    /**
     * Choose, which Content to update.
     */
    where: ContentWhereUniqueInput
  }

  /**
   * Content updateMany
   */
  export type ContentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contents.
     */
    data: XOR<ContentUpdateManyMutationInput, ContentUncheckedUpdateManyInput>
    /**
     * Filter which Contents to update
     */
    where?: ContentWhereInput
    /**
     * Limit how many Contents to update.
     */
    limit?: number
  }

  /**
   * Content upsert
   */
  export type ContentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Content
     */
    omit?: ContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * The filter to search for the Content to update in case it exists.
     */
    where: ContentWhereUniqueInput
    /**
     * In case the Content found by the `where` argument doesn't exist, create a new Content with this data.
     */
    create: XOR<ContentCreateInput, ContentUncheckedCreateInput>
    /**
     * In case the Content was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContentUpdateInput, ContentUncheckedUpdateInput>
  }

  /**
   * Content delete
   */
  export type ContentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Content
     */
    omit?: ContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
    /**
     * Filter which Content to delete.
     */
    where: ContentWhereUniqueInput
  }

  /**
   * Content deleteMany
   */
  export type ContentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contents to delete
     */
    where?: ContentWhereInput
    /**
     * Limit how many Contents to delete.
     */
    limit?: number
  }

  /**
   * Content.posted_content
   */
  export type Content$posted_contentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContent
     */
    select?: PostedContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContent
     */
    omit?: PostedContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentInclude<ExtArgs> | null
    where?: PostedContentWhereInput
    orderBy?: PostedContentOrderByWithRelationInput | PostedContentOrderByWithRelationInput[]
    cursor?: PostedContentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostedContentScalarFieldEnum | PostedContentScalarFieldEnum[]
  }

  /**
   * Content without action
   */
  export type ContentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Content
     */
    omit?: ContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContentInclude<ExtArgs> | null
  }


  /**
   * Model PostedContent
   */

  export type AggregatePostedContent = {
    _count: PostedContentCountAggregateOutputType | null
    _avg: PostedContentAvgAggregateOutputType | null
    _sum: PostedContentSumAggregateOutputType | null
    _min: PostedContentMinAggregateOutputType | null
    _max: PostedContentMaxAggregateOutputType | null
  }

  export type PostedContentAvgAggregateOutputType = {
    posts_id: number | null
    networks_id: number | null
    contents_id: number | null
  }

  export type PostedContentSumAggregateOutputType = {
    posts_id: number | null
    networks_id: number | null
    contents_id: number | null
  }

  export type PostedContentMinAggregateOutputType = {
    posts_id: number | null
    networks_id: number | null
    contents_id: number | null
    post_date: Date | null
    actual_post_date: Date | null
    network_post_id: string | null
  }

  export type PostedContentMaxAggregateOutputType = {
    posts_id: number | null
    networks_id: number | null
    contents_id: number | null
    post_date: Date | null
    actual_post_date: Date | null
    network_post_id: string | null
  }

  export type PostedContentCountAggregateOutputType = {
    posts_id: number
    networks_id: number
    contents_id: number
    post_date: number
    actual_post_date: number
    network_post_id: number
    _all: number
  }


  export type PostedContentAvgAggregateInputType = {
    posts_id?: true
    networks_id?: true
    contents_id?: true
  }

  export type PostedContentSumAggregateInputType = {
    posts_id?: true
    networks_id?: true
    contents_id?: true
  }

  export type PostedContentMinAggregateInputType = {
    posts_id?: true
    networks_id?: true
    contents_id?: true
    post_date?: true
    actual_post_date?: true
    network_post_id?: true
  }

  export type PostedContentMaxAggregateInputType = {
    posts_id?: true
    networks_id?: true
    contents_id?: true
    post_date?: true
    actual_post_date?: true
    network_post_id?: true
  }

  export type PostedContentCountAggregateInputType = {
    posts_id?: true
    networks_id?: true
    contents_id?: true
    post_date?: true
    actual_post_date?: true
    network_post_id?: true
    _all?: true
  }

  export type PostedContentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostedContent to aggregate.
     */
    where?: PostedContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostedContents to fetch.
     */
    orderBy?: PostedContentOrderByWithRelationInput | PostedContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostedContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostedContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostedContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostedContents
    **/
    _count?: true | PostedContentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostedContentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostedContentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostedContentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostedContentMaxAggregateInputType
  }

  export type GetPostedContentAggregateType<T extends PostedContentAggregateArgs> = {
        [P in keyof T & keyof AggregatePostedContent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostedContent[P]>
      : GetScalarType<T[P], AggregatePostedContent[P]>
  }




  export type PostedContentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostedContentWhereInput
    orderBy?: PostedContentOrderByWithAggregationInput | PostedContentOrderByWithAggregationInput[]
    by: PostedContentScalarFieldEnum[] | PostedContentScalarFieldEnum
    having?: PostedContentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostedContentCountAggregateInputType | true
    _avg?: PostedContentAvgAggregateInputType
    _sum?: PostedContentSumAggregateInputType
    _min?: PostedContentMinAggregateInputType
    _max?: PostedContentMaxAggregateInputType
  }

  export type PostedContentGroupByOutputType = {
    posts_id: number
    networks_id: number
    contents_id: number
    post_date: Date | null
    actual_post_date: Date | null
    network_post_id: string | null
    _count: PostedContentCountAggregateOutputType | null
    _avg: PostedContentAvgAggregateOutputType | null
    _sum: PostedContentSumAggregateOutputType | null
    _min: PostedContentMinAggregateOutputType | null
    _max: PostedContentMaxAggregateOutputType | null
  }

  type GetPostedContentGroupByPayload<T extends PostedContentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostedContentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostedContentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostedContentGroupByOutputType[P]>
            : GetScalarType<T[P], PostedContentGroupByOutputType[P]>
        }
      >
    >


  export type PostedContentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    posts_id?: boolean
    networks_id?: boolean
    contents_id?: boolean
    post_date?: boolean
    actual_post_date?: boolean
    network_post_id?: boolean
    contents?: boolean | ContentDefaultArgs<ExtArgs>
    networks?: boolean | NetworkDefaultArgs<ExtArgs>
    posts?: boolean | PostDefaultArgs<ExtArgs>
    posted_content_has_attachments?: boolean | PostedContent$posted_content_has_attachmentsArgs<ExtArgs>
    _count?: boolean | PostedContentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postedContent"]>



  export type PostedContentSelectScalar = {
    posts_id?: boolean
    networks_id?: boolean
    contents_id?: boolean
    post_date?: boolean
    actual_post_date?: boolean
    network_post_id?: boolean
  }

  export type PostedContentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"posts_id" | "networks_id" | "contents_id" | "post_date" | "actual_post_date" | "network_post_id", ExtArgs["result"]["postedContent"]>
  export type PostedContentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contents?: boolean | ContentDefaultArgs<ExtArgs>
    networks?: boolean | NetworkDefaultArgs<ExtArgs>
    posts?: boolean | PostDefaultArgs<ExtArgs>
    posted_content_has_attachments?: boolean | PostedContent$posted_content_has_attachmentsArgs<ExtArgs>
    _count?: boolean | PostedContentCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PostedContentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostedContent"
    objects: {
      contents: Prisma.$ContentPayload<ExtArgs>
      networks: Prisma.$NetworkPayload<ExtArgs>
      posts: Prisma.$PostPayload<ExtArgs>
      posted_content_has_attachments: Prisma.$PostedContentAttachmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      /**
       * ID příspěvku
       */
      posts_id: number
      /**
       * ID networku, na kterou je příspěvek odesílán
       */
      networks_id: number
      /**
       * ID obsahu příspěvku, který je odeslán na danou síť
       */
      contents_id: number
      /**
       * Datum, kdy má být příspěvek postnut
       */
      post_date: Date | null
      /**
       * Skutečné datum odeslání příspěvku vzhledem k možným zpožděním API nebo případným problémům
       */
      actual_post_date: Date | null
      /**
       * ID příspěvku na sociální sítí
       */
      network_post_id: string | null
    }, ExtArgs["result"]["postedContent"]>
    composites: {}
  }

  type PostedContentGetPayload<S extends boolean | null | undefined | PostedContentDefaultArgs> = $Result.GetResult<Prisma.$PostedContentPayload, S>

  type PostedContentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostedContentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostedContentCountAggregateInputType | true
    }

  export interface PostedContentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostedContent'], meta: { name: 'PostedContent' } }
    /**
     * Find zero or one PostedContent that matches the filter.
     * @param {PostedContentFindUniqueArgs} args - Arguments to find a PostedContent
     * @example
     * // Get one PostedContent
     * const postedContent = await prisma.postedContent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostedContentFindUniqueArgs>(args: SelectSubset<T, PostedContentFindUniqueArgs<ExtArgs>>): Prisma__PostedContentClient<$Result.GetResult<Prisma.$PostedContentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostedContent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostedContentFindUniqueOrThrowArgs} args - Arguments to find a PostedContent
     * @example
     * // Get one PostedContent
     * const postedContent = await prisma.postedContent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostedContentFindUniqueOrThrowArgs>(args: SelectSubset<T, PostedContentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostedContentClient<$Result.GetResult<Prisma.$PostedContentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostedContent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostedContentFindFirstArgs} args - Arguments to find a PostedContent
     * @example
     * // Get one PostedContent
     * const postedContent = await prisma.postedContent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostedContentFindFirstArgs>(args?: SelectSubset<T, PostedContentFindFirstArgs<ExtArgs>>): Prisma__PostedContentClient<$Result.GetResult<Prisma.$PostedContentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostedContent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostedContentFindFirstOrThrowArgs} args - Arguments to find a PostedContent
     * @example
     * // Get one PostedContent
     * const postedContent = await prisma.postedContent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostedContentFindFirstOrThrowArgs>(args?: SelectSubset<T, PostedContentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostedContentClient<$Result.GetResult<Prisma.$PostedContentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostedContents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostedContentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostedContents
     * const postedContents = await prisma.postedContent.findMany()
     * 
     * // Get first 10 PostedContents
     * const postedContents = await prisma.postedContent.findMany({ take: 10 })
     * 
     * // Only select the `posts_id`
     * const postedContentWithPosts_idOnly = await prisma.postedContent.findMany({ select: { posts_id: true } })
     * 
     */
    findMany<T extends PostedContentFindManyArgs>(args?: SelectSubset<T, PostedContentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostedContentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostedContent.
     * @param {PostedContentCreateArgs} args - Arguments to create a PostedContent.
     * @example
     * // Create one PostedContent
     * const PostedContent = await prisma.postedContent.create({
     *   data: {
     *     // ... data to create a PostedContent
     *   }
     * })
     * 
     */
    create<T extends PostedContentCreateArgs>(args: SelectSubset<T, PostedContentCreateArgs<ExtArgs>>): Prisma__PostedContentClient<$Result.GetResult<Prisma.$PostedContentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostedContents.
     * @param {PostedContentCreateManyArgs} args - Arguments to create many PostedContents.
     * @example
     * // Create many PostedContents
     * const postedContent = await prisma.postedContent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostedContentCreateManyArgs>(args?: SelectSubset<T, PostedContentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PostedContent.
     * @param {PostedContentDeleteArgs} args - Arguments to delete one PostedContent.
     * @example
     * // Delete one PostedContent
     * const PostedContent = await prisma.postedContent.delete({
     *   where: {
     *     // ... filter to delete one PostedContent
     *   }
     * })
     * 
     */
    delete<T extends PostedContentDeleteArgs>(args: SelectSubset<T, PostedContentDeleteArgs<ExtArgs>>): Prisma__PostedContentClient<$Result.GetResult<Prisma.$PostedContentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostedContent.
     * @param {PostedContentUpdateArgs} args - Arguments to update one PostedContent.
     * @example
     * // Update one PostedContent
     * const postedContent = await prisma.postedContent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostedContentUpdateArgs>(args: SelectSubset<T, PostedContentUpdateArgs<ExtArgs>>): Prisma__PostedContentClient<$Result.GetResult<Prisma.$PostedContentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostedContents.
     * @param {PostedContentDeleteManyArgs} args - Arguments to filter PostedContents to delete.
     * @example
     * // Delete a few PostedContents
     * const { count } = await prisma.postedContent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostedContentDeleteManyArgs>(args?: SelectSubset<T, PostedContentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostedContents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostedContentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostedContents
     * const postedContent = await prisma.postedContent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostedContentUpdateManyArgs>(args: SelectSubset<T, PostedContentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PostedContent.
     * @param {PostedContentUpsertArgs} args - Arguments to update or create a PostedContent.
     * @example
     * // Update or create a PostedContent
     * const postedContent = await prisma.postedContent.upsert({
     *   create: {
     *     // ... data to create a PostedContent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostedContent we want to update
     *   }
     * })
     */
    upsert<T extends PostedContentUpsertArgs>(args: SelectSubset<T, PostedContentUpsertArgs<ExtArgs>>): Prisma__PostedContentClient<$Result.GetResult<Prisma.$PostedContentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostedContents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostedContentCountArgs} args - Arguments to filter PostedContents to count.
     * @example
     * // Count the number of PostedContents
     * const count = await prisma.postedContent.count({
     *   where: {
     *     // ... the filter for the PostedContents we want to count
     *   }
     * })
    **/
    count<T extends PostedContentCountArgs>(
      args?: Subset<T, PostedContentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostedContentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostedContent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostedContentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostedContentAggregateArgs>(args: Subset<T, PostedContentAggregateArgs>): Prisma.PrismaPromise<GetPostedContentAggregateType<T>>

    /**
     * Group by PostedContent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostedContentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostedContentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostedContentGroupByArgs['orderBy'] }
        : { orderBy?: PostedContentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostedContentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostedContentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostedContent model
   */
  readonly fields: PostedContentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostedContent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostedContentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contents<T extends ContentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContentDefaultArgs<ExtArgs>>): Prisma__ContentClient<$Result.GetResult<Prisma.$ContentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    networks<T extends NetworkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NetworkDefaultArgs<ExtArgs>>): Prisma__NetworkClient<$Result.GetResult<Prisma.$NetworkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    posts<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    posted_content_has_attachments<T extends PostedContent$posted_content_has_attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, PostedContent$posted_content_has_attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostedContentAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostedContent model
   */
  interface PostedContentFieldRefs {
    readonly posts_id: FieldRef<"PostedContent", 'Int'>
    readonly networks_id: FieldRef<"PostedContent", 'Int'>
    readonly contents_id: FieldRef<"PostedContent", 'Int'>
    readonly post_date: FieldRef<"PostedContent", 'DateTime'>
    readonly actual_post_date: FieldRef<"PostedContent", 'DateTime'>
    readonly network_post_id: FieldRef<"PostedContent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PostedContent findUnique
   */
  export type PostedContentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContent
     */
    select?: PostedContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContent
     */
    omit?: PostedContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentInclude<ExtArgs> | null
    /**
     * Filter, which PostedContent to fetch.
     */
    where: PostedContentWhereUniqueInput
  }

  /**
   * PostedContent findUniqueOrThrow
   */
  export type PostedContentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContent
     */
    select?: PostedContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContent
     */
    omit?: PostedContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentInclude<ExtArgs> | null
    /**
     * Filter, which PostedContent to fetch.
     */
    where: PostedContentWhereUniqueInput
  }

  /**
   * PostedContent findFirst
   */
  export type PostedContentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContent
     */
    select?: PostedContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContent
     */
    omit?: PostedContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentInclude<ExtArgs> | null
    /**
     * Filter, which PostedContent to fetch.
     */
    where?: PostedContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostedContents to fetch.
     */
    orderBy?: PostedContentOrderByWithRelationInput | PostedContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostedContents.
     */
    cursor?: PostedContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostedContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostedContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostedContents.
     */
    distinct?: PostedContentScalarFieldEnum | PostedContentScalarFieldEnum[]
  }

  /**
   * PostedContent findFirstOrThrow
   */
  export type PostedContentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContent
     */
    select?: PostedContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContent
     */
    omit?: PostedContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentInclude<ExtArgs> | null
    /**
     * Filter, which PostedContent to fetch.
     */
    where?: PostedContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostedContents to fetch.
     */
    orderBy?: PostedContentOrderByWithRelationInput | PostedContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostedContents.
     */
    cursor?: PostedContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostedContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostedContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostedContents.
     */
    distinct?: PostedContentScalarFieldEnum | PostedContentScalarFieldEnum[]
  }

  /**
   * PostedContent findMany
   */
  export type PostedContentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContent
     */
    select?: PostedContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContent
     */
    omit?: PostedContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentInclude<ExtArgs> | null
    /**
     * Filter, which PostedContents to fetch.
     */
    where?: PostedContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostedContents to fetch.
     */
    orderBy?: PostedContentOrderByWithRelationInput | PostedContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostedContents.
     */
    cursor?: PostedContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostedContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostedContents.
     */
    skip?: number
    distinct?: PostedContentScalarFieldEnum | PostedContentScalarFieldEnum[]
  }

  /**
   * PostedContent create
   */
  export type PostedContentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContent
     */
    select?: PostedContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContent
     */
    omit?: PostedContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentInclude<ExtArgs> | null
    /**
     * The data needed to create a PostedContent.
     */
    data: XOR<PostedContentCreateInput, PostedContentUncheckedCreateInput>
  }

  /**
   * PostedContent createMany
   */
  export type PostedContentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostedContents.
     */
    data: PostedContentCreateManyInput | PostedContentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostedContent update
   */
  export type PostedContentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContent
     */
    select?: PostedContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContent
     */
    omit?: PostedContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentInclude<ExtArgs> | null
    /**
     * The data needed to update a PostedContent.
     */
    data: XOR<PostedContentUpdateInput, PostedContentUncheckedUpdateInput>
    /**
     * Choose, which PostedContent to update.
     */
    where: PostedContentWhereUniqueInput
  }

  /**
   * PostedContent updateMany
   */
  export type PostedContentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostedContents.
     */
    data: XOR<PostedContentUpdateManyMutationInput, PostedContentUncheckedUpdateManyInput>
    /**
     * Filter which PostedContents to update
     */
    where?: PostedContentWhereInput
    /**
     * Limit how many PostedContents to update.
     */
    limit?: number
  }

  /**
   * PostedContent upsert
   */
  export type PostedContentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContent
     */
    select?: PostedContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContent
     */
    omit?: PostedContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentInclude<ExtArgs> | null
    /**
     * The filter to search for the PostedContent to update in case it exists.
     */
    where: PostedContentWhereUniqueInput
    /**
     * In case the PostedContent found by the `where` argument doesn't exist, create a new PostedContent with this data.
     */
    create: XOR<PostedContentCreateInput, PostedContentUncheckedCreateInput>
    /**
     * In case the PostedContent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostedContentUpdateInput, PostedContentUncheckedUpdateInput>
  }

  /**
   * PostedContent delete
   */
  export type PostedContentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContent
     */
    select?: PostedContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContent
     */
    omit?: PostedContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentInclude<ExtArgs> | null
    /**
     * Filter which PostedContent to delete.
     */
    where: PostedContentWhereUniqueInput
  }

  /**
   * PostedContent deleteMany
   */
  export type PostedContentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostedContents to delete
     */
    where?: PostedContentWhereInput
    /**
     * Limit how many PostedContents to delete.
     */
    limit?: number
  }

  /**
   * PostedContent.posted_content_has_attachments
   */
  export type PostedContent$posted_content_has_attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContentAttachment
     */
    select?: PostedContentAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContentAttachment
     */
    omit?: PostedContentAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentAttachmentInclude<ExtArgs> | null
    where?: PostedContentAttachmentWhereInput
    orderBy?: PostedContentAttachmentOrderByWithRelationInput | PostedContentAttachmentOrderByWithRelationInput[]
    cursor?: PostedContentAttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostedContentAttachmentScalarFieldEnum | PostedContentAttachmentScalarFieldEnum[]
  }

  /**
   * PostedContent without action
   */
  export type PostedContentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContent
     */
    select?: PostedContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContent
     */
    omit?: PostedContentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentInclude<ExtArgs> | null
  }


  /**
   * Model PostedContentAttachment
   */

  export type AggregatePostedContentAttachment = {
    _count: PostedContentAttachmentCountAggregateOutputType | null
    _avg: PostedContentAttachmentAvgAggregateOutputType | null
    _sum: PostedContentAttachmentSumAggregateOutputType | null
    _min: PostedContentAttachmentMinAggregateOutputType | null
    _max: PostedContentAttachmentMaxAggregateOutputType | null
  }

  export type PostedContentAttachmentAvgAggregateOutputType = {
    posts_id: number | null
    networks_id: number | null
    attachments_id: number | null
  }

  export type PostedContentAttachmentSumAggregateOutputType = {
    posts_id: number | null
    networks_id: number | null
    attachments_id: number | null
  }

  export type PostedContentAttachmentMinAggregateOutputType = {
    posts_id: number | null
    networks_id: number | null
    attachments_id: number | null
  }

  export type PostedContentAttachmentMaxAggregateOutputType = {
    posts_id: number | null
    networks_id: number | null
    attachments_id: number | null
  }

  export type PostedContentAttachmentCountAggregateOutputType = {
    posts_id: number
    networks_id: number
    attachments_id: number
    _all: number
  }


  export type PostedContentAttachmentAvgAggregateInputType = {
    posts_id?: true
    networks_id?: true
    attachments_id?: true
  }

  export type PostedContentAttachmentSumAggregateInputType = {
    posts_id?: true
    networks_id?: true
    attachments_id?: true
  }

  export type PostedContentAttachmentMinAggregateInputType = {
    posts_id?: true
    networks_id?: true
    attachments_id?: true
  }

  export type PostedContentAttachmentMaxAggregateInputType = {
    posts_id?: true
    networks_id?: true
    attachments_id?: true
  }

  export type PostedContentAttachmentCountAggregateInputType = {
    posts_id?: true
    networks_id?: true
    attachments_id?: true
    _all?: true
  }

  export type PostedContentAttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostedContentAttachment to aggregate.
     */
    where?: PostedContentAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostedContentAttachments to fetch.
     */
    orderBy?: PostedContentAttachmentOrderByWithRelationInput | PostedContentAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostedContentAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostedContentAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostedContentAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostedContentAttachments
    **/
    _count?: true | PostedContentAttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostedContentAttachmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostedContentAttachmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostedContentAttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostedContentAttachmentMaxAggregateInputType
  }

  export type GetPostedContentAttachmentAggregateType<T extends PostedContentAttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregatePostedContentAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostedContentAttachment[P]>
      : GetScalarType<T[P], AggregatePostedContentAttachment[P]>
  }




  export type PostedContentAttachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostedContentAttachmentWhereInput
    orderBy?: PostedContentAttachmentOrderByWithAggregationInput | PostedContentAttachmentOrderByWithAggregationInput[]
    by: PostedContentAttachmentScalarFieldEnum[] | PostedContentAttachmentScalarFieldEnum
    having?: PostedContentAttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostedContentAttachmentCountAggregateInputType | true
    _avg?: PostedContentAttachmentAvgAggregateInputType
    _sum?: PostedContentAttachmentSumAggregateInputType
    _min?: PostedContentAttachmentMinAggregateInputType
    _max?: PostedContentAttachmentMaxAggregateInputType
  }

  export type PostedContentAttachmentGroupByOutputType = {
    posts_id: number
    networks_id: number
    attachments_id: number
    _count: PostedContentAttachmentCountAggregateOutputType | null
    _avg: PostedContentAttachmentAvgAggregateOutputType | null
    _sum: PostedContentAttachmentSumAggregateOutputType | null
    _min: PostedContentAttachmentMinAggregateOutputType | null
    _max: PostedContentAttachmentMaxAggregateOutputType | null
  }

  type GetPostedContentAttachmentGroupByPayload<T extends PostedContentAttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostedContentAttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostedContentAttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostedContentAttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], PostedContentAttachmentGroupByOutputType[P]>
        }
      >
    >


  export type PostedContentAttachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    posts_id?: boolean
    networks_id?: boolean
    attachments_id?: boolean
    attachments?: boolean | AttachmentDefaultArgs<ExtArgs>
    posted_content?: boolean | PostedContentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postedContentAttachment"]>



  export type PostedContentAttachmentSelectScalar = {
    posts_id?: boolean
    networks_id?: boolean
    attachments_id?: boolean
  }

  export type PostedContentAttachmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"posts_id" | "networks_id" | "attachments_id", ExtArgs["result"]["postedContentAttachment"]>
  export type PostedContentAttachmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attachments?: boolean | AttachmentDefaultArgs<ExtArgs>
    posted_content?: boolean | PostedContentDefaultArgs<ExtArgs>
  }

  export type $PostedContentAttachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostedContentAttachment"
    objects: {
      attachments: Prisma.$AttachmentPayload<ExtArgs>
      posted_content: Prisma.$PostedContentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      /**
       * ID vybraného postu, ke kterému attachment patří
       */
      posts_id: number
      /**
       * ID networku vybraného postu, ke kterému attachment patří
       */
      networks_id: number
      /**
       * ID attachmentu, který patří k vybranému příspěvku dané sociální sítě
       */
      attachments_id: number
    }, ExtArgs["result"]["postedContentAttachment"]>
    composites: {}
  }

  type PostedContentAttachmentGetPayload<S extends boolean | null | undefined | PostedContentAttachmentDefaultArgs> = $Result.GetResult<Prisma.$PostedContentAttachmentPayload, S>

  type PostedContentAttachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostedContentAttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostedContentAttachmentCountAggregateInputType | true
    }

  export interface PostedContentAttachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostedContentAttachment'], meta: { name: 'PostedContentAttachment' } }
    /**
     * Find zero or one PostedContentAttachment that matches the filter.
     * @param {PostedContentAttachmentFindUniqueArgs} args - Arguments to find a PostedContentAttachment
     * @example
     * // Get one PostedContentAttachment
     * const postedContentAttachment = await prisma.postedContentAttachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostedContentAttachmentFindUniqueArgs>(args: SelectSubset<T, PostedContentAttachmentFindUniqueArgs<ExtArgs>>): Prisma__PostedContentAttachmentClient<$Result.GetResult<Prisma.$PostedContentAttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostedContentAttachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostedContentAttachmentFindUniqueOrThrowArgs} args - Arguments to find a PostedContentAttachment
     * @example
     * // Get one PostedContentAttachment
     * const postedContentAttachment = await prisma.postedContentAttachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostedContentAttachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, PostedContentAttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostedContentAttachmentClient<$Result.GetResult<Prisma.$PostedContentAttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostedContentAttachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostedContentAttachmentFindFirstArgs} args - Arguments to find a PostedContentAttachment
     * @example
     * // Get one PostedContentAttachment
     * const postedContentAttachment = await prisma.postedContentAttachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostedContentAttachmentFindFirstArgs>(args?: SelectSubset<T, PostedContentAttachmentFindFirstArgs<ExtArgs>>): Prisma__PostedContentAttachmentClient<$Result.GetResult<Prisma.$PostedContentAttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostedContentAttachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostedContentAttachmentFindFirstOrThrowArgs} args - Arguments to find a PostedContentAttachment
     * @example
     * // Get one PostedContentAttachment
     * const postedContentAttachment = await prisma.postedContentAttachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostedContentAttachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, PostedContentAttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostedContentAttachmentClient<$Result.GetResult<Prisma.$PostedContentAttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostedContentAttachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostedContentAttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostedContentAttachments
     * const postedContentAttachments = await prisma.postedContentAttachment.findMany()
     * 
     * // Get first 10 PostedContentAttachments
     * const postedContentAttachments = await prisma.postedContentAttachment.findMany({ take: 10 })
     * 
     * // Only select the `posts_id`
     * const postedContentAttachmentWithPosts_idOnly = await prisma.postedContentAttachment.findMany({ select: { posts_id: true } })
     * 
     */
    findMany<T extends PostedContentAttachmentFindManyArgs>(args?: SelectSubset<T, PostedContentAttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostedContentAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostedContentAttachment.
     * @param {PostedContentAttachmentCreateArgs} args - Arguments to create a PostedContentAttachment.
     * @example
     * // Create one PostedContentAttachment
     * const PostedContentAttachment = await prisma.postedContentAttachment.create({
     *   data: {
     *     // ... data to create a PostedContentAttachment
     *   }
     * })
     * 
     */
    create<T extends PostedContentAttachmentCreateArgs>(args: SelectSubset<T, PostedContentAttachmentCreateArgs<ExtArgs>>): Prisma__PostedContentAttachmentClient<$Result.GetResult<Prisma.$PostedContentAttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostedContentAttachments.
     * @param {PostedContentAttachmentCreateManyArgs} args - Arguments to create many PostedContentAttachments.
     * @example
     * // Create many PostedContentAttachments
     * const postedContentAttachment = await prisma.postedContentAttachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostedContentAttachmentCreateManyArgs>(args?: SelectSubset<T, PostedContentAttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PostedContentAttachment.
     * @param {PostedContentAttachmentDeleteArgs} args - Arguments to delete one PostedContentAttachment.
     * @example
     * // Delete one PostedContentAttachment
     * const PostedContentAttachment = await prisma.postedContentAttachment.delete({
     *   where: {
     *     // ... filter to delete one PostedContentAttachment
     *   }
     * })
     * 
     */
    delete<T extends PostedContentAttachmentDeleteArgs>(args: SelectSubset<T, PostedContentAttachmentDeleteArgs<ExtArgs>>): Prisma__PostedContentAttachmentClient<$Result.GetResult<Prisma.$PostedContentAttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostedContentAttachment.
     * @param {PostedContentAttachmentUpdateArgs} args - Arguments to update one PostedContentAttachment.
     * @example
     * // Update one PostedContentAttachment
     * const postedContentAttachment = await prisma.postedContentAttachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostedContentAttachmentUpdateArgs>(args: SelectSubset<T, PostedContentAttachmentUpdateArgs<ExtArgs>>): Prisma__PostedContentAttachmentClient<$Result.GetResult<Prisma.$PostedContentAttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostedContentAttachments.
     * @param {PostedContentAttachmentDeleteManyArgs} args - Arguments to filter PostedContentAttachments to delete.
     * @example
     * // Delete a few PostedContentAttachments
     * const { count } = await prisma.postedContentAttachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostedContentAttachmentDeleteManyArgs>(args?: SelectSubset<T, PostedContentAttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostedContentAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostedContentAttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostedContentAttachments
     * const postedContentAttachment = await prisma.postedContentAttachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostedContentAttachmentUpdateManyArgs>(args: SelectSubset<T, PostedContentAttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PostedContentAttachment.
     * @param {PostedContentAttachmentUpsertArgs} args - Arguments to update or create a PostedContentAttachment.
     * @example
     * // Update or create a PostedContentAttachment
     * const postedContentAttachment = await prisma.postedContentAttachment.upsert({
     *   create: {
     *     // ... data to create a PostedContentAttachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostedContentAttachment we want to update
     *   }
     * })
     */
    upsert<T extends PostedContentAttachmentUpsertArgs>(args: SelectSubset<T, PostedContentAttachmentUpsertArgs<ExtArgs>>): Prisma__PostedContentAttachmentClient<$Result.GetResult<Prisma.$PostedContentAttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostedContentAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostedContentAttachmentCountArgs} args - Arguments to filter PostedContentAttachments to count.
     * @example
     * // Count the number of PostedContentAttachments
     * const count = await prisma.postedContentAttachment.count({
     *   where: {
     *     // ... the filter for the PostedContentAttachments we want to count
     *   }
     * })
    **/
    count<T extends PostedContentAttachmentCountArgs>(
      args?: Subset<T, PostedContentAttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostedContentAttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostedContentAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostedContentAttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostedContentAttachmentAggregateArgs>(args: Subset<T, PostedContentAttachmentAggregateArgs>): Prisma.PrismaPromise<GetPostedContentAttachmentAggregateType<T>>

    /**
     * Group by PostedContentAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostedContentAttachmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostedContentAttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostedContentAttachmentGroupByArgs['orderBy'] }
        : { orderBy?: PostedContentAttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostedContentAttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostedContentAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostedContentAttachment model
   */
  readonly fields: PostedContentAttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostedContentAttachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostedContentAttachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attachments<T extends AttachmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AttachmentDefaultArgs<ExtArgs>>): Prisma__AttachmentClient<$Result.GetResult<Prisma.$AttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    posted_content<T extends PostedContentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostedContentDefaultArgs<ExtArgs>>): Prisma__PostedContentClient<$Result.GetResult<Prisma.$PostedContentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostedContentAttachment model
   */
  interface PostedContentAttachmentFieldRefs {
    readonly posts_id: FieldRef<"PostedContentAttachment", 'Int'>
    readonly networks_id: FieldRef<"PostedContentAttachment", 'Int'>
    readonly attachments_id: FieldRef<"PostedContentAttachment", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PostedContentAttachment findUnique
   */
  export type PostedContentAttachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContentAttachment
     */
    select?: PostedContentAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContentAttachment
     */
    omit?: PostedContentAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which PostedContentAttachment to fetch.
     */
    where: PostedContentAttachmentWhereUniqueInput
  }

  /**
   * PostedContentAttachment findUniqueOrThrow
   */
  export type PostedContentAttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContentAttachment
     */
    select?: PostedContentAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContentAttachment
     */
    omit?: PostedContentAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which PostedContentAttachment to fetch.
     */
    where: PostedContentAttachmentWhereUniqueInput
  }

  /**
   * PostedContentAttachment findFirst
   */
  export type PostedContentAttachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContentAttachment
     */
    select?: PostedContentAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContentAttachment
     */
    omit?: PostedContentAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which PostedContentAttachment to fetch.
     */
    where?: PostedContentAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostedContentAttachments to fetch.
     */
    orderBy?: PostedContentAttachmentOrderByWithRelationInput | PostedContentAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostedContentAttachments.
     */
    cursor?: PostedContentAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostedContentAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostedContentAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostedContentAttachments.
     */
    distinct?: PostedContentAttachmentScalarFieldEnum | PostedContentAttachmentScalarFieldEnum[]
  }

  /**
   * PostedContentAttachment findFirstOrThrow
   */
  export type PostedContentAttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContentAttachment
     */
    select?: PostedContentAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContentAttachment
     */
    omit?: PostedContentAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which PostedContentAttachment to fetch.
     */
    where?: PostedContentAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostedContentAttachments to fetch.
     */
    orderBy?: PostedContentAttachmentOrderByWithRelationInput | PostedContentAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostedContentAttachments.
     */
    cursor?: PostedContentAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostedContentAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostedContentAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostedContentAttachments.
     */
    distinct?: PostedContentAttachmentScalarFieldEnum | PostedContentAttachmentScalarFieldEnum[]
  }

  /**
   * PostedContentAttachment findMany
   */
  export type PostedContentAttachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContentAttachment
     */
    select?: PostedContentAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContentAttachment
     */
    omit?: PostedContentAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which PostedContentAttachments to fetch.
     */
    where?: PostedContentAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostedContentAttachments to fetch.
     */
    orderBy?: PostedContentAttachmentOrderByWithRelationInput | PostedContentAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostedContentAttachments.
     */
    cursor?: PostedContentAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostedContentAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostedContentAttachments.
     */
    skip?: number
    distinct?: PostedContentAttachmentScalarFieldEnum | PostedContentAttachmentScalarFieldEnum[]
  }

  /**
   * PostedContentAttachment create
   */
  export type PostedContentAttachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContentAttachment
     */
    select?: PostedContentAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContentAttachment
     */
    omit?: PostedContentAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a PostedContentAttachment.
     */
    data: XOR<PostedContentAttachmentCreateInput, PostedContentAttachmentUncheckedCreateInput>
  }

  /**
   * PostedContentAttachment createMany
   */
  export type PostedContentAttachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostedContentAttachments.
     */
    data: PostedContentAttachmentCreateManyInput | PostedContentAttachmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostedContentAttachment update
   */
  export type PostedContentAttachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContentAttachment
     */
    select?: PostedContentAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContentAttachment
     */
    omit?: PostedContentAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a PostedContentAttachment.
     */
    data: XOR<PostedContentAttachmentUpdateInput, PostedContentAttachmentUncheckedUpdateInput>
    /**
     * Choose, which PostedContentAttachment to update.
     */
    where: PostedContentAttachmentWhereUniqueInput
  }

  /**
   * PostedContentAttachment updateMany
   */
  export type PostedContentAttachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostedContentAttachments.
     */
    data: XOR<PostedContentAttachmentUpdateManyMutationInput, PostedContentAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which PostedContentAttachments to update
     */
    where?: PostedContentAttachmentWhereInput
    /**
     * Limit how many PostedContentAttachments to update.
     */
    limit?: number
  }

  /**
   * PostedContentAttachment upsert
   */
  export type PostedContentAttachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContentAttachment
     */
    select?: PostedContentAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContentAttachment
     */
    omit?: PostedContentAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentAttachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the PostedContentAttachment to update in case it exists.
     */
    where: PostedContentAttachmentWhereUniqueInput
    /**
     * In case the PostedContentAttachment found by the `where` argument doesn't exist, create a new PostedContentAttachment with this data.
     */
    create: XOR<PostedContentAttachmentCreateInput, PostedContentAttachmentUncheckedCreateInput>
    /**
     * In case the PostedContentAttachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostedContentAttachmentUpdateInput, PostedContentAttachmentUncheckedUpdateInput>
  }

  /**
   * PostedContentAttachment delete
   */
  export type PostedContentAttachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContentAttachment
     */
    select?: PostedContentAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContentAttachment
     */
    omit?: PostedContentAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentAttachmentInclude<ExtArgs> | null
    /**
     * Filter which PostedContentAttachment to delete.
     */
    where: PostedContentAttachmentWhereUniqueInput
  }

  /**
   * PostedContentAttachment deleteMany
   */
  export type PostedContentAttachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostedContentAttachments to delete
     */
    where?: PostedContentAttachmentWhereInput
    /**
     * Limit how many PostedContentAttachments to delete.
     */
    limit?: number
  }

  /**
   * PostedContentAttachment without action
   */
  export type PostedContentAttachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostedContentAttachment
     */
    select?: PostedContentAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostedContentAttachment
     */
    omit?: PostedContentAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostedContentAttachmentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    displayname: 'displayname'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const NetworkScalarFieldEnum: {
    id: 'id',
    owner_id: 'owner_id',
    network_type: 'network_type',
    network_name: 'network_name',
    note: 'note'
  };

  export type NetworkScalarFieldEnum = (typeof NetworkScalarFieldEnum)[keyof typeof NetworkScalarFieldEnum]


  export const NetworkTokenScalarFieldEnum: {
    network_id: 'network_id',
    token_name: 'token_name',
    token: 'token'
  };

  export type NetworkTokenScalarFieldEnum = (typeof NetworkTokenScalarFieldEnum)[keyof typeof NetworkTokenScalarFieldEnum]


  export const NetworksUsersScalarFieldEnum: {
    networks_id: 'networks_id',
    granter_id: 'granter_id',
    grantee_id: 'grantee_id',
    permission: 'permission'
  };

  export type NetworksUsersScalarFieldEnum = (typeof NetworksUsersScalarFieldEnum)[keyof typeof NetworksUsersScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    creator_id: 'creator_id'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const PostEditorScalarFieldEnum: {
    posts_id: 'posts_id',
    editor_id: 'editor_id'
  };

  export type PostEditorScalarFieldEnum = (typeof PostEditorScalarFieldEnum)[keyof typeof PostEditorScalarFieldEnum]


  export const AttachmentScalarFieldEnum: {
    id: 'id',
    posts_id: 'posts_id',
    path: 'path'
  };

  export type AttachmentScalarFieldEnum = (typeof AttachmentScalarFieldEnum)[keyof typeof AttachmentScalarFieldEnum]


  export const ContentScalarFieldEnum: {
    id: 'id',
    posts_id: 'posts_id',
    content: 'content'
  };

  export type ContentScalarFieldEnum = (typeof ContentScalarFieldEnum)[keyof typeof ContentScalarFieldEnum]


  export const PostedContentScalarFieldEnum: {
    posts_id: 'posts_id',
    networks_id: 'networks_id',
    contents_id: 'contents_id',
    post_date: 'post_date',
    actual_post_date: 'actual_post_date',
    network_post_id: 'network_post_id'
  };

  export type PostedContentScalarFieldEnum = (typeof PostedContentScalarFieldEnum)[keyof typeof PostedContentScalarFieldEnum]


  export const PostedContentAttachmentScalarFieldEnum: {
    posts_id: 'posts_id',
    networks_id: 'networks_id',
    attachments_id: 'attachments_id'
  };

  export type PostedContentAttachmentScalarFieldEnum = (typeof PostedContentAttachmentScalarFieldEnum)[keyof typeof PostedContentAttachmentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const UserOrderByRelevanceFieldEnum: {
    username: 'username',
    password: 'password',
    displayname: 'displayname'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const NetworkOrderByRelevanceFieldEnum: {
    network_type: 'network_type',
    network_name: 'network_name',
    note: 'note'
  };

  export type NetworkOrderByRelevanceFieldEnum = (typeof NetworkOrderByRelevanceFieldEnum)[keyof typeof NetworkOrderByRelevanceFieldEnum]


  export const NetworkTokenOrderByRelevanceFieldEnum: {
    token_name: 'token_name',
    token: 'token'
  };

  export type NetworkTokenOrderByRelevanceFieldEnum = (typeof NetworkTokenOrderByRelevanceFieldEnum)[keyof typeof NetworkTokenOrderByRelevanceFieldEnum]


  export const NetworksUsersOrderByRelevanceFieldEnum: {
    permission: 'permission'
  };

  export type NetworksUsersOrderByRelevanceFieldEnum = (typeof NetworksUsersOrderByRelevanceFieldEnum)[keyof typeof NetworksUsersOrderByRelevanceFieldEnum]


  export const AttachmentOrderByRelevanceFieldEnum: {
    path: 'path'
  };

  export type AttachmentOrderByRelevanceFieldEnum = (typeof AttachmentOrderByRelevanceFieldEnum)[keyof typeof AttachmentOrderByRelevanceFieldEnum]


  export const ContentOrderByRelevanceFieldEnum: {
    content: 'content'
  };

  export type ContentOrderByRelevanceFieldEnum = (typeof ContentOrderByRelevanceFieldEnum)[keyof typeof ContentOrderByRelevanceFieldEnum]


  export const PostedContentOrderByRelevanceFieldEnum: {
    network_post_id: 'network_post_id'
  };

  export type PostedContentOrderByRelevanceFieldEnum = (typeof PostedContentOrderByRelevanceFieldEnum)[keyof typeof PostedContentOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    displayname?: StringFilter<"User"> | string
    networks?: NetworkListRelationFilter
    posts?: PostListRelationFilter
    users_has_networks?: NetworksUsersListRelationFilter
    PostEditor?: PostEditorListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    displayname?: SortOrder
    networks?: NetworkOrderByRelationAggregateInput
    posts?: PostOrderByRelationAggregateInput
    users_has_networks?: NetworksUsersOrderByRelationAggregateInput
    PostEditor?: PostEditorOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    displayname?: StringFilter<"User"> | string
    networks?: NetworkListRelationFilter
    posts?: PostListRelationFilter
    users_has_networks?: NetworksUsersListRelationFilter
    PostEditor?: PostEditorListRelationFilter
  }, "id" | "id" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    displayname?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    displayname?: StringWithAggregatesFilter<"User"> | string
  }

  export type NetworkWhereInput = {
    AND?: NetworkWhereInput | NetworkWhereInput[]
    OR?: NetworkWhereInput[]
    NOT?: NetworkWhereInput | NetworkWhereInput[]
    id?: IntFilter<"Network"> | number
    owner_id?: IntFilter<"Network"> | number
    network_type?: StringFilter<"Network"> | string
    network_name?: StringFilter<"Network"> | string
    note?: StringNullableFilter<"Network"> | string | null
    network_tokens?: NetworkTokenListRelationFilter
    users?: XOR<UserScalarRelationFilter, UserWhereInput>
    posted_content?: PostedContentListRelationFilter
    users_has_networks?: NetworksUsersListRelationFilter
  }

  export type NetworkOrderByWithRelationInput = {
    id?: SortOrder
    owner_id?: SortOrder
    network_type?: SortOrder
    network_name?: SortOrder
    note?: SortOrderInput | SortOrder
    network_tokens?: NetworkTokenOrderByRelationAggregateInput
    users?: UserOrderByWithRelationInput
    posted_content?: PostedContentOrderByRelationAggregateInput
    users_has_networks?: NetworksUsersOrderByRelationAggregateInput
    _relevance?: NetworkOrderByRelevanceInput
  }

  export type NetworkWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    id_owner_id?: NetworkIdOwner_idCompoundUniqueInput
    AND?: NetworkWhereInput | NetworkWhereInput[]
    OR?: NetworkWhereInput[]
    NOT?: NetworkWhereInput | NetworkWhereInput[]
    owner_id?: IntFilter<"Network"> | number
    network_type?: StringFilter<"Network"> | string
    network_name?: StringFilter<"Network"> | string
    note?: StringNullableFilter<"Network"> | string | null
    network_tokens?: NetworkTokenListRelationFilter
    users?: XOR<UserScalarRelationFilter, UserWhereInput>
    posted_content?: PostedContentListRelationFilter
    users_has_networks?: NetworksUsersListRelationFilter
  }, "id_owner_id" | "id">

  export type NetworkOrderByWithAggregationInput = {
    id?: SortOrder
    owner_id?: SortOrder
    network_type?: SortOrder
    network_name?: SortOrder
    note?: SortOrderInput | SortOrder
    _count?: NetworkCountOrderByAggregateInput
    _avg?: NetworkAvgOrderByAggregateInput
    _max?: NetworkMaxOrderByAggregateInput
    _min?: NetworkMinOrderByAggregateInput
    _sum?: NetworkSumOrderByAggregateInput
  }

  export type NetworkScalarWhereWithAggregatesInput = {
    AND?: NetworkScalarWhereWithAggregatesInput | NetworkScalarWhereWithAggregatesInput[]
    OR?: NetworkScalarWhereWithAggregatesInput[]
    NOT?: NetworkScalarWhereWithAggregatesInput | NetworkScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Network"> | number
    owner_id?: IntWithAggregatesFilter<"Network"> | number
    network_type?: StringWithAggregatesFilter<"Network"> | string
    network_name?: StringWithAggregatesFilter<"Network"> | string
    note?: StringNullableWithAggregatesFilter<"Network"> | string | null
  }

  export type NetworkTokenWhereInput = {
    AND?: NetworkTokenWhereInput | NetworkTokenWhereInput[]
    OR?: NetworkTokenWhereInput[]
    NOT?: NetworkTokenWhereInput | NetworkTokenWhereInput[]
    network_id?: IntFilter<"NetworkToken"> | number
    token_name?: StringFilter<"NetworkToken"> | string
    token?: StringFilter<"NetworkToken"> | string
    networks?: XOR<NetworkScalarRelationFilter, NetworkWhereInput>
  }

  export type NetworkTokenOrderByWithRelationInput = {
    network_id?: SortOrder
    token_name?: SortOrder
    token?: SortOrder
    networks?: NetworkOrderByWithRelationInput
    _relevance?: NetworkTokenOrderByRelevanceInput
  }

  export type NetworkTokenWhereUniqueInput = Prisma.AtLeast<{
    network_id_token_name?: NetworkTokenNetwork_idToken_nameCompoundUniqueInput
    AND?: NetworkTokenWhereInput | NetworkTokenWhereInput[]
    OR?: NetworkTokenWhereInput[]
    NOT?: NetworkTokenWhereInput | NetworkTokenWhereInput[]
    network_id?: IntFilter<"NetworkToken"> | number
    token_name?: StringFilter<"NetworkToken"> | string
    token?: StringFilter<"NetworkToken"> | string
    networks?: XOR<NetworkScalarRelationFilter, NetworkWhereInput>
  }, "network_id_token_name">

  export type NetworkTokenOrderByWithAggregationInput = {
    network_id?: SortOrder
    token_name?: SortOrder
    token?: SortOrder
    _count?: NetworkTokenCountOrderByAggregateInput
    _avg?: NetworkTokenAvgOrderByAggregateInput
    _max?: NetworkTokenMaxOrderByAggregateInput
    _min?: NetworkTokenMinOrderByAggregateInput
    _sum?: NetworkTokenSumOrderByAggregateInput
  }

  export type NetworkTokenScalarWhereWithAggregatesInput = {
    AND?: NetworkTokenScalarWhereWithAggregatesInput | NetworkTokenScalarWhereWithAggregatesInput[]
    OR?: NetworkTokenScalarWhereWithAggregatesInput[]
    NOT?: NetworkTokenScalarWhereWithAggregatesInput | NetworkTokenScalarWhereWithAggregatesInput[]
    network_id?: IntWithAggregatesFilter<"NetworkToken"> | number
    token_name?: StringWithAggregatesFilter<"NetworkToken"> | string
    token?: StringWithAggregatesFilter<"NetworkToken"> | string
  }

  export type NetworksUsersWhereInput = {
    AND?: NetworksUsersWhereInput | NetworksUsersWhereInput[]
    OR?: NetworksUsersWhereInput[]
    NOT?: NetworksUsersWhereInput | NetworksUsersWhereInput[]
    networks_id?: IntFilter<"NetworksUsers"> | number
    granter_id?: IntFilter<"NetworksUsers"> | number
    grantee_id?: IntFilter<"NetworksUsers"> | number
    permission?: StringFilter<"NetworksUsers"> | string
    networks?: XOR<NetworkScalarRelationFilter, NetworkWhereInput>
    users?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NetworksUsersOrderByWithRelationInput = {
    networks_id?: SortOrder
    granter_id?: SortOrder
    grantee_id?: SortOrder
    permission?: SortOrder
    networks?: NetworkOrderByWithRelationInput
    users?: UserOrderByWithRelationInput
    _relevance?: NetworksUsersOrderByRelevanceInput
  }

  export type NetworksUsersWhereUniqueInput = Prisma.AtLeast<{
    networks_id_granter_id_grantee_id?: NetworksUsersNetworks_idGranter_idGrantee_idCompoundUniqueInput
    AND?: NetworksUsersWhereInput | NetworksUsersWhereInput[]
    OR?: NetworksUsersWhereInput[]
    NOT?: NetworksUsersWhereInput | NetworksUsersWhereInput[]
    networks_id?: IntFilter<"NetworksUsers"> | number
    granter_id?: IntFilter<"NetworksUsers"> | number
    grantee_id?: IntFilter<"NetworksUsers"> | number
    permission?: StringFilter<"NetworksUsers"> | string
    networks?: XOR<NetworkScalarRelationFilter, NetworkWhereInput>
    users?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "networks_id_granter_id_grantee_id">

  export type NetworksUsersOrderByWithAggregationInput = {
    networks_id?: SortOrder
    granter_id?: SortOrder
    grantee_id?: SortOrder
    permission?: SortOrder
    _count?: NetworksUsersCountOrderByAggregateInput
    _avg?: NetworksUsersAvgOrderByAggregateInput
    _max?: NetworksUsersMaxOrderByAggregateInput
    _min?: NetworksUsersMinOrderByAggregateInput
    _sum?: NetworksUsersSumOrderByAggregateInput
  }

  export type NetworksUsersScalarWhereWithAggregatesInput = {
    AND?: NetworksUsersScalarWhereWithAggregatesInput | NetworksUsersScalarWhereWithAggregatesInput[]
    OR?: NetworksUsersScalarWhereWithAggregatesInput[]
    NOT?: NetworksUsersScalarWhereWithAggregatesInput | NetworksUsersScalarWhereWithAggregatesInput[]
    networks_id?: IntWithAggregatesFilter<"NetworksUsers"> | number
    granter_id?: IntWithAggregatesFilter<"NetworksUsers"> | number
    grantee_id?: IntWithAggregatesFilter<"NetworksUsers"> | number
    permission?: StringWithAggregatesFilter<"NetworksUsers"> | string
  }

  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: IntFilter<"Post"> | number
    creator_id?: IntFilter<"Post"> | number
    attachments?: AttachmentListRelationFilter
    contents?: ContentListRelationFilter
    posted_content?: PostedContentListRelationFilter
    users?: XOR<UserScalarRelationFilter, UserWhereInput>
    PostEditor?: PostEditorListRelationFilter
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    creator_id?: SortOrder
    attachments?: AttachmentOrderByRelationAggregateInput
    contents?: ContentOrderByRelationAggregateInput
    posted_content?: PostedContentOrderByRelationAggregateInput
    users?: UserOrderByWithRelationInput
    PostEditor?: PostEditorOrderByRelationAggregateInput
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    creator_id?: IntFilter<"Post"> | number
    attachments?: AttachmentListRelationFilter
    contents?: ContentListRelationFilter
    posted_content?: PostedContentListRelationFilter
    users?: XOR<UserScalarRelationFilter, UserWhereInput>
    PostEditor?: PostEditorListRelationFilter
  }, "id" | "id">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    creator_id?: SortOrder
    _count?: PostCountOrderByAggregateInput
    _avg?: PostAvgOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
    _sum?: PostSumOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Post"> | number
    creator_id?: IntWithAggregatesFilter<"Post"> | number
  }

  export type PostEditorWhereInput = {
    AND?: PostEditorWhereInput | PostEditorWhereInput[]
    OR?: PostEditorWhereInput[]
    NOT?: PostEditorWhereInput | PostEditorWhereInput[]
    posts_id?: IntFilter<"PostEditor"> | number
    editor_id?: IntFilter<"PostEditor"> | number
    posts?: XOR<PostScalarRelationFilter, PostWhereInput>
    users?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PostEditorOrderByWithRelationInput = {
    posts_id?: SortOrder
    editor_id?: SortOrder
    posts?: PostOrderByWithRelationInput
    users?: UserOrderByWithRelationInput
  }

  export type PostEditorWhereUniqueInput = Prisma.AtLeast<{
    posts_id_editor_id?: PostEditorPosts_idEditor_idCompoundUniqueInput
    AND?: PostEditorWhereInput | PostEditorWhereInput[]
    OR?: PostEditorWhereInput[]
    NOT?: PostEditorWhereInput | PostEditorWhereInput[]
    posts_id?: IntFilter<"PostEditor"> | number
    editor_id?: IntFilter<"PostEditor"> | number
    posts?: XOR<PostScalarRelationFilter, PostWhereInput>
    users?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "posts_id_editor_id">

  export type PostEditorOrderByWithAggregationInput = {
    posts_id?: SortOrder
    editor_id?: SortOrder
    _count?: PostEditorCountOrderByAggregateInput
    _avg?: PostEditorAvgOrderByAggregateInput
    _max?: PostEditorMaxOrderByAggregateInput
    _min?: PostEditorMinOrderByAggregateInput
    _sum?: PostEditorSumOrderByAggregateInput
  }

  export type PostEditorScalarWhereWithAggregatesInput = {
    AND?: PostEditorScalarWhereWithAggregatesInput | PostEditorScalarWhereWithAggregatesInput[]
    OR?: PostEditorScalarWhereWithAggregatesInput[]
    NOT?: PostEditorScalarWhereWithAggregatesInput | PostEditorScalarWhereWithAggregatesInput[]
    posts_id?: IntWithAggregatesFilter<"PostEditor"> | number
    editor_id?: IntWithAggregatesFilter<"PostEditor"> | number
  }

  export type AttachmentWhereInput = {
    AND?: AttachmentWhereInput | AttachmentWhereInput[]
    OR?: AttachmentWhereInput[]
    NOT?: AttachmentWhereInput | AttachmentWhereInput[]
    id?: IntFilter<"Attachment"> | number
    posts_id?: IntFilter<"Attachment"> | number
    path?: StringFilter<"Attachment"> | string
    posts?: XOR<PostScalarRelationFilter, PostWhereInput>
    posted_content_has_attachments?: PostedContentAttachmentListRelationFilter
  }

  export type AttachmentOrderByWithRelationInput = {
    id?: SortOrder
    posts_id?: SortOrder
    path?: SortOrder
    posts?: PostOrderByWithRelationInput
    posted_content_has_attachments?: PostedContentAttachmentOrderByRelationAggregateInput
    _relevance?: AttachmentOrderByRelevanceInput
  }

  export type AttachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    id_posts_id?: AttachmentIdPosts_idCompoundUniqueInput
    AND?: AttachmentWhereInput | AttachmentWhereInput[]
    OR?: AttachmentWhereInput[]
    NOT?: AttachmentWhereInput | AttachmentWhereInput[]
    posts_id?: IntFilter<"Attachment"> | number
    path?: StringFilter<"Attachment"> | string
    posts?: XOR<PostScalarRelationFilter, PostWhereInput>
    posted_content_has_attachments?: PostedContentAttachmentListRelationFilter
  }, "id_posts_id" | "id">

  export type AttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    posts_id?: SortOrder
    path?: SortOrder
    _count?: AttachmentCountOrderByAggregateInput
    _avg?: AttachmentAvgOrderByAggregateInput
    _max?: AttachmentMaxOrderByAggregateInput
    _min?: AttachmentMinOrderByAggregateInput
    _sum?: AttachmentSumOrderByAggregateInput
  }

  export type AttachmentScalarWhereWithAggregatesInput = {
    AND?: AttachmentScalarWhereWithAggregatesInput | AttachmentScalarWhereWithAggregatesInput[]
    OR?: AttachmentScalarWhereWithAggregatesInput[]
    NOT?: AttachmentScalarWhereWithAggregatesInput | AttachmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Attachment"> | number
    posts_id?: IntWithAggregatesFilter<"Attachment"> | number
    path?: StringWithAggregatesFilter<"Attachment"> | string
  }

  export type ContentWhereInput = {
    AND?: ContentWhereInput | ContentWhereInput[]
    OR?: ContentWhereInput[]
    NOT?: ContentWhereInput | ContentWhereInput[]
    id?: IntFilter<"Content"> | number
    posts_id?: IntFilter<"Content"> | number
    content?: StringFilter<"Content"> | string
    posts?: XOR<PostScalarRelationFilter, PostWhereInput>
    posted_content?: PostedContentListRelationFilter
  }

  export type ContentOrderByWithRelationInput = {
    id?: SortOrder
    posts_id?: SortOrder
    content?: SortOrder
    posts?: PostOrderByWithRelationInput
    posted_content?: PostedContentOrderByRelationAggregateInput
    _relevance?: ContentOrderByRelevanceInput
  }

  export type ContentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ContentWhereInput | ContentWhereInput[]
    OR?: ContentWhereInput[]
    NOT?: ContentWhereInput | ContentWhereInput[]
    posts_id?: IntFilter<"Content"> | number
    content?: StringFilter<"Content"> | string
    posts?: XOR<PostScalarRelationFilter, PostWhereInput>
    posted_content?: PostedContentListRelationFilter
  }, "id">

  export type ContentOrderByWithAggregationInput = {
    id?: SortOrder
    posts_id?: SortOrder
    content?: SortOrder
    _count?: ContentCountOrderByAggregateInput
    _avg?: ContentAvgOrderByAggregateInput
    _max?: ContentMaxOrderByAggregateInput
    _min?: ContentMinOrderByAggregateInput
    _sum?: ContentSumOrderByAggregateInput
  }

  export type ContentScalarWhereWithAggregatesInput = {
    AND?: ContentScalarWhereWithAggregatesInput | ContentScalarWhereWithAggregatesInput[]
    OR?: ContentScalarWhereWithAggregatesInput[]
    NOT?: ContentScalarWhereWithAggregatesInput | ContentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Content"> | number
    posts_id?: IntWithAggregatesFilter<"Content"> | number
    content?: StringWithAggregatesFilter<"Content"> | string
  }

  export type PostedContentWhereInput = {
    AND?: PostedContentWhereInput | PostedContentWhereInput[]
    OR?: PostedContentWhereInput[]
    NOT?: PostedContentWhereInput | PostedContentWhereInput[]
    posts_id?: IntFilter<"PostedContent"> | number
    networks_id?: IntFilter<"PostedContent"> | number
    contents_id?: IntFilter<"PostedContent"> | number
    post_date?: DateTimeNullableFilter<"PostedContent"> | Date | string | null
    actual_post_date?: DateTimeNullableFilter<"PostedContent"> | Date | string | null
    network_post_id?: StringNullableFilter<"PostedContent"> | string | null
    contents?: XOR<ContentScalarRelationFilter, ContentWhereInput>
    networks?: XOR<NetworkScalarRelationFilter, NetworkWhereInput>
    posts?: XOR<PostScalarRelationFilter, PostWhereInput>
    posted_content_has_attachments?: PostedContentAttachmentListRelationFilter
  }

  export type PostedContentOrderByWithRelationInput = {
    posts_id?: SortOrder
    networks_id?: SortOrder
    contents_id?: SortOrder
    post_date?: SortOrderInput | SortOrder
    actual_post_date?: SortOrderInput | SortOrder
    network_post_id?: SortOrderInput | SortOrder
    contents?: ContentOrderByWithRelationInput
    networks?: NetworkOrderByWithRelationInput
    posts?: PostOrderByWithRelationInput
    posted_content_has_attachments?: PostedContentAttachmentOrderByRelationAggregateInput
    _relevance?: PostedContentOrderByRelevanceInput
  }

  export type PostedContentWhereUniqueInput = Prisma.AtLeast<{
    posts_id_networks_id?: PostedContentPosts_idNetworks_idCompoundUniqueInput
    AND?: PostedContentWhereInput | PostedContentWhereInput[]
    OR?: PostedContentWhereInput[]
    NOT?: PostedContentWhereInput | PostedContentWhereInput[]
    posts_id?: IntFilter<"PostedContent"> | number
    networks_id?: IntFilter<"PostedContent"> | number
    contents_id?: IntFilter<"PostedContent"> | number
    post_date?: DateTimeNullableFilter<"PostedContent"> | Date | string | null
    actual_post_date?: DateTimeNullableFilter<"PostedContent"> | Date | string | null
    network_post_id?: StringNullableFilter<"PostedContent"> | string | null
    contents?: XOR<ContentScalarRelationFilter, ContentWhereInput>
    networks?: XOR<NetworkScalarRelationFilter, NetworkWhereInput>
    posts?: XOR<PostScalarRelationFilter, PostWhereInput>
    posted_content_has_attachments?: PostedContentAttachmentListRelationFilter
  }, "posts_id_networks_id">

  export type PostedContentOrderByWithAggregationInput = {
    posts_id?: SortOrder
    networks_id?: SortOrder
    contents_id?: SortOrder
    post_date?: SortOrderInput | SortOrder
    actual_post_date?: SortOrderInput | SortOrder
    network_post_id?: SortOrderInput | SortOrder
    _count?: PostedContentCountOrderByAggregateInput
    _avg?: PostedContentAvgOrderByAggregateInput
    _max?: PostedContentMaxOrderByAggregateInput
    _min?: PostedContentMinOrderByAggregateInput
    _sum?: PostedContentSumOrderByAggregateInput
  }

  export type PostedContentScalarWhereWithAggregatesInput = {
    AND?: PostedContentScalarWhereWithAggregatesInput | PostedContentScalarWhereWithAggregatesInput[]
    OR?: PostedContentScalarWhereWithAggregatesInput[]
    NOT?: PostedContentScalarWhereWithAggregatesInput | PostedContentScalarWhereWithAggregatesInput[]
    posts_id?: IntWithAggregatesFilter<"PostedContent"> | number
    networks_id?: IntWithAggregatesFilter<"PostedContent"> | number
    contents_id?: IntWithAggregatesFilter<"PostedContent"> | number
    post_date?: DateTimeNullableWithAggregatesFilter<"PostedContent"> | Date | string | null
    actual_post_date?: DateTimeNullableWithAggregatesFilter<"PostedContent"> | Date | string | null
    network_post_id?: StringNullableWithAggregatesFilter<"PostedContent"> | string | null
  }

  export type PostedContentAttachmentWhereInput = {
    AND?: PostedContentAttachmentWhereInput | PostedContentAttachmentWhereInput[]
    OR?: PostedContentAttachmentWhereInput[]
    NOT?: PostedContentAttachmentWhereInput | PostedContentAttachmentWhereInput[]
    posts_id?: IntFilter<"PostedContentAttachment"> | number
    networks_id?: IntFilter<"PostedContentAttachment"> | number
    attachments_id?: IntFilter<"PostedContentAttachment"> | number
    attachments?: XOR<AttachmentScalarRelationFilter, AttachmentWhereInput>
    posted_content?: XOR<PostedContentScalarRelationFilter, PostedContentWhereInput>
  }

  export type PostedContentAttachmentOrderByWithRelationInput = {
    posts_id?: SortOrder
    networks_id?: SortOrder
    attachments_id?: SortOrder
    attachments?: AttachmentOrderByWithRelationInput
    posted_content?: PostedContentOrderByWithRelationInput
  }

  export type PostedContentAttachmentWhereUniqueInput = Prisma.AtLeast<{
    posts_id_networks_id_attachments_id?: PostedContentAttachmentPosts_idNetworks_idAttachments_idCompoundUniqueInput
    AND?: PostedContentAttachmentWhereInput | PostedContentAttachmentWhereInput[]
    OR?: PostedContentAttachmentWhereInput[]
    NOT?: PostedContentAttachmentWhereInput | PostedContentAttachmentWhereInput[]
    posts_id?: IntFilter<"PostedContentAttachment"> | number
    networks_id?: IntFilter<"PostedContentAttachment"> | number
    attachments_id?: IntFilter<"PostedContentAttachment"> | number
    attachments?: XOR<AttachmentScalarRelationFilter, AttachmentWhereInput>
    posted_content?: XOR<PostedContentScalarRelationFilter, PostedContentWhereInput>
  }, "posts_id_networks_id_attachments_id">

  export type PostedContentAttachmentOrderByWithAggregationInput = {
    posts_id?: SortOrder
    networks_id?: SortOrder
    attachments_id?: SortOrder
    _count?: PostedContentAttachmentCountOrderByAggregateInput
    _avg?: PostedContentAttachmentAvgOrderByAggregateInput
    _max?: PostedContentAttachmentMaxOrderByAggregateInput
    _min?: PostedContentAttachmentMinOrderByAggregateInput
    _sum?: PostedContentAttachmentSumOrderByAggregateInput
  }

  export type PostedContentAttachmentScalarWhereWithAggregatesInput = {
    AND?: PostedContentAttachmentScalarWhereWithAggregatesInput | PostedContentAttachmentScalarWhereWithAggregatesInput[]
    OR?: PostedContentAttachmentScalarWhereWithAggregatesInput[]
    NOT?: PostedContentAttachmentScalarWhereWithAggregatesInput | PostedContentAttachmentScalarWhereWithAggregatesInput[]
    posts_id?: IntWithAggregatesFilter<"PostedContentAttachment"> | number
    networks_id?: IntWithAggregatesFilter<"PostedContentAttachment"> | number
    attachments_id?: IntWithAggregatesFilter<"PostedContentAttachment"> | number
  }

  export type UserCreateInput = {
    username: string
    password: string
    displayname: string
    networks?: NetworkCreateNestedManyWithoutUsersInput
    posts?: PostCreateNestedManyWithoutUsersInput
    users_has_networks?: NetworksUsersCreateNestedManyWithoutUsersInput
    PostEditor?: PostEditorCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    username: string
    password: string
    displayname: string
    networks?: NetworkUncheckedCreateNestedManyWithoutUsersInput
    posts?: PostUncheckedCreateNestedManyWithoutUsersInput
    users_has_networks?: NetworksUsersUncheckedCreateNestedManyWithoutUsersInput
    PostEditor?: PostEditorUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    networks?: NetworkUpdateManyWithoutUsersNestedInput
    posts?: PostUpdateManyWithoutUsersNestedInput
    users_has_networks?: NetworksUsersUpdateManyWithoutUsersNestedInput
    PostEditor?: PostEditorUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    networks?: NetworkUncheckedUpdateManyWithoutUsersNestedInput
    posts?: PostUncheckedUpdateManyWithoutUsersNestedInput
    users_has_networks?: NetworksUsersUncheckedUpdateManyWithoutUsersNestedInput
    PostEditor?: PostEditorUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    username: string
    password: string
    displayname: string
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
  }

  export type NetworkCreateInput = {
    id?: number
    network_type: string
    network_name: string
    note?: string | null
    network_tokens?: NetworkTokenCreateNestedManyWithoutNetworksInput
    users: UserCreateNestedOneWithoutNetworksInput
    posted_content?: PostedContentCreateNestedManyWithoutNetworksInput
    users_has_networks?: NetworksUsersCreateNestedManyWithoutNetworksInput
  }

  export type NetworkUncheckedCreateInput = {
    id?: number
    owner_id: number
    network_type: string
    network_name: string
    note?: string | null
    network_tokens?: NetworkTokenUncheckedCreateNestedManyWithoutNetworksInput
    posted_content?: PostedContentUncheckedCreateNestedManyWithoutNetworksInput
    users_has_networks?: NetworksUsersUncheckedCreateNestedManyWithoutNetworksInput
  }

  export type NetworkUpdateInput = {
    network_type?: StringFieldUpdateOperationsInput | string
    network_name?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    network_tokens?: NetworkTokenUpdateManyWithoutNetworksNestedInput
    users?: UserUpdateOneRequiredWithoutNetworksNestedInput
    posted_content?: PostedContentUpdateManyWithoutNetworksNestedInput
    users_has_networks?: NetworksUsersUpdateManyWithoutNetworksNestedInput
  }

  export type NetworkUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    owner_id?: IntFieldUpdateOperationsInput | number
    network_type?: StringFieldUpdateOperationsInput | string
    network_name?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    network_tokens?: NetworkTokenUncheckedUpdateManyWithoutNetworksNestedInput
    posted_content?: PostedContentUncheckedUpdateManyWithoutNetworksNestedInput
    users_has_networks?: NetworksUsersUncheckedUpdateManyWithoutNetworksNestedInput
  }

  export type NetworkCreateManyInput = {
    id?: number
    owner_id: number
    network_type: string
    network_name: string
    note?: string | null
  }

  export type NetworkUpdateManyMutationInput = {
    network_type?: StringFieldUpdateOperationsInput | string
    network_name?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NetworkUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    owner_id?: IntFieldUpdateOperationsInput | number
    network_type?: StringFieldUpdateOperationsInput | string
    network_name?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NetworkTokenCreateInput = {
    token_name: string
    token: string
    networks: NetworkCreateNestedOneWithoutNetwork_tokensInput
  }

  export type NetworkTokenUncheckedCreateInput = {
    network_id: number
    token_name: string
    token: string
  }

  export type NetworkTokenUpdateInput = {
    token_name?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    networks?: NetworkUpdateOneRequiredWithoutNetwork_tokensNestedInput
  }

  export type NetworkTokenUncheckedUpdateInput = {
    network_id?: IntFieldUpdateOperationsInput | number
    token_name?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type NetworkTokenCreateManyInput = {
    network_id: number
    token_name: string
    token: string
  }

  export type NetworkTokenUpdateManyMutationInput = {
    token_name?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type NetworkTokenUncheckedUpdateManyInput = {
    network_id?: IntFieldUpdateOperationsInput | number
    token_name?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type NetworksUsersCreateInput = {
    permission: string
    networks: NetworkCreateNestedOneWithoutUsers_has_networksInput
    users: UserCreateNestedOneWithoutUsers_has_networksInput
  }

  export type NetworksUsersUncheckedCreateInput = {
    networks_id: number
    granter_id: number
    grantee_id: number
    permission: string
  }

  export type NetworksUsersUpdateInput = {
    permission?: StringFieldUpdateOperationsInput | string
    networks?: NetworkUpdateOneRequiredWithoutUsers_has_networksNestedInput
    users?: UserUpdateOneRequiredWithoutUsers_has_networksNestedInput
  }

  export type NetworksUsersUncheckedUpdateInput = {
    networks_id?: IntFieldUpdateOperationsInput | number
    granter_id?: IntFieldUpdateOperationsInput | number
    grantee_id?: IntFieldUpdateOperationsInput | number
    permission?: StringFieldUpdateOperationsInput | string
  }

  export type NetworksUsersCreateManyInput = {
    networks_id: number
    granter_id: number
    grantee_id: number
    permission: string
  }

  export type NetworksUsersUpdateManyMutationInput = {
    permission?: StringFieldUpdateOperationsInput | string
  }

  export type NetworksUsersUncheckedUpdateManyInput = {
    networks_id?: IntFieldUpdateOperationsInput | number
    granter_id?: IntFieldUpdateOperationsInput | number
    grantee_id?: IntFieldUpdateOperationsInput | number
    permission?: StringFieldUpdateOperationsInput | string
  }

  export type PostCreateInput = {
    attachments?: AttachmentCreateNestedManyWithoutPostsInput
    contents?: ContentCreateNestedManyWithoutPostsInput
    posted_content?: PostedContentCreateNestedManyWithoutPostsInput
    users: UserCreateNestedOneWithoutPostsInput
    PostEditor?: PostEditorCreateNestedManyWithoutPostsInput
  }

  export type PostUncheckedCreateInput = {
    id?: number
    creator_id: number
    attachments?: AttachmentUncheckedCreateNestedManyWithoutPostsInput
    contents?: ContentUncheckedCreateNestedManyWithoutPostsInput
    posted_content?: PostedContentUncheckedCreateNestedManyWithoutPostsInput
    PostEditor?: PostEditorUncheckedCreateNestedManyWithoutPostsInput
  }

  export type PostUpdateInput = {
    attachments?: AttachmentUpdateManyWithoutPostsNestedInput
    contents?: ContentUpdateManyWithoutPostsNestedInput
    posted_content?: PostedContentUpdateManyWithoutPostsNestedInput
    users?: UserUpdateOneRequiredWithoutPostsNestedInput
    PostEditor?: PostEditorUpdateManyWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    creator_id?: IntFieldUpdateOperationsInput | number
    attachments?: AttachmentUncheckedUpdateManyWithoutPostsNestedInput
    contents?: ContentUncheckedUpdateManyWithoutPostsNestedInput
    posted_content?: PostedContentUncheckedUpdateManyWithoutPostsNestedInput
    PostEditor?: PostEditorUncheckedUpdateManyWithoutPostsNestedInput
  }

  export type PostCreateManyInput = {
    id?: number
    creator_id: number
  }

  export type PostUpdateManyMutationInput = {

  }

  export type PostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    creator_id?: IntFieldUpdateOperationsInput | number
  }

  export type PostEditorCreateInput = {
    posts: PostCreateNestedOneWithoutPostEditorInput
    users: UserCreateNestedOneWithoutPostEditorInput
  }

  export type PostEditorUncheckedCreateInput = {
    posts_id: number
    editor_id: number
  }

  export type PostEditorUpdateInput = {
    posts?: PostUpdateOneRequiredWithoutPostEditorNestedInput
    users?: UserUpdateOneRequiredWithoutPostEditorNestedInput
  }

  export type PostEditorUncheckedUpdateInput = {
    posts_id?: IntFieldUpdateOperationsInput | number
    editor_id?: IntFieldUpdateOperationsInput | number
  }

  export type PostEditorCreateManyInput = {
    posts_id: number
    editor_id: number
  }

  export type PostEditorUpdateManyMutationInput = {

  }

  export type PostEditorUncheckedUpdateManyInput = {
    posts_id?: IntFieldUpdateOperationsInput | number
    editor_id?: IntFieldUpdateOperationsInput | number
  }

  export type AttachmentCreateInput = {
    id?: number
    path: string
    posts: PostCreateNestedOneWithoutAttachmentsInput
    posted_content_has_attachments?: PostedContentAttachmentCreateNestedManyWithoutAttachmentsInput
  }

  export type AttachmentUncheckedCreateInput = {
    id?: number
    posts_id: number
    path: string
    posted_content_has_attachments?: PostedContentAttachmentUncheckedCreateNestedManyWithoutAttachmentsInput
  }

  export type AttachmentUpdateInput = {
    path?: StringFieldUpdateOperationsInput | string
    posts?: PostUpdateOneRequiredWithoutAttachmentsNestedInput
    posted_content_has_attachments?: PostedContentAttachmentUpdateManyWithoutAttachmentsNestedInput
  }

  export type AttachmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    posts_id?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    posted_content_has_attachments?: PostedContentAttachmentUncheckedUpdateManyWithoutAttachmentsNestedInput
  }

  export type AttachmentCreateManyInput = {
    id?: number
    posts_id: number
    path: string
  }

  export type AttachmentUpdateManyMutationInput = {
    path?: StringFieldUpdateOperationsInput | string
  }

  export type AttachmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    posts_id?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
  }

  export type ContentCreateInput = {
    content: string
    posts: PostCreateNestedOneWithoutContentsInput
    posted_content?: PostedContentCreateNestedManyWithoutContentsInput
  }

  export type ContentUncheckedCreateInput = {
    id?: number
    posts_id: number
    content: string
    posted_content?: PostedContentUncheckedCreateNestedManyWithoutContentsInput
  }

  export type ContentUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    posts?: PostUpdateOneRequiredWithoutContentsNestedInput
    posted_content?: PostedContentUpdateManyWithoutContentsNestedInput
  }

  export type ContentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    posts_id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    posted_content?: PostedContentUncheckedUpdateManyWithoutContentsNestedInput
  }

  export type ContentCreateManyInput = {
    id?: number
    posts_id: number
    content: string
  }

  export type ContentUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
  }

  export type ContentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    posts_id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
  }

  export type PostedContentCreateInput = {
    post_date?: Date | string | null
    actual_post_date?: Date | string | null
    network_post_id?: string | null
    contents: ContentCreateNestedOneWithoutPosted_contentInput
    networks: NetworkCreateNestedOneWithoutPosted_contentInput
    posts: PostCreateNestedOneWithoutPosted_contentInput
    posted_content_has_attachments?: PostedContentAttachmentCreateNestedManyWithoutPosted_contentInput
  }

  export type PostedContentUncheckedCreateInput = {
    posts_id: number
    networks_id: number
    contents_id: number
    post_date?: Date | string | null
    actual_post_date?: Date | string | null
    network_post_id?: string | null
    posted_content_has_attachments?: PostedContentAttachmentUncheckedCreateNestedManyWithoutPosted_contentInput
  }

  export type PostedContentUpdateInput = {
    post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    network_post_id?: NullableStringFieldUpdateOperationsInput | string | null
    contents?: ContentUpdateOneRequiredWithoutPosted_contentNestedInput
    networks?: NetworkUpdateOneRequiredWithoutPosted_contentNestedInput
    posts?: PostUpdateOneRequiredWithoutPosted_contentNestedInput
    posted_content_has_attachments?: PostedContentAttachmentUpdateManyWithoutPosted_contentNestedInput
  }

  export type PostedContentUncheckedUpdateInput = {
    posts_id?: IntFieldUpdateOperationsInput | number
    networks_id?: IntFieldUpdateOperationsInput | number
    contents_id?: IntFieldUpdateOperationsInput | number
    post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    network_post_id?: NullableStringFieldUpdateOperationsInput | string | null
    posted_content_has_attachments?: PostedContentAttachmentUncheckedUpdateManyWithoutPosted_contentNestedInput
  }

  export type PostedContentCreateManyInput = {
    posts_id: number
    networks_id: number
    contents_id: number
    post_date?: Date | string | null
    actual_post_date?: Date | string | null
    network_post_id?: string | null
  }

  export type PostedContentUpdateManyMutationInput = {
    post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    network_post_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PostedContentUncheckedUpdateManyInput = {
    posts_id?: IntFieldUpdateOperationsInput | number
    networks_id?: IntFieldUpdateOperationsInput | number
    contents_id?: IntFieldUpdateOperationsInput | number
    post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    network_post_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PostedContentAttachmentCreateInput = {
    attachments: AttachmentCreateNestedOneWithoutPosted_content_has_attachmentsInput
    posted_content: PostedContentCreateNestedOneWithoutPosted_content_has_attachmentsInput
  }

  export type PostedContentAttachmentUncheckedCreateInput = {
    posts_id: number
    networks_id: number
    attachments_id: number
  }

  export type PostedContentAttachmentUpdateInput = {
    attachments?: AttachmentUpdateOneRequiredWithoutPosted_content_has_attachmentsNestedInput
    posted_content?: PostedContentUpdateOneRequiredWithoutPosted_content_has_attachmentsNestedInput
  }

  export type PostedContentAttachmentUncheckedUpdateInput = {
    posts_id?: IntFieldUpdateOperationsInput | number
    networks_id?: IntFieldUpdateOperationsInput | number
    attachments_id?: IntFieldUpdateOperationsInput | number
  }

  export type PostedContentAttachmentCreateManyInput = {
    posts_id: number
    networks_id: number
    attachments_id: number
  }

  export type PostedContentAttachmentUpdateManyMutationInput = {

  }

  export type PostedContentAttachmentUncheckedUpdateManyInput = {
    posts_id?: IntFieldUpdateOperationsInput | number
    networks_id?: IntFieldUpdateOperationsInput | number
    attachments_id?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NetworkListRelationFilter = {
    every?: NetworkWhereInput
    some?: NetworkWhereInput
    none?: NetworkWhereInput
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type NetworksUsersListRelationFilter = {
    every?: NetworksUsersWhereInput
    some?: NetworksUsersWhereInput
    none?: NetworksUsersWhereInput
  }

  export type PostEditorListRelationFilter = {
    every?: PostEditorWhereInput
    some?: PostEditorWhereInput
    none?: PostEditorWhereInput
  }

  export type NetworkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NetworksUsersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostEditorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    displayname?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    displayname?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    displayname?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NetworkTokenListRelationFilter = {
    every?: NetworkTokenWhereInput
    some?: NetworkTokenWhereInput
    none?: NetworkTokenWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PostedContentListRelationFilter = {
    every?: PostedContentWhereInput
    some?: PostedContentWhereInput
    none?: PostedContentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type NetworkTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostedContentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NetworkOrderByRelevanceInput = {
    fields: NetworkOrderByRelevanceFieldEnum | NetworkOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type NetworkIdOwner_idCompoundUniqueInput = {
    id: number
    owner_id: number
  }

  export type NetworkCountOrderByAggregateInput = {
    id?: SortOrder
    owner_id?: SortOrder
    network_type?: SortOrder
    network_name?: SortOrder
    note?: SortOrder
  }

  export type NetworkAvgOrderByAggregateInput = {
    id?: SortOrder
    owner_id?: SortOrder
  }

  export type NetworkMaxOrderByAggregateInput = {
    id?: SortOrder
    owner_id?: SortOrder
    network_type?: SortOrder
    network_name?: SortOrder
    note?: SortOrder
  }

  export type NetworkMinOrderByAggregateInput = {
    id?: SortOrder
    owner_id?: SortOrder
    network_type?: SortOrder
    network_name?: SortOrder
    note?: SortOrder
  }

  export type NetworkSumOrderByAggregateInput = {
    id?: SortOrder
    owner_id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NetworkScalarRelationFilter = {
    is?: NetworkWhereInput
    isNot?: NetworkWhereInput
  }

  export type NetworkTokenOrderByRelevanceInput = {
    fields: NetworkTokenOrderByRelevanceFieldEnum | NetworkTokenOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type NetworkTokenNetwork_idToken_nameCompoundUniqueInput = {
    network_id: number
    token_name: string
  }

  export type NetworkTokenCountOrderByAggregateInput = {
    network_id?: SortOrder
    token_name?: SortOrder
    token?: SortOrder
  }

  export type NetworkTokenAvgOrderByAggregateInput = {
    network_id?: SortOrder
  }

  export type NetworkTokenMaxOrderByAggregateInput = {
    network_id?: SortOrder
    token_name?: SortOrder
    token?: SortOrder
  }

  export type NetworkTokenMinOrderByAggregateInput = {
    network_id?: SortOrder
    token_name?: SortOrder
    token?: SortOrder
  }

  export type NetworkTokenSumOrderByAggregateInput = {
    network_id?: SortOrder
  }

  export type NetworksUsersOrderByRelevanceInput = {
    fields: NetworksUsersOrderByRelevanceFieldEnum | NetworksUsersOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type NetworksUsersNetworks_idGranter_idGrantee_idCompoundUniqueInput = {
    networks_id: number
    granter_id: number
    grantee_id: number
  }

  export type NetworksUsersCountOrderByAggregateInput = {
    networks_id?: SortOrder
    granter_id?: SortOrder
    grantee_id?: SortOrder
    permission?: SortOrder
  }

  export type NetworksUsersAvgOrderByAggregateInput = {
    networks_id?: SortOrder
    granter_id?: SortOrder
    grantee_id?: SortOrder
  }

  export type NetworksUsersMaxOrderByAggregateInput = {
    networks_id?: SortOrder
    granter_id?: SortOrder
    grantee_id?: SortOrder
    permission?: SortOrder
  }

  export type NetworksUsersMinOrderByAggregateInput = {
    networks_id?: SortOrder
    granter_id?: SortOrder
    grantee_id?: SortOrder
    permission?: SortOrder
  }

  export type NetworksUsersSumOrderByAggregateInput = {
    networks_id?: SortOrder
    granter_id?: SortOrder
    grantee_id?: SortOrder
  }

  export type AttachmentListRelationFilter = {
    every?: AttachmentWhereInput
    some?: AttachmentWhereInput
    none?: AttachmentWhereInput
  }

  export type ContentListRelationFilter = {
    every?: ContentWhereInput
    some?: ContentWhereInput
    none?: ContentWhereInput
  }

  export type AttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    creator_id?: SortOrder
  }

  export type PostAvgOrderByAggregateInput = {
    id?: SortOrder
    creator_id?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    creator_id?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    creator_id?: SortOrder
  }

  export type PostSumOrderByAggregateInput = {
    id?: SortOrder
    creator_id?: SortOrder
  }

  export type PostScalarRelationFilter = {
    is?: PostWhereInput
    isNot?: PostWhereInput
  }

  export type PostEditorPosts_idEditor_idCompoundUniqueInput = {
    posts_id: number
    editor_id: number
  }

  export type PostEditorCountOrderByAggregateInput = {
    posts_id?: SortOrder
    editor_id?: SortOrder
  }

  export type PostEditorAvgOrderByAggregateInput = {
    posts_id?: SortOrder
    editor_id?: SortOrder
  }

  export type PostEditorMaxOrderByAggregateInput = {
    posts_id?: SortOrder
    editor_id?: SortOrder
  }

  export type PostEditorMinOrderByAggregateInput = {
    posts_id?: SortOrder
    editor_id?: SortOrder
  }

  export type PostEditorSumOrderByAggregateInput = {
    posts_id?: SortOrder
    editor_id?: SortOrder
  }

  export type PostedContentAttachmentListRelationFilter = {
    every?: PostedContentAttachmentWhereInput
    some?: PostedContentAttachmentWhereInput
    none?: PostedContentAttachmentWhereInput
  }

  export type PostedContentAttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AttachmentOrderByRelevanceInput = {
    fields: AttachmentOrderByRelevanceFieldEnum | AttachmentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AttachmentIdPosts_idCompoundUniqueInput = {
    id: number
    posts_id: number
  }

  export type AttachmentCountOrderByAggregateInput = {
    id?: SortOrder
    posts_id?: SortOrder
    path?: SortOrder
  }

  export type AttachmentAvgOrderByAggregateInput = {
    id?: SortOrder
    posts_id?: SortOrder
  }

  export type AttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    posts_id?: SortOrder
    path?: SortOrder
  }

  export type AttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    posts_id?: SortOrder
    path?: SortOrder
  }

  export type AttachmentSumOrderByAggregateInput = {
    id?: SortOrder
    posts_id?: SortOrder
  }

  export type ContentOrderByRelevanceInput = {
    fields: ContentOrderByRelevanceFieldEnum | ContentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ContentCountOrderByAggregateInput = {
    id?: SortOrder
    posts_id?: SortOrder
    content?: SortOrder
  }

  export type ContentAvgOrderByAggregateInput = {
    id?: SortOrder
    posts_id?: SortOrder
  }

  export type ContentMaxOrderByAggregateInput = {
    id?: SortOrder
    posts_id?: SortOrder
    content?: SortOrder
  }

  export type ContentMinOrderByAggregateInput = {
    id?: SortOrder
    posts_id?: SortOrder
    content?: SortOrder
  }

  export type ContentSumOrderByAggregateInput = {
    id?: SortOrder
    posts_id?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ContentScalarRelationFilter = {
    is?: ContentWhereInput
    isNot?: ContentWhereInput
  }

  export type PostedContentOrderByRelevanceInput = {
    fields: PostedContentOrderByRelevanceFieldEnum | PostedContentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PostedContentPosts_idNetworks_idCompoundUniqueInput = {
    posts_id: number
    networks_id: number
  }

  export type PostedContentCountOrderByAggregateInput = {
    posts_id?: SortOrder
    networks_id?: SortOrder
    contents_id?: SortOrder
    post_date?: SortOrder
    actual_post_date?: SortOrder
    network_post_id?: SortOrder
  }

  export type PostedContentAvgOrderByAggregateInput = {
    posts_id?: SortOrder
    networks_id?: SortOrder
    contents_id?: SortOrder
  }

  export type PostedContentMaxOrderByAggregateInput = {
    posts_id?: SortOrder
    networks_id?: SortOrder
    contents_id?: SortOrder
    post_date?: SortOrder
    actual_post_date?: SortOrder
    network_post_id?: SortOrder
  }

  export type PostedContentMinOrderByAggregateInput = {
    posts_id?: SortOrder
    networks_id?: SortOrder
    contents_id?: SortOrder
    post_date?: SortOrder
    actual_post_date?: SortOrder
    network_post_id?: SortOrder
  }

  export type PostedContentSumOrderByAggregateInput = {
    posts_id?: SortOrder
    networks_id?: SortOrder
    contents_id?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AttachmentScalarRelationFilter = {
    is?: AttachmentWhereInput
    isNot?: AttachmentWhereInput
  }

  export type PostedContentScalarRelationFilter = {
    is?: PostedContentWhereInput
    isNot?: PostedContentWhereInput
  }

  export type PostedContentAttachmentPosts_idNetworks_idAttachments_idCompoundUniqueInput = {
    posts_id: number
    networks_id: number
    attachments_id: number
  }

  export type PostedContentAttachmentCountOrderByAggregateInput = {
    posts_id?: SortOrder
    networks_id?: SortOrder
    attachments_id?: SortOrder
  }

  export type PostedContentAttachmentAvgOrderByAggregateInput = {
    posts_id?: SortOrder
    networks_id?: SortOrder
    attachments_id?: SortOrder
  }

  export type PostedContentAttachmentMaxOrderByAggregateInput = {
    posts_id?: SortOrder
    networks_id?: SortOrder
    attachments_id?: SortOrder
  }

  export type PostedContentAttachmentMinOrderByAggregateInput = {
    posts_id?: SortOrder
    networks_id?: SortOrder
    attachments_id?: SortOrder
  }

  export type PostedContentAttachmentSumOrderByAggregateInput = {
    posts_id?: SortOrder
    networks_id?: SortOrder
    attachments_id?: SortOrder
  }

  export type NetworkCreateNestedManyWithoutUsersInput = {
    create?: XOR<NetworkCreateWithoutUsersInput, NetworkUncheckedCreateWithoutUsersInput> | NetworkCreateWithoutUsersInput[] | NetworkUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: NetworkCreateOrConnectWithoutUsersInput | NetworkCreateOrConnectWithoutUsersInput[]
    createMany?: NetworkCreateManyUsersInputEnvelope
    connect?: NetworkWhereUniqueInput | NetworkWhereUniqueInput[]
  }

  export type PostCreateNestedManyWithoutUsersInput = {
    create?: XOR<PostCreateWithoutUsersInput, PostUncheckedCreateWithoutUsersInput> | PostCreateWithoutUsersInput[] | PostUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUsersInput | PostCreateOrConnectWithoutUsersInput[]
    createMany?: PostCreateManyUsersInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type NetworksUsersCreateNestedManyWithoutUsersInput = {
    create?: XOR<NetworksUsersCreateWithoutUsersInput, NetworksUsersUncheckedCreateWithoutUsersInput> | NetworksUsersCreateWithoutUsersInput[] | NetworksUsersUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: NetworksUsersCreateOrConnectWithoutUsersInput | NetworksUsersCreateOrConnectWithoutUsersInput[]
    createMany?: NetworksUsersCreateManyUsersInputEnvelope
    connect?: NetworksUsersWhereUniqueInput | NetworksUsersWhereUniqueInput[]
  }

  export type PostEditorCreateNestedManyWithoutUsersInput = {
    create?: XOR<PostEditorCreateWithoutUsersInput, PostEditorUncheckedCreateWithoutUsersInput> | PostEditorCreateWithoutUsersInput[] | PostEditorUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: PostEditorCreateOrConnectWithoutUsersInput | PostEditorCreateOrConnectWithoutUsersInput[]
    createMany?: PostEditorCreateManyUsersInputEnvelope
    connect?: PostEditorWhereUniqueInput | PostEditorWhereUniqueInput[]
  }

  export type NetworkUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<NetworkCreateWithoutUsersInput, NetworkUncheckedCreateWithoutUsersInput> | NetworkCreateWithoutUsersInput[] | NetworkUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: NetworkCreateOrConnectWithoutUsersInput | NetworkCreateOrConnectWithoutUsersInput[]
    createMany?: NetworkCreateManyUsersInputEnvelope
    connect?: NetworkWhereUniqueInput | NetworkWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<PostCreateWithoutUsersInput, PostUncheckedCreateWithoutUsersInput> | PostCreateWithoutUsersInput[] | PostUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUsersInput | PostCreateOrConnectWithoutUsersInput[]
    createMany?: PostCreateManyUsersInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type NetworksUsersUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<NetworksUsersCreateWithoutUsersInput, NetworksUsersUncheckedCreateWithoutUsersInput> | NetworksUsersCreateWithoutUsersInput[] | NetworksUsersUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: NetworksUsersCreateOrConnectWithoutUsersInput | NetworksUsersCreateOrConnectWithoutUsersInput[]
    createMany?: NetworksUsersCreateManyUsersInputEnvelope
    connect?: NetworksUsersWhereUniqueInput | NetworksUsersWhereUniqueInput[]
  }

  export type PostEditorUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<PostEditorCreateWithoutUsersInput, PostEditorUncheckedCreateWithoutUsersInput> | PostEditorCreateWithoutUsersInput[] | PostEditorUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: PostEditorCreateOrConnectWithoutUsersInput | PostEditorCreateOrConnectWithoutUsersInput[]
    createMany?: PostEditorCreateManyUsersInputEnvelope
    connect?: PostEditorWhereUniqueInput | PostEditorWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NetworkUpdateManyWithoutUsersNestedInput = {
    create?: XOR<NetworkCreateWithoutUsersInput, NetworkUncheckedCreateWithoutUsersInput> | NetworkCreateWithoutUsersInput[] | NetworkUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: NetworkCreateOrConnectWithoutUsersInput | NetworkCreateOrConnectWithoutUsersInput[]
    upsert?: NetworkUpsertWithWhereUniqueWithoutUsersInput | NetworkUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: NetworkCreateManyUsersInputEnvelope
    set?: NetworkWhereUniqueInput | NetworkWhereUniqueInput[]
    disconnect?: NetworkWhereUniqueInput | NetworkWhereUniqueInput[]
    delete?: NetworkWhereUniqueInput | NetworkWhereUniqueInput[]
    connect?: NetworkWhereUniqueInput | NetworkWhereUniqueInput[]
    update?: NetworkUpdateWithWhereUniqueWithoutUsersInput | NetworkUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: NetworkUpdateManyWithWhereWithoutUsersInput | NetworkUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: NetworkScalarWhereInput | NetworkScalarWhereInput[]
  }

  export type PostUpdateManyWithoutUsersNestedInput = {
    create?: XOR<PostCreateWithoutUsersInput, PostUncheckedCreateWithoutUsersInput> | PostCreateWithoutUsersInput[] | PostUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUsersInput | PostCreateOrConnectWithoutUsersInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutUsersInput | PostUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: PostCreateManyUsersInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutUsersInput | PostUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: PostUpdateManyWithWhereWithoutUsersInput | PostUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type NetworksUsersUpdateManyWithoutUsersNestedInput = {
    create?: XOR<NetworksUsersCreateWithoutUsersInput, NetworksUsersUncheckedCreateWithoutUsersInput> | NetworksUsersCreateWithoutUsersInput[] | NetworksUsersUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: NetworksUsersCreateOrConnectWithoutUsersInput | NetworksUsersCreateOrConnectWithoutUsersInput[]
    upsert?: NetworksUsersUpsertWithWhereUniqueWithoutUsersInput | NetworksUsersUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: NetworksUsersCreateManyUsersInputEnvelope
    set?: NetworksUsersWhereUniqueInput | NetworksUsersWhereUniqueInput[]
    disconnect?: NetworksUsersWhereUniqueInput | NetworksUsersWhereUniqueInput[]
    delete?: NetworksUsersWhereUniqueInput | NetworksUsersWhereUniqueInput[]
    connect?: NetworksUsersWhereUniqueInput | NetworksUsersWhereUniqueInput[]
    update?: NetworksUsersUpdateWithWhereUniqueWithoutUsersInput | NetworksUsersUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: NetworksUsersUpdateManyWithWhereWithoutUsersInput | NetworksUsersUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: NetworksUsersScalarWhereInput | NetworksUsersScalarWhereInput[]
  }

  export type PostEditorUpdateManyWithoutUsersNestedInput = {
    create?: XOR<PostEditorCreateWithoutUsersInput, PostEditorUncheckedCreateWithoutUsersInput> | PostEditorCreateWithoutUsersInput[] | PostEditorUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: PostEditorCreateOrConnectWithoutUsersInput | PostEditorCreateOrConnectWithoutUsersInput[]
    upsert?: PostEditorUpsertWithWhereUniqueWithoutUsersInput | PostEditorUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: PostEditorCreateManyUsersInputEnvelope
    set?: PostEditorWhereUniqueInput | PostEditorWhereUniqueInput[]
    disconnect?: PostEditorWhereUniqueInput | PostEditorWhereUniqueInput[]
    delete?: PostEditorWhereUniqueInput | PostEditorWhereUniqueInput[]
    connect?: PostEditorWhereUniqueInput | PostEditorWhereUniqueInput[]
    update?: PostEditorUpdateWithWhereUniqueWithoutUsersInput | PostEditorUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: PostEditorUpdateManyWithWhereWithoutUsersInput | PostEditorUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: PostEditorScalarWhereInput | PostEditorScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NetworkUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<NetworkCreateWithoutUsersInput, NetworkUncheckedCreateWithoutUsersInput> | NetworkCreateWithoutUsersInput[] | NetworkUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: NetworkCreateOrConnectWithoutUsersInput | NetworkCreateOrConnectWithoutUsersInput[]
    upsert?: NetworkUpsertWithWhereUniqueWithoutUsersInput | NetworkUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: NetworkCreateManyUsersInputEnvelope
    set?: NetworkWhereUniqueInput | NetworkWhereUniqueInput[]
    disconnect?: NetworkWhereUniqueInput | NetworkWhereUniqueInput[]
    delete?: NetworkWhereUniqueInput | NetworkWhereUniqueInput[]
    connect?: NetworkWhereUniqueInput | NetworkWhereUniqueInput[]
    update?: NetworkUpdateWithWhereUniqueWithoutUsersInput | NetworkUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: NetworkUpdateManyWithWhereWithoutUsersInput | NetworkUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: NetworkScalarWhereInput | NetworkScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<PostCreateWithoutUsersInput, PostUncheckedCreateWithoutUsersInput> | PostCreateWithoutUsersInput[] | PostUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUsersInput | PostCreateOrConnectWithoutUsersInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutUsersInput | PostUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: PostCreateManyUsersInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutUsersInput | PostUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: PostUpdateManyWithWhereWithoutUsersInput | PostUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type NetworksUsersUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<NetworksUsersCreateWithoutUsersInput, NetworksUsersUncheckedCreateWithoutUsersInput> | NetworksUsersCreateWithoutUsersInput[] | NetworksUsersUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: NetworksUsersCreateOrConnectWithoutUsersInput | NetworksUsersCreateOrConnectWithoutUsersInput[]
    upsert?: NetworksUsersUpsertWithWhereUniqueWithoutUsersInput | NetworksUsersUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: NetworksUsersCreateManyUsersInputEnvelope
    set?: NetworksUsersWhereUniqueInput | NetworksUsersWhereUniqueInput[]
    disconnect?: NetworksUsersWhereUniqueInput | NetworksUsersWhereUniqueInput[]
    delete?: NetworksUsersWhereUniqueInput | NetworksUsersWhereUniqueInput[]
    connect?: NetworksUsersWhereUniqueInput | NetworksUsersWhereUniqueInput[]
    update?: NetworksUsersUpdateWithWhereUniqueWithoutUsersInput | NetworksUsersUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: NetworksUsersUpdateManyWithWhereWithoutUsersInput | NetworksUsersUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: NetworksUsersScalarWhereInput | NetworksUsersScalarWhereInput[]
  }

  export type PostEditorUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<PostEditorCreateWithoutUsersInput, PostEditorUncheckedCreateWithoutUsersInput> | PostEditorCreateWithoutUsersInput[] | PostEditorUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: PostEditorCreateOrConnectWithoutUsersInput | PostEditorCreateOrConnectWithoutUsersInput[]
    upsert?: PostEditorUpsertWithWhereUniqueWithoutUsersInput | PostEditorUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: PostEditorCreateManyUsersInputEnvelope
    set?: PostEditorWhereUniqueInput | PostEditorWhereUniqueInput[]
    disconnect?: PostEditorWhereUniqueInput | PostEditorWhereUniqueInput[]
    delete?: PostEditorWhereUniqueInput | PostEditorWhereUniqueInput[]
    connect?: PostEditorWhereUniqueInput | PostEditorWhereUniqueInput[]
    update?: PostEditorUpdateWithWhereUniqueWithoutUsersInput | PostEditorUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: PostEditorUpdateManyWithWhereWithoutUsersInput | PostEditorUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: PostEditorScalarWhereInput | PostEditorScalarWhereInput[]
  }

  export type NetworkTokenCreateNestedManyWithoutNetworksInput = {
    create?: XOR<NetworkTokenCreateWithoutNetworksInput, NetworkTokenUncheckedCreateWithoutNetworksInput> | NetworkTokenCreateWithoutNetworksInput[] | NetworkTokenUncheckedCreateWithoutNetworksInput[]
    connectOrCreate?: NetworkTokenCreateOrConnectWithoutNetworksInput | NetworkTokenCreateOrConnectWithoutNetworksInput[]
    createMany?: NetworkTokenCreateManyNetworksInputEnvelope
    connect?: NetworkTokenWhereUniqueInput | NetworkTokenWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutNetworksInput = {
    create?: XOR<UserCreateWithoutNetworksInput, UserUncheckedCreateWithoutNetworksInput>
    connectOrCreate?: UserCreateOrConnectWithoutNetworksInput
    connect?: UserWhereUniqueInput
  }

  export type PostedContentCreateNestedManyWithoutNetworksInput = {
    create?: XOR<PostedContentCreateWithoutNetworksInput, PostedContentUncheckedCreateWithoutNetworksInput> | PostedContentCreateWithoutNetworksInput[] | PostedContentUncheckedCreateWithoutNetworksInput[]
    connectOrCreate?: PostedContentCreateOrConnectWithoutNetworksInput | PostedContentCreateOrConnectWithoutNetworksInput[]
    createMany?: PostedContentCreateManyNetworksInputEnvelope
    connect?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
  }

  export type NetworksUsersCreateNestedManyWithoutNetworksInput = {
    create?: XOR<NetworksUsersCreateWithoutNetworksInput, NetworksUsersUncheckedCreateWithoutNetworksInput> | NetworksUsersCreateWithoutNetworksInput[] | NetworksUsersUncheckedCreateWithoutNetworksInput[]
    connectOrCreate?: NetworksUsersCreateOrConnectWithoutNetworksInput | NetworksUsersCreateOrConnectWithoutNetworksInput[]
    createMany?: NetworksUsersCreateManyNetworksInputEnvelope
    connect?: NetworksUsersWhereUniqueInput | NetworksUsersWhereUniqueInput[]
  }

  export type NetworkTokenUncheckedCreateNestedManyWithoutNetworksInput = {
    create?: XOR<NetworkTokenCreateWithoutNetworksInput, NetworkTokenUncheckedCreateWithoutNetworksInput> | NetworkTokenCreateWithoutNetworksInput[] | NetworkTokenUncheckedCreateWithoutNetworksInput[]
    connectOrCreate?: NetworkTokenCreateOrConnectWithoutNetworksInput | NetworkTokenCreateOrConnectWithoutNetworksInput[]
    createMany?: NetworkTokenCreateManyNetworksInputEnvelope
    connect?: NetworkTokenWhereUniqueInput | NetworkTokenWhereUniqueInput[]
  }

  export type PostedContentUncheckedCreateNestedManyWithoutNetworksInput = {
    create?: XOR<PostedContentCreateWithoutNetworksInput, PostedContentUncheckedCreateWithoutNetworksInput> | PostedContentCreateWithoutNetworksInput[] | PostedContentUncheckedCreateWithoutNetworksInput[]
    connectOrCreate?: PostedContentCreateOrConnectWithoutNetworksInput | PostedContentCreateOrConnectWithoutNetworksInput[]
    createMany?: PostedContentCreateManyNetworksInputEnvelope
    connect?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
  }

  export type NetworksUsersUncheckedCreateNestedManyWithoutNetworksInput = {
    create?: XOR<NetworksUsersCreateWithoutNetworksInput, NetworksUsersUncheckedCreateWithoutNetworksInput> | NetworksUsersCreateWithoutNetworksInput[] | NetworksUsersUncheckedCreateWithoutNetworksInput[]
    connectOrCreate?: NetworksUsersCreateOrConnectWithoutNetworksInput | NetworksUsersCreateOrConnectWithoutNetworksInput[]
    createMany?: NetworksUsersCreateManyNetworksInputEnvelope
    connect?: NetworksUsersWhereUniqueInput | NetworksUsersWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NetworkTokenUpdateManyWithoutNetworksNestedInput = {
    create?: XOR<NetworkTokenCreateWithoutNetworksInput, NetworkTokenUncheckedCreateWithoutNetworksInput> | NetworkTokenCreateWithoutNetworksInput[] | NetworkTokenUncheckedCreateWithoutNetworksInput[]
    connectOrCreate?: NetworkTokenCreateOrConnectWithoutNetworksInput | NetworkTokenCreateOrConnectWithoutNetworksInput[]
    upsert?: NetworkTokenUpsertWithWhereUniqueWithoutNetworksInput | NetworkTokenUpsertWithWhereUniqueWithoutNetworksInput[]
    createMany?: NetworkTokenCreateManyNetworksInputEnvelope
    set?: NetworkTokenWhereUniqueInput | NetworkTokenWhereUniqueInput[]
    disconnect?: NetworkTokenWhereUniqueInput | NetworkTokenWhereUniqueInput[]
    delete?: NetworkTokenWhereUniqueInput | NetworkTokenWhereUniqueInput[]
    connect?: NetworkTokenWhereUniqueInput | NetworkTokenWhereUniqueInput[]
    update?: NetworkTokenUpdateWithWhereUniqueWithoutNetworksInput | NetworkTokenUpdateWithWhereUniqueWithoutNetworksInput[]
    updateMany?: NetworkTokenUpdateManyWithWhereWithoutNetworksInput | NetworkTokenUpdateManyWithWhereWithoutNetworksInput[]
    deleteMany?: NetworkTokenScalarWhereInput | NetworkTokenScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutNetworksNestedInput = {
    create?: XOR<UserCreateWithoutNetworksInput, UserUncheckedCreateWithoutNetworksInput>
    connectOrCreate?: UserCreateOrConnectWithoutNetworksInput
    upsert?: UserUpsertWithoutNetworksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNetworksInput, UserUpdateWithoutNetworksInput>, UserUncheckedUpdateWithoutNetworksInput>
  }

  export type PostedContentUpdateManyWithoutNetworksNestedInput = {
    create?: XOR<PostedContentCreateWithoutNetworksInput, PostedContentUncheckedCreateWithoutNetworksInput> | PostedContentCreateWithoutNetworksInput[] | PostedContentUncheckedCreateWithoutNetworksInput[]
    connectOrCreate?: PostedContentCreateOrConnectWithoutNetworksInput | PostedContentCreateOrConnectWithoutNetworksInput[]
    upsert?: PostedContentUpsertWithWhereUniqueWithoutNetworksInput | PostedContentUpsertWithWhereUniqueWithoutNetworksInput[]
    createMany?: PostedContentCreateManyNetworksInputEnvelope
    set?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    disconnect?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    delete?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    connect?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    update?: PostedContentUpdateWithWhereUniqueWithoutNetworksInput | PostedContentUpdateWithWhereUniqueWithoutNetworksInput[]
    updateMany?: PostedContentUpdateManyWithWhereWithoutNetworksInput | PostedContentUpdateManyWithWhereWithoutNetworksInput[]
    deleteMany?: PostedContentScalarWhereInput | PostedContentScalarWhereInput[]
  }

  export type NetworksUsersUpdateManyWithoutNetworksNestedInput = {
    create?: XOR<NetworksUsersCreateWithoutNetworksInput, NetworksUsersUncheckedCreateWithoutNetworksInput> | NetworksUsersCreateWithoutNetworksInput[] | NetworksUsersUncheckedCreateWithoutNetworksInput[]
    connectOrCreate?: NetworksUsersCreateOrConnectWithoutNetworksInput | NetworksUsersCreateOrConnectWithoutNetworksInput[]
    upsert?: NetworksUsersUpsertWithWhereUniqueWithoutNetworksInput | NetworksUsersUpsertWithWhereUniqueWithoutNetworksInput[]
    createMany?: NetworksUsersCreateManyNetworksInputEnvelope
    set?: NetworksUsersWhereUniqueInput | NetworksUsersWhereUniqueInput[]
    disconnect?: NetworksUsersWhereUniqueInput | NetworksUsersWhereUniqueInput[]
    delete?: NetworksUsersWhereUniqueInput | NetworksUsersWhereUniqueInput[]
    connect?: NetworksUsersWhereUniqueInput | NetworksUsersWhereUniqueInput[]
    update?: NetworksUsersUpdateWithWhereUniqueWithoutNetworksInput | NetworksUsersUpdateWithWhereUniqueWithoutNetworksInput[]
    updateMany?: NetworksUsersUpdateManyWithWhereWithoutNetworksInput | NetworksUsersUpdateManyWithWhereWithoutNetworksInput[]
    deleteMany?: NetworksUsersScalarWhereInput | NetworksUsersScalarWhereInput[]
  }

  export type NetworkTokenUncheckedUpdateManyWithoutNetworksNestedInput = {
    create?: XOR<NetworkTokenCreateWithoutNetworksInput, NetworkTokenUncheckedCreateWithoutNetworksInput> | NetworkTokenCreateWithoutNetworksInput[] | NetworkTokenUncheckedCreateWithoutNetworksInput[]
    connectOrCreate?: NetworkTokenCreateOrConnectWithoutNetworksInput | NetworkTokenCreateOrConnectWithoutNetworksInput[]
    upsert?: NetworkTokenUpsertWithWhereUniqueWithoutNetworksInput | NetworkTokenUpsertWithWhereUniqueWithoutNetworksInput[]
    createMany?: NetworkTokenCreateManyNetworksInputEnvelope
    set?: NetworkTokenWhereUniqueInput | NetworkTokenWhereUniqueInput[]
    disconnect?: NetworkTokenWhereUniqueInput | NetworkTokenWhereUniqueInput[]
    delete?: NetworkTokenWhereUniqueInput | NetworkTokenWhereUniqueInput[]
    connect?: NetworkTokenWhereUniqueInput | NetworkTokenWhereUniqueInput[]
    update?: NetworkTokenUpdateWithWhereUniqueWithoutNetworksInput | NetworkTokenUpdateWithWhereUniqueWithoutNetworksInput[]
    updateMany?: NetworkTokenUpdateManyWithWhereWithoutNetworksInput | NetworkTokenUpdateManyWithWhereWithoutNetworksInput[]
    deleteMany?: NetworkTokenScalarWhereInput | NetworkTokenScalarWhereInput[]
  }

  export type PostedContentUncheckedUpdateManyWithoutNetworksNestedInput = {
    create?: XOR<PostedContentCreateWithoutNetworksInput, PostedContentUncheckedCreateWithoutNetworksInput> | PostedContentCreateWithoutNetworksInput[] | PostedContentUncheckedCreateWithoutNetworksInput[]
    connectOrCreate?: PostedContentCreateOrConnectWithoutNetworksInput | PostedContentCreateOrConnectWithoutNetworksInput[]
    upsert?: PostedContentUpsertWithWhereUniqueWithoutNetworksInput | PostedContentUpsertWithWhereUniqueWithoutNetworksInput[]
    createMany?: PostedContentCreateManyNetworksInputEnvelope
    set?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    disconnect?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    delete?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    connect?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    update?: PostedContentUpdateWithWhereUniqueWithoutNetworksInput | PostedContentUpdateWithWhereUniqueWithoutNetworksInput[]
    updateMany?: PostedContentUpdateManyWithWhereWithoutNetworksInput | PostedContentUpdateManyWithWhereWithoutNetworksInput[]
    deleteMany?: PostedContentScalarWhereInput | PostedContentScalarWhereInput[]
  }

  export type NetworksUsersUncheckedUpdateManyWithoutNetworksNestedInput = {
    create?: XOR<NetworksUsersCreateWithoutNetworksInput, NetworksUsersUncheckedCreateWithoutNetworksInput> | NetworksUsersCreateWithoutNetworksInput[] | NetworksUsersUncheckedCreateWithoutNetworksInput[]
    connectOrCreate?: NetworksUsersCreateOrConnectWithoutNetworksInput | NetworksUsersCreateOrConnectWithoutNetworksInput[]
    upsert?: NetworksUsersUpsertWithWhereUniqueWithoutNetworksInput | NetworksUsersUpsertWithWhereUniqueWithoutNetworksInput[]
    createMany?: NetworksUsersCreateManyNetworksInputEnvelope
    set?: NetworksUsersWhereUniqueInput | NetworksUsersWhereUniqueInput[]
    disconnect?: NetworksUsersWhereUniqueInput | NetworksUsersWhereUniqueInput[]
    delete?: NetworksUsersWhereUniqueInput | NetworksUsersWhereUniqueInput[]
    connect?: NetworksUsersWhereUniqueInput | NetworksUsersWhereUniqueInput[]
    update?: NetworksUsersUpdateWithWhereUniqueWithoutNetworksInput | NetworksUsersUpdateWithWhereUniqueWithoutNetworksInput[]
    updateMany?: NetworksUsersUpdateManyWithWhereWithoutNetworksInput | NetworksUsersUpdateManyWithWhereWithoutNetworksInput[]
    deleteMany?: NetworksUsersScalarWhereInput | NetworksUsersScalarWhereInput[]
  }

  export type NetworkCreateNestedOneWithoutNetwork_tokensInput = {
    create?: XOR<NetworkCreateWithoutNetwork_tokensInput, NetworkUncheckedCreateWithoutNetwork_tokensInput>
    connectOrCreate?: NetworkCreateOrConnectWithoutNetwork_tokensInput
    connect?: NetworkWhereUniqueInput
  }

  export type NetworkUpdateOneRequiredWithoutNetwork_tokensNestedInput = {
    create?: XOR<NetworkCreateWithoutNetwork_tokensInput, NetworkUncheckedCreateWithoutNetwork_tokensInput>
    connectOrCreate?: NetworkCreateOrConnectWithoutNetwork_tokensInput
    upsert?: NetworkUpsertWithoutNetwork_tokensInput
    connect?: NetworkWhereUniqueInput
    update?: XOR<XOR<NetworkUpdateToOneWithWhereWithoutNetwork_tokensInput, NetworkUpdateWithoutNetwork_tokensInput>, NetworkUncheckedUpdateWithoutNetwork_tokensInput>
  }

  export type NetworkCreateNestedOneWithoutUsers_has_networksInput = {
    create?: XOR<NetworkCreateWithoutUsers_has_networksInput, NetworkUncheckedCreateWithoutUsers_has_networksInput>
    connectOrCreate?: NetworkCreateOrConnectWithoutUsers_has_networksInput
    connect?: NetworkWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUsers_has_networksInput = {
    create?: XOR<UserCreateWithoutUsers_has_networksInput, UserUncheckedCreateWithoutUsers_has_networksInput>
    connectOrCreate?: UserCreateOrConnectWithoutUsers_has_networksInput
    connect?: UserWhereUniqueInput
  }

  export type NetworkUpdateOneRequiredWithoutUsers_has_networksNestedInput = {
    create?: XOR<NetworkCreateWithoutUsers_has_networksInput, NetworkUncheckedCreateWithoutUsers_has_networksInput>
    connectOrCreate?: NetworkCreateOrConnectWithoutUsers_has_networksInput
    upsert?: NetworkUpsertWithoutUsers_has_networksInput
    connect?: NetworkWhereUniqueInput
    update?: XOR<XOR<NetworkUpdateToOneWithWhereWithoutUsers_has_networksInput, NetworkUpdateWithoutUsers_has_networksInput>, NetworkUncheckedUpdateWithoutUsers_has_networksInput>
  }

  export type UserUpdateOneRequiredWithoutUsers_has_networksNestedInput = {
    create?: XOR<UserCreateWithoutUsers_has_networksInput, UserUncheckedCreateWithoutUsers_has_networksInput>
    connectOrCreate?: UserCreateOrConnectWithoutUsers_has_networksInput
    upsert?: UserUpsertWithoutUsers_has_networksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUsers_has_networksInput, UserUpdateWithoutUsers_has_networksInput>, UserUncheckedUpdateWithoutUsers_has_networksInput>
  }

  export type AttachmentCreateNestedManyWithoutPostsInput = {
    create?: XOR<AttachmentCreateWithoutPostsInput, AttachmentUncheckedCreateWithoutPostsInput> | AttachmentCreateWithoutPostsInput[] | AttachmentUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutPostsInput | AttachmentCreateOrConnectWithoutPostsInput[]
    createMany?: AttachmentCreateManyPostsInputEnvelope
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
  }

  export type ContentCreateNestedManyWithoutPostsInput = {
    create?: XOR<ContentCreateWithoutPostsInput, ContentUncheckedCreateWithoutPostsInput> | ContentCreateWithoutPostsInput[] | ContentUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: ContentCreateOrConnectWithoutPostsInput | ContentCreateOrConnectWithoutPostsInput[]
    createMany?: ContentCreateManyPostsInputEnvelope
    connect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
  }

  export type PostedContentCreateNestedManyWithoutPostsInput = {
    create?: XOR<PostedContentCreateWithoutPostsInput, PostedContentUncheckedCreateWithoutPostsInput> | PostedContentCreateWithoutPostsInput[] | PostedContentUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: PostedContentCreateOrConnectWithoutPostsInput | PostedContentCreateOrConnectWithoutPostsInput[]
    createMany?: PostedContentCreateManyPostsInputEnvelope
    connect?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    connect?: UserWhereUniqueInput
  }

  export type PostEditorCreateNestedManyWithoutPostsInput = {
    create?: XOR<PostEditorCreateWithoutPostsInput, PostEditorUncheckedCreateWithoutPostsInput> | PostEditorCreateWithoutPostsInput[] | PostEditorUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: PostEditorCreateOrConnectWithoutPostsInput | PostEditorCreateOrConnectWithoutPostsInput[]
    createMany?: PostEditorCreateManyPostsInputEnvelope
    connect?: PostEditorWhereUniqueInput | PostEditorWhereUniqueInput[]
  }

  export type AttachmentUncheckedCreateNestedManyWithoutPostsInput = {
    create?: XOR<AttachmentCreateWithoutPostsInput, AttachmentUncheckedCreateWithoutPostsInput> | AttachmentCreateWithoutPostsInput[] | AttachmentUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutPostsInput | AttachmentCreateOrConnectWithoutPostsInput[]
    createMany?: AttachmentCreateManyPostsInputEnvelope
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
  }

  export type ContentUncheckedCreateNestedManyWithoutPostsInput = {
    create?: XOR<ContentCreateWithoutPostsInput, ContentUncheckedCreateWithoutPostsInput> | ContentCreateWithoutPostsInput[] | ContentUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: ContentCreateOrConnectWithoutPostsInput | ContentCreateOrConnectWithoutPostsInput[]
    createMany?: ContentCreateManyPostsInputEnvelope
    connect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
  }

  export type PostedContentUncheckedCreateNestedManyWithoutPostsInput = {
    create?: XOR<PostedContentCreateWithoutPostsInput, PostedContentUncheckedCreateWithoutPostsInput> | PostedContentCreateWithoutPostsInput[] | PostedContentUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: PostedContentCreateOrConnectWithoutPostsInput | PostedContentCreateOrConnectWithoutPostsInput[]
    createMany?: PostedContentCreateManyPostsInputEnvelope
    connect?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
  }

  export type PostEditorUncheckedCreateNestedManyWithoutPostsInput = {
    create?: XOR<PostEditorCreateWithoutPostsInput, PostEditorUncheckedCreateWithoutPostsInput> | PostEditorCreateWithoutPostsInput[] | PostEditorUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: PostEditorCreateOrConnectWithoutPostsInput | PostEditorCreateOrConnectWithoutPostsInput[]
    createMany?: PostEditorCreateManyPostsInputEnvelope
    connect?: PostEditorWhereUniqueInput | PostEditorWhereUniqueInput[]
  }

  export type AttachmentUpdateManyWithoutPostsNestedInput = {
    create?: XOR<AttachmentCreateWithoutPostsInput, AttachmentUncheckedCreateWithoutPostsInput> | AttachmentCreateWithoutPostsInput[] | AttachmentUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutPostsInput | AttachmentCreateOrConnectWithoutPostsInput[]
    upsert?: AttachmentUpsertWithWhereUniqueWithoutPostsInput | AttachmentUpsertWithWhereUniqueWithoutPostsInput[]
    createMany?: AttachmentCreateManyPostsInputEnvelope
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    update?: AttachmentUpdateWithWhereUniqueWithoutPostsInput | AttachmentUpdateWithWhereUniqueWithoutPostsInput[]
    updateMany?: AttachmentUpdateManyWithWhereWithoutPostsInput | AttachmentUpdateManyWithWhereWithoutPostsInput[]
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
  }

  export type ContentUpdateManyWithoutPostsNestedInput = {
    create?: XOR<ContentCreateWithoutPostsInput, ContentUncheckedCreateWithoutPostsInput> | ContentCreateWithoutPostsInput[] | ContentUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: ContentCreateOrConnectWithoutPostsInput | ContentCreateOrConnectWithoutPostsInput[]
    upsert?: ContentUpsertWithWhereUniqueWithoutPostsInput | ContentUpsertWithWhereUniqueWithoutPostsInput[]
    createMany?: ContentCreateManyPostsInputEnvelope
    set?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    disconnect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    delete?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    connect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    update?: ContentUpdateWithWhereUniqueWithoutPostsInput | ContentUpdateWithWhereUniqueWithoutPostsInput[]
    updateMany?: ContentUpdateManyWithWhereWithoutPostsInput | ContentUpdateManyWithWhereWithoutPostsInput[]
    deleteMany?: ContentScalarWhereInput | ContentScalarWhereInput[]
  }

  export type PostedContentUpdateManyWithoutPostsNestedInput = {
    create?: XOR<PostedContentCreateWithoutPostsInput, PostedContentUncheckedCreateWithoutPostsInput> | PostedContentCreateWithoutPostsInput[] | PostedContentUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: PostedContentCreateOrConnectWithoutPostsInput | PostedContentCreateOrConnectWithoutPostsInput[]
    upsert?: PostedContentUpsertWithWhereUniqueWithoutPostsInput | PostedContentUpsertWithWhereUniqueWithoutPostsInput[]
    createMany?: PostedContentCreateManyPostsInputEnvelope
    set?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    disconnect?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    delete?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    connect?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    update?: PostedContentUpdateWithWhereUniqueWithoutPostsInput | PostedContentUpdateWithWhereUniqueWithoutPostsInput[]
    updateMany?: PostedContentUpdateManyWithWhereWithoutPostsInput | PostedContentUpdateManyWithWhereWithoutPostsInput[]
    deleteMany?: PostedContentScalarWhereInput | PostedContentScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    upsert?: UserUpsertWithoutPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostsInput, UserUpdateWithoutPostsInput>, UserUncheckedUpdateWithoutPostsInput>
  }

  export type PostEditorUpdateManyWithoutPostsNestedInput = {
    create?: XOR<PostEditorCreateWithoutPostsInput, PostEditorUncheckedCreateWithoutPostsInput> | PostEditorCreateWithoutPostsInput[] | PostEditorUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: PostEditorCreateOrConnectWithoutPostsInput | PostEditorCreateOrConnectWithoutPostsInput[]
    upsert?: PostEditorUpsertWithWhereUniqueWithoutPostsInput | PostEditorUpsertWithWhereUniqueWithoutPostsInput[]
    createMany?: PostEditorCreateManyPostsInputEnvelope
    set?: PostEditorWhereUniqueInput | PostEditorWhereUniqueInput[]
    disconnect?: PostEditorWhereUniqueInput | PostEditorWhereUniqueInput[]
    delete?: PostEditorWhereUniqueInput | PostEditorWhereUniqueInput[]
    connect?: PostEditorWhereUniqueInput | PostEditorWhereUniqueInput[]
    update?: PostEditorUpdateWithWhereUniqueWithoutPostsInput | PostEditorUpdateWithWhereUniqueWithoutPostsInput[]
    updateMany?: PostEditorUpdateManyWithWhereWithoutPostsInput | PostEditorUpdateManyWithWhereWithoutPostsInput[]
    deleteMany?: PostEditorScalarWhereInput | PostEditorScalarWhereInput[]
  }

  export type AttachmentUncheckedUpdateManyWithoutPostsNestedInput = {
    create?: XOR<AttachmentCreateWithoutPostsInput, AttachmentUncheckedCreateWithoutPostsInput> | AttachmentCreateWithoutPostsInput[] | AttachmentUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: AttachmentCreateOrConnectWithoutPostsInput | AttachmentCreateOrConnectWithoutPostsInput[]
    upsert?: AttachmentUpsertWithWhereUniqueWithoutPostsInput | AttachmentUpsertWithWhereUniqueWithoutPostsInput[]
    createMany?: AttachmentCreateManyPostsInputEnvelope
    set?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    disconnect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    delete?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    connect?: AttachmentWhereUniqueInput | AttachmentWhereUniqueInput[]
    update?: AttachmentUpdateWithWhereUniqueWithoutPostsInput | AttachmentUpdateWithWhereUniqueWithoutPostsInput[]
    updateMany?: AttachmentUpdateManyWithWhereWithoutPostsInput | AttachmentUpdateManyWithWhereWithoutPostsInput[]
    deleteMany?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
  }

  export type ContentUncheckedUpdateManyWithoutPostsNestedInput = {
    create?: XOR<ContentCreateWithoutPostsInput, ContentUncheckedCreateWithoutPostsInput> | ContentCreateWithoutPostsInput[] | ContentUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: ContentCreateOrConnectWithoutPostsInput | ContentCreateOrConnectWithoutPostsInput[]
    upsert?: ContentUpsertWithWhereUniqueWithoutPostsInput | ContentUpsertWithWhereUniqueWithoutPostsInput[]
    createMany?: ContentCreateManyPostsInputEnvelope
    set?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    disconnect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    delete?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    connect?: ContentWhereUniqueInput | ContentWhereUniqueInput[]
    update?: ContentUpdateWithWhereUniqueWithoutPostsInput | ContentUpdateWithWhereUniqueWithoutPostsInput[]
    updateMany?: ContentUpdateManyWithWhereWithoutPostsInput | ContentUpdateManyWithWhereWithoutPostsInput[]
    deleteMany?: ContentScalarWhereInput | ContentScalarWhereInput[]
  }

  export type PostedContentUncheckedUpdateManyWithoutPostsNestedInput = {
    create?: XOR<PostedContentCreateWithoutPostsInput, PostedContentUncheckedCreateWithoutPostsInput> | PostedContentCreateWithoutPostsInput[] | PostedContentUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: PostedContentCreateOrConnectWithoutPostsInput | PostedContentCreateOrConnectWithoutPostsInput[]
    upsert?: PostedContentUpsertWithWhereUniqueWithoutPostsInput | PostedContentUpsertWithWhereUniqueWithoutPostsInput[]
    createMany?: PostedContentCreateManyPostsInputEnvelope
    set?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    disconnect?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    delete?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    connect?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    update?: PostedContentUpdateWithWhereUniqueWithoutPostsInput | PostedContentUpdateWithWhereUniqueWithoutPostsInput[]
    updateMany?: PostedContentUpdateManyWithWhereWithoutPostsInput | PostedContentUpdateManyWithWhereWithoutPostsInput[]
    deleteMany?: PostedContentScalarWhereInput | PostedContentScalarWhereInput[]
  }

  export type PostEditorUncheckedUpdateManyWithoutPostsNestedInput = {
    create?: XOR<PostEditorCreateWithoutPostsInput, PostEditorUncheckedCreateWithoutPostsInput> | PostEditorCreateWithoutPostsInput[] | PostEditorUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: PostEditorCreateOrConnectWithoutPostsInput | PostEditorCreateOrConnectWithoutPostsInput[]
    upsert?: PostEditorUpsertWithWhereUniqueWithoutPostsInput | PostEditorUpsertWithWhereUniqueWithoutPostsInput[]
    createMany?: PostEditorCreateManyPostsInputEnvelope
    set?: PostEditorWhereUniqueInput | PostEditorWhereUniqueInput[]
    disconnect?: PostEditorWhereUniqueInput | PostEditorWhereUniqueInput[]
    delete?: PostEditorWhereUniqueInput | PostEditorWhereUniqueInput[]
    connect?: PostEditorWhereUniqueInput | PostEditorWhereUniqueInput[]
    update?: PostEditorUpdateWithWhereUniqueWithoutPostsInput | PostEditorUpdateWithWhereUniqueWithoutPostsInput[]
    updateMany?: PostEditorUpdateManyWithWhereWithoutPostsInput | PostEditorUpdateManyWithWhereWithoutPostsInput[]
    deleteMany?: PostEditorScalarWhereInput | PostEditorScalarWhereInput[]
  }

  export type PostCreateNestedOneWithoutPostEditorInput = {
    create?: XOR<PostCreateWithoutPostEditorInput, PostUncheckedCreateWithoutPostEditorInput>
    connectOrCreate?: PostCreateOrConnectWithoutPostEditorInput
    connect?: PostWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPostEditorInput = {
    create?: XOR<UserCreateWithoutPostEditorInput, UserUncheckedCreateWithoutPostEditorInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostEditorInput
    connect?: UserWhereUniqueInput
  }

  export type PostUpdateOneRequiredWithoutPostEditorNestedInput = {
    create?: XOR<PostCreateWithoutPostEditorInput, PostUncheckedCreateWithoutPostEditorInput>
    connectOrCreate?: PostCreateOrConnectWithoutPostEditorInput
    upsert?: PostUpsertWithoutPostEditorInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutPostEditorInput, PostUpdateWithoutPostEditorInput>, PostUncheckedUpdateWithoutPostEditorInput>
  }

  export type UserUpdateOneRequiredWithoutPostEditorNestedInput = {
    create?: XOR<UserCreateWithoutPostEditorInput, UserUncheckedCreateWithoutPostEditorInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostEditorInput
    upsert?: UserUpsertWithoutPostEditorInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostEditorInput, UserUpdateWithoutPostEditorInput>, UserUncheckedUpdateWithoutPostEditorInput>
  }

  export type PostCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<PostCreateWithoutAttachmentsInput, PostUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: PostCreateOrConnectWithoutAttachmentsInput
    connect?: PostWhereUniqueInput
  }

  export type PostedContentAttachmentCreateNestedManyWithoutAttachmentsInput = {
    create?: XOR<PostedContentAttachmentCreateWithoutAttachmentsInput, PostedContentAttachmentUncheckedCreateWithoutAttachmentsInput> | PostedContentAttachmentCreateWithoutAttachmentsInput[] | PostedContentAttachmentUncheckedCreateWithoutAttachmentsInput[]
    connectOrCreate?: PostedContentAttachmentCreateOrConnectWithoutAttachmentsInput | PostedContentAttachmentCreateOrConnectWithoutAttachmentsInput[]
    createMany?: PostedContentAttachmentCreateManyAttachmentsInputEnvelope
    connect?: PostedContentAttachmentWhereUniqueInput | PostedContentAttachmentWhereUniqueInput[]
  }

  export type PostedContentAttachmentUncheckedCreateNestedManyWithoutAttachmentsInput = {
    create?: XOR<PostedContentAttachmentCreateWithoutAttachmentsInput, PostedContentAttachmentUncheckedCreateWithoutAttachmentsInput> | PostedContentAttachmentCreateWithoutAttachmentsInput[] | PostedContentAttachmentUncheckedCreateWithoutAttachmentsInput[]
    connectOrCreate?: PostedContentAttachmentCreateOrConnectWithoutAttachmentsInput | PostedContentAttachmentCreateOrConnectWithoutAttachmentsInput[]
    createMany?: PostedContentAttachmentCreateManyAttachmentsInputEnvelope
    connect?: PostedContentAttachmentWhereUniqueInput | PostedContentAttachmentWhereUniqueInput[]
  }

  export type PostUpdateOneRequiredWithoutAttachmentsNestedInput = {
    create?: XOR<PostCreateWithoutAttachmentsInput, PostUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: PostCreateOrConnectWithoutAttachmentsInput
    upsert?: PostUpsertWithoutAttachmentsInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutAttachmentsInput, PostUpdateWithoutAttachmentsInput>, PostUncheckedUpdateWithoutAttachmentsInput>
  }

  export type PostedContentAttachmentUpdateManyWithoutAttachmentsNestedInput = {
    create?: XOR<PostedContentAttachmentCreateWithoutAttachmentsInput, PostedContentAttachmentUncheckedCreateWithoutAttachmentsInput> | PostedContentAttachmentCreateWithoutAttachmentsInput[] | PostedContentAttachmentUncheckedCreateWithoutAttachmentsInput[]
    connectOrCreate?: PostedContentAttachmentCreateOrConnectWithoutAttachmentsInput | PostedContentAttachmentCreateOrConnectWithoutAttachmentsInput[]
    upsert?: PostedContentAttachmentUpsertWithWhereUniqueWithoutAttachmentsInput | PostedContentAttachmentUpsertWithWhereUniqueWithoutAttachmentsInput[]
    createMany?: PostedContentAttachmentCreateManyAttachmentsInputEnvelope
    set?: PostedContentAttachmentWhereUniqueInput | PostedContentAttachmentWhereUniqueInput[]
    disconnect?: PostedContentAttachmentWhereUniqueInput | PostedContentAttachmentWhereUniqueInput[]
    delete?: PostedContentAttachmentWhereUniqueInput | PostedContentAttachmentWhereUniqueInput[]
    connect?: PostedContentAttachmentWhereUniqueInput | PostedContentAttachmentWhereUniqueInput[]
    update?: PostedContentAttachmentUpdateWithWhereUniqueWithoutAttachmentsInput | PostedContentAttachmentUpdateWithWhereUniqueWithoutAttachmentsInput[]
    updateMany?: PostedContentAttachmentUpdateManyWithWhereWithoutAttachmentsInput | PostedContentAttachmentUpdateManyWithWhereWithoutAttachmentsInput[]
    deleteMany?: PostedContentAttachmentScalarWhereInput | PostedContentAttachmentScalarWhereInput[]
  }

  export type PostedContentAttachmentUncheckedUpdateManyWithoutAttachmentsNestedInput = {
    create?: XOR<PostedContentAttachmentCreateWithoutAttachmentsInput, PostedContentAttachmentUncheckedCreateWithoutAttachmentsInput> | PostedContentAttachmentCreateWithoutAttachmentsInput[] | PostedContentAttachmentUncheckedCreateWithoutAttachmentsInput[]
    connectOrCreate?: PostedContentAttachmentCreateOrConnectWithoutAttachmentsInput | PostedContentAttachmentCreateOrConnectWithoutAttachmentsInput[]
    upsert?: PostedContentAttachmentUpsertWithWhereUniqueWithoutAttachmentsInput | PostedContentAttachmentUpsertWithWhereUniqueWithoutAttachmentsInput[]
    createMany?: PostedContentAttachmentCreateManyAttachmentsInputEnvelope
    set?: PostedContentAttachmentWhereUniqueInput | PostedContentAttachmentWhereUniqueInput[]
    disconnect?: PostedContentAttachmentWhereUniqueInput | PostedContentAttachmentWhereUniqueInput[]
    delete?: PostedContentAttachmentWhereUniqueInput | PostedContentAttachmentWhereUniqueInput[]
    connect?: PostedContentAttachmentWhereUniqueInput | PostedContentAttachmentWhereUniqueInput[]
    update?: PostedContentAttachmentUpdateWithWhereUniqueWithoutAttachmentsInput | PostedContentAttachmentUpdateWithWhereUniqueWithoutAttachmentsInput[]
    updateMany?: PostedContentAttachmentUpdateManyWithWhereWithoutAttachmentsInput | PostedContentAttachmentUpdateManyWithWhereWithoutAttachmentsInput[]
    deleteMany?: PostedContentAttachmentScalarWhereInput | PostedContentAttachmentScalarWhereInput[]
  }

  export type PostCreateNestedOneWithoutContentsInput = {
    create?: XOR<PostCreateWithoutContentsInput, PostUncheckedCreateWithoutContentsInput>
    connectOrCreate?: PostCreateOrConnectWithoutContentsInput
    connect?: PostWhereUniqueInput
  }

  export type PostedContentCreateNestedManyWithoutContentsInput = {
    create?: XOR<PostedContentCreateWithoutContentsInput, PostedContentUncheckedCreateWithoutContentsInput> | PostedContentCreateWithoutContentsInput[] | PostedContentUncheckedCreateWithoutContentsInput[]
    connectOrCreate?: PostedContentCreateOrConnectWithoutContentsInput | PostedContentCreateOrConnectWithoutContentsInput[]
    createMany?: PostedContentCreateManyContentsInputEnvelope
    connect?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
  }

  export type PostedContentUncheckedCreateNestedManyWithoutContentsInput = {
    create?: XOR<PostedContentCreateWithoutContentsInput, PostedContentUncheckedCreateWithoutContentsInput> | PostedContentCreateWithoutContentsInput[] | PostedContentUncheckedCreateWithoutContentsInput[]
    connectOrCreate?: PostedContentCreateOrConnectWithoutContentsInput | PostedContentCreateOrConnectWithoutContentsInput[]
    createMany?: PostedContentCreateManyContentsInputEnvelope
    connect?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
  }

  export type PostUpdateOneRequiredWithoutContentsNestedInput = {
    create?: XOR<PostCreateWithoutContentsInput, PostUncheckedCreateWithoutContentsInput>
    connectOrCreate?: PostCreateOrConnectWithoutContentsInput
    upsert?: PostUpsertWithoutContentsInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutContentsInput, PostUpdateWithoutContentsInput>, PostUncheckedUpdateWithoutContentsInput>
  }

  export type PostedContentUpdateManyWithoutContentsNestedInput = {
    create?: XOR<PostedContentCreateWithoutContentsInput, PostedContentUncheckedCreateWithoutContentsInput> | PostedContentCreateWithoutContentsInput[] | PostedContentUncheckedCreateWithoutContentsInput[]
    connectOrCreate?: PostedContentCreateOrConnectWithoutContentsInput | PostedContentCreateOrConnectWithoutContentsInput[]
    upsert?: PostedContentUpsertWithWhereUniqueWithoutContentsInput | PostedContentUpsertWithWhereUniqueWithoutContentsInput[]
    createMany?: PostedContentCreateManyContentsInputEnvelope
    set?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    disconnect?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    delete?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    connect?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    update?: PostedContentUpdateWithWhereUniqueWithoutContentsInput | PostedContentUpdateWithWhereUniqueWithoutContentsInput[]
    updateMany?: PostedContentUpdateManyWithWhereWithoutContentsInput | PostedContentUpdateManyWithWhereWithoutContentsInput[]
    deleteMany?: PostedContentScalarWhereInput | PostedContentScalarWhereInput[]
  }

  export type PostedContentUncheckedUpdateManyWithoutContentsNestedInput = {
    create?: XOR<PostedContentCreateWithoutContentsInput, PostedContentUncheckedCreateWithoutContentsInput> | PostedContentCreateWithoutContentsInput[] | PostedContentUncheckedCreateWithoutContentsInput[]
    connectOrCreate?: PostedContentCreateOrConnectWithoutContentsInput | PostedContentCreateOrConnectWithoutContentsInput[]
    upsert?: PostedContentUpsertWithWhereUniqueWithoutContentsInput | PostedContentUpsertWithWhereUniqueWithoutContentsInput[]
    createMany?: PostedContentCreateManyContentsInputEnvelope
    set?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    disconnect?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    delete?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    connect?: PostedContentWhereUniqueInput | PostedContentWhereUniqueInput[]
    update?: PostedContentUpdateWithWhereUniqueWithoutContentsInput | PostedContentUpdateWithWhereUniqueWithoutContentsInput[]
    updateMany?: PostedContentUpdateManyWithWhereWithoutContentsInput | PostedContentUpdateManyWithWhereWithoutContentsInput[]
    deleteMany?: PostedContentScalarWhereInput | PostedContentScalarWhereInput[]
  }

  export type ContentCreateNestedOneWithoutPosted_contentInput = {
    create?: XOR<ContentCreateWithoutPosted_contentInput, ContentUncheckedCreateWithoutPosted_contentInput>
    connectOrCreate?: ContentCreateOrConnectWithoutPosted_contentInput
    connect?: ContentWhereUniqueInput
  }

  export type NetworkCreateNestedOneWithoutPosted_contentInput = {
    create?: XOR<NetworkCreateWithoutPosted_contentInput, NetworkUncheckedCreateWithoutPosted_contentInput>
    connectOrCreate?: NetworkCreateOrConnectWithoutPosted_contentInput
    connect?: NetworkWhereUniqueInput
  }

  export type PostCreateNestedOneWithoutPosted_contentInput = {
    create?: XOR<PostCreateWithoutPosted_contentInput, PostUncheckedCreateWithoutPosted_contentInput>
    connectOrCreate?: PostCreateOrConnectWithoutPosted_contentInput
    connect?: PostWhereUniqueInput
  }

  export type PostedContentAttachmentCreateNestedManyWithoutPosted_contentInput = {
    create?: XOR<PostedContentAttachmentCreateWithoutPosted_contentInput, PostedContentAttachmentUncheckedCreateWithoutPosted_contentInput> | PostedContentAttachmentCreateWithoutPosted_contentInput[] | PostedContentAttachmentUncheckedCreateWithoutPosted_contentInput[]
    connectOrCreate?: PostedContentAttachmentCreateOrConnectWithoutPosted_contentInput | PostedContentAttachmentCreateOrConnectWithoutPosted_contentInput[]
    createMany?: PostedContentAttachmentCreateManyPosted_contentInputEnvelope
    connect?: PostedContentAttachmentWhereUniqueInput | PostedContentAttachmentWhereUniqueInput[]
  }

  export type PostedContentAttachmentUncheckedCreateNestedManyWithoutPosted_contentInput = {
    create?: XOR<PostedContentAttachmentCreateWithoutPosted_contentInput, PostedContentAttachmentUncheckedCreateWithoutPosted_contentInput> | PostedContentAttachmentCreateWithoutPosted_contentInput[] | PostedContentAttachmentUncheckedCreateWithoutPosted_contentInput[]
    connectOrCreate?: PostedContentAttachmentCreateOrConnectWithoutPosted_contentInput | PostedContentAttachmentCreateOrConnectWithoutPosted_contentInput[]
    createMany?: PostedContentAttachmentCreateManyPosted_contentInputEnvelope
    connect?: PostedContentAttachmentWhereUniqueInput | PostedContentAttachmentWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ContentUpdateOneRequiredWithoutPosted_contentNestedInput = {
    create?: XOR<ContentCreateWithoutPosted_contentInput, ContentUncheckedCreateWithoutPosted_contentInput>
    connectOrCreate?: ContentCreateOrConnectWithoutPosted_contentInput
    upsert?: ContentUpsertWithoutPosted_contentInput
    connect?: ContentWhereUniqueInput
    update?: XOR<XOR<ContentUpdateToOneWithWhereWithoutPosted_contentInput, ContentUpdateWithoutPosted_contentInput>, ContentUncheckedUpdateWithoutPosted_contentInput>
  }

  export type NetworkUpdateOneRequiredWithoutPosted_contentNestedInput = {
    create?: XOR<NetworkCreateWithoutPosted_contentInput, NetworkUncheckedCreateWithoutPosted_contentInput>
    connectOrCreate?: NetworkCreateOrConnectWithoutPosted_contentInput
    upsert?: NetworkUpsertWithoutPosted_contentInput
    connect?: NetworkWhereUniqueInput
    update?: XOR<XOR<NetworkUpdateToOneWithWhereWithoutPosted_contentInput, NetworkUpdateWithoutPosted_contentInput>, NetworkUncheckedUpdateWithoutPosted_contentInput>
  }

  export type PostUpdateOneRequiredWithoutPosted_contentNestedInput = {
    create?: XOR<PostCreateWithoutPosted_contentInput, PostUncheckedCreateWithoutPosted_contentInput>
    connectOrCreate?: PostCreateOrConnectWithoutPosted_contentInput
    upsert?: PostUpsertWithoutPosted_contentInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutPosted_contentInput, PostUpdateWithoutPosted_contentInput>, PostUncheckedUpdateWithoutPosted_contentInput>
  }

  export type PostedContentAttachmentUpdateManyWithoutPosted_contentNestedInput = {
    create?: XOR<PostedContentAttachmentCreateWithoutPosted_contentInput, PostedContentAttachmentUncheckedCreateWithoutPosted_contentInput> | PostedContentAttachmentCreateWithoutPosted_contentInput[] | PostedContentAttachmentUncheckedCreateWithoutPosted_contentInput[]
    connectOrCreate?: PostedContentAttachmentCreateOrConnectWithoutPosted_contentInput | PostedContentAttachmentCreateOrConnectWithoutPosted_contentInput[]
    upsert?: PostedContentAttachmentUpsertWithWhereUniqueWithoutPosted_contentInput | PostedContentAttachmentUpsertWithWhereUniqueWithoutPosted_contentInput[]
    createMany?: PostedContentAttachmentCreateManyPosted_contentInputEnvelope
    set?: PostedContentAttachmentWhereUniqueInput | PostedContentAttachmentWhereUniqueInput[]
    disconnect?: PostedContentAttachmentWhereUniqueInput | PostedContentAttachmentWhereUniqueInput[]
    delete?: PostedContentAttachmentWhereUniqueInput | PostedContentAttachmentWhereUniqueInput[]
    connect?: PostedContentAttachmentWhereUniqueInput | PostedContentAttachmentWhereUniqueInput[]
    update?: PostedContentAttachmentUpdateWithWhereUniqueWithoutPosted_contentInput | PostedContentAttachmentUpdateWithWhereUniqueWithoutPosted_contentInput[]
    updateMany?: PostedContentAttachmentUpdateManyWithWhereWithoutPosted_contentInput | PostedContentAttachmentUpdateManyWithWhereWithoutPosted_contentInput[]
    deleteMany?: PostedContentAttachmentScalarWhereInput | PostedContentAttachmentScalarWhereInput[]
  }

  export type PostedContentAttachmentUncheckedUpdateManyWithoutPosted_contentNestedInput = {
    create?: XOR<PostedContentAttachmentCreateWithoutPosted_contentInput, PostedContentAttachmentUncheckedCreateWithoutPosted_contentInput> | PostedContentAttachmentCreateWithoutPosted_contentInput[] | PostedContentAttachmentUncheckedCreateWithoutPosted_contentInput[]
    connectOrCreate?: PostedContentAttachmentCreateOrConnectWithoutPosted_contentInput | PostedContentAttachmentCreateOrConnectWithoutPosted_contentInput[]
    upsert?: PostedContentAttachmentUpsertWithWhereUniqueWithoutPosted_contentInput | PostedContentAttachmentUpsertWithWhereUniqueWithoutPosted_contentInput[]
    createMany?: PostedContentAttachmentCreateManyPosted_contentInputEnvelope
    set?: PostedContentAttachmentWhereUniqueInput | PostedContentAttachmentWhereUniqueInput[]
    disconnect?: PostedContentAttachmentWhereUniqueInput | PostedContentAttachmentWhereUniqueInput[]
    delete?: PostedContentAttachmentWhereUniqueInput | PostedContentAttachmentWhereUniqueInput[]
    connect?: PostedContentAttachmentWhereUniqueInput | PostedContentAttachmentWhereUniqueInput[]
    update?: PostedContentAttachmentUpdateWithWhereUniqueWithoutPosted_contentInput | PostedContentAttachmentUpdateWithWhereUniqueWithoutPosted_contentInput[]
    updateMany?: PostedContentAttachmentUpdateManyWithWhereWithoutPosted_contentInput | PostedContentAttachmentUpdateManyWithWhereWithoutPosted_contentInput[]
    deleteMany?: PostedContentAttachmentScalarWhereInput | PostedContentAttachmentScalarWhereInput[]
  }

  export type AttachmentCreateNestedOneWithoutPosted_content_has_attachmentsInput = {
    create?: XOR<AttachmentCreateWithoutPosted_content_has_attachmentsInput, AttachmentUncheckedCreateWithoutPosted_content_has_attachmentsInput>
    connectOrCreate?: AttachmentCreateOrConnectWithoutPosted_content_has_attachmentsInput
    connect?: AttachmentWhereUniqueInput
  }

  export type PostedContentCreateNestedOneWithoutPosted_content_has_attachmentsInput = {
    create?: XOR<PostedContentCreateWithoutPosted_content_has_attachmentsInput, PostedContentUncheckedCreateWithoutPosted_content_has_attachmentsInput>
    connectOrCreate?: PostedContentCreateOrConnectWithoutPosted_content_has_attachmentsInput
    connect?: PostedContentWhereUniqueInput
  }

  export type AttachmentUpdateOneRequiredWithoutPosted_content_has_attachmentsNestedInput = {
    create?: XOR<AttachmentCreateWithoutPosted_content_has_attachmentsInput, AttachmentUncheckedCreateWithoutPosted_content_has_attachmentsInput>
    connectOrCreate?: AttachmentCreateOrConnectWithoutPosted_content_has_attachmentsInput
    upsert?: AttachmentUpsertWithoutPosted_content_has_attachmentsInput
    connect?: AttachmentWhereUniqueInput
    update?: XOR<XOR<AttachmentUpdateToOneWithWhereWithoutPosted_content_has_attachmentsInput, AttachmentUpdateWithoutPosted_content_has_attachmentsInput>, AttachmentUncheckedUpdateWithoutPosted_content_has_attachmentsInput>
  }

  export type PostedContentUpdateOneRequiredWithoutPosted_content_has_attachmentsNestedInput = {
    create?: XOR<PostedContentCreateWithoutPosted_content_has_attachmentsInput, PostedContentUncheckedCreateWithoutPosted_content_has_attachmentsInput>
    connectOrCreate?: PostedContentCreateOrConnectWithoutPosted_content_has_attachmentsInput
    upsert?: PostedContentUpsertWithoutPosted_content_has_attachmentsInput
    connect?: PostedContentWhereUniqueInput
    update?: XOR<XOR<PostedContentUpdateToOneWithWhereWithoutPosted_content_has_attachmentsInput, PostedContentUpdateWithoutPosted_content_has_attachmentsInput>, PostedContentUncheckedUpdateWithoutPosted_content_has_attachmentsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NetworkCreateWithoutUsersInput = {
    id?: number
    network_type: string
    network_name: string
    note?: string | null
    network_tokens?: NetworkTokenCreateNestedManyWithoutNetworksInput
    posted_content?: PostedContentCreateNestedManyWithoutNetworksInput
    users_has_networks?: NetworksUsersCreateNestedManyWithoutNetworksInput
  }

  export type NetworkUncheckedCreateWithoutUsersInput = {
    id?: number
    network_type: string
    network_name: string
    note?: string | null
    network_tokens?: NetworkTokenUncheckedCreateNestedManyWithoutNetworksInput
    posted_content?: PostedContentUncheckedCreateNestedManyWithoutNetworksInput
    users_has_networks?: NetworksUsersUncheckedCreateNestedManyWithoutNetworksInput
  }

  export type NetworkCreateOrConnectWithoutUsersInput = {
    where: NetworkWhereUniqueInput
    create: XOR<NetworkCreateWithoutUsersInput, NetworkUncheckedCreateWithoutUsersInput>
  }

  export type NetworkCreateManyUsersInputEnvelope = {
    data: NetworkCreateManyUsersInput | NetworkCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type PostCreateWithoutUsersInput = {
    attachments?: AttachmentCreateNestedManyWithoutPostsInput
    contents?: ContentCreateNestedManyWithoutPostsInput
    posted_content?: PostedContentCreateNestedManyWithoutPostsInput
    PostEditor?: PostEditorCreateNestedManyWithoutPostsInput
  }

  export type PostUncheckedCreateWithoutUsersInput = {
    id?: number
    attachments?: AttachmentUncheckedCreateNestedManyWithoutPostsInput
    contents?: ContentUncheckedCreateNestedManyWithoutPostsInput
    posted_content?: PostedContentUncheckedCreateNestedManyWithoutPostsInput
    PostEditor?: PostEditorUncheckedCreateNestedManyWithoutPostsInput
  }

  export type PostCreateOrConnectWithoutUsersInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutUsersInput, PostUncheckedCreateWithoutUsersInput>
  }

  export type PostCreateManyUsersInputEnvelope = {
    data: PostCreateManyUsersInput | PostCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type NetworksUsersCreateWithoutUsersInput = {
    permission: string
    networks: NetworkCreateNestedOneWithoutUsers_has_networksInput
  }

  export type NetworksUsersUncheckedCreateWithoutUsersInput = {
    networks_id: number
    granter_id: number
    permission: string
  }

  export type NetworksUsersCreateOrConnectWithoutUsersInput = {
    where: NetworksUsersWhereUniqueInput
    create: XOR<NetworksUsersCreateWithoutUsersInput, NetworksUsersUncheckedCreateWithoutUsersInput>
  }

  export type NetworksUsersCreateManyUsersInputEnvelope = {
    data: NetworksUsersCreateManyUsersInput | NetworksUsersCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type PostEditorCreateWithoutUsersInput = {
    posts: PostCreateNestedOneWithoutPostEditorInput
  }

  export type PostEditorUncheckedCreateWithoutUsersInput = {
    posts_id: number
  }

  export type PostEditorCreateOrConnectWithoutUsersInput = {
    where: PostEditorWhereUniqueInput
    create: XOR<PostEditorCreateWithoutUsersInput, PostEditorUncheckedCreateWithoutUsersInput>
  }

  export type PostEditorCreateManyUsersInputEnvelope = {
    data: PostEditorCreateManyUsersInput | PostEditorCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type NetworkUpsertWithWhereUniqueWithoutUsersInput = {
    where: NetworkWhereUniqueInput
    update: XOR<NetworkUpdateWithoutUsersInput, NetworkUncheckedUpdateWithoutUsersInput>
    create: XOR<NetworkCreateWithoutUsersInput, NetworkUncheckedCreateWithoutUsersInput>
  }

  export type NetworkUpdateWithWhereUniqueWithoutUsersInput = {
    where: NetworkWhereUniqueInput
    data: XOR<NetworkUpdateWithoutUsersInput, NetworkUncheckedUpdateWithoutUsersInput>
  }

  export type NetworkUpdateManyWithWhereWithoutUsersInput = {
    where: NetworkScalarWhereInput
    data: XOR<NetworkUpdateManyMutationInput, NetworkUncheckedUpdateManyWithoutUsersInput>
  }

  export type NetworkScalarWhereInput = {
    AND?: NetworkScalarWhereInput | NetworkScalarWhereInput[]
    OR?: NetworkScalarWhereInput[]
    NOT?: NetworkScalarWhereInput | NetworkScalarWhereInput[]
    id?: IntFilter<"Network"> | number
    owner_id?: IntFilter<"Network"> | number
    network_type?: StringFilter<"Network"> | string
    network_name?: StringFilter<"Network"> | string
    note?: StringNullableFilter<"Network"> | string | null
  }

  export type PostUpsertWithWhereUniqueWithoutUsersInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutUsersInput, PostUncheckedUpdateWithoutUsersInput>
    create: XOR<PostCreateWithoutUsersInput, PostUncheckedCreateWithoutUsersInput>
  }

  export type PostUpdateWithWhereUniqueWithoutUsersInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutUsersInput, PostUncheckedUpdateWithoutUsersInput>
  }

  export type PostUpdateManyWithWhereWithoutUsersInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutUsersInput>
  }

  export type PostScalarWhereInput = {
    AND?: PostScalarWhereInput | PostScalarWhereInput[]
    OR?: PostScalarWhereInput[]
    NOT?: PostScalarWhereInput | PostScalarWhereInput[]
    id?: IntFilter<"Post"> | number
    creator_id?: IntFilter<"Post"> | number
  }

  export type NetworksUsersUpsertWithWhereUniqueWithoutUsersInput = {
    where: NetworksUsersWhereUniqueInput
    update: XOR<NetworksUsersUpdateWithoutUsersInput, NetworksUsersUncheckedUpdateWithoutUsersInput>
    create: XOR<NetworksUsersCreateWithoutUsersInput, NetworksUsersUncheckedCreateWithoutUsersInput>
  }

  export type NetworksUsersUpdateWithWhereUniqueWithoutUsersInput = {
    where: NetworksUsersWhereUniqueInput
    data: XOR<NetworksUsersUpdateWithoutUsersInput, NetworksUsersUncheckedUpdateWithoutUsersInput>
  }

  export type NetworksUsersUpdateManyWithWhereWithoutUsersInput = {
    where: NetworksUsersScalarWhereInput
    data: XOR<NetworksUsersUpdateManyMutationInput, NetworksUsersUncheckedUpdateManyWithoutUsersInput>
  }

  export type NetworksUsersScalarWhereInput = {
    AND?: NetworksUsersScalarWhereInput | NetworksUsersScalarWhereInput[]
    OR?: NetworksUsersScalarWhereInput[]
    NOT?: NetworksUsersScalarWhereInput | NetworksUsersScalarWhereInput[]
    networks_id?: IntFilter<"NetworksUsers"> | number
    granter_id?: IntFilter<"NetworksUsers"> | number
    grantee_id?: IntFilter<"NetworksUsers"> | number
    permission?: StringFilter<"NetworksUsers"> | string
  }

  export type PostEditorUpsertWithWhereUniqueWithoutUsersInput = {
    where: PostEditorWhereUniqueInput
    update: XOR<PostEditorUpdateWithoutUsersInput, PostEditorUncheckedUpdateWithoutUsersInput>
    create: XOR<PostEditorCreateWithoutUsersInput, PostEditorUncheckedCreateWithoutUsersInput>
  }

  export type PostEditorUpdateWithWhereUniqueWithoutUsersInput = {
    where: PostEditorWhereUniqueInput
    data: XOR<PostEditorUpdateWithoutUsersInput, PostEditorUncheckedUpdateWithoutUsersInput>
  }

  export type PostEditorUpdateManyWithWhereWithoutUsersInput = {
    where: PostEditorScalarWhereInput
    data: XOR<PostEditorUpdateManyMutationInput, PostEditorUncheckedUpdateManyWithoutUsersInput>
  }

  export type PostEditorScalarWhereInput = {
    AND?: PostEditorScalarWhereInput | PostEditorScalarWhereInput[]
    OR?: PostEditorScalarWhereInput[]
    NOT?: PostEditorScalarWhereInput | PostEditorScalarWhereInput[]
    posts_id?: IntFilter<"PostEditor"> | number
    editor_id?: IntFilter<"PostEditor"> | number
  }

  export type NetworkTokenCreateWithoutNetworksInput = {
    token_name: string
    token: string
  }

  export type NetworkTokenUncheckedCreateWithoutNetworksInput = {
    token_name: string
    token: string
  }

  export type NetworkTokenCreateOrConnectWithoutNetworksInput = {
    where: NetworkTokenWhereUniqueInput
    create: XOR<NetworkTokenCreateWithoutNetworksInput, NetworkTokenUncheckedCreateWithoutNetworksInput>
  }

  export type NetworkTokenCreateManyNetworksInputEnvelope = {
    data: NetworkTokenCreateManyNetworksInput | NetworkTokenCreateManyNetworksInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutNetworksInput = {
    username: string
    password: string
    displayname: string
    posts?: PostCreateNestedManyWithoutUsersInput
    users_has_networks?: NetworksUsersCreateNestedManyWithoutUsersInput
    PostEditor?: PostEditorCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutNetworksInput = {
    id?: number
    username: string
    password: string
    displayname: string
    posts?: PostUncheckedCreateNestedManyWithoutUsersInput
    users_has_networks?: NetworksUsersUncheckedCreateNestedManyWithoutUsersInput
    PostEditor?: PostEditorUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserCreateOrConnectWithoutNetworksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNetworksInput, UserUncheckedCreateWithoutNetworksInput>
  }

  export type PostedContentCreateWithoutNetworksInput = {
    post_date?: Date | string | null
    actual_post_date?: Date | string | null
    network_post_id?: string | null
    contents: ContentCreateNestedOneWithoutPosted_contentInput
    posts: PostCreateNestedOneWithoutPosted_contentInput
    posted_content_has_attachments?: PostedContentAttachmentCreateNestedManyWithoutPosted_contentInput
  }

  export type PostedContentUncheckedCreateWithoutNetworksInput = {
    posts_id: number
    contents_id: number
    post_date?: Date | string | null
    actual_post_date?: Date | string | null
    network_post_id?: string | null
    posted_content_has_attachments?: PostedContentAttachmentUncheckedCreateNestedManyWithoutPosted_contentInput
  }

  export type PostedContentCreateOrConnectWithoutNetworksInput = {
    where: PostedContentWhereUniqueInput
    create: XOR<PostedContentCreateWithoutNetworksInput, PostedContentUncheckedCreateWithoutNetworksInput>
  }

  export type PostedContentCreateManyNetworksInputEnvelope = {
    data: PostedContentCreateManyNetworksInput | PostedContentCreateManyNetworksInput[]
    skipDuplicates?: boolean
  }

  export type NetworksUsersCreateWithoutNetworksInput = {
    permission: string
    users: UserCreateNestedOneWithoutUsers_has_networksInput
  }

  export type NetworksUsersUncheckedCreateWithoutNetworksInput = {
    grantee_id: number
    permission: string
  }

  export type NetworksUsersCreateOrConnectWithoutNetworksInput = {
    where: NetworksUsersWhereUniqueInput
    create: XOR<NetworksUsersCreateWithoutNetworksInput, NetworksUsersUncheckedCreateWithoutNetworksInput>
  }

  export type NetworksUsersCreateManyNetworksInputEnvelope = {
    data: NetworksUsersCreateManyNetworksInput | NetworksUsersCreateManyNetworksInput[]
    skipDuplicates?: boolean
  }

  export type NetworkTokenUpsertWithWhereUniqueWithoutNetworksInput = {
    where: NetworkTokenWhereUniqueInput
    update: XOR<NetworkTokenUpdateWithoutNetworksInput, NetworkTokenUncheckedUpdateWithoutNetworksInput>
    create: XOR<NetworkTokenCreateWithoutNetworksInput, NetworkTokenUncheckedCreateWithoutNetworksInput>
  }

  export type NetworkTokenUpdateWithWhereUniqueWithoutNetworksInput = {
    where: NetworkTokenWhereUniqueInput
    data: XOR<NetworkTokenUpdateWithoutNetworksInput, NetworkTokenUncheckedUpdateWithoutNetworksInput>
  }

  export type NetworkTokenUpdateManyWithWhereWithoutNetworksInput = {
    where: NetworkTokenScalarWhereInput
    data: XOR<NetworkTokenUpdateManyMutationInput, NetworkTokenUncheckedUpdateManyWithoutNetworksInput>
  }

  export type NetworkTokenScalarWhereInput = {
    AND?: NetworkTokenScalarWhereInput | NetworkTokenScalarWhereInput[]
    OR?: NetworkTokenScalarWhereInput[]
    NOT?: NetworkTokenScalarWhereInput | NetworkTokenScalarWhereInput[]
    network_id?: IntFilter<"NetworkToken"> | number
    token_name?: StringFilter<"NetworkToken"> | string
    token?: StringFilter<"NetworkToken"> | string
  }

  export type UserUpsertWithoutNetworksInput = {
    update: XOR<UserUpdateWithoutNetworksInput, UserUncheckedUpdateWithoutNetworksInput>
    create: XOR<UserCreateWithoutNetworksInput, UserUncheckedCreateWithoutNetworksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNetworksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNetworksInput, UserUncheckedUpdateWithoutNetworksInput>
  }

  export type UserUpdateWithoutNetworksInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    posts?: PostUpdateManyWithoutUsersNestedInput
    users_has_networks?: NetworksUsersUpdateManyWithoutUsersNestedInput
    PostEditor?: PostEditorUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutNetworksInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    posts?: PostUncheckedUpdateManyWithoutUsersNestedInput
    users_has_networks?: NetworksUsersUncheckedUpdateManyWithoutUsersNestedInput
    PostEditor?: PostEditorUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type PostedContentUpsertWithWhereUniqueWithoutNetworksInput = {
    where: PostedContentWhereUniqueInput
    update: XOR<PostedContentUpdateWithoutNetworksInput, PostedContentUncheckedUpdateWithoutNetworksInput>
    create: XOR<PostedContentCreateWithoutNetworksInput, PostedContentUncheckedCreateWithoutNetworksInput>
  }

  export type PostedContentUpdateWithWhereUniqueWithoutNetworksInput = {
    where: PostedContentWhereUniqueInput
    data: XOR<PostedContentUpdateWithoutNetworksInput, PostedContentUncheckedUpdateWithoutNetworksInput>
  }

  export type PostedContentUpdateManyWithWhereWithoutNetworksInput = {
    where: PostedContentScalarWhereInput
    data: XOR<PostedContentUpdateManyMutationInput, PostedContentUncheckedUpdateManyWithoutNetworksInput>
  }

  export type PostedContentScalarWhereInput = {
    AND?: PostedContentScalarWhereInput | PostedContentScalarWhereInput[]
    OR?: PostedContentScalarWhereInput[]
    NOT?: PostedContentScalarWhereInput | PostedContentScalarWhereInput[]
    posts_id?: IntFilter<"PostedContent"> | number
    networks_id?: IntFilter<"PostedContent"> | number
    contents_id?: IntFilter<"PostedContent"> | number
    post_date?: DateTimeNullableFilter<"PostedContent"> | Date | string | null
    actual_post_date?: DateTimeNullableFilter<"PostedContent"> | Date | string | null
    network_post_id?: StringNullableFilter<"PostedContent"> | string | null
  }

  export type NetworksUsersUpsertWithWhereUniqueWithoutNetworksInput = {
    where: NetworksUsersWhereUniqueInput
    update: XOR<NetworksUsersUpdateWithoutNetworksInput, NetworksUsersUncheckedUpdateWithoutNetworksInput>
    create: XOR<NetworksUsersCreateWithoutNetworksInput, NetworksUsersUncheckedCreateWithoutNetworksInput>
  }

  export type NetworksUsersUpdateWithWhereUniqueWithoutNetworksInput = {
    where: NetworksUsersWhereUniqueInput
    data: XOR<NetworksUsersUpdateWithoutNetworksInput, NetworksUsersUncheckedUpdateWithoutNetworksInput>
  }

  export type NetworksUsersUpdateManyWithWhereWithoutNetworksInput = {
    where: NetworksUsersScalarWhereInput
    data: XOR<NetworksUsersUpdateManyMutationInput, NetworksUsersUncheckedUpdateManyWithoutNetworksInput>
  }

  export type NetworkCreateWithoutNetwork_tokensInput = {
    id?: number
    network_type: string
    network_name: string
    note?: string | null
    users: UserCreateNestedOneWithoutNetworksInput
    posted_content?: PostedContentCreateNestedManyWithoutNetworksInput
    users_has_networks?: NetworksUsersCreateNestedManyWithoutNetworksInput
  }

  export type NetworkUncheckedCreateWithoutNetwork_tokensInput = {
    id?: number
    owner_id: number
    network_type: string
    network_name: string
    note?: string | null
    posted_content?: PostedContentUncheckedCreateNestedManyWithoutNetworksInput
    users_has_networks?: NetworksUsersUncheckedCreateNestedManyWithoutNetworksInput
  }

  export type NetworkCreateOrConnectWithoutNetwork_tokensInput = {
    where: NetworkWhereUniqueInput
    create: XOR<NetworkCreateWithoutNetwork_tokensInput, NetworkUncheckedCreateWithoutNetwork_tokensInput>
  }

  export type NetworkUpsertWithoutNetwork_tokensInput = {
    update: XOR<NetworkUpdateWithoutNetwork_tokensInput, NetworkUncheckedUpdateWithoutNetwork_tokensInput>
    create: XOR<NetworkCreateWithoutNetwork_tokensInput, NetworkUncheckedCreateWithoutNetwork_tokensInput>
    where?: NetworkWhereInput
  }

  export type NetworkUpdateToOneWithWhereWithoutNetwork_tokensInput = {
    where?: NetworkWhereInput
    data: XOR<NetworkUpdateWithoutNetwork_tokensInput, NetworkUncheckedUpdateWithoutNetwork_tokensInput>
  }

  export type NetworkUpdateWithoutNetwork_tokensInput = {
    network_type?: StringFieldUpdateOperationsInput | string
    network_name?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUpdateOneRequiredWithoutNetworksNestedInput
    posted_content?: PostedContentUpdateManyWithoutNetworksNestedInput
    users_has_networks?: NetworksUsersUpdateManyWithoutNetworksNestedInput
  }

  export type NetworkUncheckedUpdateWithoutNetwork_tokensInput = {
    id?: IntFieldUpdateOperationsInput | number
    owner_id?: IntFieldUpdateOperationsInput | number
    network_type?: StringFieldUpdateOperationsInput | string
    network_name?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    posted_content?: PostedContentUncheckedUpdateManyWithoutNetworksNestedInput
    users_has_networks?: NetworksUsersUncheckedUpdateManyWithoutNetworksNestedInput
  }

  export type NetworkCreateWithoutUsers_has_networksInput = {
    id?: number
    network_type: string
    network_name: string
    note?: string | null
    network_tokens?: NetworkTokenCreateNestedManyWithoutNetworksInput
    users: UserCreateNestedOneWithoutNetworksInput
    posted_content?: PostedContentCreateNestedManyWithoutNetworksInput
  }

  export type NetworkUncheckedCreateWithoutUsers_has_networksInput = {
    id?: number
    owner_id: number
    network_type: string
    network_name: string
    note?: string | null
    network_tokens?: NetworkTokenUncheckedCreateNestedManyWithoutNetworksInput
    posted_content?: PostedContentUncheckedCreateNestedManyWithoutNetworksInput
  }

  export type NetworkCreateOrConnectWithoutUsers_has_networksInput = {
    where: NetworkWhereUniqueInput
    create: XOR<NetworkCreateWithoutUsers_has_networksInput, NetworkUncheckedCreateWithoutUsers_has_networksInput>
  }

  export type UserCreateWithoutUsers_has_networksInput = {
    username: string
    password: string
    displayname: string
    networks?: NetworkCreateNestedManyWithoutUsersInput
    posts?: PostCreateNestedManyWithoutUsersInput
    PostEditor?: PostEditorCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutUsers_has_networksInput = {
    id?: number
    username: string
    password: string
    displayname: string
    networks?: NetworkUncheckedCreateNestedManyWithoutUsersInput
    posts?: PostUncheckedCreateNestedManyWithoutUsersInput
    PostEditor?: PostEditorUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserCreateOrConnectWithoutUsers_has_networksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUsers_has_networksInput, UserUncheckedCreateWithoutUsers_has_networksInput>
  }

  export type NetworkUpsertWithoutUsers_has_networksInput = {
    update: XOR<NetworkUpdateWithoutUsers_has_networksInput, NetworkUncheckedUpdateWithoutUsers_has_networksInput>
    create: XOR<NetworkCreateWithoutUsers_has_networksInput, NetworkUncheckedCreateWithoutUsers_has_networksInput>
    where?: NetworkWhereInput
  }

  export type NetworkUpdateToOneWithWhereWithoutUsers_has_networksInput = {
    where?: NetworkWhereInput
    data: XOR<NetworkUpdateWithoutUsers_has_networksInput, NetworkUncheckedUpdateWithoutUsers_has_networksInput>
  }

  export type NetworkUpdateWithoutUsers_has_networksInput = {
    network_type?: StringFieldUpdateOperationsInput | string
    network_name?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    network_tokens?: NetworkTokenUpdateManyWithoutNetworksNestedInput
    users?: UserUpdateOneRequiredWithoutNetworksNestedInput
    posted_content?: PostedContentUpdateManyWithoutNetworksNestedInput
  }

  export type NetworkUncheckedUpdateWithoutUsers_has_networksInput = {
    id?: IntFieldUpdateOperationsInput | number
    owner_id?: IntFieldUpdateOperationsInput | number
    network_type?: StringFieldUpdateOperationsInput | string
    network_name?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    network_tokens?: NetworkTokenUncheckedUpdateManyWithoutNetworksNestedInput
    posted_content?: PostedContentUncheckedUpdateManyWithoutNetworksNestedInput
  }

  export type UserUpsertWithoutUsers_has_networksInput = {
    update: XOR<UserUpdateWithoutUsers_has_networksInput, UserUncheckedUpdateWithoutUsers_has_networksInput>
    create: XOR<UserCreateWithoutUsers_has_networksInput, UserUncheckedCreateWithoutUsers_has_networksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUsers_has_networksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUsers_has_networksInput, UserUncheckedUpdateWithoutUsers_has_networksInput>
  }

  export type UserUpdateWithoutUsers_has_networksInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    networks?: NetworkUpdateManyWithoutUsersNestedInput
    posts?: PostUpdateManyWithoutUsersNestedInput
    PostEditor?: PostEditorUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutUsers_has_networksInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    networks?: NetworkUncheckedUpdateManyWithoutUsersNestedInput
    posts?: PostUncheckedUpdateManyWithoutUsersNestedInput
    PostEditor?: PostEditorUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type AttachmentCreateWithoutPostsInput = {
    id?: number
    path: string
    posted_content_has_attachments?: PostedContentAttachmentCreateNestedManyWithoutAttachmentsInput
  }

  export type AttachmentUncheckedCreateWithoutPostsInput = {
    id?: number
    path: string
    posted_content_has_attachments?: PostedContentAttachmentUncheckedCreateNestedManyWithoutAttachmentsInput
  }

  export type AttachmentCreateOrConnectWithoutPostsInput = {
    where: AttachmentWhereUniqueInput
    create: XOR<AttachmentCreateWithoutPostsInput, AttachmentUncheckedCreateWithoutPostsInput>
  }

  export type AttachmentCreateManyPostsInputEnvelope = {
    data: AttachmentCreateManyPostsInput | AttachmentCreateManyPostsInput[]
    skipDuplicates?: boolean
  }

  export type ContentCreateWithoutPostsInput = {
    content: string
    posted_content?: PostedContentCreateNestedManyWithoutContentsInput
  }

  export type ContentUncheckedCreateWithoutPostsInput = {
    id?: number
    content: string
    posted_content?: PostedContentUncheckedCreateNestedManyWithoutContentsInput
  }

  export type ContentCreateOrConnectWithoutPostsInput = {
    where: ContentWhereUniqueInput
    create: XOR<ContentCreateWithoutPostsInput, ContentUncheckedCreateWithoutPostsInput>
  }

  export type ContentCreateManyPostsInputEnvelope = {
    data: ContentCreateManyPostsInput | ContentCreateManyPostsInput[]
    skipDuplicates?: boolean
  }

  export type PostedContentCreateWithoutPostsInput = {
    post_date?: Date | string | null
    actual_post_date?: Date | string | null
    network_post_id?: string | null
    contents: ContentCreateNestedOneWithoutPosted_contentInput
    networks: NetworkCreateNestedOneWithoutPosted_contentInput
    posted_content_has_attachments?: PostedContentAttachmentCreateNestedManyWithoutPosted_contentInput
  }

  export type PostedContentUncheckedCreateWithoutPostsInput = {
    networks_id: number
    contents_id: number
    post_date?: Date | string | null
    actual_post_date?: Date | string | null
    network_post_id?: string | null
    posted_content_has_attachments?: PostedContentAttachmentUncheckedCreateNestedManyWithoutPosted_contentInput
  }

  export type PostedContentCreateOrConnectWithoutPostsInput = {
    where: PostedContentWhereUniqueInput
    create: XOR<PostedContentCreateWithoutPostsInput, PostedContentUncheckedCreateWithoutPostsInput>
  }

  export type PostedContentCreateManyPostsInputEnvelope = {
    data: PostedContentCreateManyPostsInput | PostedContentCreateManyPostsInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutPostsInput = {
    username: string
    password: string
    displayname: string
    networks?: NetworkCreateNestedManyWithoutUsersInput
    users_has_networks?: NetworksUsersCreateNestedManyWithoutUsersInput
    PostEditor?: PostEditorCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutPostsInput = {
    id?: number
    username: string
    password: string
    displayname: string
    networks?: NetworkUncheckedCreateNestedManyWithoutUsersInput
    users_has_networks?: NetworksUsersUncheckedCreateNestedManyWithoutUsersInput
    PostEditor?: PostEditorUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserCreateOrConnectWithoutPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type PostEditorCreateWithoutPostsInput = {
    users: UserCreateNestedOneWithoutPostEditorInput
  }

  export type PostEditorUncheckedCreateWithoutPostsInput = {
    editor_id: number
  }

  export type PostEditorCreateOrConnectWithoutPostsInput = {
    where: PostEditorWhereUniqueInput
    create: XOR<PostEditorCreateWithoutPostsInput, PostEditorUncheckedCreateWithoutPostsInput>
  }

  export type PostEditorCreateManyPostsInputEnvelope = {
    data: PostEditorCreateManyPostsInput | PostEditorCreateManyPostsInput[]
    skipDuplicates?: boolean
  }

  export type AttachmentUpsertWithWhereUniqueWithoutPostsInput = {
    where: AttachmentWhereUniqueInput
    update: XOR<AttachmentUpdateWithoutPostsInput, AttachmentUncheckedUpdateWithoutPostsInput>
    create: XOR<AttachmentCreateWithoutPostsInput, AttachmentUncheckedCreateWithoutPostsInput>
  }

  export type AttachmentUpdateWithWhereUniqueWithoutPostsInput = {
    where: AttachmentWhereUniqueInput
    data: XOR<AttachmentUpdateWithoutPostsInput, AttachmentUncheckedUpdateWithoutPostsInput>
  }

  export type AttachmentUpdateManyWithWhereWithoutPostsInput = {
    where: AttachmentScalarWhereInput
    data: XOR<AttachmentUpdateManyMutationInput, AttachmentUncheckedUpdateManyWithoutPostsInput>
  }

  export type AttachmentScalarWhereInput = {
    AND?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
    OR?: AttachmentScalarWhereInput[]
    NOT?: AttachmentScalarWhereInput | AttachmentScalarWhereInput[]
    id?: IntFilter<"Attachment"> | number
    posts_id?: IntFilter<"Attachment"> | number
    path?: StringFilter<"Attachment"> | string
  }

  export type ContentUpsertWithWhereUniqueWithoutPostsInput = {
    where: ContentWhereUniqueInput
    update: XOR<ContentUpdateWithoutPostsInput, ContentUncheckedUpdateWithoutPostsInput>
    create: XOR<ContentCreateWithoutPostsInput, ContentUncheckedCreateWithoutPostsInput>
  }

  export type ContentUpdateWithWhereUniqueWithoutPostsInput = {
    where: ContentWhereUniqueInput
    data: XOR<ContentUpdateWithoutPostsInput, ContentUncheckedUpdateWithoutPostsInput>
  }

  export type ContentUpdateManyWithWhereWithoutPostsInput = {
    where: ContentScalarWhereInput
    data: XOR<ContentUpdateManyMutationInput, ContentUncheckedUpdateManyWithoutPostsInput>
  }

  export type ContentScalarWhereInput = {
    AND?: ContentScalarWhereInput | ContentScalarWhereInput[]
    OR?: ContentScalarWhereInput[]
    NOT?: ContentScalarWhereInput | ContentScalarWhereInput[]
    id?: IntFilter<"Content"> | number
    posts_id?: IntFilter<"Content"> | number
    content?: StringFilter<"Content"> | string
  }

  export type PostedContentUpsertWithWhereUniqueWithoutPostsInput = {
    where: PostedContentWhereUniqueInput
    update: XOR<PostedContentUpdateWithoutPostsInput, PostedContentUncheckedUpdateWithoutPostsInput>
    create: XOR<PostedContentCreateWithoutPostsInput, PostedContentUncheckedCreateWithoutPostsInput>
  }

  export type PostedContentUpdateWithWhereUniqueWithoutPostsInput = {
    where: PostedContentWhereUniqueInput
    data: XOR<PostedContentUpdateWithoutPostsInput, PostedContentUncheckedUpdateWithoutPostsInput>
  }

  export type PostedContentUpdateManyWithWhereWithoutPostsInput = {
    where: PostedContentScalarWhereInput
    data: XOR<PostedContentUpdateManyMutationInput, PostedContentUncheckedUpdateManyWithoutPostsInput>
  }

  export type UserUpsertWithoutPostsInput = {
    update: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
  }

  export type UserUpdateWithoutPostsInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    networks?: NetworkUpdateManyWithoutUsersNestedInput
    users_has_networks?: NetworksUsersUpdateManyWithoutUsersNestedInput
    PostEditor?: PostEditorUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    networks?: NetworkUncheckedUpdateManyWithoutUsersNestedInput
    users_has_networks?: NetworksUsersUncheckedUpdateManyWithoutUsersNestedInput
    PostEditor?: PostEditorUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type PostEditorUpsertWithWhereUniqueWithoutPostsInput = {
    where: PostEditorWhereUniqueInput
    update: XOR<PostEditorUpdateWithoutPostsInput, PostEditorUncheckedUpdateWithoutPostsInput>
    create: XOR<PostEditorCreateWithoutPostsInput, PostEditorUncheckedCreateWithoutPostsInput>
  }

  export type PostEditorUpdateWithWhereUniqueWithoutPostsInput = {
    where: PostEditorWhereUniqueInput
    data: XOR<PostEditorUpdateWithoutPostsInput, PostEditorUncheckedUpdateWithoutPostsInput>
  }

  export type PostEditorUpdateManyWithWhereWithoutPostsInput = {
    where: PostEditorScalarWhereInput
    data: XOR<PostEditorUpdateManyMutationInput, PostEditorUncheckedUpdateManyWithoutPostsInput>
  }

  export type PostCreateWithoutPostEditorInput = {
    attachments?: AttachmentCreateNestedManyWithoutPostsInput
    contents?: ContentCreateNestedManyWithoutPostsInput
    posted_content?: PostedContentCreateNestedManyWithoutPostsInput
    users: UserCreateNestedOneWithoutPostsInput
  }

  export type PostUncheckedCreateWithoutPostEditorInput = {
    id?: number
    creator_id: number
    attachments?: AttachmentUncheckedCreateNestedManyWithoutPostsInput
    contents?: ContentUncheckedCreateNestedManyWithoutPostsInput
    posted_content?: PostedContentUncheckedCreateNestedManyWithoutPostsInput
  }

  export type PostCreateOrConnectWithoutPostEditorInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutPostEditorInput, PostUncheckedCreateWithoutPostEditorInput>
  }

  export type UserCreateWithoutPostEditorInput = {
    username: string
    password: string
    displayname: string
    networks?: NetworkCreateNestedManyWithoutUsersInput
    posts?: PostCreateNestedManyWithoutUsersInput
    users_has_networks?: NetworksUsersCreateNestedManyWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutPostEditorInput = {
    id?: number
    username: string
    password: string
    displayname: string
    networks?: NetworkUncheckedCreateNestedManyWithoutUsersInput
    posts?: PostUncheckedCreateNestedManyWithoutUsersInput
    users_has_networks?: NetworksUsersUncheckedCreateNestedManyWithoutUsersInput
  }

  export type UserCreateOrConnectWithoutPostEditorInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostEditorInput, UserUncheckedCreateWithoutPostEditorInput>
  }

  export type PostUpsertWithoutPostEditorInput = {
    update: XOR<PostUpdateWithoutPostEditorInput, PostUncheckedUpdateWithoutPostEditorInput>
    create: XOR<PostCreateWithoutPostEditorInput, PostUncheckedCreateWithoutPostEditorInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutPostEditorInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutPostEditorInput, PostUncheckedUpdateWithoutPostEditorInput>
  }

  export type PostUpdateWithoutPostEditorInput = {
    attachments?: AttachmentUpdateManyWithoutPostsNestedInput
    contents?: ContentUpdateManyWithoutPostsNestedInput
    posted_content?: PostedContentUpdateManyWithoutPostsNestedInput
    users?: UserUpdateOneRequiredWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutPostEditorInput = {
    id?: IntFieldUpdateOperationsInput | number
    creator_id?: IntFieldUpdateOperationsInput | number
    attachments?: AttachmentUncheckedUpdateManyWithoutPostsNestedInput
    contents?: ContentUncheckedUpdateManyWithoutPostsNestedInput
    posted_content?: PostedContentUncheckedUpdateManyWithoutPostsNestedInput
  }

  export type UserUpsertWithoutPostEditorInput = {
    update: XOR<UserUpdateWithoutPostEditorInput, UserUncheckedUpdateWithoutPostEditorInput>
    create: XOR<UserCreateWithoutPostEditorInput, UserUncheckedCreateWithoutPostEditorInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostEditorInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostEditorInput, UserUncheckedUpdateWithoutPostEditorInput>
  }

  export type UserUpdateWithoutPostEditorInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    networks?: NetworkUpdateManyWithoutUsersNestedInput
    posts?: PostUpdateManyWithoutUsersNestedInput
    users_has_networks?: NetworksUsersUpdateManyWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutPostEditorInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    displayname?: StringFieldUpdateOperationsInput | string
    networks?: NetworkUncheckedUpdateManyWithoutUsersNestedInput
    posts?: PostUncheckedUpdateManyWithoutUsersNestedInput
    users_has_networks?: NetworksUsersUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type PostCreateWithoutAttachmentsInput = {
    contents?: ContentCreateNestedManyWithoutPostsInput
    posted_content?: PostedContentCreateNestedManyWithoutPostsInput
    users: UserCreateNestedOneWithoutPostsInput
    PostEditor?: PostEditorCreateNestedManyWithoutPostsInput
  }

  export type PostUncheckedCreateWithoutAttachmentsInput = {
    id?: number
    creator_id: number
    contents?: ContentUncheckedCreateNestedManyWithoutPostsInput
    posted_content?: PostedContentUncheckedCreateNestedManyWithoutPostsInput
    PostEditor?: PostEditorUncheckedCreateNestedManyWithoutPostsInput
  }

  export type PostCreateOrConnectWithoutAttachmentsInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutAttachmentsInput, PostUncheckedCreateWithoutAttachmentsInput>
  }

  export type PostedContentAttachmentCreateWithoutAttachmentsInput = {
    posted_content: PostedContentCreateNestedOneWithoutPosted_content_has_attachmentsInput
  }

  export type PostedContentAttachmentUncheckedCreateWithoutAttachmentsInput = {
    posts_id: number
    networks_id: number
  }

  export type PostedContentAttachmentCreateOrConnectWithoutAttachmentsInput = {
    where: PostedContentAttachmentWhereUniqueInput
    create: XOR<PostedContentAttachmentCreateWithoutAttachmentsInput, PostedContentAttachmentUncheckedCreateWithoutAttachmentsInput>
  }

  export type PostedContentAttachmentCreateManyAttachmentsInputEnvelope = {
    data: PostedContentAttachmentCreateManyAttachmentsInput | PostedContentAttachmentCreateManyAttachmentsInput[]
    skipDuplicates?: boolean
  }

  export type PostUpsertWithoutAttachmentsInput = {
    update: XOR<PostUpdateWithoutAttachmentsInput, PostUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<PostCreateWithoutAttachmentsInput, PostUncheckedCreateWithoutAttachmentsInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutAttachmentsInput, PostUncheckedUpdateWithoutAttachmentsInput>
  }

  export type PostUpdateWithoutAttachmentsInput = {
    contents?: ContentUpdateManyWithoutPostsNestedInput
    posted_content?: PostedContentUpdateManyWithoutPostsNestedInput
    users?: UserUpdateOneRequiredWithoutPostsNestedInput
    PostEditor?: PostEditorUpdateManyWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutAttachmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    creator_id?: IntFieldUpdateOperationsInput | number
    contents?: ContentUncheckedUpdateManyWithoutPostsNestedInput
    posted_content?: PostedContentUncheckedUpdateManyWithoutPostsNestedInput
    PostEditor?: PostEditorUncheckedUpdateManyWithoutPostsNestedInput
  }

  export type PostedContentAttachmentUpsertWithWhereUniqueWithoutAttachmentsInput = {
    where: PostedContentAttachmentWhereUniqueInput
    update: XOR<PostedContentAttachmentUpdateWithoutAttachmentsInput, PostedContentAttachmentUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<PostedContentAttachmentCreateWithoutAttachmentsInput, PostedContentAttachmentUncheckedCreateWithoutAttachmentsInput>
  }

  export type PostedContentAttachmentUpdateWithWhereUniqueWithoutAttachmentsInput = {
    where: PostedContentAttachmentWhereUniqueInput
    data: XOR<PostedContentAttachmentUpdateWithoutAttachmentsInput, PostedContentAttachmentUncheckedUpdateWithoutAttachmentsInput>
  }

  export type PostedContentAttachmentUpdateManyWithWhereWithoutAttachmentsInput = {
    where: PostedContentAttachmentScalarWhereInput
    data: XOR<PostedContentAttachmentUpdateManyMutationInput, PostedContentAttachmentUncheckedUpdateManyWithoutAttachmentsInput>
  }

  export type PostedContentAttachmentScalarWhereInput = {
    AND?: PostedContentAttachmentScalarWhereInput | PostedContentAttachmentScalarWhereInput[]
    OR?: PostedContentAttachmentScalarWhereInput[]
    NOT?: PostedContentAttachmentScalarWhereInput | PostedContentAttachmentScalarWhereInput[]
    posts_id?: IntFilter<"PostedContentAttachment"> | number
    networks_id?: IntFilter<"PostedContentAttachment"> | number
    attachments_id?: IntFilter<"PostedContentAttachment"> | number
  }

  export type PostCreateWithoutContentsInput = {
    attachments?: AttachmentCreateNestedManyWithoutPostsInput
    posted_content?: PostedContentCreateNestedManyWithoutPostsInput
    users: UserCreateNestedOneWithoutPostsInput
    PostEditor?: PostEditorCreateNestedManyWithoutPostsInput
  }

  export type PostUncheckedCreateWithoutContentsInput = {
    id?: number
    creator_id: number
    attachments?: AttachmentUncheckedCreateNestedManyWithoutPostsInput
    posted_content?: PostedContentUncheckedCreateNestedManyWithoutPostsInput
    PostEditor?: PostEditorUncheckedCreateNestedManyWithoutPostsInput
  }

  export type PostCreateOrConnectWithoutContentsInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutContentsInput, PostUncheckedCreateWithoutContentsInput>
  }

  export type PostedContentCreateWithoutContentsInput = {
    post_date?: Date | string | null
    actual_post_date?: Date | string | null
    network_post_id?: string | null
    networks: NetworkCreateNestedOneWithoutPosted_contentInput
    posts: PostCreateNestedOneWithoutPosted_contentInput
    posted_content_has_attachments?: PostedContentAttachmentCreateNestedManyWithoutPosted_contentInput
  }

  export type PostedContentUncheckedCreateWithoutContentsInput = {
    posts_id: number
    networks_id: number
    post_date?: Date | string | null
    actual_post_date?: Date | string | null
    network_post_id?: string | null
    posted_content_has_attachments?: PostedContentAttachmentUncheckedCreateNestedManyWithoutPosted_contentInput
  }

  export type PostedContentCreateOrConnectWithoutContentsInput = {
    where: PostedContentWhereUniqueInput
    create: XOR<PostedContentCreateWithoutContentsInput, PostedContentUncheckedCreateWithoutContentsInput>
  }

  export type PostedContentCreateManyContentsInputEnvelope = {
    data: PostedContentCreateManyContentsInput | PostedContentCreateManyContentsInput[]
    skipDuplicates?: boolean
  }

  export type PostUpsertWithoutContentsInput = {
    update: XOR<PostUpdateWithoutContentsInput, PostUncheckedUpdateWithoutContentsInput>
    create: XOR<PostCreateWithoutContentsInput, PostUncheckedCreateWithoutContentsInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutContentsInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutContentsInput, PostUncheckedUpdateWithoutContentsInput>
  }

  export type PostUpdateWithoutContentsInput = {
    attachments?: AttachmentUpdateManyWithoutPostsNestedInput
    posted_content?: PostedContentUpdateManyWithoutPostsNestedInput
    users?: UserUpdateOneRequiredWithoutPostsNestedInput
    PostEditor?: PostEditorUpdateManyWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutContentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    creator_id?: IntFieldUpdateOperationsInput | number
    attachments?: AttachmentUncheckedUpdateManyWithoutPostsNestedInput
    posted_content?: PostedContentUncheckedUpdateManyWithoutPostsNestedInput
    PostEditor?: PostEditorUncheckedUpdateManyWithoutPostsNestedInput
  }

  export type PostedContentUpsertWithWhereUniqueWithoutContentsInput = {
    where: PostedContentWhereUniqueInput
    update: XOR<PostedContentUpdateWithoutContentsInput, PostedContentUncheckedUpdateWithoutContentsInput>
    create: XOR<PostedContentCreateWithoutContentsInput, PostedContentUncheckedCreateWithoutContentsInput>
  }

  export type PostedContentUpdateWithWhereUniqueWithoutContentsInput = {
    where: PostedContentWhereUniqueInput
    data: XOR<PostedContentUpdateWithoutContentsInput, PostedContentUncheckedUpdateWithoutContentsInput>
  }

  export type PostedContentUpdateManyWithWhereWithoutContentsInput = {
    where: PostedContentScalarWhereInput
    data: XOR<PostedContentUpdateManyMutationInput, PostedContentUncheckedUpdateManyWithoutContentsInput>
  }

  export type ContentCreateWithoutPosted_contentInput = {
    content: string
    posts: PostCreateNestedOneWithoutContentsInput
  }

  export type ContentUncheckedCreateWithoutPosted_contentInput = {
    id?: number
    posts_id: number
    content: string
  }

  export type ContentCreateOrConnectWithoutPosted_contentInput = {
    where: ContentWhereUniqueInput
    create: XOR<ContentCreateWithoutPosted_contentInput, ContentUncheckedCreateWithoutPosted_contentInput>
  }

  export type NetworkCreateWithoutPosted_contentInput = {
    id?: number
    network_type: string
    network_name: string
    note?: string | null
    network_tokens?: NetworkTokenCreateNestedManyWithoutNetworksInput
    users: UserCreateNestedOneWithoutNetworksInput
    users_has_networks?: NetworksUsersCreateNestedManyWithoutNetworksInput
  }

  export type NetworkUncheckedCreateWithoutPosted_contentInput = {
    id?: number
    owner_id: number
    network_type: string
    network_name: string
    note?: string | null
    network_tokens?: NetworkTokenUncheckedCreateNestedManyWithoutNetworksInput
    users_has_networks?: NetworksUsersUncheckedCreateNestedManyWithoutNetworksInput
  }

  export type NetworkCreateOrConnectWithoutPosted_contentInput = {
    where: NetworkWhereUniqueInput
    create: XOR<NetworkCreateWithoutPosted_contentInput, NetworkUncheckedCreateWithoutPosted_contentInput>
  }

  export type PostCreateWithoutPosted_contentInput = {
    attachments?: AttachmentCreateNestedManyWithoutPostsInput
    contents?: ContentCreateNestedManyWithoutPostsInput
    users: UserCreateNestedOneWithoutPostsInput
    PostEditor?: PostEditorCreateNestedManyWithoutPostsInput
  }

  export type PostUncheckedCreateWithoutPosted_contentInput = {
    id?: number
    creator_id: number
    attachments?: AttachmentUncheckedCreateNestedManyWithoutPostsInput
    contents?: ContentUncheckedCreateNestedManyWithoutPostsInput
    PostEditor?: PostEditorUncheckedCreateNestedManyWithoutPostsInput
  }

  export type PostCreateOrConnectWithoutPosted_contentInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutPosted_contentInput, PostUncheckedCreateWithoutPosted_contentInput>
  }

  export type PostedContentAttachmentCreateWithoutPosted_contentInput = {
    attachments: AttachmentCreateNestedOneWithoutPosted_content_has_attachmentsInput
  }

  export type PostedContentAttachmentUncheckedCreateWithoutPosted_contentInput = {
    attachments_id: number
  }

  export type PostedContentAttachmentCreateOrConnectWithoutPosted_contentInput = {
    where: PostedContentAttachmentWhereUniqueInput
    create: XOR<PostedContentAttachmentCreateWithoutPosted_contentInput, PostedContentAttachmentUncheckedCreateWithoutPosted_contentInput>
  }

  export type PostedContentAttachmentCreateManyPosted_contentInputEnvelope = {
    data: PostedContentAttachmentCreateManyPosted_contentInput | PostedContentAttachmentCreateManyPosted_contentInput[]
    skipDuplicates?: boolean
  }

  export type ContentUpsertWithoutPosted_contentInput = {
    update: XOR<ContentUpdateWithoutPosted_contentInput, ContentUncheckedUpdateWithoutPosted_contentInput>
    create: XOR<ContentCreateWithoutPosted_contentInput, ContentUncheckedCreateWithoutPosted_contentInput>
    where?: ContentWhereInput
  }

  export type ContentUpdateToOneWithWhereWithoutPosted_contentInput = {
    where?: ContentWhereInput
    data: XOR<ContentUpdateWithoutPosted_contentInput, ContentUncheckedUpdateWithoutPosted_contentInput>
  }

  export type ContentUpdateWithoutPosted_contentInput = {
    content?: StringFieldUpdateOperationsInput | string
    posts?: PostUpdateOneRequiredWithoutContentsNestedInput
  }

  export type ContentUncheckedUpdateWithoutPosted_contentInput = {
    id?: IntFieldUpdateOperationsInput | number
    posts_id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
  }

  export type NetworkUpsertWithoutPosted_contentInput = {
    update: XOR<NetworkUpdateWithoutPosted_contentInput, NetworkUncheckedUpdateWithoutPosted_contentInput>
    create: XOR<NetworkCreateWithoutPosted_contentInput, NetworkUncheckedCreateWithoutPosted_contentInput>
    where?: NetworkWhereInput
  }

  export type NetworkUpdateToOneWithWhereWithoutPosted_contentInput = {
    where?: NetworkWhereInput
    data: XOR<NetworkUpdateWithoutPosted_contentInput, NetworkUncheckedUpdateWithoutPosted_contentInput>
  }

  export type NetworkUpdateWithoutPosted_contentInput = {
    network_type?: StringFieldUpdateOperationsInput | string
    network_name?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    network_tokens?: NetworkTokenUpdateManyWithoutNetworksNestedInput
    users?: UserUpdateOneRequiredWithoutNetworksNestedInput
    users_has_networks?: NetworksUsersUpdateManyWithoutNetworksNestedInput
  }

  export type NetworkUncheckedUpdateWithoutPosted_contentInput = {
    id?: IntFieldUpdateOperationsInput | number
    owner_id?: IntFieldUpdateOperationsInput | number
    network_type?: StringFieldUpdateOperationsInput | string
    network_name?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    network_tokens?: NetworkTokenUncheckedUpdateManyWithoutNetworksNestedInput
    users_has_networks?: NetworksUsersUncheckedUpdateManyWithoutNetworksNestedInput
  }

  export type PostUpsertWithoutPosted_contentInput = {
    update: XOR<PostUpdateWithoutPosted_contentInput, PostUncheckedUpdateWithoutPosted_contentInput>
    create: XOR<PostCreateWithoutPosted_contentInput, PostUncheckedCreateWithoutPosted_contentInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutPosted_contentInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutPosted_contentInput, PostUncheckedUpdateWithoutPosted_contentInput>
  }

  export type PostUpdateWithoutPosted_contentInput = {
    attachments?: AttachmentUpdateManyWithoutPostsNestedInput
    contents?: ContentUpdateManyWithoutPostsNestedInput
    users?: UserUpdateOneRequiredWithoutPostsNestedInput
    PostEditor?: PostEditorUpdateManyWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutPosted_contentInput = {
    id?: IntFieldUpdateOperationsInput | number
    creator_id?: IntFieldUpdateOperationsInput | number
    attachments?: AttachmentUncheckedUpdateManyWithoutPostsNestedInput
    contents?: ContentUncheckedUpdateManyWithoutPostsNestedInput
    PostEditor?: PostEditorUncheckedUpdateManyWithoutPostsNestedInput
  }

  export type PostedContentAttachmentUpsertWithWhereUniqueWithoutPosted_contentInput = {
    where: PostedContentAttachmentWhereUniqueInput
    update: XOR<PostedContentAttachmentUpdateWithoutPosted_contentInput, PostedContentAttachmentUncheckedUpdateWithoutPosted_contentInput>
    create: XOR<PostedContentAttachmentCreateWithoutPosted_contentInput, PostedContentAttachmentUncheckedCreateWithoutPosted_contentInput>
  }

  export type PostedContentAttachmentUpdateWithWhereUniqueWithoutPosted_contentInput = {
    where: PostedContentAttachmentWhereUniqueInput
    data: XOR<PostedContentAttachmentUpdateWithoutPosted_contentInput, PostedContentAttachmentUncheckedUpdateWithoutPosted_contentInput>
  }

  export type PostedContentAttachmentUpdateManyWithWhereWithoutPosted_contentInput = {
    where: PostedContentAttachmentScalarWhereInput
    data: XOR<PostedContentAttachmentUpdateManyMutationInput, PostedContentAttachmentUncheckedUpdateManyWithoutPosted_contentInput>
  }

  export type AttachmentCreateWithoutPosted_content_has_attachmentsInput = {
    id?: number
    path: string
    posts: PostCreateNestedOneWithoutAttachmentsInput
  }

  export type AttachmentUncheckedCreateWithoutPosted_content_has_attachmentsInput = {
    id?: number
    posts_id: number
    path: string
  }

  export type AttachmentCreateOrConnectWithoutPosted_content_has_attachmentsInput = {
    where: AttachmentWhereUniqueInput
    create: XOR<AttachmentCreateWithoutPosted_content_has_attachmentsInput, AttachmentUncheckedCreateWithoutPosted_content_has_attachmentsInput>
  }

  export type PostedContentCreateWithoutPosted_content_has_attachmentsInput = {
    post_date?: Date | string | null
    actual_post_date?: Date | string | null
    network_post_id?: string | null
    contents: ContentCreateNestedOneWithoutPosted_contentInput
    networks: NetworkCreateNestedOneWithoutPosted_contentInput
    posts: PostCreateNestedOneWithoutPosted_contentInput
  }

  export type PostedContentUncheckedCreateWithoutPosted_content_has_attachmentsInput = {
    posts_id: number
    networks_id: number
    contents_id: number
    post_date?: Date | string | null
    actual_post_date?: Date | string | null
    network_post_id?: string | null
  }

  export type PostedContentCreateOrConnectWithoutPosted_content_has_attachmentsInput = {
    where: PostedContentWhereUniqueInput
    create: XOR<PostedContentCreateWithoutPosted_content_has_attachmentsInput, PostedContentUncheckedCreateWithoutPosted_content_has_attachmentsInput>
  }

  export type AttachmentUpsertWithoutPosted_content_has_attachmentsInput = {
    update: XOR<AttachmentUpdateWithoutPosted_content_has_attachmentsInput, AttachmentUncheckedUpdateWithoutPosted_content_has_attachmentsInput>
    create: XOR<AttachmentCreateWithoutPosted_content_has_attachmentsInput, AttachmentUncheckedCreateWithoutPosted_content_has_attachmentsInput>
    where?: AttachmentWhereInput
  }

  export type AttachmentUpdateToOneWithWhereWithoutPosted_content_has_attachmentsInput = {
    where?: AttachmentWhereInput
    data: XOR<AttachmentUpdateWithoutPosted_content_has_attachmentsInput, AttachmentUncheckedUpdateWithoutPosted_content_has_attachmentsInput>
  }

  export type AttachmentUpdateWithoutPosted_content_has_attachmentsInput = {
    path?: StringFieldUpdateOperationsInput | string
    posts?: PostUpdateOneRequiredWithoutAttachmentsNestedInput
  }

  export type AttachmentUncheckedUpdateWithoutPosted_content_has_attachmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    posts_id?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
  }

  export type PostedContentUpsertWithoutPosted_content_has_attachmentsInput = {
    update: XOR<PostedContentUpdateWithoutPosted_content_has_attachmentsInput, PostedContentUncheckedUpdateWithoutPosted_content_has_attachmentsInput>
    create: XOR<PostedContentCreateWithoutPosted_content_has_attachmentsInput, PostedContentUncheckedCreateWithoutPosted_content_has_attachmentsInput>
    where?: PostedContentWhereInput
  }

  export type PostedContentUpdateToOneWithWhereWithoutPosted_content_has_attachmentsInput = {
    where?: PostedContentWhereInput
    data: XOR<PostedContentUpdateWithoutPosted_content_has_attachmentsInput, PostedContentUncheckedUpdateWithoutPosted_content_has_attachmentsInput>
  }

  export type PostedContentUpdateWithoutPosted_content_has_attachmentsInput = {
    post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    network_post_id?: NullableStringFieldUpdateOperationsInput | string | null
    contents?: ContentUpdateOneRequiredWithoutPosted_contentNestedInput
    networks?: NetworkUpdateOneRequiredWithoutPosted_contentNestedInput
    posts?: PostUpdateOneRequiredWithoutPosted_contentNestedInput
  }

  export type PostedContentUncheckedUpdateWithoutPosted_content_has_attachmentsInput = {
    posts_id?: IntFieldUpdateOperationsInput | number
    networks_id?: IntFieldUpdateOperationsInput | number
    contents_id?: IntFieldUpdateOperationsInput | number
    post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    network_post_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NetworkCreateManyUsersInput = {
    id?: number
    network_type: string
    network_name: string
    note?: string | null
  }

  export type PostCreateManyUsersInput = {
    id?: number
  }

  export type NetworksUsersCreateManyUsersInput = {
    networks_id: number
    granter_id: number
    permission: string
  }

  export type PostEditorCreateManyUsersInput = {
    posts_id: number
  }

  export type NetworkUpdateWithoutUsersInput = {
    network_type?: StringFieldUpdateOperationsInput | string
    network_name?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    network_tokens?: NetworkTokenUpdateManyWithoutNetworksNestedInput
    posted_content?: PostedContentUpdateManyWithoutNetworksNestedInput
    users_has_networks?: NetworksUsersUpdateManyWithoutNetworksNestedInput
  }

  export type NetworkUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    network_type?: StringFieldUpdateOperationsInput | string
    network_name?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    network_tokens?: NetworkTokenUncheckedUpdateManyWithoutNetworksNestedInput
    posted_content?: PostedContentUncheckedUpdateManyWithoutNetworksNestedInput
    users_has_networks?: NetworksUsersUncheckedUpdateManyWithoutNetworksNestedInput
  }

  export type NetworkUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    network_type?: StringFieldUpdateOperationsInput | string
    network_name?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PostUpdateWithoutUsersInput = {
    attachments?: AttachmentUpdateManyWithoutPostsNestedInput
    contents?: ContentUpdateManyWithoutPostsNestedInput
    posted_content?: PostedContentUpdateManyWithoutPostsNestedInput
    PostEditor?: PostEditorUpdateManyWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    attachments?: AttachmentUncheckedUpdateManyWithoutPostsNestedInput
    contents?: ContentUncheckedUpdateManyWithoutPostsNestedInput
    posted_content?: PostedContentUncheckedUpdateManyWithoutPostsNestedInput
    PostEditor?: PostEditorUncheckedUpdateManyWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
  }

  export type NetworksUsersUpdateWithoutUsersInput = {
    permission?: StringFieldUpdateOperationsInput | string
    networks?: NetworkUpdateOneRequiredWithoutUsers_has_networksNestedInput
  }

  export type NetworksUsersUncheckedUpdateWithoutUsersInput = {
    networks_id?: IntFieldUpdateOperationsInput | number
    granter_id?: IntFieldUpdateOperationsInput | number
    permission?: StringFieldUpdateOperationsInput | string
  }

  export type NetworksUsersUncheckedUpdateManyWithoutUsersInput = {
    networks_id?: IntFieldUpdateOperationsInput | number
    granter_id?: IntFieldUpdateOperationsInput | number
    permission?: StringFieldUpdateOperationsInput | string
  }

  export type PostEditorUpdateWithoutUsersInput = {
    posts?: PostUpdateOneRequiredWithoutPostEditorNestedInput
  }

  export type PostEditorUncheckedUpdateWithoutUsersInput = {
    posts_id?: IntFieldUpdateOperationsInput | number
  }

  export type PostEditorUncheckedUpdateManyWithoutUsersInput = {
    posts_id?: IntFieldUpdateOperationsInput | number
  }

  export type NetworkTokenCreateManyNetworksInput = {
    token_name: string
    token: string
  }

  export type PostedContentCreateManyNetworksInput = {
    posts_id: number
    contents_id: number
    post_date?: Date | string | null
    actual_post_date?: Date | string | null
    network_post_id?: string | null
  }

  export type NetworksUsersCreateManyNetworksInput = {
    grantee_id: number
    permission: string
  }

  export type NetworkTokenUpdateWithoutNetworksInput = {
    token_name?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type NetworkTokenUncheckedUpdateWithoutNetworksInput = {
    token_name?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type NetworkTokenUncheckedUpdateManyWithoutNetworksInput = {
    token_name?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type PostedContentUpdateWithoutNetworksInput = {
    post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    network_post_id?: NullableStringFieldUpdateOperationsInput | string | null
    contents?: ContentUpdateOneRequiredWithoutPosted_contentNestedInput
    posts?: PostUpdateOneRequiredWithoutPosted_contentNestedInput
    posted_content_has_attachments?: PostedContentAttachmentUpdateManyWithoutPosted_contentNestedInput
  }

  export type PostedContentUncheckedUpdateWithoutNetworksInput = {
    posts_id?: IntFieldUpdateOperationsInput | number
    contents_id?: IntFieldUpdateOperationsInput | number
    post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    network_post_id?: NullableStringFieldUpdateOperationsInput | string | null
    posted_content_has_attachments?: PostedContentAttachmentUncheckedUpdateManyWithoutPosted_contentNestedInput
  }

  export type PostedContentUncheckedUpdateManyWithoutNetworksInput = {
    posts_id?: IntFieldUpdateOperationsInput | number
    contents_id?: IntFieldUpdateOperationsInput | number
    post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    network_post_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NetworksUsersUpdateWithoutNetworksInput = {
    permission?: StringFieldUpdateOperationsInput | string
    users?: UserUpdateOneRequiredWithoutUsers_has_networksNestedInput
  }

  export type NetworksUsersUncheckedUpdateWithoutNetworksInput = {
    grantee_id?: IntFieldUpdateOperationsInput | number
    permission?: StringFieldUpdateOperationsInput | string
  }

  export type NetworksUsersUncheckedUpdateManyWithoutNetworksInput = {
    grantee_id?: IntFieldUpdateOperationsInput | number
    permission?: StringFieldUpdateOperationsInput | string
  }

  export type AttachmentCreateManyPostsInput = {
    id?: number
    path: string
  }

  export type ContentCreateManyPostsInput = {
    id?: number
    content: string
  }

  export type PostedContentCreateManyPostsInput = {
    networks_id: number
    contents_id: number
    post_date?: Date | string | null
    actual_post_date?: Date | string | null
    network_post_id?: string | null
  }

  export type PostEditorCreateManyPostsInput = {
    editor_id: number
  }

  export type AttachmentUpdateWithoutPostsInput = {
    path?: StringFieldUpdateOperationsInput | string
    posted_content_has_attachments?: PostedContentAttachmentUpdateManyWithoutAttachmentsNestedInput
  }

  export type AttachmentUncheckedUpdateWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    posted_content_has_attachments?: PostedContentAttachmentUncheckedUpdateManyWithoutAttachmentsNestedInput
  }

  export type AttachmentUncheckedUpdateManyWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
  }

  export type ContentUpdateWithoutPostsInput = {
    content?: StringFieldUpdateOperationsInput | string
    posted_content?: PostedContentUpdateManyWithoutContentsNestedInput
  }

  export type ContentUncheckedUpdateWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    posted_content?: PostedContentUncheckedUpdateManyWithoutContentsNestedInput
  }

  export type ContentUncheckedUpdateManyWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
  }

  export type PostedContentUpdateWithoutPostsInput = {
    post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    network_post_id?: NullableStringFieldUpdateOperationsInput | string | null
    contents?: ContentUpdateOneRequiredWithoutPosted_contentNestedInput
    networks?: NetworkUpdateOneRequiredWithoutPosted_contentNestedInput
    posted_content_has_attachments?: PostedContentAttachmentUpdateManyWithoutPosted_contentNestedInput
  }

  export type PostedContentUncheckedUpdateWithoutPostsInput = {
    networks_id?: IntFieldUpdateOperationsInput | number
    contents_id?: IntFieldUpdateOperationsInput | number
    post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    network_post_id?: NullableStringFieldUpdateOperationsInput | string | null
    posted_content_has_attachments?: PostedContentAttachmentUncheckedUpdateManyWithoutPosted_contentNestedInput
  }

  export type PostedContentUncheckedUpdateManyWithoutPostsInput = {
    networks_id?: IntFieldUpdateOperationsInput | number
    contents_id?: IntFieldUpdateOperationsInput | number
    post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    network_post_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PostEditorUpdateWithoutPostsInput = {
    users?: UserUpdateOneRequiredWithoutPostEditorNestedInput
  }

  export type PostEditorUncheckedUpdateWithoutPostsInput = {
    editor_id?: IntFieldUpdateOperationsInput | number
  }

  export type PostEditorUncheckedUpdateManyWithoutPostsInput = {
    editor_id?: IntFieldUpdateOperationsInput | number
  }

  export type PostedContentAttachmentCreateManyAttachmentsInput = {
    posts_id: number
    networks_id: number
  }

  export type PostedContentAttachmentUpdateWithoutAttachmentsInput = {
    posted_content?: PostedContentUpdateOneRequiredWithoutPosted_content_has_attachmentsNestedInput
  }

  export type PostedContentAttachmentUncheckedUpdateWithoutAttachmentsInput = {
    posts_id?: IntFieldUpdateOperationsInput | number
    networks_id?: IntFieldUpdateOperationsInput | number
  }

  export type PostedContentAttachmentUncheckedUpdateManyWithoutAttachmentsInput = {
    posts_id?: IntFieldUpdateOperationsInput | number
    networks_id?: IntFieldUpdateOperationsInput | number
  }

  export type PostedContentCreateManyContentsInput = {
    posts_id: number
    networks_id: number
    post_date?: Date | string | null
    actual_post_date?: Date | string | null
    network_post_id?: string | null
  }

  export type PostedContentUpdateWithoutContentsInput = {
    post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    network_post_id?: NullableStringFieldUpdateOperationsInput | string | null
    networks?: NetworkUpdateOneRequiredWithoutPosted_contentNestedInput
    posts?: PostUpdateOneRequiredWithoutPosted_contentNestedInput
    posted_content_has_attachments?: PostedContentAttachmentUpdateManyWithoutPosted_contentNestedInput
  }

  export type PostedContentUncheckedUpdateWithoutContentsInput = {
    posts_id?: IntFieldUpdateOperationsInput | number
    networks_id?: IntFieldUpdateOperationsInput | number
    post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    network_post_id?: NullableStringFieldUpdateOperationsInput | string | null
    posted_content_has_attachments?: PostedContentAttachmentUncheckedUpdateManyWithoutPosted_contentNestedInput
  }

  export type PostedContentUncheckedUpdateManyWithoutContentsInput = {
    posts_id?: IntFieldUpdateOperationsInput | number
    networks_id?: IntFieldUpdateOperationsInput | number
    post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_post_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    network_post_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PostedContentAttachmentCreateManyPosted_contentInput = {
    attachments_id: number
  }

  export type PostedContentAttachmentUpdateWithoutPosted_contentInput = {
    attachments?: AttachmentUpdateOneRequiredWithoutPosted_content_has_attachmentsNestedInput
  }

  export type PostedContentAttachmentUncheckedUpdateWithoutPosted_contentInput = {
    attachments_id?: IntFieldUpdateOperationsInput | number
  }

  export type PostedContentAttachmentUncheckedUpdateManyWithoutPosted_contentInput = {
    attachments_id?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}