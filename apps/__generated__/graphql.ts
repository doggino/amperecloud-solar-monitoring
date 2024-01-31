import { GraphQLResolveInfo } from 'graphql';
import { IUser } from 'apps/server/src/models/User';
import { IFacility } from 'apps/server/src/models/Facility';
import { IFacilityData, IUploadCSV } from 'apps/server/src/models/UploadCSV';
import { AmpereContext } from 'apps/server/src/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Facility = {
  __typename?: 'Facility';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  owner: User;
  uploadCSV?: Maybe<UploadCsv>;
};

export type FacilityData = {
  __typename?: 'FacilityData';
  activePower: Scalars['Float']['output'];
  energy: Scalars['Float']['output'];
  time: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFacility?: Maybe<Facility>;
  deleteFacility?: Maybe<Scalars['Boolean']['output']>;
  signIn?: Maybe<UserWithToken>;
  signUp?: Maybe<UserWithToken>;
  updateFacility?: Maybe<Facility>;
};


export type MutationCreateFacilityArgs = {
  name: Scalars['String']['input'];
};


export type MutationDeleteFacilityArgs = {
  id: Scalars['String']['input'];
};


export type MutationSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateFacilityArgs = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  facilities?: Maybe<Array<Facility>>;
  facility?: Maybe<Facility>;
  profile?: Maybe<User>;
};


export type QueryFacilityArgs = {
  id: Scalars['String']['input'];
};

export type UploadCsv = {
  __typename?: 'UploadCSV';
  data?: Maybe<Array<FacilityData>>;
  fileName: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type UserWithToken = {
  __typename?: 'UserWithToken';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Facility: ResolverTypeWrapper<IFacility>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  FacilityData: ResolverTypeWrapper<IFacilityData>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Query: ResolverTypeWrapper<{}>;
  UploadCSV: ResolverTypeWrapper<IUploadCSV>;
  User: ResolverTypeWrapper<IUser>;
  UserWithToken: ResolverTypeWrapper<UserWithToken>;
  AdditionalEntityFields: AdditionalEntityFields;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Facility: IFacility;
  String: Scalars['String']['output'];
  FacilityData: IFacilityData;
  Float: Scalars['Float']['output'];
  Mutation: {};
  Boolean: Scalars['Boolean']['output'];
  Query: {};
  UploadCSV: IUploadCSV;
  User: IUser;
  UserWithToken: UserWithToken;
  AdditionalEntityFields: AdditionalEntityFields;
};

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = AmpereContext, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String']['input'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = AmpereContext, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = AmpereContext, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = AmpereContext, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = AmpereContext, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = AmpereContext, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = AmpereContext, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String']['input'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = AmpereContext, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type FacilityResolvers<ContextType = AmpereContext, ParentType extends ResolversParentTypes['Facility'] = ResolversParentTypes['Facility']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  uploadCSV?: Resolver<Maybe<ResolversTypes['UploadCSV']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FacilityDataResolvers<ContextType = AmpereContext, ParentType extends ResolversParentTypes['FacilityData'] = ResolversParentTypes['FacilityData']> = {
  activePower?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  energy?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = AmpereContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createFacility?: Resolver<Maybe<ResolversTypes['Facility']>, ParentType, ContextType, RequireFields<MutationCreateFacilityArgs, 'name'>>;
  deleteFacility?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteFacilityArgs, 'id'>>;
  signIn?: Resolver<Maybe<ResolversTypes['UserWithToken']>, ParentType, ContextType, RequireFields<MutationSignInArgs, 'email' | 'password'>>;
  signUp?: Resolver<Maybe<ResolversTypes['UserWithToken']>, ParentType, ContextType, RequireFields<MutationSignUpArgs, 'email' | 'name' | 'password'>>;
  updateFacility?: Resolver<Maybe<ResolversTypes['Facility']>, ParentType, ContextType, RequireFields<MutationUpdateFacilityArgs, 'id' | 'name'>>;
};

export type QueryResolvers<ContextType = AmpereContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  facilities?: Resolver<Maybe<Array<ResolversTypes['Facility']>>, ParentType, ContextType>;
  facility?: Resolver<Maybe<ResolversTypes['Facility']>, ParentType, ContextType, RequireFields<QueryFacilityArgs, 'id'>>;
  profile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type UploadCsvResolvers<ContextType = AmpereContext, ParentType extends ResolversParentTypes['UploadCSV'] = ResolversParentTypes['UploadCSV']> = {
  data?: Resolver<Maybe<Array<ResolversTypes['FacilityData']>>, ParentType, ContextType>;
  fileName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = AmpereContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserWithTokenResolvers<ContextType = AmpereContext, ParentType extends ResolversParentTypes['UserWithToken'] = ResolversParentTypes['UserWithToken']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = AmpereContext> = {
  Facility?: FacilityResolvers<ContextType>;
  FacilityData?: FacilityDataResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UploadCSV?: UploadCsvResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserWithToken?: UserWithTokenResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = AmpereContext> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};

import { ObjectId } from 'mongodb';
export type FacilityDbObject = {
  _id: ObjectId,
  name: string,
  owner: UserDbObject['_id'],
  uploadCSV?: Maybe<UploadCsvDbObject['_id']>,
};

export type FacilityDataDbObject = {
  activePower: number,
  energy: number,
  time: string,
};

export type UploadCsvDbObject = {
  data?: Maybe<Array<FacilityDataDbObject>>,
  fileName: string,
  _id: ObjectId,
};

export type UserDbObject = {
  email: string,
  _id: ObjectId,
  name: string,
};
