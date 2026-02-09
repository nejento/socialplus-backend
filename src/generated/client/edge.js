
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/edge.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  username: 'username',
  password: 'password',
  displayname: 'displayname'
};

exports.Prisma.NetworkScalarFieldEnum = {
  id: 'id',
  owner_id: 'owner_id',
  network_type: 'network_type',
  network_name: 'network_name',
  note: 'note'
};

exports.Prisma.NetworkTokenScalarFieldEnum = {
  network_id: 'network_id',
  token_name: 'token_name',
  token: 'token'
};

exports.Prisma.NetworksUsersScalarFieldEnum = {
  networks_id: 'networks_id',
  granter_id: 'granter_id',
  grantee_id: 'grantee_id',
  permission: 'permission'
};

exports.Prisma.PostScalarFieldEnum = {
  id: 'id',
  creator_id: 'creator_id'
};

exports.Prisma.PostEditorScalarFieldEnum = {
  posts_id: 'posts_id',
  editor_id: 'editor_id'
};

exports.Prisma.AttachmentScalarFieldEnum = {
  id: 'id',
  posts_id: 'posts_id',
  path: 'path'
};

exports.Prisma.ContentScalarFieldEnum = {
  id: 'id',
  posts_id: 'posts_id',
  content: 'content'
};

exports.Prisma.PostedContentScalarFieldEnum = {
  posts_id: 'posts_id',
  networks_id: 'networks_id',
  contents_id: 'contents_id',
  post_date: 'post_date',
  actual_post_date: 'actual_post_date',
  network_post_id: 'network_post_id'
};

exports.Prisma.PostedContentAttachmentScalarFieldEnum = {
  posts_id: 'posts_id',
  networks_id: 'networks_id',
  attachments_id: 'attachments_id'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.UserOrderByRelevanceFieldEnum = {
  username: 'username',
  password: 'password',
  displayname: 'displayname'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.NetworkOrderByRelevanceFieldEnum = {
  network_type: 'network_type',
  network_name: 'network_name',
  note: 'note'
};

exports.Prisma.NetworkTokenOrderByRelevanceFieldEnum = {
  token_name: 'token_name',
  token: 'token'
};

exports.Prisma.NetworksUsersOrderByRelevanceFieldEnum = {
  permission: 'permission'
};

exports.Prisma.AttachmentOrderByRelevanceFieldEnum = {
  path: 'path'
};

exports.Prisma.ContentOrderByRelevanceFieldEnum = {
  content: 'content'
};

exports.Prisma.PostedContentOrderByRelevanceFieldEnum = {
  network_post_id: 'network_post_id'
};


exports.Prisma.ModelName = {
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
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "D:\\Projects\\Javascript\\socialplus-fastify-backend\\src\\generated\\client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "D:\\Projects\\Javascript\\socialplus-fastify-backend\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mysql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"../src/generated/client\"\n}\n\ndatasource db {\n  provider          = \"mysql\"\n  url               = env(\"DATABASE_URL\")\n  shadowDatabaseUrl = env(\"SHADOW_DATABASE_URL\")\n}\n\nmodel User {\n  id                 Int             @id @unique(map: \"id_UNIQUE\") @default(autoincrement()) /// ID uživatele\n  username           String          @unique(map: \"username_UNIQUE\") @db.VarChar(256) /// Přihlašovací uživatelské jméno\n  password           String          @db.VarChar(256) /// Přihlašovací heslo\n  displayname        String          @db.VarChar(256) /// Zobrazované jméno\n  networks           Network[]\n  posts              Post[]\n  users_has_networks NetworksUsers[]\n  PostEditor         PostEditor[]\n\n  @@map(\"users\")\n}\n\nmodel Network {\n  id                 Int             @unique(map: \"id_UNIQUE\") @default(autoincrement()) /// ID sociální sítě\n  owner_id           Int /// Majitel sociální sítě\n  network_type       String          @db.VarChar(256) /// Typ sociální sítě (např. \"facebook\", \"twitter\", \"instagram\")\n  network_name       String          @db.VarChar(256) /// Název sociální sítě\n  note               String?         @db.VarChar(256) /// Poznámka k sociální síti\n  network_tokens     NetworkToken[]\n  users              User            @relation(fields: [owner_id], references: [id], onDelete: Cascade, onUpdate: NoAction, map: \"fk_networks_users1\")\n  posted_content     PostedContent[]\n  users_has_networks NetworksUsers[]\n\n  @@id([id, owner_id])\n  @@index([owner_id], map: \"fk_networks_users1_idx\")\n  @@map(\"networks\")\n}\n\nmodel NetworkToken {\n  network_id Int /// ID sociální sítě\n  token_name String  @db.VarChar(256) /// Název tokenu\n  token      String  @db.VarChar(256) /// Token\n  networks   Network @relation(fields: [network_id], references: [id], onDelete: Cascade, onUpdate: NoAction, map: \"fk_network_tokens_networks1\")\n\n  @@id([network_id, token_name])\n  @@index([network_id], map: \"network_tokens_networks1_idx\")\n  @@map(\"network_tokens\")\n}\n\nmodel NetworksUsers {\n  networks_id Int /// ID sociální sítě, ke které je udělován přístup\n  granter_id  Int /// ID uživatele, který oprávnění přiděluje\n  grantee_id  Int /// ID uživatele, kterému je přidělováno oprávnění\n  permission  String  @db.VarChar(256) /// Oprávnění (např. \"read\", \"write\", \"admin\")\n  networks    Network @relation(fields: [networks_id, granter_id], references: [id, owner_id], onDelete: Cascade, onUpdate: NoAction, map: \"fk_users_has_networks_networks2\")\n  users       User    @relation(fields: [grantee_id], references: [id], onDelete: Cascade, onUpdate: NoAction, map: \"fk_users_has_networks_users2\")\n\n  @@id([networks_id, granter_id, grantee_id])\n  @@index([networks_id, granter_id], map: \"fk_users_has_networks_networks2_idx\")\n  @@index([grantee_id], map: \"fk_users_has_networks_users2_idx\")\n  @@map(\"users_has_networks\")\n}\n\nmodel Post {\n  id             Int             @id @unique(map: \"id_UNIQUE\") @default(autoincrement()) /// ID příspěvku\n  creator_id     Int /// ID uživatele, který příspěvek vytvořil\n  attachments    Attachment[]\n  contents       Content[]\n  posted_content PostedContent[]\n  users          User            @relation(fields: [creator_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: \"fk_posts_users\")\n  PostEditor     PostEditor[]\n\n  @@index([creator_id], map: \"fk_posts_users_idx\")\n  @@map(\"posts\")\n}\n\nmodel PostEditor {\n  posts_id  Int /// ID příspěvku, který editor spravuje\n  editor_id Int /// ID uživatele, který je editorem příspěvku\n  posts     Post @relation(fields: [posts_id], references: [id], onDelete: Cascade, onUpdate: NoAction, map: \"fk_post_editors_posts1\")\n  users     User @relation(fields: [editor_id], references: [id], onDelete: Cascade, onUpdate: NoAction, map: \"fk_post_editors_users1\")\n\n  @@id([posts_id, editor_id])\n  @@index([posts_id], map: \"fk_post_editors_posts1_idx\")\n  @@index([editor_id], map: \"fk_post_editors_users1_idx\")\n  @@map(\"post_editors\")\n}\n\nmodel Attachment {\n  id                             Int                       @unique(map: \"id_UNIQUE\") @default(autoincrement()) /// ID attachmentu\n  posts_id                       Int /// ID příspěvku, kterému attachment patří\n  path                           String                    @db.VarChar(256) /// Cesta k souboru attachmentu\n  posts                          Post                      @relation(fields: [posts_id], references: [id], onDelete: Cascade, onUpdate: NoAction, map: \"fk_attachments_posts2\")\n  posted_content_has_attachments PostedContentAttachment[]\n\n  @@id([id, posts_id])\n  @@index([posts_id], map: \"fk_attachments_posts2_idx\")\n  @@map(\"attachments\")\n}\n\nmodel Content {\n  id             Int             @id @default(autoincrement()) /// ID obsahu jednotlivých příspěvků\n  posts_id       Int /// ID postu, ke kterému obsah příspěvku patří\n  content        String          @db.MediumText /// Obsah příspěvku\n  posts          Post            @relation(fields: [posts_id], references: [id], onDelete: Cascade, onUpdate: NoAction, map: \"fk_contents_posts1\")\n  posted_content PostedContent[]\n\n  @@index([posts_id], map: \"fk_contents_posts1_idx\")\n  @@map(\"contents\")\n}\n\nmodel PostedContent {\n  posts_id                       Int /// ID příspěvku\n  networks_id                    Int /// ID networku, na kterou je příspěvek odesílán\n  contents_id                    Int /// ID obsahu příspěvku, který je odeslán na danou síť\n  post_date                      DateTime?                 @db.DateTime(0) /// Datum, kdy má být příspěvek postnut\n  actual_post_date               DateTime?                 @db.DateTime(0) /// Skutečné datum odeslání příspěvku vzhledem k možným zpožděním API nebo případným problémům\n  network_post_id                String?                   @db.VarChar(256) /// ID příspěvku na sociální sítí\n  contents                       Content                   @relation(fields: [contents_id], references: [id], onDelete: Cascade, onUpdate: NoAction, map: \"fk_post_content_contents1\")\n  networks                       Network                   @relation(fields: [networks_id], references: [id], onDelete: Cascade, onUpdate: NoAction, map: \"fk_post_content_networks1\")\n  posts                          Post                      @relation(fields: [posts_id], references: [id], onDelete: Cascade, onUpdate: NoAction, map: \"fk_post_content_posts1\")\n  posted_content_has_attachments PostedContentAttachment[]\n\n  @@id([posts_id, networks_id])\n  @@index([contents_id], map: \"fk_post_content_contents1_idx\")\n  @@index([networks_id], map: \"fk_post_content_networks1_idx\")\n  @@map(\"posted_content\")\n}\n\nmodel PostedContentAttachment {\n  posts_id       Int /// ID vybraného postu, ke kterému attachment patří\n  networks_id    Int /// ID networku vybraného postu, ke kterému attachment patří\n  attachments_id Int /// ID attachmentu, který patří k vybranému příspěvku dané sociální sítě\n  attachments    Attachment    @relation(fields: [attachments_id], references: [id], onUpdate: NoAction, map: \"fk_posted_content_has_attachments_attachments1\")\n  posted_content PostedContent @relation(fields: [posts_id, networks_id], references: [posts_id, networks_id], onDelete: Cascade, onUpdate: NoAction, map: \"fk_posted_content_has_attachments_posted_content1\")\n\n  @@id([posts_id, networks_id, attachments_id])\n  @@index([attachments_id], map: \"fk_posted_content_has_attachments_attachments1_idx\")\n  @@index([posts_id, networks_id], map: \"fk_posted_content_has_attachments_posted_content1_idx\")\n  @@map(\"posted_content_has_attachments\")\n}\n",
  "inlineSchemaHash": "52944e4db96c175eae5a4fc972abf16fea9bc4f961be8b635b0e0bf7093fcae3",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"dbName\":\"users\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID uživatele\"},{\"name\":\"username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"256\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Přihlašovací uživatelské jméno\"},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"256\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Přihlašovací heslo\"},{\"name\":\"displayname\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"256\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Zobrazované jméno\"},{\"name\":\"networks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Network\",\"nativeType\":null,\"relationName\":\"NetworkToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"posts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Post\",\"nativeType\":null,\"relationName\":\"PostToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"users_has_networks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"NetworksUsers\",\"nativeType\":null,\"relationName\":\"NetworksUsersToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"PostEditor\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PostEditor\",\"nativeType\":null,\"relationName\":\"PostEditorToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Network\":{\"dbName\":\"networks\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID sociální sítě\"},{\"name\":\"owner_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Majitel sociální sítě\"},{\"name\":\"network_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"256\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Typ sociální sítě (např. \\\"facebook\\\", \\\"twitter\\\", \\\"instagram\\\")\"},{\"name\":\"network_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"256\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Název sociální sítě\"},{\"name\":\"note\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"256\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Poznámka k sociální síti\"},{\"name\":\"network_tokens\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"NetworkToken\",\"nativeType\":null,\"relationName\":\"NetworkToNetworkToken\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"NetworkToUser\",\"relationFromFields\":[\"owner_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"posted_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PostedContent\",\"nativeType\":null,\"relationName\":\"NetworkToPostedContent\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"users_has_networks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"NetworksUsers\",\"nativeType\":null,\"relationName\":\"NetworkToNetworksUsers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"id\",\"owner_id\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"NetworkToken\":{\"dbName\":\"network_tokens\",\"schema\":null,\"fields\":[{\"name\":\"network_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID sociální sítě\"},{\"name\":\"token_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"256\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Název tokenu\"},{\"name\":\"token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"256\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Token\"},{\"name\":\"networks\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Network\",\"nativeType\":null,\"relationName\":\"NetworkToNetworkToken\",\"relationFromFields\":[\"network_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"network_id\",\"token_name\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"NetworksUsers\":{\"dbName\":\"users_has_networks\",\"schema\":null,\"fields\":[{\"name\":\"networks_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID sociální sítě, ke které je udělován přístup\"},{\"name\":\"granter_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID uživatele, který oprávnění přiděluje\"},{\"name\":\"grantee_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID uživatele, kterému je přidělováno oprávnění\"},{\"name\":\"permission\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"256\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Oprávnění (např. \\\"read\\\", \\\"write\\\", \\\"admin\\\")\"},{\"name\":\"networks\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Network\",\"nativeType\":null,\"relationName\":\"NetworkToNetworksUsers\",\"relationFromFields\":[\"networks_id\",\"granter_id\"],\"relationToFields\":[\"id\",\"owner_id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"NetworksUsersToUser\",\"relationFromFields\":[\"grantee_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"networks_id\",\"granter_id\",\"grantee_id\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Post\":{\"dbName\":\"posts\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID příspěvku\"},{\"name\":\"creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID uživatele, který příspěvek vytvořil\"},{\"name\":\"attachments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Attachment\",\"nativeType\":null,\"relationName\":\"AttachmentToPost\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"contents\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Content\",\"nativeType\":null,\"relationName\":\"ContentToPost\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"posted_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PostedContent\",\"nativeType\":null,\"relationName\":\"PostToPostedContent\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"PostToUser\",\"relationFromFields\":[\"creator_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"NoAction\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"PostEditor\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PostEditor\",\"nativeType\":null,\"relationName\":\"PostToPostEditor\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PostEditor\":{\"dbName\":\"post_editors\",\"schema\":null,\"fields\":[{\"name\":\"posts_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID příspěvku, který editor spravuje\"},{\"name\":\"editor_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID uživatele, který je editorem příspěvku\"},{\"name\":\"posts\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Post\",\"nativeType\":null,\"relationName\":\"PostToPostEditor\",\"relationFromFields\":[\"posts_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"users\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"PostEditorToUser\",\"relationFromFields\":[\"editor_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"posts_id\",\"editor_id\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Attachment\":{\"dbName\":\"attachments\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID attachmentu\"},{\"name\":\"posts_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID příspěvku, kterému attachment patří\"},{\"name\":\"path\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"256\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Cesta k souboru attachmentu\"},{\"name\":\"posts\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Post\",\"nativeType\":null,\"relationName\":\"AttachmentToPost\",\"relationFromFields\":[\"posts_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"posted_content_has_attachments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PostedContentAttachment\",\"nativeType\":null,\"relationName\":\"AttachmentToPostedContentAttachment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"id\",\"posts_id\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Content\":{\"dbName\":\"contents\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID obsahu jednotlivých příspěvků\"},{\"name\":\"posts_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID postu, ke kterému obsah příspěvku patří\"},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"MediumText\",[]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Obsah příspěvku\"},{\"name\":\"posts\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Post\",\"nativeType\":null,\"relationName\":\"ContentToPost\",\"relationFromFields\":[\"posts_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"posted_content\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PostedContent\",\"nativeType\":null,\"relationName\":\"ContentToPostedContent\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PostedContent\":{\"dbName\":\"posted_content\",\"schema\":null,\"fields\":[{\"name\":\"posts_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID příspěvku\"},{\"name\":\"networks_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID networku, na kterou je příspěvek odesílán\"},{\"name\":\"contents_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID obsahu příspěvku, který je odeslán na danou síť\"},{\"name\":\"post_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"DateTime\",[\"0\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Datum, kdy má být příspěvek postnut\"},{\"name\":\"actual_post_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"DateTime\",[\"0\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Skutečné datum odeslání příspěvku vzhledem k možným zpožděním API nebo případným problémům\"},{\"name\":\"network_post_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"256\"]],\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID příspěvku na sociální sítí\"},{\"name\":\"contents\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Content\",\"nativeType\":null,\"relationName\":\"ContentToPostedContent\",\"relationFromFields\":[\"contents_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"networks\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Network\",\"nativeType\":null,\"relationName\":\"NetworkToPostedContent\",\"relationFromFields\":[\"networks_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"posts\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Post\",\"nativeType\":null,\"relationName\":\"PostToPostedContent\",\"relationFromFields\":[\"posts_id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"posted_content_has_attachments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PostedContentAttachment\",\"nativeType\":null,\"relationName\":\"PostedContentToPostedContentAttachment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"posts_id\",\"networks_id\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PostedContentAttachment\":{\"dbName\":\"posted_content_has_attachments\",\"schema\":null,\"fields\":[{\"name\":\"posts_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID vybraného postu, ke kterému attachment patří\"},{\"name\":\"networks_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID networku vybraného postu, ke kterému attachment patří\"},{\"name\":\"attachments_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"ID attachmentu, který patří k vybranému příspěvku dané sociální sítě\"},{\"name\":\"attachments\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Attachment\",\"nativeType\":null,\"relationName\":\"AttachmentToPostedContentAttachment\",\"relationFromFields\":[\"attachments_id\"],\"relationToFields\":[\"id\"],\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"posted_content\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PostedContent\",\"nativeType\":null,\"relationName\":\"PostedContentToPostedContentAttachment\",\"relationFromFields\":[\"posts_id\",\"networks_id\"],\"relationToFields\":[\"posts_id\",\"networks_id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"posts_id\",\"networks_id\",\"attachments_id\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

