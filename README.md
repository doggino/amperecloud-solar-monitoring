# AmpereCloud Solar Monitoring Test Assessment

I heavily focused on tooling for this take-home assessment.

Technologies:

- Nx Monorepo
- WebPack build for client application
- ESbuild for GraphQL API
- Docker
- Yarn for package management

## How To Run

- Copy `.env.example` and set environment variables accordingly.

### Docker

```
yarn install
npx nx docker-build client
npx nx docker-build server
docker compose up -d
```

### Nx

```
yarn install
docker compose up db -d
npx nx serve server
npx nx serve client
```

## GraphQL

### Query

```
type Query {
  profile: User # Get authenticated user information
  facilities: [Facility!] # Get List of Facilities
  facility(id: String!): Facility # Get a Facility Information
}
```

### Mutation

```
type Mutation {
  # Sign up and authenticate with user information
  signUp(email: String!, name: String!, password: String!): UserWithToken
  # Authenticate with credentials
  signIn(email: String!, password: String!): UserWithToken

  createFacility(name: String!): Facility
  updateFacility(id: String!, name: String!): Facility
  deleteFacility(id: String!): Boolean
}
```
