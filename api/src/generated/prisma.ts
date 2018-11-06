import { Prisma as BasePrisma, BasePrismaOptions } from 'prisma-binding'
import { GraphQLResolveInfo } from 'graphql'

export const typeDefs = `
type AggregateAlbum {
  count: Int!
}

type AggregateArtist {
  count: Int!
}

type AggregateImage {
  count: Int!
}

type AggregatePlaylist {
  count: Int!
}

type AggregateTrack {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type Album implements Node {
  id: ID!
  alias: String!
  artists(where: ArtistWhereInput, orderBy: ArtistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Artist!]
  duration: Int!
  genres: [String!]!
  artwork: Image
  name: String!
  numTracks: Int!
  releaseDate: DateTime!
  releaseType: ReleaseType!
  tracks(where: TrackWhereInput, orderBy: TrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Track!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""
A connection to a list of items.
"""
type AlbumConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [AlbumEdge]!
  aggregate: AggregateAlbum!
}

input AlbumCreategenresInput {
  set: [String!]
}

input AlbumCreateInput {
  alias: String!
  duration: Int!
  name: String!
  numTracks: Int!
  releaseDate: DateTime!
  releaseType: ReleaseType!
  genres: AlbumCreategenresInput
  artists: ArtistCreateManyInput
  artwork: ImageCreateOneInput
  tracks: TrackCreateManyWithoutAlbumInput
}

input AlbumCreateOneWithoutTracksInput {
  create: AlbumCreateWithoutTracksInput
  connect: AlbumWhereUniqueInput
}

input AlbumCreateWithoutTracksInput {
  alias: String!
  duration: Int!
  name: String!
  numTracks: Int!
  releaseDate: DateTime!
  releaseType: ReleaseType!
  genres: AlbumCreategenresInput
  artists: ArtistCreateManyInput
  artwork: ImageCreateOneInput
}

"""
An edge in a connection.
"""
type AlbumEdge {
  """
  The item at the end of the edge.
  """
  node: Album!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum AlbumOrderByInput {
  id_ASC
  id_DESC
  alias_ASC
  alias_DESC
  duration_ASC
  duration_DESC
  name_ASC
  name_DESC
  numTracks_ASC
  numTracks_DESC
  releaseDate_ASC
  releaseDate_DESC
  releaseType_ASC
  releaseType_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AlbumPreviousValues {
  id: ID!
  alias: String!
  duration: Int!
  genres: [String!]!
  name: String!
  numTracks: Int!
  releaseDate: DateTime!
  releaseType: ReleaseType!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type AlbumSubscriptionPayload {
  mutation: MutationType!
  node: Album
  updatedFields: [String!]
  previousValues: AlbumPreviousValues
}

input AlbumSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [AlbumSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [AlbumSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [AlbumSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: AlbumWhereInput
}

input AlbumUpdategenresInput {
  set: [String!]
}

input AlbumUpdateInput {
  alias: String
  duration: Int
  name: String
  numTracks: Int
  releaseDate: DateTime
  releaseType: ReleaseType
  genres: AlbumUpdategenresInput
  artists: ArtistUpdateManyInput
  artwork: ImageUpdateOneInput
  tracks: TrackUpdateManyWithoutAlbumInput
}

input AlbumUpdateManyMutationInput {
  alias: String
  duration: Int
  name: String
  numTracks: Int
  releaseDate: DateTime
  releaseType: ReleaseType
  genres: AlbumUpdategenresInput
}

input AlbumUpdateOneRequiredWithoutTracksInput {
  create: AlbumCreateWithoutTracksInput
  connect: AlbumWhereUniqueInput
  update: AlbumUpdateWithoutTracksDataInput
  upsert: AlbumUpsertWithoutTracksInput
}

input AlbumUpdateWithoutTracksDataInput {
  alias: String
  duration: Int
  name: String
  numTracks: Int
  releaseDate: DateTime
  releaseType: ReleaseType
  genres: AlbumUpdategenresInput
  artists: ArtistUpdateManyInput
  artwork: ImageUpdateOneInput
}

input AlbumUpsertWithoutTracksInput {
  update: AlbumUpdateWithoutTracksDataInput!
  create: AlbumCreateWithoutTracksInput!
}

input AlbumWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [AlbumWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [AlbumWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [AlbumWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  alias: String
  """
  All values that are not equal to given value.
  """
  alias_not: String
  """
  All values that are contained in given list.
  """
  alias_in: [String!]
  """
  All values that are not contained in given list.
  """
  alias_not_in: [String!]
  """
  All values less than the given value.
  """
  alias_lt: String
  """
  All values less than or equal the given value.
  """
  alias_lte: String
  """
  All values greater than the given value.
  """
  alias_gt: String
  """
  All values greater than or equal the given value.
  """
  alias_gte: String
  """
  All values containing the given string.
  """
  alias_contains: String
  """
  All values not containing the given string.
  """
  alias_not_contains: String
  """
  All values starting with the given string.
  """
  alias_starts_with: String
  """
  All values not starting with the given string.
  """
  alias_not_starts_with: String
  """
  All values ending with the given string.
  """
  alias_ends_with: String
  """
  All values not ending with the given string.
  """
  alias_not_ends_with: String
  duration: Int
  """
  All values that are not equal to given value.
  """
  duration_not: Int
  """
  All values that are contained in given list.
  """
  duration_in: [Int!]
  """
  All values that are not contained in given list.
  """
  duration_not_in: [Int!]
  """
  All values less than the given value.
  """
  duration_lt: Int
  """
  All values less than or equal the given value.
  """
  duration_lte: Int
  """
  All values greater than the given value.
  """
  duration_gt: Int
  """
  All values greater than or equal the given value.
  """
  duration_gte: Int
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  numTracks: Int
  """
  All values that are not equal to given value.
  """
  numTracks_not: Int
  """
  All values that are contained in given list.
  """
  numTracks_in: [Int!]
  """
  All values that are not contained in given list.
  """
  numTracks_not_in: [Int!]
  """
  All values less than the given value.
  """
  numTracks_lt: Int
  """
  All values less than or equal the given value.
  """
  numTracks_lte: Int
  """
  All values greater than the given value.
  """
  numTracks_gt: Int
  """
  All values greater than or equal the given value.
  """
  numTracks_gte: Int
  releaseDate: DateTime
  """
  All values that are not equal to given value.
  """
  releaseDate_not: DateTime
  """
  All values that are contained in given list.
  """
  releaseDate_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  releaseDate_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  releaseDate_lt: DateTime
  """
  All values less than or equal the given value.
  """
  releaseDate_lte: DateTime
  """
  All values greater than the given value.
  """
  releaseDate_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  releaseDate_gte: DateTime
  releaseType: ReleaseType
  """
  All values that are not equal to given value.
  """
  releaseType_not: ReleaseType
  """
  All values that are contained in given list.
  """
  releaseType_in: [ReleaseType!]
  """
  All values that are not contained in given list.
  """
  releaseType_not_in: [ReleaseType!]
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  artists_every: ArtistWhereInput
  artists_some: ArtistWhereInput
  artists_none: ArtistWhereInput
  artwork: ImageWhereInput
  tracks_every: TrackWhereInput
  tracks_some: TrackWhereInput
  tracks_none: TrackWhereInput
}

input AlbumWhereUniqueInput {
  id: ID
  alias: String
}

type Artist implements Node {
  id: ID!
  alias: String!
  avatar: Image
  featuresIn(where: TrackWhereInput, orderBy: TrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Track!]
  genres: [String!]!
  name: String!
  tracks(where: TrackWhereInput, orderBy: TrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Track!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""
A connection to a list of items.
"""
type ArtistConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [ArtistEdge]!
  aggregate: AggregateArtist!
}

input ArtistCreategenresInput {
  set: [String!]
}

input ArtistCreateInput {
  alias: String!
  name: String!
  genres: ArtistCreategenresInput
  avatar: ImageCreateOneInput
  featuresIn: TrackCreateManyWithoutFeaturingInput
  tracks: TrackCreateManyWithoutArtistsInput
}

input ArtistCreateManyInput {
  create: [ArtistCreateInput!]
  connect: [ArtistWhereUniqueInput!]
}

input ArtistCreateManyWithoutFeaturesInInput {
  create: [ArtistCreateWithoutFeaturesInInput!]
  connect: [ArtistWhereUniqueInput!]
}

input ArtistCreateManyWithoutTracksInput {
  create: [ArtistCreateWithoutTracksInput!]
  connect: [ArtistWhereUniqueInput!]
}

input ArtistCreateWithoutFeaturesInInput {
  alias: String!
  name: String!
  genres: ArtistCreategenresInput
  avatar: ImageCreateOneInput
  tracks: TrackCreateManyWithoutArtistsInput
}

input ArtistCreateWithoutTracksInput {
  alias: String!
  name: String!
  genres: ArtistCreategenresInput
  avatar: ImageCreateOneInput
  featuresIn: TrackCreateManyWithoutFeaturingInput
}

"""
An edge in a connection.
"""
type ArtistEdge {
  """
  The item at the end of the edge.
  """
  node: Artist!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum ArtistOrderByInput {
  id_ASC
  id_DESC
  alias_ASC
  alias_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ArtistPreviousValues {
  id: ID!
  alias: String!
  genres: [String!]!
  name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ArtistSubscriptionPayload {
  mutation: MutationType!
  node: Artist
  updatedFields: [String!]
  previousValues: ArtistPreviousValues
}

input ArtistSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ArtistSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ArtistSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [ArtistSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ArtistWhereInput
}

input ArtistUpdateDataInput {
  alias: String
  name: String
  genres: ArtistUpdategenresInput
  avatar: ImageUpdateOneInput
  featuresIn: TrackUpdateManyWithoutFeaturingInput
  tracks: TrackUpdateManyWithoutArtistsInput
}

input ArtistUpdategenresInput {
  set: [String!]
}

input ArtistUpdateInput {
  alias: String
  name: String
  genres: ArtistUpdategenresInput
  avatar: ImageUpdateOneInput
  featuresIn: TrackUpdateManyWithoutFeaturingInput
  tracks: TrackUpdateManyWithoutArtistsInput
}

input ArtistUpdateManyInput {
  create: [ArtistCreateInput!]
  connect: [ArtistWhereUniqueInput!]
  disconnect: [ArtistWhereUniqueInput!]
  delete: [ArtistWhereUniqueInput!]
  update: [ArtistUpdateWithWhereUniqueNestedInput!]
  upsert: [ArtistUpsertWithWhereUniqueNestedInput!]
}

input ArtistUpdateManyMutationInput {
  alias: String
  name: String
  genres: ArtistUpdategenresInput
}

input ArtistUpdateManyWithoutFeaturesInInput {
  create: [ArtistCreateWithoutFeaturesInInput!]
  connect: [ArtistWhereUniqueInput!]
  disconnect: [ArtistWhereUniqueInput!]
  delete: [ArtistWhereUniqueInput!]
  update: [ArtistUpdateWithWhereUniqueWithoutFeaturesInInput!]
  upsert: [ArtistUpsertWithWhereUniqueWithoutFeaturesInInput!]
}

input ArtistUpdateManyWithoutTracksInput {
  create: [ArtistCreateWithoutTracksInput!]
  connect: [ArtistWhereUniqueInput!]
  disconnect: [ArtistWhereUniqueInput!]
  delete: [ArtistWhereUniqueInput!]
  update: [ArtistUpdateWithWhereUniqueWithoutTracksInput!]
  upsert: [ArtistUpsertWithWhereUniqueWithoutTracksInput!]
}

input ArtistUpdateWithoutFeaturesInDataInput {
  alias: String
  name: String
  genres: ArtistUpdategenresInput
  avatar: ImageUpdateOneInput
  tracks: TrackUpdateManyWithoutArtistsInput
}

input ArtistUpdateWithoutTracksDataInput {
  alias: String
  name: String
  genres: ArtistUpdategenresInput
  avatar: ImageUpdateOneInput
  featuresIn: TrackUpdateManyWithoutFeaturingInput
}

input ArtistUpdateWithWhereUniqueNestedInput {
  where: ArtistWhereUniqueInput!
  data: ArtistUpdateDataInput!
}

input ArtistUpdateWithWhereUniqueWithoutFeaturesInInput {
  where: ArtistWhereUniqueInput!
  data: ArtistUpdateWithoutFeaturesInDataInput!
}

input ArtistUpdateWithWhereUniqueWithoutTracksInput {
  where: ArtistWhereUniqueInput!
  data: ArtistUpdateWithoutTracksDataInput!
}

input ArtistUpsertWithWhereUniqueNestedInput {
  where: ArtistWhereUniqueInput!
  update: ArtistUpdateDataInput!
  create: ArtistCreateInput!
}

input ArtistUpsertWithWhereUniqueWithoutFeaturesInInput {
  where: ArtistWhereUniqueInput!
  update: ArtistUpdateWithoutFeaturesInDataInput!
  create: ArtistCreateWithoutFeaturesInInput!
}

input ArtistUpsertWithWhereUniqueWithoutTracksInput {
  where: ArtistWhereUniqueInput!
  update: ArtistUpdateWithoutTracksDataInput!
  create: ArtistCreateWithoutTracksInput!
}

input ArtistWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ArtistWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ArtistWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [ArtistWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  alias: String
  """
  All values that are not equal to given value.
  """
  alias_not: String
  """
  All values that are contained in given list.
  """
  alias_in: [String!]
  """
  All values that are not contained in given list.
  """
  alias_not_in: [String!]
  """
  All values less than the given value.
  """
  alias_lt: String
  """
  All values less than or equal the given value.
  """
  alias_lte: String
  """
  All values greater than the given value.
  """
  alias_gt: String
  """
  All values greater than or equal the given value.
  """
  alias_gte: String
  """
  All values containing the given string.
  """
  alias_contains: String
  """
  All values not containing the given string.
  """
  alias_not_contains: String
  """
  All values starting with the given string.
  """
  alias_starts_with: String
  """
  All values not starting with the given string.
  """
  alias_not_starts_with: String
  """
  All values ending with the given string.
  """
  alias_ends_with: String
  """
  All values not ending with the given string.
  """
  alias_not_ends_with: String
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  avatar: ImageWhereInput
  featuresIn_every: TrackWhereInput
  featuresIn_some: TrackWhereInput
  featuresIn_none: TrackWhereInput
  tracks_every: TrackWhereInput
  tracks_some: TrackWhereInput
  tracks_none: TrackWhereInput
}

input ArtistWhereUniqueInput {
  id: ID
  alias: String
}

type BatchPayload {
  """
  The number of nodes that have been affected by the Batch operation.
  """
  count: Long!
}

scalar DateTime

type Image implements Node {
  id: ID!
  uploadedBy: User!
  url: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""
A connection to a list of items.
"""
type ImageConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [ImageEdge]!
  aggregate: AggregateImage!
}

input ImageCreateInput {
  url: String!
  uploadedBy: UserCreateOneInput!
}

input ImageCreateManyInput {
  create: [ImageCreateInput!]
  connect: [ImageWhereUniqueInput!]
}

input ImageCreateOneInput {
  create: ImageCreateInput
  connect: ImageWhereUniqueInput
}

"""
An edge in a connection.
"""
type ImageEdge {
  """
  The item at the end of the edge.
  """
  node: Image!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum ImageOrderByInput {
  id_ASC
  id_DESC
  url_ASC
  url_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ImagePreviousValues {
  id: ID!
  url: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ImageSubscriptionPayload {
  mutation: MutationType!
  node: Image
  updatedFields: [String!]
  previousValues: ImagePreviousValues
}

input ImageSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ImageSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ImageSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [ImageSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ImageWhereInput
}

input ImageUpdateDataInput {
  url: String
  uploadedBy: UserUpdateOneRequiredInput
}

input ImageUpdateInput {
  url: String
  uploadedBy: UserUpdateOneRequiredInput
}

input ImageUpdateManyInput {
  create: [ImageCreateInput!]
  connect: [ImageWhereUniqueInput!]
  disconnect: [ImageWhereUniqueInput!]
  delete: [ImageWhereUniqueInput!]
  update: [ImageUpdateWithWhereUniqueNestedInput!]
  upsert: [ImageUpsertWithWhereUniqueNestedInput!]
}

input ImageUpdateManyMutationInput {
  url: String
}

input ImageUpdateOneInput {
  create: ImageCreateInput
  connect: ImageWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: ImageUpdateDataInput
  upsert: ImageUpsertNestedInput
}

input ImageUpdateWithWhereUniqueNestedInput {
  where: ImageWhereUniqueInput!
  data: ImageUpdateDataInput!
}

input ImageUpsertNestedInput {
  update: ImageUpdateDataInput!
  create: ImageCreateInput!
}

input ImageUpsertWithWhereUniqueNestedInput {
  where: ImageWhereUniqueInput!
  update: ImageUpdateDataInput!
  create: ImageCreateInput!
}

input ImageWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ImageWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ImageWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [ImageWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  url: String
  """
  All values that are not equal to given value.
  """
  url_not: String
  """
  All values that are contained in given list.
  """
  url_in: [String!]
  """
  All values that are not contained in given list.
  """
  url_not_in: [String!]
  """
  All values less than the given value.
  """
  url_lt: String
  """
  All values less than or equal the given value.
  """
  url_lte: String
  """
  All values greater than the given value.
  """
  url_gt: String
  """
  All values greater than or equal the given value.
  """
  url_gte: String
  """
  All values containing the given string.
  """
  url_contains: String
  """
  All values not containing the given string.
  """
  url_not_contains: String
  """
  All values starting with the given string.
  """
  url_starts_with: String
  """
  All values not starting with the given string.
  """
  url_not_starts_with: String
  """
  All values ending with the given string.
  """
  url_ends_with: String
  """
  All values not ending with the given string.
  """
  url_not_ends_with: String
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  uploadedBy: UserWhereInput
}

input ImageWhereUniqueInput {
  id: ID
}

"""
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""
An object with an ID
"""
interface Node {
  """
  The id of the object.
  """
  id: ID!
}

"""
Information about pagination in a connection.
"""
type PageInfo {
  """
  When paginating forwards, are there more items?
  """
  hasNextPage: Boolean!
  """
  When paginating backwards, are there more items?
  """
  hasPreviousPage: Boolean!
  """
  When paginating backwards, the cursor to continue.
  """
  startCursor: String
  """
  When paginating forwards, the cursor to continue.
  """
  endCursor: String
}

type Playlist implements Node {
  id: ID!
  alias: String!
  artwork(where: ImageWhereInput, orderBy: ImageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Image!]
  collaborative: Boolean!
  creator: User!
  description: String
  duration: Int!
  name: String!
  numTracks: Int!
  privacy: Privacy!
  tracks(where: TrackWhereInput, orderBy: TrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Track!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""
A connection to a list of items.
"""
type PlaylistConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [PlaylistEdge]!
  aggregate: AggregatePlaylist!
}

input PlaylistCreateInput {
  alias: String!
  collaborative: Boolean
  description: String
  duration: Int!
  name: String!
  numTracks: Int!
  privacy: Privacy
  artwork: ImageCreateManyInput
  creator: UserCreateOneWithoutPlaylistsInput!
  tracks: TrackCreateManyWithoutInPlaylistInput
}

input PlaylistCreateManyWithoutCreatorInput {
  create: [PlaylistCreateWithoutCreatorInput!]
  connect: [PlaylistWhereUniqueInput!]
}

input PlaylistCreateManyWithoutTracksInput {
  create: [PlaylistCreateWithoutTracksInput!]
  connect: [PlaylistWhereUniqueInput!]
}

input PlaylistCreateWithoutCreatorInput {
  alias: String!
  collaborative: Boolean
  description: String
  duration: Int!
  name: String!
  numTracks: Int!
  privacy: Privacy
  artwork: ImageCreateManyInput
  tracks: TrackCreateManyWithoutInPlaylistInput
}

input PlaylistCreateWithoutTracksInput {
  alias: String!
  collaborative: Boolean
  description: String
  duration: Int!
  name: String!
  numTracks: Int!
  privacy: Privacy
  artwork: ImageCreateManyInput
  creator: UserCreateOneWithoutPlaylistsInput!
}

"""
An edge in a connection.
"""
type PlaylistEdge {
  """
  The item at the end of the edge.
  """
  node: Playlist!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum PlaylistOrderByInput {
  id_ASC
  id_DESC
  alias_ASC
  alias_DESC
  collaborative_ASC
  collaborative_DESC
  description_ASC
  description_DESC
  duration_ASC
  duration_DESC
  name_ASC
  name_DESC
  numTracks_ASC
  numTracks_DESC
  privacy_ASC
  privacy_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PlaylistPreviousValues {
  id: ID!
  alias: String!
  collaborative: Boolean!
  description: String
  duration: Int!
  name: String!
  numTracks: Int!
  privacy: Privacy!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type PlaylistSubscriptionPayload {
  mutation: MutationType!
  node: Playlist
  updatedFields: [String!]
  previousValues: PlaylistPreviousValues
}

input PlaylistSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PlaylistSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PlaylistSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [PlaylistSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PlaylistWhereInput
}

input PlaylistUpdateInput {
  alias: String
  collaborative: Boolean
  description: String
  duration: Int
  name: String
  numTracks: Int
  privacy: Privacy
  artwork: ImageUpdateManyInput
  creator: UserUpdateOneRequiredWithoutPlaylistsInput
  tracks: TrackUpdateManyWithoutInPlaylistInput
}

input PlaylistUpdateManyMutationInput {
  alias: String
  collaborative: Boolean
  description: String
  duration: Int
  name: String
  numTracks: Int
  privacy: Privacy
}

input PlaylistUpdateManyWithoutCreatorInput {
  create: [PlaylistCreateWithoutCreatorInput!]
  connect: [PlaylistWhereUniqueInput!]
  disconnect: [PlaylistWhereUniqueInput!]
  delete: [PlaylistWhereUniqueInput!]
  update: [PlaylistUpdateWithWhereUniqueWithoutCreatorInput!]
  upsert: [PlaylistUpsertWithWhereUniqueWithoutCreatorInput!]
}

input PlaylistUpdateManyWithoutTracksInput {
  create: [PlaylistCreateWithoutTracksInput!]
  connect: [PlaylistWhereUniqueInput!]
  disconnect: [PlaylistWhereUniqueInput!]
  delete: [PlaylistWhereUniqueInput!]
  update: [PlaylistUpdateWithWhereUniqueWithoutTracksInput!]
  upsert: [PlaylistUpsertWithWhereUniqueWithoutTracksInput!]
}

input PlaylistUpdateWithoutCreatorDataInput {
  alias: String
  collaborative: Boolean
  description: String
  duration: Int
  name: String
  numTracks: Int
  privacy: Privacy
  artwork: ImageUpdateManyInput
  tracks: TrackUpdateManyWithoutInPlaylistInput
}

input PlaylistUpdateWithoutTracksDataInput {
  alias: String
  collaborative: Boolean
  description: String
  duration: Int
  name: String
  numTracks: Int
  privacy: Privacy
  artwork: ImageUpdateManyInput
  creator: UserUpdateOneRequiredWithoutPlaylistsInput
}

input PlaylistUpdateWithWhereUniqueWithoutCreatorInput {
  where: PlaylistWhereUniqueInput!
  data: PlaylistUpdateWithoutCreatorDataInput!
}

input PlaylistUpdateWithWhereUniqueWithoutTracksInput {
  where: PlaylistWhereUniqueInput!
  data: PlaylistUpdateWithoutTracksDataInput!
}

input PlaylistUpsertWithWhereUniqueWithoutCreatorInput {
  where: PlaylistWhereUniqueInput!
  update: PlaylistUpdateWithoutCreatorDataInput!
  create: PlaylistCreateWithoutCreatorInput!
}

input PlaylistUpsertWithWhereUniqueWithoutTracksInput {
  where: PlaylistWhereUniqueInput!
  update: PlaylistUpdateWithoutTracksDataInput!
  create: PlaylistCreateWithoutTracksInput!
}

input PlaylistWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [PlaylistWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [PlaylistWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [PlaylistWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  alias: String
  """
  All values that are not equal to given value.
  """
  alias_not: String
  """
  All values that are contained in given list.
  """
  alias_in: [String!]
  """
  All values that are not contained in given list.
  """
  alias_not_in: [String!]
  """
  All values less than the given value.
  """
  alias_lt: String
  """
  All values less than or equal the given value.
  """
  alias_lte: String
  """
  All values greater than the given value.
  """
  alias_gt: String
  """
  All values greater than or equal the given value.
  """
  alias_gte: String
  """
  All values containing the given string.
  """
  alias_contains: String
  """
  All values not containing the given string.
  """
  alias_not_contains: String
  """
  All values starting with the given string.
  """
  alias_starts_with: String
  """
  All values not starting with the given string.
  """
  alias_not_starts_with: String
  """
  All values ending with the given string.
  """
  alias_ends_with: String
  """
  All values not ending with the given string.
  """
  alias_not_ends_with: String
  collaborative: Boolean
  """
  All values that are not equal to given value.
  """
  collaborative_not: Boolean
  description: String
  """
  All values that are not equal to given value.
  """
  description_not: String
  """
  All values that are contained in given list.
  """
  description_in: [String!]
  """
  All values that are not contained in given list.
  """
  description_not_in: [String!]
  """
  All values less than the given value.
  """
  description_lt: String
  """
  All values less than or equal the given value.
  """
  description_lte: String
  """
  All values greater than the given value.
  """
  description_gt: String
  """
  All values greater than or equal the given value.
  """
  description_gte: String
  """
  All values containing the given string.
  """
  description_contains: String
  """
  All values not containing the given string.
  """
  description_not_contains: String
  """
  All values starting with the given string.
  """
  description_starts_with: String
  """
  All values not starting with the given string.
  """
  description_not_starts_with: String
  """
  All values ending with the given string.
  """
  description_ends_with: String
  """
  All values not ending with the given string.
  """
  description_not_ends_with: String
  duration: Int
  """
  All values that are not equal to given value.
  """
  duration_not: Int
  """
  All values that are contained in given list.
  """
  duration_in: [Int!]
  """
  All values that are not contained in given list.
  """
  duration_not_in: [Int!]
  """
  All values less than the given value.
  """
  duration_lt: Int
  """
  All values less than or equal the given value.
  """
  duration_lte: Int
  """
  All values greater than the given value.
  """
  duration_gt: Int
  """
  All values greater than or equal the given value.
  """
  duration_gte: Int
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  numTracks: Int
  """
  All values that are not equal to given value.
  """
  numTracks_not: Int
  """
  All values that are contained in given list.
  """
  numTracks_in: [Int!]
  """
  All values that are not contained in given list.
  """
  numTracks_not_in: [Int!]
  """
  All values less than the given value.
  """
  numTracks_lt: Int
  """
  All values less than or equal the given value.
  """
  numTracks_lte: Int
  """
  All values greater than the given value.
  """
  numTracks_gt: Int
  """
  All values greater than or equal the given value.
  """
  numTracks_gte: Int
  privacy: Privacy
  """
  All values that are not equal to given value.
  """
  privacy_not: Privacy
  """
  All values that are contained in given list.
  """
  privacy_in: [Privacy!]
  """
  All values that are not contained in given list.
  """
  privacy_not_in: [Privacy!]
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  artwork_every: ImageWhereInput
  artwork_some: ImageWhereInput
  artwork_none: ImageWhereInput
  creator: UserWhereInput
  tracks_every: TrackWhereInput
  tracks_some: TrackWhereInput
  tracks_none: TrackWhereInput
}

input PlaylistWhereUniqueInput {
  id: ID
  alias: String
}

enum Privacy {
  PRIVATE
  PUBLIC
  UNLISTED
}

enum ReleaseType {
  ALBUM
  EP
  LP
  PODCAST
  SINGLE
}

type Track implements Node {
  id: ID!
  album: Album!
  artists(where: ArtistWhereInput, orderBy: ArtistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Artist!]
  discNumber: Int!
  duration: Int!
  explicit: Boolean!
  featuring(where: ArtistWhereInput, orderBy: ArtistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Artist!]
  genre: String!
  inPlaylist(where: PlaylistWhereInput, orderBy: PlaylistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Playlist!]
  isPlayable: Boolean!
  name: String!
  trackNumber: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""
A connection to a list of items.
"""
type TrackConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [TrackEdge]!
  aggregate: AggregateTrack!
}

input TrackCreateInput {
  discNumber: Int!
  duration: Int!
  explicit: Boolean
  genre: String!
  isPlayable: Boolean
  name: String!
  trackNumber: Int!
  album: AlbumCreateOneWithoutTracksInput!
  artists: ArtistCreateManyWithoutTracksInput
  featuring: ArtistCreateManyWithoutFeaturesInInput
  inPlaylist: PlaylistCreateManyWithoutTracksInput
}

input TrackCreateManyWithoutAlbumInput {
  create: [TrackCreateWithoutAlbumInput!]
  connect: [TrackWhereUniqueInput!]
}

input TrackCreateManyWithoutArtistsInput {
  create: [TrackCreateWithoutArtistsInput!]
  connect: [TrackWhereUniqueInput!]
}

input TrackCreateManyWithoutFeaturingInput {
  create: [TrackCreateWithoutFeaturingInput!]
  connect: [TrackWhereUniqueInput!]
}

input TrackCreateManyWithoutInPlaylistInput {
  create: [TrackCreateWithoutInPlaylistInput!]
  connect: [TrackWhereUniqueInput!]
}

input TrackCreateWithoutAlbumInput {
  discNumber: Int!
  duration: Int!
  explicit: Boolean
  genre: String!
  isPlayable: Boolean
  name: String!
  trackNumber: Int!
  artists: ArtistCreateManyWithoutTracksInput
  featuring: ArtistCreateManyWithoutFeaturesInInput
  inPlaylist: PlaylistCreateManyWithoutTracksInput
}

input TrackCreateWithoutArtistsInput {
  discNumber: Int!
  duration: Int!
  explicit: Boolean
  genre: String!
  isPlayable: Boolean
  name: String!
  trackNumber: Int!
  album: AlbumCreateOneWithoutTracksInput!
  featuring: ArtistCreateManyWithoutFeaturesInInput
  inPlaylist: PlaylistCreateManyWithoutTracksInput
}

input TrackCreateWithoutFeaturingInput {
  discNumber: Int!
  duration: Int!
  explicit: Boolean
  genre: String!
  isPlayable: Boolean
  name: String!
  trackNumber: Int!
  album: AlbumCreateOneWithoutTracksInput!
  artists: ArtistCreateManyWithoutTracksInput
  inPlaylist: PlaylistCreateManyWithoutTracksInput
}

input TrackCreateWithoutInPlaylistInput {
  discNumber: Int!
  duration: Int!
  explicit: Boolean
  genre: String!
  isPlayable: Boolean
  name: String!
  trackNumber: Int!
  album: AlbumCreateOneWithoutTracksInput!
  artists: ArtistCreateManyWithoutTracksInput
  featuring: ArtistCreateManyWithoutFeaturesInInput
}

"""
An edge in a connection.
"""
type TrackEdge {
  """
  The item at the end of the edge.
  """
  node: Track!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum TrackOrderByInput {
  id_ASC
  id_DESC
  discNumber_ASC
  discNumber_DESC
  duration_ASC
  duration_DESC
  explicit_ASC
  explicit_DESC
  genre_ASC
  genre_DESC
  isPlayable_ASC
  isPlayable_DESC
  name_ASC
  name_DESC
  trackNumber_ASC
  trackNumber_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TrackPreviousValues {
  id: ID!
  discNumber: Int!
  duration: Int!
  explicit: Boolean!
  genre: String!
  isPlayable: Boolean!
  name: String!
  trackNumber: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type TrackSubscriptionPayload {
  mutation: MutationType!
  node: Track
  updatedFields: [String!]
  previousValues: TrackPreviousValues
}

input TrackSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [TrackSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [TrackSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [TrackSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: TrackWhereInput
}

input TrackUpdateInput {
  discNumber: Int
  duration: Int
  explicit: Boolean
  genre: String
  isPlayable: Boolean
  name: String
  trackNumber: Int
  album: AlbumUpdateOneRequiredWithoutTracksInput
  artists: ArtistUpdateManyWithoutTracksInput
  featuring: ArtistUpdateManyWithoutFeaturesInInput
  inPlaylist: PlaylistUpdateManyWithoutTracksInput
}

input TrackUpdateManyMutationInput {
  discNumber: Int
  duration: Int
  explicit: Boolean
  genre: String
  isPlayable: Boolean
  name: String
  trackNumber: Int
}

input TrackUpdateManyWithoutAlbumInput {
  create: [TrackCreateWithoutAlbumInput!]
  connect: [TrackWhereUniqueInput!]
  disconnect: [TrackWhereUniqueInput!]
  delete: [TrackWhereUniqueInput!]
  update: [TrackUpdateWithWhereUniqueWithoutAlbumInput!]
  upsert: [TrackUpsertWithWhereUniqueWithoutAlbumInput!]
}

input TrackUpdateManyWithoutArtistsInput {
  create: [TrackCreateWithoutArtistsInput!]
  connect: [TrackWhereUniqueInput!]
  disconnect: [TrackWhereUniqueInput!]
  delete: [TrackWhereUniqueInput!]
  update: [TrackUpdateWithWhereUniqueWithoutArtistsInput!]
  upsert: [TrackUpsertWithWhereUniqueWithoutArtistsInput!]
}

input TrackUpdateManyWithoutFeaturingInput {
  create: [TrackCreateWithoutFeaturingInput!]
  connect: [TrackWhereUniqueInput!]
  disconnect: [TrackWhereUniqueInput!]
  delete: [TrackWhereUniqueInput!]
  update: [TrackUpdateWithWhereUniqueWithoutFeaturingInput!]
  upsert: [TrackUpsertWithWhereUniqueWithoutFeaturingInput!]
}

input TrackUpdateManyWithoutInPlaylistInput {
  create: [TrackCreateWithoutInPlaylistInput!]
  connect: [TrackWhereUniqueInput!]
  disconnect: [TrackWhereUniqueInput!]
  delete: [TrackWhereUniqueInput!]
  update: [TrackUpdateWithWhereUniqueWithoutInPlaylistInput!]
  upsert: [TrackUpsertWithWhereUniqueWithoutInPlaylistInput!]
}

input TrackUpdateWithoutAlbumDataInput {
  discNumber: Int
  duration: Int
  explicit: Boolean
  genre: String
  isPlayable: Boolean
  name: String
  trackNumber: Int
  artists: ArtistUpdateManyWithoutTracksInput
  featuring: ArtistUpdateManyWithoutFeaturesInInput
  inPlaylist: PlaylistUpdateManyWithoutTracksInput
}

input TrackUpdateWithoutArtistsDataInput {
  discNumber: Int
  duration: Int
  explicit: Boolean
  genre: String
  isPlayable: Boolean
  name: String
  trackNumber: Int
  album: AlbumUpdateOneRequiredWithoutTracksInput
  featuring: ArtistUpdateManyWithoutFeaturesInInput
  inPlaylist: PlaylistUpdateManyWithoutTracksInput
}

input TrackUpdateWithoutFeaturingDataInput {
  discNumber: Int
  duration: Int
  explicit: Boolean
  genre: String
  isPlayable: Boolean
  name: String
  trackNumber: Int
  album: AlbumUpdateOneRequiredWithoutTracksInput
  artists: ArtistUpdateManyWithoutTracksInput
  inPlaylist: PlaylistUpdateManyWithoutTracksInput
}

input TrackUpdateWithoutInPlaylistDataInput {
  discNumber: Int
  duration: Int
  explicit: Boolean
  genre: String
  isPlayable: Boolean
  name: String
  trackNumber: Int
  album: AlbumUpdateOneRequiredWithoutTracksInput
  artists: ArtistUpdateManyWithoutTracksInput
  featuring: ArtistUpdateManyWithoutFeaturesInInput
}

input TrackUpdateWithWhereUniqueWithoutAlbumInput {
  where: TrackWhereUniqueInput!
  data: TrackUpdateWithoutAlbumDataInput!
}

input TrackUpdateWithWhereUniqueWithoutArtistsInput {
  where: TrackWhereUniqueInput!
  data: TrackUpdateWithoutArtistsDataInput!
}

input TrackUpdateWithWhereUniqueWithoutFeaturingInput {
  where: TrackWhereUniqueInput!
  data: TrackUpdateWithoutFeaturingDataInput!
}

input TrackUpdateWithWhereUniqueWithoutInPlaylistInput {
  where: TrackWhereUniqueInput!
  data: TrackUpdateWithoutInPlaylistDataInput!
}

input TrackUpsertWithWhereUniqueWithoutAlbumInput {
  where: TrackWhereUniqueInput!
  update: TrackUpdateWithoutAlbumDataInput!
  create: TrackCreateWithoutAlbumInput!
}

input TrackUpsertWithWhereUniqueWithoutArtistsInput {
  where: TrackWhereUniqueInput!
  update: TrackUpdateWithoutArtistsDataInput!
  create: TrackCreateWithoutArtistsInput!
}

input TrackUpsertWithWhereUniqueWithoutFeaturingInput {
  where: TrackWhereUniqueInput!
  update: TrackUpdateWithoutFeaturingDataInput!
  create: TrackCreateWithoutFeaturingInput!
}

input TrackUpsertWithWhereUniqueWithoutInPlaylistInput {
  where: TrackWhereUniqueInput!
  update: TrackUpdateWithoutInPlaylistDataInput!
  create: TrackCreateWithoutInPlaylistInput!
}

input TrackWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [TrackWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [TrackWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [TrackWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  discNumber: Int
  """
  All values that are not equal to given value.
  """
  discNumber_not: Int
  """
  All values that are contained in given list.
  """
  discNumber_in: [Int!]
  """
  All values that are not contained in given list.
  """
  discNumber_not_in: [Int!]
  """
  All values less than the given value.
  """
  discNumber_lt: Int
  """
  All values less than or equal the given value.
  """
  discNumber_lte: Int
  """
  All values greater than the given value.
  """
  discNumber_gt: Int
  """
  All values greater than or equal the given value.
  """
  discNumber_gte: Int
  duration: Int
  """
  All values that are not equal to given value.
  """
  duration_not: Int
  """
  All values that are contained in given list.
  """
  duration_in: [Int!]
  """
  All values that are not contained in given list.
  """
  duration_not_in: [Int!]
  """
  All values less than the given value.
  """
  duration_lt: Int
  """
  All values less than or equal the given value.
  """
  duration_lte: Int
  """
  All values greater than the given value.
  """
  duration_gt: Int
  """
  All values greater than or equal the given value.
  """
  duration_gte: Int
  explicit: Boolean
  """
  All values that are not equal to given value.
  """
  explicit_not: Boolean
  genre: String
  """
  All values that are not equal to given value.
  """
  genre_not: String
  """
  All values that are contained in given list.
  """
  genre_in: [String!]
  """
  All values that are not contained in given list.
  """
  genre_not_in: [String!]
  """
  All values less than the given value.
  """
  genre_lt: String
  """
  All values less than or equal the given value.
  """
  genre_lte: String
  """
  All values greater than the given value.
  """
  genre_gt: String
  """
  All values greater than or equal the given value.
  """
  genre_gte: String
  """
  All values containing the given string.
  """
  genre_contains: String
  """
  All values not containing the given string.
  """
  genre_not_contains: String
  """
  All values starting with the given string.
  """
  genre_starts_with: String
  """
  All values not starting with the given string.
  """
  genre_not_starts_with: String
  """
  All values ending with the given string.
  """
  genre_ends_with: String
  """
  All values not ending with the given string.
  """
  genre_not_ends_with: String
  isPlayable: Boolean
  """
  All values that are not equal to given value.
  """
  isPlayable_not: Boolean
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  trackNumber: Int
  """
  All values that are not equal to given value.
  """
  trackNumber_not: Int
  """
  All values that are contained in given list.
  """
  trackNumber_in: [Int!]
  """
  All values that are not contained in given list.
  """
  trackNumber_not_in: [Int!]
  """
  All values less than the given value.
  """
  trackNumber_lt: Int
  """
  All values less than or equal the given value.
  """
  trackNumber_lte: Int
  """
  All values greater than the given value.
  """
  trackNumber_gt: Int
  """
  All values greater than or equal the given value.
  """
  trackNumber_gte: Int
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  album: AlbumWhereInput
  artists_every: ArtistWhereInput
  artists_some: ArtistWhereInput
  artists_none: ArtistWhereInput
  featuring_every: ArtistWhereInput
  featuring_some: ArtistWhereInput
  featuring_none: ArtistWhereInput
  inPlaylist_every: PlaylistWhereInput
  inPlaylist_some: PlaylistWhereInput
  inPlaylist_none: PlaylistWhereInput
}

input TrackWhereUniqueInput {
  id: ID
}

type User implements Node {
  id: ID!
  isAdmin: Boolean!
  name: String!
  playlists(where: PlaylistWhereInput, orderBy: PlaylistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Playlist!]
  username: String!
  verified: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""
A connection to a list of items.
"""
type UserConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  isAdmin: Boolean
  name: String!
  username: String!
  verified: Boolean
  playlists: PlaylistCreateManyWithoutCreatorInput
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutPlaylistsInput {
  create: UserCreateWithoutPlaylistsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutPlaylistsInput {
  isAdmin: Boolean
  name: String!
  username: String!
  verified: Boolean
}

"""
An edge in a connection.
"""
type UserEdge {
  """
  The item at the end of the edge.
  """
  node: User!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  isAdmin_ASC
  isAdmin_DESC
  name_ASC
  name_DESC
  username_ASC
  username_DESC
  verified_ASC
  verified_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  isAdmin: Boolean!
  name: String!
  username: String!
  verified: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [UserSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateDataInput {
  isAdmin: Boolean
  name: String
  username: String
  verified: Boolean
  playlists: PlaylistUpdateManyWithoutCreatorInput
}

input UserUpdateInput {
  isAdmin: Boolean
  name: String
  username: String
  verified: Boolean
  playlists: PlaylistUpdateManyWithoutCreatorInput
}

input UserUpdateManyMutationInput {
  isAdmin: Boolean
  name: String
  username: String
  verified: Boolean
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
}

input UserUpdateOneRequiredWithoutPlaylistsInput {
  create: UserCreateWithoutPlaylistsInput
  connect: UserWhereUniqueInput
  update: UserUpdateWithoutPlaylistsDataInput
  upsert: UserUpsertWithoutPlaylistsInput
}

input UserUpdateWithoutPlaylistsDataInput {
  isAdmin: Boolean
  name: String
  username: String
  verified: Boolean
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutPlaylistsInput {
  update: UserUpdateWithoutPlaylistsDataInput!
  create: UserCreateWithoutPlaylistsInput!
}

input UserWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [UserWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  isAdmin: Boolean
  """
  All values that are not equal to given value.
  """
  isAdmin_not: Boolean
  name: String
  """
  All values that are not equal to given value.
  """
  name_not: String
  """
  All values that are contained in given list.
  """
  name_in: [String!]
  """
  All values that are not contained in given list.
  """
  name_not_in: [String!]
  """
  All values less than the given value.
  """
  name_lt: String
  """
  All values less than or equal the given value.
  """
  name_lte: String
  """
  All values greater than the given value.
  """
  name_gt: String
  """
  All values greater than or equal the given value.
  """
  name_gte: String
  """
  All values containing the given string.
  """
  name_contains: String
  """
  All values not containing the given string.
  """
  name_not_contains: String
  """
  All values starting with the given string.
  """
  name_starts_with: String
  """
  All values not starting with the given string.
  """
  name_not_starts_with: String
  """
  All values ending with the given string.
  """
  name_ends_with: String
  """
  All values not ending with the given string.
  """
  name_not_ends_with: String
  username: String
  """
  All values that are not equal to given value.
  """
  username_not: String
  """
  All values that are contained in given list.
  """
  username_in: [String!]
  """
  All values that are not contained in given list.
  """
  username_not_in: [String!]
  """
  All values less than the given value.
  """
  username_lt: String
  """
  All values less than or equal the given value.
  """
  username_lte: String
  """
  All values greater than the given value.
  """
  username_gt: String
  """
  All values greater than or equal the given value.
  """
  username_gte: String
  """
  All values containing the given string.
  """
  username_contains: String
  """
  All values not containing the given string.
  """
  username_not_contains: String
  """
  All values starting with the given string.
  """
  username_starts_with: String
  """
  All values not starting with the given string.
  """
  username_not_starts_with: String
  """
  All values ending with the given string.
  """
  username_ends_with: String
  """
  All values not ending with the given string.
  """
  username_not_ends_with: String
  verified: Boolean
  """
  All values that are not equal to given value.
  """
  verified_not: Boolean
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  playlists_every: PlaylistWhereInput
  playlists_some: PlaylistWhereInput
  playlists_none: PlaylistWhereInput
}

input UserWhereUniqueInput {
  id: ID
  username: String
}

type Mutation {
  createTrack(data: TrackCreateInput!): Track!
  createAlbum(data: AlbumCreateInput!): Album!
  createPlaylist(data: PlaylistCreateInput!): Playlist!
  createUser(data: UserCreateInput!): User!
  createArtist(data: ArtistCreateInput!): Artist!
  createImage(data: ImageCreateInput!): Image!
  updateTrack(data: TrackUpdateInput!, where: TrackWhereUniqueInput!): Track
  updateAlbum(data: AlbumUpdateInput!, where: AlbumWhereUniqueInput!): Album
  updatePlaylist(data: PlaylistUpdateInput!, where: PlaylistWhereUniqueInput!): Playlist
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateArtist(data: ArtistUpdateInput!, where: ArtistWhereUniqueInput!): Artist
  updateImage(data: ImageUpdateInput!, where: ImageWhereUniqueInput!): Image
  deleteTrack(where: TrackWhereUniqueInput!): Track
  deleteAlbum(where: AlbumWhereUniqueInput!): Album
  deletePlaylist(where: PlaylistWhereUniqueInput!): Playlist
  deleteUser(where: UserWhereUniqueInput!): User
  deleteArtist(where: ArtistWhereUniqueInput!): Artist
  deleteImage(where: ImageWhereUniqueInput!): Image
  upsertTrack(where: TrackWhereUniqueInput!, create: TrackCreateInput!, update: TrackUpdateInput!): Track!
  upsertAlbum(where: AlbumWhereUniqueInput!, create: AlbumCreateInput!, update: AlbumUpdateInput!): Album!
  upsertPlaylist(where: PlaylistWhereUniqueInput!, create: PlaylistCreateInput!, update: PlaylistUpdateInput!): Playlist!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertArtist(where: ArtistWhereUniqueInput!, create: ArtistCreateInput!, update: ArtistUpdateInput!): Artist!
  upsertImage(where: ImageWhereUniqueInput!, create: ImageCreateInput!, update: ImageUpdateInput!): Image!
  updateManyTracks(data: TrackUpdateManyMutationInput!, where: TrackWhereInput): BatchPayload!
  updateManyAlbums(data: AlbumUpdateManyMutationInput!, where: AlbumWhereInput): BatchPayload!
  updateManyPlaylists(data: PlaylistUpdateManyMutationInput!, where: PlaylistWhereInput): BatchPayload!
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  updateManyArtists(data: ArtistUpdateManyMutationInput!, where: ArtistWhereInput): BatchPayload!
  updateManyImages(data: ImageUpdateManyMutationInput!, where: ImageWhereInput): BatchPayload!
  deleteManyTracks(where: TrackWhereInput): BatchPayload!
  deleteManyAlbums(where: AlbumWhereInput): BatchPayload!
  deleteManyPlaylists(where: PlaylistWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyArtists(where: ArtistWhereInput): BatchPayload!
  deleteManyImages(where: ImageWhereInput): BatchPayload!
}

type Query {
  tracks(where: TrackWhereInput, orderBy: TrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Track]!
  albums(where: AlbumWhereInput, orderBy: AlbumOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Album]!
  playlists(where: PlaylistWhereInput, orderBy: PlaylistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Playlist]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  artists(where: ArtistWhereInput, orderBy: ArtistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Artist]!
  images(where: ImageWhereInput, orderBy: ImageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Image]!
  track(where: TrackWhereUniqueInput!): Track
  album(where: AlbumWhereUniqueInput!): Album
  playlist(where: PlaylistWhereUniqueInput!): Playlist
  user(where: UserWhereUniqueInput!): User
  artist(where: ArtistWhereUniqueInput!): Artist
  image(where: ImageWhereUniqueInput!): Image
  tracksConnection(where: TrackWhereInput, orderBy: TrackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TrackConnection!
  albumsConnection(where: AlbumWhereInput, orderBy: AlbumOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AlbumConnection!
  playlistsConnection(where: PlaylistWhereInput, orderBy: PlaylistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PlaylistConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  artistsConnection(where: ArtistWhereInput, orderBy: ArtistOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ArtistConnection!
  imagesConnection(where: ImageWhereInput, orderBy: ImageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ImageConnection!
  """
  Fetches an object given its ID
  """
  node("""
  The ID of an object
  """
  id: ID!): Node
}

type Subscription {
  track(where: TrackSubscriptionWhereInput): TrackSubscriptionPayload
  album(where: AlbumSubscriptionWhereInput): AlbumSubscriptionPayload
  playlist(where: PlaylistSubscriptionWhereInput): PlaylistSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  artist(where: ArtistSubscriptionWhereInput): ArtistSubscriptionPayload
  image(where: ImageSubscriptionWhereInput): ImageSubscriptionPayload
}
`

export type Privacy = 
  'PRIVATE' |
  'PUBLIC' |
  'UNLISTED'

export type TrackOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'discNumber_ASC' |
  'discNumber_DESC' |
  'duration_ASC' |
  'duration_DESC' |
  'explicit_ASC' |
  'explicit_DESC' |
  'genre_ASC' |
  'genre_DESC' |
  'isPlayable_ASC' |
  'isPlayable_DESC' |
  'name_ASC' |
  'name_DESC' |
  'trackNumber_ASC' |
  'trackNumber_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type ArtistOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'alias_ASC' |
  'alias_DESC' |
  'name_ASC' |
  'name_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type ReleaseType = 
  'ALBUM' |
  'EP' |
  'LP' |
  'PODCAST' |
  'SINGLE'

export type PlaylistOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'alias_ASC' |
  'alias_DESC' |
  'collaborative_ASC' |
  'collaborative_DESC' |
  'description_ASC' |
  'description_DESC' |
  'duration_ASC' |
  'duration_DESC' |
  'name_ASC' |
  'name_DESC' |
  'numTracks_ASC' |
  'numTracks_DESC' |
  'privacy_ASC' |
  'privacy_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type ImageOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'url_ASC' |
  'url_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type AlbumOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'alias_ASC' |
  'alias_DESC' |
  'duration_ASC' |
  'duration_DESC' |
  'name_ASC' |
  'name_DESC' |
  'numTracks_ASC' |
  'numTracks_DESC' |
  'releaseDate_ASC' |
  'releaseDate_DESC' |
  'releaseType_ASC' |
  'releaseType_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type UserOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'isAdmin_ASC' |
  'isAdmin_DESC' |
  'name_ASC' |
  'name_DESC' |
  'username_ASC' |
  'username_DESC' |
  'verified_ASC' |
  'verified_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type MutationType = 
  'CREATED' |
  'UPDATED' |
  'DELETED'

export interface AlbumUpdateOneRequiredWithoutTracksInput {
  create?: AlbumCreateWithoutTracksInput
  connect?: AlbumWhereUniqueInput
  update?: AlbumUpdateWithoutTracksDataInput
  upsert?: AlbumUpsertWithoutTracksInput
}

export interface TrackWhereInput {
  AND?: TrackWhereInput[] | TrackWhereInput
  OR?: TrackWhereInput[] | TrackWhereInput
  NOT?: TrackWhereInput[] | TrackWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  discNumber?: Int
  discNumber_not?: Int
  discNumber_in?: Int[] | Int
  discNumber_not_in?: Int[] | Int
  discNumber_lt?: Int
  discNumber_lte?: Int
  discNumber_gt?: Int
  discNumber_gte?: Int
  duration?: Int
  duration_not?: Int
  duration_in?: Int[] | Int
  duration_not_in?: Int[] | Int
  duration_lt?: Int
  duration_lte?: Int
  duration_gt?: Int
  duration_gte?: Int
  explicit?: Boolean
  explicit_not?: Boolean
  genre?: String
  genre_not?: String
  genre_in?: String[] | String
  genre_not_in?: String[] | String
  genre_lt?: String
  genre_lte?: String
  genre_gt?: String
  genre_gte?: String
  genre_contains?: String
  genre_not_contains?: String
  genre_starts_with?: String
  genre_not_starts_with?: String
  genre_ends_with?: String
  genre_not_ends_with?: String
  isPlayable?: Boolean
  isPlayable_not?: Boolean
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  trackNumber?: Int
  trackNumber_not?: Int
  trackNumber_in?: Int[] | Int
  trackNumber_not_in?: Int[] | Int
  trackNumber_lt?: Int
  trackNumber_lte?: Int
  trackNumber_gt?: Int
  trackNumber_gte?: Int
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  album?: AlbumWhereInput
  artists_every?: ArtistWhereInput
  artists_some?: ArtistWhereInput
  artists_none?: ArtistWhereInput
  featuring_every?: ArtistWhereInput
  featuring_some?: ArtistWhereInput
  featuring_none?: ArtistWhereInput
  inPlaylist_every?: PlaylistWhereInput
  inPlaylist_some?: PlaylistWhereInput
  inPlaylist_none?: PlaylistWhereInput
}

export interface ArtistUpdategenresInput {
  set?: String[] | String
}

export interface PlaylistWhereInput {
  AND?: PlaylistWhereInput[] | PlaylistWhereInput
  OR?: PlaylistWhereInput[] | PlaylistWhereInput
  NOT?: PlaylistWhereInput[] | PlaylistWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  alias?: String
  alias_not?: String
  alias_in?: String[] | String
  alias_not_in?: String[] | String
  alias_lt?: String
  alias_lte?: String
  alias_gt?: String
  alias_gte?: String
  alias_contains?: String
  alias_not_contains?: String
  alias_starts_with?: String
  alias_not_starts_with?: String
  alias_ends_with?: String
  alias_not_ends_with?: String
  collaborative?: Boolean
  collaborative_not?: Boolean
  description?: String
  description_not?: String
  description_in?: String[] | String
  description_not_in?: String[] | String
  description_lt?: String
  description_lte?: String
  description_gt?: String
  description_gte?: String
  description_contains?: String
  description_not_contains?: String
  description_starts_with?: String
  description_not_starts_with?: String
  description_ends_with?: String
  description_not_ends_with?: String
  duration?: Int
  duration_not?: Int
  duration_in?: Int[] | Int
  duration_not_in?: Int[] | Int
  duration_lt?: Int
  duration_lte?: Int
  duration_gt?: Int
  duration_gte?: Int
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  numTracks?: Int
  numTracks_not?: Int
  numTracks_in?: Int[] | Int
  numTracks_not_in?: Int[] | Int
  numTracks_lt?: Int
  numTracks_lte?: Int
  numTracks_gt?: Int
  numTracks_gte?: Int
  privacy?: Privacy
  privacy_not?: Privacy
  privacy_in?: Privacy[] | Privacy
  privacy_not_in?: Privacy[] | Privacy
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  artwork_every?: ImageWhereInput
  artwork_some?: ImageWhereInput
  artwork_none?: ImageWhereInput
  creator?: UserWhereInput
  tracks_every?: TrackWhereInput
  tracks_some?: TrackWhereInput
  tracks_none?: TrackWhereInput
}

export interface ImageUpdateOneInput {
  create?: ImageCreateInput
  connect?: ImageWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: ImageUpdateDataInput
  upsert?: ImageUpsertNestedInput
}

export interface ImageWhereInput {
  AND?: ImageWhereInput[] | ImageWhereInput
  OR?: ImageWhereInput[] | ImageWhereInput
  NOT?: ImageWhereInput[] | ImageWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  url?: String
  url_not?: String
  url_in?: String[] | String
  url_not_in?: String[] | String
  url_lt?: String
  url_lte?: String
  url_gt?: String
  url_gte?: String
  url_contains?: String
  url_not_contains?: String
  url_starts_with?: String
  url_not_starts_with?: String
  url_ends_with?: String
  url_not_ends_with?: String
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  uploadedBy?: UserWhereInput
}

export interface TrackCreateWithoutFeaturingInput {
  discNumber: Int
  duration: Int
  explicit?: Boolean
  genre: String
  isPlayable?: Boolean
  name: String
  trackNumber: Int
  album: AlbumCreateOneWithoutTracksInput
  artists?: ArtistCreateManyWithoutTracksInput
  inPlaylist?: PlaylistCreateManyWithoutTracksInput
}

export interface TrackUpdateWithoutArtistsDataInput {
  discNumber?: Int
  duration?: Int
  explicit?: Boolean
  genre?: String
  isPlayable?: Boolean
  name?: String
  trackNumber?: Int
  album?: AlbumUpdateOneRequiredWithoutTracksInput
  featuring?: ArtistUpdateManyWithoutFeaturesInInput
  inPlaylist?: PlaylistUpdateManyWithoutTracksInput
}

export interface PlaylistCreateManyWithoutTracksInput {
  create?: PlaylistCreateWithoutTracksInput[] | PlaylistCreateWithoutTracksInput
  connect?: PlaylistWhereUniqueInput[] | PlaylistWhereUniqueInput
}

export interface ImageUpdateDataInput {
  url?: String
  uploadedBy?: UserUpdateOneRequiredInput
}

export interface PlaylistCreateWithoutTracksInput {
  alias: String
  collaborative?: Boolean
  description?: String
  duration: Int
  name: String
  numTracks: Int
  privacy?: Privacy
  artwork?: ImageCreateManyInput
  creator: UserCreateOneWithoutPlaylistsInput
}

export interface ImageSubscriptionWhereInput {
  AND?: ImageSubscriptionWhereInput[] | ImageSubscriptionWhereInput
  OR?: ImageSubscriptionWhereInput[] | ImageSubscriptionWhereInput
  NOT?: ImageSubscriptionWhereInput[] | ImageSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ImageWhereInput
}

export interface UserCreateOneWithoutPlaylistsInput {
  create?: UserCreateWithoutPlaylistsInput
  connect?: UserWhereUniqueInput
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface UserCreateWithoutPlaylistsInput {
  isAdmin?: Boolean
  name: String
  username: String
  verified?: Boolean
}

export interface PlaylistSubscriptionWhereInput {
  AND?: PlaylistSubscriptionWhereInput[] | PlaylistSubscriptionWhereInput
  OR?: PlaylistSubscriptionWhereInput[] | PlaylistSubscriptionWhereInput
  NOT?: PlaylistSubscriptionWhereInput[] | PlaylistSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: PlaylistWhereInput
}

export interface ArtistCreateManyWithoutFeaturesInInput {
  create?: ArtistCreateWithoutFeaturesInInput[] | ArtistCreateWithoutFeaturesInInput
  connect?: ArtistWhereUniqueInput[] | ArtistWhereUniqueInput
}

export interface TrackSubscriptionWhereInput {
  AND?: TrackSubscriptionWhereInput[] | TrackSubscriptionWhereInput
  OR?: TrackSubscriptionWhereInput[] | TrackSubscriptionWhereInput
  NOT?: TrackSubscriptionWhereInput[] | TrackSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: TrackWhereInput
}

export interface ArtistCreateWithoutFeaturesInInput {
  alias: String
  name: String
  genres?: ArtistCreategenresInput
  avatar?: ImageCreateOneInput
  tracks?: TrackCreateManyWithoutArtistsInput
}

export interface TrackWhereUniqueInput {
  id?: ID_Input
}

export interface TrackCreateManyWithoutArtistsInput {
  create?: TrackCreateWithoutArtistsInput[] | TrackCreateWithoutArtistsInput
  connect?: TrackWhereUniqueInput[] | TrackWhereUniqueInput
}

export interface PlaylistWhereUniqueInput {
  id?: ID_Input
  alias?: String
}

export interface TrackCreateWithoutArtistsInput {
  discNumber: Int
  duration: Int
  explicit?: Boolean
  genre: String
  isPlayable?: Boolean
  name: String
  trackNumber: Int
  album: AlbumCreateOneWithoutTracksInput
  featuring?: ArtistCreateManyWithoutFeaturesInInput
  inPlaylist?: PlaylistCreateManyWithoutTracksInput
}

export interface ArtistWhereUniqueInput {
  id?: ID_Input
  alias?: String
}

export interface AlbumCreateInput {
  alias: String
  duration: Int
  name: String
  numTracks: Int
  releaseDate: DateTime
  releaseType: ReleaseType
  genres?: AlbumCreategenresInput
  artists?: ArtistCreateManyInput
  artwork?: ImageCreateOneInput
  tracks?: TrackCreateManyWithoutAlbumInput
}

export interface ArtistUpdateManyMutationInput {
  alias?: String
  name?: String
  genres?: ArtistUpdategenresInput
}

export interface TrackCreateManyWithoutAlbumInput {
  create?: TrackCreateWithoutAlbumInput[] | TrackCreateWithoutAlbumInput
  connect?: TrackWhereUniqueInput[] | TrackWhereUniqueInput
}

export interface PlaylistUpdateManyMutationInput {
  alias?: String
  collaborative?: Boolean
  description?: String
  duration?: Int
  name?: String
  numTracks?: Int
  privacy?: Privacy
}

export interface TrackCreateWithoutAlbumInput {
  discNumber: Int
  duration: Int
  explicit?: Boolean
  genre: String
  isPlayable?: Boolean
  name: String
  trackNumber: Int
  artists?: ArtistCreateManyWithoutTracksInput
  featuring?: ArtistCreateManyWithoutFeaturesInInput
  inPlaylist?: PlaylistCreateManyWithoutTracksInput
}

export interface TrackUpdateManyMutationInput {
  discNumber?: Int
  duration?: Int
  explicit?: Boolean
  genre?: String
  isPlayable?: Boolean
  name?: String
  trackNumber?: Int
}

export interface PlaylistCreateInput {
  alias: String
  collaborative?: Boolean
  description?: String
  duration: Int
  name: String
  numTracks: Int
  privacy?: Privacy
  artwork?: ImageCreateManyInput
  creator: UserCreateOneWithoutPlaylistsInput
  tracks?: TrackCreateManyWithoutInPlaylistInput
}

export interface ArtistUpdateInput {
  alias?: String
  name?: String
  genres?: ArtistUpdategenresInput
  avatar?: ImageUpdateOneInput
  featuresIn?: TrackUpdateManyWithoutFeaturingInput
  tracks?: TrackUpdateManyWithoutArtistsInput
}

export interface TrackUpdateInput {
  discNumber?: Int
  duration?: Int
  explicit?: Boolean
  genre?: String
  isPlayable?: Boolean
  name?: String
  trackNumber?: Int
  album?: AlbumUpdateOneRequiredWithoutTracksInput
  artists?: ArtistUpdateManyWithoutTracksInput
  featuring?: ArtistUpdateManyWithoutFeaturesInInput
  inPlaylist?: PlaylistUpdateManyWithoutTracksInput
}

export interface PlaylistUpdateInput {
  alias?: String
  collaborative?: Boolean
  description?: String
  duration?: Int
  name?: String
  numTracks?: Int
  privacy?: Privacy
  artwork?: ImageUpdateManyInput
  creator?: UserUpdateOneRequiredWithoutPlaylistsInput
  tracks?: TrackUpdateManyWithoutInPlaylistInput
}

export interface TrackUpsertWithWhereUniqueWithoutInPlaylistInput {
  where: TrackWhereUniqueInput
  update: TrackUpdateWithoutInPlaylistDataInput
  create: TrackCreateWithoutInPlaylistInput
}

export interface TrackUpdateWithoutAlbumDataInput {
  discNumber?: Int
  duration?: Int
  explicit?: Boolean
  genre?: String
  isPlayable?: Boolean
  name?: String
  trackNumber?: Int
  artists?: ArtistUpdateManyWithoutTracksInput
  featuring?: ArtistUpdateManyWithoutFeaturesInInput
  inPlaylist?: PlaylistUpdateManyWithoutTracksInput
}

export interface AlbumUpdateWithoutTracksDataInput {
  alias?: String
  duration?: Int
  name?: String
  numTracks?: Int
  releaseDate?: DateTime
  releaseType?: ReleaseType
  genres?: AlbumUpdategenresInput
  artists?: ArtistUpdateManyInput
  artwork?: ImageUpdateOneInput
}

export interface TrackUpdateManyWithoutAlbumInput {
  create?: TrackCreateWithoutAlbumInput[] | TrackCreateWithoutAlbumInput
  connect?: TrackWhereUniqueInput[] | TrackWhereUniqueInput
  disconnect?: TrackWhereUniqueInput[] | TrackWhereUniqueInput
  delete?: TrackWhereUniqueInput[] | TrackWhereUniqueInput
  update?: TrackUpdateWithWhereUniqueWithoutAlbumInput[] | TrackUpdateWithWhereUniqueWithoutAlbumInput
  upsert?: TrackUpsertWithWhereUniqueWithoutAlbumInput[] | TrackUpsertWithWhereUniqueWithoutAlbumInput
}

export interface AlbumUpdategenresInput {
  set?: String[] | String
}

export interface AlbumUpsertWithoutTracksInput {
  update: AlbumUpdateWithoutTracksDataInput
  create: AlbumCreateWithoutTracksInput
}

export interface ArtistUpdateManyInput {
  create?: ArtistCreateInput[] | ArtistCreateInput
  connect?: ArtistWhereUniqueInput[] | ArtistWhereUniqueInput
  disconnect?: ArtistWhereUniqueInput[] | ArtistWhereUniqueInput
  delete?: ArtistWhereUniqueInput[] | ArtistWhereUniqueInput
  update?: ArtistUpdateWithWhereUniqueNestedInput[] | ArtistUpdateWithWhereUniqueNestedInput
  upsert?: ArtistUpsertWithWhereUniqueNestedInput[] | ArtistUpsertWithWhereUniqueNestedInput
}

export interface ImageUpsertNestedInput {
  update: ImageUpdateDataInput
  create: ImageCreateInput
}

export interface ArtistUpdateWithWhereUniqueNestedInput {
  where: ArtistWhereUniqueInput
  data: ArtistUpdateDataInput
}

export interface PlaylistUpsertWithWhereUniqueWithoutCreatorInput {
  where: PlaylistWhereUniqueInput
  update: PlaylistUpdateWithoutCreatorDataInput
  create: PlaylistCreateWithoutCreatorInput
}

export interface ArtistUpdateDataInput {
  alias?: String
  name?: String
  genres?: ArtistUpdategenresInput
  avatar?: ImageUpdateOneInput
  featuresIn?: TrackUpdateManyWithoutFeaturingInput
  tracks?: TrackUpdateManyWithoutArtistsInput
}

export interface AlbumCreateOneWithoutTracksInput {
  create?: AlbumCreateWithoutTracksInput
  connect?: AlbumWhereUniqueInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  NOT?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  isAdmin?: Boolean
  isAdmin_not?: Boolean
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  username?: String
  username_not?: String
  username_in?: String[] | String
  username_not_in?: String[] | String
  username_lt?: String
  username_lte?: String
  username_gt?: String
  username_gte?: String
  username_contains?: String
  username_not_contains?: String
  username_starts_with?: String
  username_not_starts_with?: String
  username_ends_with?: String
  username_not_ends_with?: String
  verified?: Boolean
  verified_not?: Boolean
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  playlists_every?: PlaylistWhereInput
  playlists_some?: PlaylistWhereInput
  playlists_none?: PlaylistWhereInput
}

export interface AlbumCreategenresInput {
  set?: String[] | String
}

export interface ArtistUpsertWithWhereUniqueWithoutFeaturesInInput {
  where: ArtistWhereUniqueInput
  update: ArtistUpdateWithoutFeaturesInDataInput
  create: ArtistCreateWithoutFeaturesInInput
}

export interface ArtistCreateInput {
  alias: String
  name: String
  genres?: ArtistCreategenresInput
  avatar?: ImageCreateOneInput
  featuresIn?: TrackCreateManyWithoutFeaturingInput
  tracks?: TrackCreateManyWithoutArtistsInput
}

export interface TrackUpsertWithWhereUniqueWithoutArtistsInput {
  where: TrackWhereUniqueInput
  update: TrackUpdateWithoutArtistsDataInput
  create: TrackCreateWithoutArtistsInput
}

export interface ImageCreateOneInput {
  create?: ImageCreateInput
  connect?: ImageWhereUniqueInput
}

export interface UserUpdateOneRequiredInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateDataInput
  upsert?: UserUpsertNestedInput
}

export interface UserCreateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
}

export interface UserUpdateDataInput {
  isAdmin?: Boolean
  name?: String
  username?: String
  verified?: Boolean
  playlists?: PlaylistUpdateManyWithoutCreatorInput
}

export interface PlaylistCreateManyWithoutCreatorInput {
  create?: PlaylistCreateWithoutCreatorInput[] | PlaylistCreateWithoutCreatorInput
  connect?: PlaylistWhereUniqueInput[] | PlaylistWhereUniqueInput
}

export interface PlaylistUpdateManyWithoutCreatorInput {
  create?: PlaylistCreateWithoutCreatorInput[] | PlaylistCreateWithoutCreatorInput
  connect?: PlaylistWhereUniqueInput[] | PlaylistWhereUniqueInput
  disconnect?: PlaylistWhereUniqueInput[] | PlaylistWhereUniqueInput
  delete?: PlaylistWhereUniqueInput[] | PlaylistWhereUniqueInput
  update?: PlaylistUpdateWithWhereUniqueWithoutCreatorInput[] | PlaylistUpdateWithWhereUniqueWithoutCreatorInput
  upsert?: PlaylistUpsertWithWhereUniqueWithoutCreatorInput[] | PlaylistUpsertWithWhereUniqueWithoutCreatorInput
}

export interface ImageCreateManyInput {
  create?: ImageCreateInput[] | ImageCreateInput
  connect?: ImageWhereUniqueInput[] | ImageWhereUniqueInput
}

export interface PlaylistUpdateWithWhereUniqueWithoutCreatorInput {
  where: PlaylistWhereUniqueInput
  data: PlaylistUpdateWithoutCreatorDataInput
}

export interface TrackCreateWithoutInPlaylistInput {
  discNumber: Int
  duration: Int
  explicit?: Boolean
  genre: String
  isPlayable?: Boolean
  name: String
  trackNumber: Int
  album: AlbumCreateOneWithoutTracksInput
  artists?: ArtistCreateManyWithoutTracksInput
  featuring?: ArtistCreateManyWithoutFeaturesInInput
}

export interface PlaylistUpdateWithoutCreatorDataInput {
  alias?: String
  collaborative?: Boolean
  description?: String
  duration?: Int
  name?: String
  numTracks?: Int
  privacy?: Privacy
  artwork?: ImageUpdateManyInput
  tracks?: TrackUpdateManyWithoutInPlaylistInput
}

export interface ArtistCreateWithoutTracksInput {
  alias: String
  name: String
  genres?: ArtistCreategenresInput
  avatar?: ImageCreateOneInput
  featuresIn?: TrackCreateManyWithoutFeaturingInput
}

export interface ImageUpdateManyInput {
  create?: ImageCreateInput[] | ImageCreateInput
  connect?: ImageWhereUniqueInput[] | ImageWhereUniqueInput
  disconnect?: ImageWhereUniqueInput[] | ImageWhereUniqueInput
  delete?: ImageWhereUniqueInput[] | ImageWhereUniqueInput
  update?: ImageUpdateWithWhereUniqueNestedInput[] | ImageUpdateWithWhereUniqueNestedInput
  upsert?: ImageUpsertWithWhereUniqueNestedInput[] | ImageUpsertWithWhereUniqueNestedInput
}

export interface ArtistWhereInput {
  AND?: ArtistWhereInput[] | ArtistWhereInput
  OR?: ArtistWhereInput[] | ArtistWhereInput
  NOT?: ArtistWhereInput[] | ArtistWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  alias?: String
  alias_not?: String
  alias_in?: String[] | String
  alias_not_in?: String[] | String
  alias_lt?: String
  alias_lte?: String
  alias_gt?: String
  alias_gte?: String
  alias_contains?: String
  alias_not_contains?: String
  alias_starts_with?: String
  alias_not_starts_with?: String
  alias_ends_with?: String
  alias_not_ends_with?: String
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  avatar?: ImageWhereInput
  featuresIn_every?: TrackWhereInput
  featuresIn_some?: TrackWhereInput
  featuresIn_none?: TrackWhereInput
  tracks_every?: TrackWhereInput
  tracks_some?: TrackWhereInput
  tracks_none?: TrackWhereInput
}

export interface ImageUpdateWithWhereUniqueNestedInput {
  where: ImageWhereUniqueInput
  data: ImageUpdateDataInput
}

export interface AlbumWhereInput {
  AND?: AlbumWhereInput[] | AlbumWhereInput
  OR?: AlbumWhereInput[] | AlbumWhereInput
  NOT?: AlbumWhereInput[] | AlbumWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  alias?: String
  alias_not?: String
  alias_in?: String[] | String
  alias_not_in?: String[] | String
  alias_lt?: String
  alias_lte?: String
  alias_gt?: String
  alias_gte?: String
  alias_contains?: String
  alias_not_contains?: String
  alias_starts_with?: String
  alias_not_starts_with?: String
  alias_ends_with?: String
  alias_not_ends_with?: String
  duration?: Int
  duration_not?: Int
  duration_in?: Int[] | Int
  duration_not_in?: Int[] | Int
  duration_lt?: Int
  duration_lte?: Int
  duration_gt?: Int
  duration_gte?: Int
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  numTracks?: Int
  numTracks_not?: Int
  numTracks_in?: Int[] | Int
  numTracks_not_in?: Int[] | Int
  numTracks_lt?: Int
  numTracks_lte?: Int
  numTracks_gt?: Int
  numTracks_gte?: Int
  releaseDate?: DateTime
  releaseDate_not?: DateTime
  releaseDate_in?: DateTime[] | DateTime
  releaseDate_not_in?: DateTime[] | DateTime
  releaseDate_lt?: DateTime
  releaseDate_lte?: DateTime
  releaseDate_gt?: DateTime
  releaseDate_gte?: DateTime
  releaseType?: ReleaseType
  releaseType_not?: ReleaseType
  releaseType_in?: ReleaseType[] | ReleaseType
  releaseType_not_in?: ReleaseType[] | ReleaseType
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  artists_every?: ArtistWhereInput
  artists_some?: ArtistWhereInput
  artists_none?: ArtistWhereInput
  artwork?: ImageWhereInput
  tracks_every?: TrackWhereInput
  tracks_some?: TrackWhereInput
  tracks_none?: TrackWhereInput
}

export interface ImageUpsertWithWhereUniqueNestedInput {
  where: ImageWhereUniqueInput
  update: ImageUpdateDataInput
  create: ImageCreateInput
}

export interface ImageUpdateManyMutationInput {
  url?: String
}

export interface TrackUpdateManyWithoutInPlaylistInput {
  create?: TrackCreateWithoutInPlaylistInput[] | TrackCreateWithoutInPlaylistInput
  connect?: TrackWhereUniqueInput[] | TrackWhereUniqueInput
  disconnect?: TrackWhereUniqueInput[] | TrackWhereUniqueInput
  delete?: TrackWhereUniqueInput[] | TrackWhereUniqueInput
  update?: TrackUpdateWithWhereUniqueWithoutInPlaylistInput[] | TrackUpdateWithWhereUniqueWithoutInPlaylistInput
  upsert?: TrackUpsertWithWhereUniqueWithoutInPlaylistInput[] | TrackUpsertWithWhereUniqueWithoutInPlaylistInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  username?: String
}

export interface TrackUpdateWithWhereUniqueWithoutInPlaylistInput {
  where: TrackWhereUniqueInput
  data: TrackUpdateWithoutInPlaylistDataInput
}

export interface UserUpdateManyMutationInput {
  isAdmin?: Boolean
  name?: String
  username?: String
  verified?: Boolean
}

export interface TrackUpdateWithoutInPlaylistDataInput {
  discNumber?: Int
  duration?: Int
  explicit?: Boolean
  genre?: String
  isPlayable?: Boolean
  name?: String
  trackNumber?: Int
  album?: AlbumUpdateOneRequiredWithoutTracksInput
  artists?: ArtistUpdateManyWithoutTracksInput
  featuring?: ArtistUpdateManyWithoutFeaturesInInput
}

export interface ImageUpdateInput {
  url?: String
  uploadedBy?: UserUpdateOneRequiredInput
}

export interface ArtistUpdateManyWithoutTracksInput {
  create?: ArtistCreateWithoutTracksInput[] | ArtistCreateWithoutTracksInput
  connect?: ArtistWhereUniqueInput[] | ArtistWhereUniqueInput
  disconnect?: ArtistWhereUniqueInput[] | ArtistWhereUniqueInput
  delete?: ArtistWhereUniqueInput[] | ArtistWhereUniqueInput
  update?: ArtistUpdateWithWhereUniqueWithoutTracksInput[] | ArtistUpdateWithWhereUniqueWithoutTracksInput
  upsert?: ArtistUpsertWithWhereUniqueWithoutTracksInput[] | ArtistUpsertWithWhereUniqueWithoutTracksInput
}

export interface TrackUpsertWithWhereUniqueWithoutAlbumInput {
  where: TrackWhereUniqueInput
  update: TrackUpdateWithoutAlbumDataInput
  create: TrackCreateWithoutAlbumInput
}

export interface ArtistUpdateWithWhereUniqueWithoutTracksInput {
  where: ArtistWhereUniqueInput
  data: ArtistUpdateWithoutTracksDataInput
}

export interface AlbumUpdateInput {
  alias?: String
  duration?: Int
  name?: String
  numTracks?: Int
  releaseDate?: DateTime
  releaseType?: ReleaseType
  genres?: AlbumUpdategenresInput
  artists?: ArtistUpdateManyInput
  artwork?: ImageUpdateOneInput
  tracks?: TrackUpdateManyWithoutAlbumInput
}

export interface ArtistUpdateWithoutTracksDataInput {
  alias?: String
  name?: String
  genres?: ArtistUpdategenresInput
  avatar?: ImageUpdateOneInput
  featuresIn?: TrackUpdateManyWithoutFeaturingInput
}

export interface UserUpsertNestedInput {
  update: UserUpdateDataInput
  create: UserCreateInput
}

export interface TrackUpdateManyWithoutFeaturingInput {
  create?: TrackCreateWithoutFeaturingInput[] | TrackCreateWithoutFeaturingInput
  connect?: TrackWhereUniqueInput[] | TrackWhereUniqueInput
  disconnect?: TrackWhereUniqueInput[] | TrackWhereUniqueInput
  delete?: TrackWhereUniqueInput[] | TrackWhereUniqueInput
  update?: TrackUpdateWithWhereUniqueWithoutFeaturingInput[] | TrackUpdateWithWhereUniqueWithoutFeaturingInput
  upsert?: TrackUpsertWithWhereUniqueWithoutFeaturingInput[] | TrackUpsertWithWhereUniqueWithoutFeaturingInput
}

export interface AlbumCreateWithoutTracksInput {
  alias: String
  duration: Int
  name: String
  numTracks: Int
  releaseDate: DateTime
  releaseType: ReleaseType
  genres?: AlbumCreategenresInput
  artists?: ArtistCreateManyInput
  artwork?: ImageCreateOneInput
}

export interface TrackUpdateWithWhereUniqueWithoutFeaturingInput {
  where: TrackWhereUniqueInput
  data: TrackUpdateWithoutFeaturingDataInput
}

export interface ArtistCreategenresInput {
  set?: String[] | String
}

export interface TrackUpdateWithoutFeaturingDataInput {
  discNumber?: Int
  duration?: Int
  explicit?: Boolean
  genre?: String
  isPlayable?: Boolean
  name?: String
  trackNumber?: Int
  album?: AlbumUpdateOneRequiredWithoutTracksInput
  artists?: ArtistUpdateManyWithoutTracksInput
  inPlaylist?: PlaylistUpdateManyWithoutTracksInput
}

export interface UserCreateInput {
  isAdmin?: Boolean
  name: String
  username: String
  verified?: Boolean
  playlists?: PlaylistCreateManyWithoutCreatorInput
}

export interface PlaylistUpdateManyWithoutTracksInput {
  create?: PlaylistCreateWithoutTracksInput[] | PlaylistCreateWithoutTracksInput
  connect?: PlaylistWhereUniqueInput[] | PlaylistWhereUniqueInput
  disconnect?: PlaylistWhereUniqueInput[] | PlaylistWhereUniqueInput
  delete?: PlaylistWhereUniqueInput[] | PlaylistWhereUniqueInput
  update?: PlaylistUpdateWithWhereUniqueWithoutTracksInput[] | PlaylistUpdateWithWhereUniqueWithoutTracksInput
  upsert?: PlaylistUpsertWithWhereUniqueWithoutTracksInput[] | PlaylistUpsertWithWhereUniqueWithoutTracksInput
}

export interface TrackCreateManyWithoutInPlaylistInput {
  create?: TrackCreateWithoutInPlaylistInput[] | TrackCreateWithoutInPlaylistInput
  connect?: TrackWhereUniqueInput[] | TrackWhereUniqueInput
}

export interface PlaylistUpdateWithWhereUniqueWithoutTracksInput {
  where: PlaylistWhereUniqueInput
  data: PlaylistUpdateWithoutTracksDataInput
}

export interface TrackCreateManyWithoutFeaturingInput {
  create?: TrackCreateWithoutFeaturingInput[] | TrackCreateWithoutFeaturingInput
  connect?: TrackWhereUniqueInput[] | TrackWhereUniqueInput
}

export interface PlaylistUpdateWithoutTracksDataInput {
  alias?: String
  collaborative?: Boolean
  description?: String
  duration?: Int
  name?: String
  numTracks?: Int
  privacy?: Privacy
  artwork?: ImageUpdateManyInput
  creator?: UserUpdateOneRequiredWithoutPlaylistsInput
}

export interface AlbumSubscriptionWhereInput {
  AND?: AlbumSubscriptionWhereInput[] | AlbumSubscriptionWhereInput
  OR?: AlbumSubscriptionWhereInput[] | AlbumSubscriptionWhereInput
  NOT?: AlbumSubscriptionWhereInput[] | AlbumSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: AlbumWhereInput
}

export interface UserUpdateOneRequiredWithoutPlaylistsInput {
  create?: UserCreateWithoutPlaylistsInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutPlaylistsDataInput
  upsert?: UserUpsertWithoutPlaylistsInput
}

export interface ImageWhereUniqueInput {
  id?: ID_Input
}

export interface UserUpdateWithoutPlaylistsDataInput {
  isAdmin?: Boolean
  name?: String
  username?: String
  verified?: Boolean
}

export interface UserUpdateInput {
  isAdmin?: Boolean
  name?: String
  username?: String
  verified?: Boolean
  playlists?: PlaylistUpdateManyWithoutCreatorInput
}

export interface UserUpsertWithoutPlaylistsInput {
  update: UserUpdateWithoutPlaylistsDataInput
  create: UserCreateWithoutPlaylistsInput
}

export interface ArtistUpsertWithWhereUniqueNestedInput {
  where: ArtistWhereUniqueInput
  update: ArtistUpdateDataInput
  create: ArtistCreateInput
}

export interface PlaylistUpsertWithWhereUniqueWithoutTracksInput {
  where: PlaylistWhereUniqueInput
  update: PlaylistUpdateWithoutTracksDataInput
  create: PlaylistCreateWithoutTracksInput
}

export interface ArtistCreateManyInput {
  create?: ArtistCreateInput[] | ArtistCreateInput
  connect?: ArtistWhereUniqueInput[] | ArtistWhereUniqueInput
}

export interface TrackUpsertWithWhereUniqueWithoutFeaturingInput {
  where: TrackWhereUniqueInput
  update: TrackUpdateWithoutFeaturingDataInput
  create: TrackCreateWithoutFeaturingInput
}

export interface PlaylistCreateWithoutCreatorInput {
  alias: String
  collaborative?: Boolean
  description?: String
  duration: Int
  name: String
  numTracks: Int
  privacy?: Privacy
  artwork?: ImageCreateManyInput
  tracks?: TrackCreateManyWithoutInPlaylistInput
}

export interface ArtistUpsertWithWhereUniqueWithoutTracksInput {
  where: ArtistWhereUniqueInput
  update: ArtistUpdateWithoutTracksDataInput
  create: ArtistCreateWithoutTracksInput
}

export interface ArtistSubscriptionWhereInput {
  AND?: ArtistSubscriptionWhereInput[] | ArtistSubscriptionWhereInput
  OR?: ArtistSubscriptionWhereInput[] | ArtistSubscriptionWhereInput
  NOT?: ArtistSubscriptionWhereInput[] | ArtistSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ArtistWhereInput
}

export interface ArtistUpdateManyWithoutFeaturesInInput {
  create?: ArtistCreateWithoutFeaturesInInput[] | ArtistCreateWithoutFeaturesInInput
  connect?: ArtistWhereUniqueInput[] | ArtistWhereUniqueInput
  disconnect?: ArtistWhereUniqueInput[] | ArtistWhereUniqueInput
  delete?: ArtistWhereUniqueInput[] | ArtistWhereUniqueInput
  update?: ArtistUpdateWithWhereUniqueWithoutFeaturesInInput[] | ArtistUpdateWithWhereUniqueWithoutFeaturesInInput
  upsert?: ArtistUpsertWithWhereUniqueWithoutFeaturesInInput[] | ArtistUpsertWithWhereUniqueWithoutFeaturesInInput
}

export interface AlbumUpdateManyMutationInput {
  alias?: String
  duration?: Int
  name?: String
  numTracks?: Int
  releaseDate?: DateTime
  releaseType?: ReleaseType
  genres?: AlbumUpdategenresInput
}

export interface TrackCreateInput {
  discNumber: Int
  duration: Int
  explicit?: Boolean
  genre: String
  isPlayable?: Boolean
  name: String
  trackNumber: Int
  album: AlbumCreateOneWithoutTracksInput
  artists?: ArtistCreateManyWithoutTracksInput
  featuring?: ArtistCreateManyWithoutFeaturesInInput
  inPlaylist?: PlaylistCreateManyWithoutTracksInput
}

export interface TrackUpdateWithWhereUniqueWithoutArtistsInput {
  where: TrackWhereUniqueInput
  data: TrackUpdateWithoutArtistsDataInput
}

export interface TrackUpdateManyWithoutArtistsInput {
  create?: TrackCreateWithoutArtistsInput[] | TrackCreateWithoutArtistsInput
  connect?: TrackWhereUniqueInput[] | TrackWhereUniqueInput
  disconnect?: TrackWhereUniqueInput[] | TrackWhereUniqueInput
  delete?: TrackWhereUniqueInput[] | TrackWhereUniqueInput
  update?: TrackUpdateWithWhereUniqueWithoutArtistsInput[] | TrackUpdateWithWhereUniqueWithoutArtistsInput
  upsert?: TrackUpsertWithWhereUniqueWithoutArtistsInput[] | TrackUpsertWithWhereUniqueWithoutArtistsInput
}

export interface ArtistUpdateWithoutFeaturesInDataInput {
  alias?: String
  name?: String
  genres?: ArtistUpdategenresInput
  avatar?: ImageUpdateOneInput
  tracks?: TrackUpdateManyWithoutArtistsInput
}

export interface ArtistUpdateWithWhereUniqueWithoutFeaturesInInput {
  where: ArtistWhereUniqueInput
  data: ArtistUpdateWithoutFeaturesInDataInput
}

export interface ImageCreateInput {
  url: String
  uploadedBy: UserCreateOneInput
}

export interface TrackUpdateWithWhereUniqueWithoutAlbumInput {
  where: TrackWhereUniqueInput
  data: TrackUpdateWithoutAlbumDataInput
}

export interface AlbumWhereUniqueInput {
  id?: ID_Input
  alias?: String
}

export interface ArtistCreateManyWithoutTracksInput {
  create?: ArtistCreateWithoutTracksInput[] | ArtistCreateWithoutTracksInput
  connect?: ArtistWhereUniqueInput[] | ArtistWhereUniqueInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface ImagePreviousValues {
  id: ID_Output
  url: String
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * A connection to a list of items.

 */
export interface TrackConnection {
  pageInfo: PageInfo
  edges: TrackEdge[]
  aggregate: AggregateTrack
}

export interface Album extends Node {
  id: ID_Output
  alias: String
  artists?: Artist[]
  duration: Int
  genres: String[]
  artwork?: Image
  name: String
  numTracks: Int
  releaseDate: DateTime
  releaseType: ReleaseType
  tracks?: Track[]
  createdAt: DateTime
  updatedAt: DateTime
}

export interface Track extends Node {
  id: ID_Output
  album: Album
  artists?: Artist[]
  discNumber: Int
  duration: Int
  explicit: Boolean
  featuring?: Artist[]
  genre: String
  inPlaylist?: Playlist[]
  isPlayable: Boolean
  name: String
  trackNumber: Int
  createdAt: DateTime
  updatedAt: DateTime
}

export interface Image extends Node {
  id: ID_Output
  uploadedBy: User
  url: String
  createdAt: DateTime
  updatedAt: DateTime
}

export interface AggregateImage {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface ImageEdge {
  node: Image
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface ImageConnection {
  pageInfo: PageInfo
  edges: ImageEdge[]
  aggregate: AggregateImage
}

/*
 * An edge in a connection.

 */
export interface ArtistEdge {
  node: Artist
  cursor: String
}

export interface Artist extends Node {
  id: ID_Output
  alias: String
  avatar?: Image
  featuresIn?: Track[]
  genres: String[]
  name: String
  tracks?: Track[]
  createdAt: DateTime
  updatedAt: DateTime
}

export interface AggregateUser {
  count: Int
}

export interface ArtistPreviousValues {
  id: ID_Output
  alias: String
  genres: String[]
  name: String
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

export interface TrackSubscriptionPayload {
  mutation: MutationType
  node?: Track
  updatedFields?: String[]
  previousValues?: TrackPreviousValues
}

/*
 * An edge in a connection.

 */
export interface PlaylistEdge {
  node: Playlist
  cursor: String
}

export interface TrackPreviousValues {
  id: ID_Output
  discNumber: Int
  duration: Int
  explicit: Boolean
  genre: String
  isPlayable: Boolean
  name: String
  trackNumber: Int
  createdAt: DateTime
  updatedAt: DateTime
}

export interface AggregateAlbum {
  count: Int
}

export interface ArtistSubscriptionPayload {
  mutation: MutationType
  node?: Artist
  updatedFields?: String[]
  previousValues?: ArtistPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface AlbumConnection {
  pageInfo: PageInfo
  edges: AlbumEdge[]
  aggregate: AggregateAlbum
}

export interface AlbumSubscriptionPayload {
  mutation: MutationType
  node?: Album
  updatedFields?: String[]
  previousValues?: AlbumPreviousValues
}

export interface ImageSubscriptionPayload {
  mutation: MutationType
  node?: Image
  updatedFields?: String[]
  previousValues?: ImagePreviousValues
}

export interface AlbumPreviousValues {
  id: ID_Output
  alias: String
  duration: Int
  genres: String[]
  name: String
  numTracks: Int
  releaseDate: DateTime
  releaseType: ReleaseType
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * An edge in a connection.

 */
export interface TrackEdge {
  node: Track
  cursor: String
}

export interface Playlist extends Node {
  id: ID_Output
  alias: String
  artwork?: Image[]
  collaborative: Boolean
  creator: User
  description?: String
  duration: Int
  name: String
  numTracks: Int
  privacy: Privacy
  tracks?: Track[]
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * A connection to a list of items.

 */
export interface ArtistConnection {
  pageInfo: PageInfo
  edges: ArtistEdge[]
  aggregate: AggregateArtist
}

export interface PlaylistSubscriptionPayload {
  mutation: MutationType
  node?: Playlist
  updatedFields?: String[]
  previousValues?: PlaylistPreviousValues
}

export interface AggregatePlaylist {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface AlbumEdge {
  node: Album
  cursor: String
}

export interface UserPreviousValues {
  id: ID_Output
  isAdmin: Boolean
  name: String
  username: String
  verified: Boolean
  createdAt: DateTime
  updatedAt: DateTime
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

export interface User extends Node {
  id: ID_Output
  isAdmin: Boolean
  name: String
  playlists?: Playlist[]
  username: String
  verified: Boolean
  createdAt: DateTime
  updatedAt: DateTime
}

export interface PlaylistPreviousValues {
  id: ID_Output
  alias: String
  collaborative: Boolean
  description?: String
  duration: Int
  name: String
  numTracks: Int
  privacy: Privacy
  createdAt: DateTime
  updatedAt: DateTime
}

export interface BatchPayload {
  count: Long
}

/*
 * A connection to a list of items.

 */
export interface PlaylistConnection {
  pageInfo: PageInfo
  edges: PlaylistEdge[]
  aggregate: AggregatePlaylist
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

export interface AggregateArtist {
  count: Int
}

export interface AggregateTrack {
  count: Int
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

export type DateTime = string

export interface Schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

export type Query = {
  tracks: (args: { where?: TrackWhereInput, orderBy?: TrackOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Track[]>
  albums: (args: { where?: AlbumWhereInput, orderBy?: AlbumOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Album[]>
  playlists: (args: { where?: PlaylistWhereInput, orderBy?: PlaylistOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Playlist[]>
  users: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<User[]>
  artists: (args: { where?: ArtistWhereInput, orderBy?: ArtistOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Artist[]>
  images: (args: { where?: ImageWhereInput, orderBy?: ImageOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Image[]>
  track: (args: { where: TrackWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Track | null>
  album: (args: { where: AlbumWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Album | null>
  playlist: (args: { where: PlaylistWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Playlist | null>
  user: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  artist: (args: { where: ArtistWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Artist | null>
  image: (args: { where: ImageWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Image | null>
  tracksConnection: (args: { where?: TrackWhereInput, orderBy?: TrackOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<TrackConnection>
  albumsConnection: (args: { where?: AlbumWhereInput, orderBy?: AlbumOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<AlbumConnection>
  playlistsConnection: (args: { where?: PlaylistWhereInput, orderBy?: PlaylistOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<PlaylistConnection>
  usersConnection: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<UserConnection>
  artistsConnection: (args: { where?: ArtistWhereInput, orderBy?: ArtistOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<ArtistConnection>
  imagesConnection: (args: { where?: ImageWhereInput, orderBy?: ImageOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<ImageConnection>
  node: (args: { id: ID_Output }, info?: GraphQLResolveInfo | string) => Promise<Node | null>
}

export type Mutation = {
  createTrack: (args: { data: TrackCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Track>
  createAlbum: (args: { data: AlbumCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Album>
  createPlaylist: (args: { data: PlaylistCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Playlist>
  createUser: (args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  createArtist: (args: { data: ArtistCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Artist>
  createImage: (args: { data: ImageCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Image>
  updateTrack: (args: { data: TrackUpdateInput, where: TrackWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Track | null>
  updateAlbum: (args: { data: AlbumUpdateInput, where: AlbumWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Album | null>
  updatePlaylist: (args: { data: PlaylistUpdateInput, where: PlaylistWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Playlist | null>
  updateUser: (args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  updateArtist: (args: { data: ArtistUpdateInput, where: ArtistWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Artist | null>
  updateImage: (args: { data: ImageUpdateInput, where: ImageWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Image | null>
  deleteTrack: (args: { where: TrackWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Track | null>
  deleteAlbum: (args: { where: AlbumWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Album | null>
  deletePlaylist: (args: { where: PlaylistWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Playlist | null>
  deleteUser: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  deleteArtist: (args: { where: ArtistWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Artist | null>
  deleteImage: (args: { where: ImageWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Image | null>
  upsertTrack: (args: { where: TrackWhereUniqueInput, create: TrackCreateInput, update: TrackUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Track>
  upsertAlbum: (args: { where: AlbumWhereUniqueInput, create: AlbumCreateInput, update: AlbumUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Album>
  upsertPlaylist: (args: { where: PlaylistWhereUniqueInput, create: PlaylistCreateInput, update: PlaylistUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Playlist>
  upsertUser: (args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  upsertArtist: (args: { where: ArtistWhereUniqueInput, create: ArtistCreateInput, update: ArtistUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Artist>
  upsertImage: (args: { where: ImageWhereUniqueInput, create: ImageCreateInput, update: ImageUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Image>
  updateManyTracks: (args: { data: TrackUpdateManyMutationInput, where?: TrackWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyAlbums: (args: { data: AlbumUpdateManyMutationInput, where?: AlbumWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyPlaylists: (args: { data: PlaylistUpdateManyMutationInput, where?: PlaylistWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyUsers: (args: { data: UserUpdateManyMutationInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyArtists: (args: { data: ArtistUpdateManyMutationInput, where?: ArtistWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyImages: (args: { data: ImageUpdateManyMutationInput, where?: ImageWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyTracks: (args: { where?: TrackWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyAlbums: (args: { where?: AlbumWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyPlaylists: (args: { where?: PlaylistWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyUsers: (args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyArtists: (args: { where?: ArtistWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyImages: (args: { where?: ImageWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
}

export type Subscription = {
  track: (args: { where?: TrackSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<TrackSubscriptionPayload>>
  album: (args: { where?: AlbumSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<AlbumSubscriptionPayload>>
  playlist: (args: { where?: PlaylistSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<PlaylistSubscriptionPayload>>
  user: (args: { where?: UserSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<UserSubscriptionPayload>>
  artist: (args: { where?: ArtistSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<ArtistSubscriptionPayload>>
  image: (args: { where?: ImageSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<ImageSubscriptionPayload>>
}

export class Prisma extends BasePrisma {
  
  constructor({ endpoint, secret, fragmentReplacements, debug }: BasePrismaOptions) {
    super({ typeDefs, endpoint, secret, fragmentReplacements, debug });
  }

  exists = {
    Track: (where: TrackWhereInput): Promise<boolean> => super.existsDelegate('query', 'tracks', { where }, {}, '{ id }'),
    Album: (where: AlbumWhereInput): Promise<boolean> => super.existsDelegate('query', 'albums', { where }, {}, '{ id }'),
    Playlist: (where: PlaylistWhereInput): Promise<boolean> => super.existsDelegate('query', 'playlists', { where }, {}, '{ id }'),
    User: (where: UserWhereInput): Promise<boolean> => super.existsDelegate('query', 'users', { where }, {}, '{ id }'),
    Artist: (where: ArtistWhereInput): Promise<boolean> => super.existsDelegate('query', 'artists', { where }, {}, '{ id }'),
    Image: (where: ImageWhereInput): Promise<boolean> => super.existsDelegate('query', 'images', { where }, {}, '{ id }')
  }

  query: Query = {
    tracks: (args, info): Promise<Track[]> => super.delegate('query', 'tracks', args, {}, info),
    albums: (args, info): Promise<Album[]> => super.delegate('query', 'albums', args, {}, info),
    playlists: (args, info): Promise<Playlist[]> => super.delegate('query', 'playlists', args, {}, info),
    users: (args, info): Promise<User[]> => super.delegate('query', 'users', args, {}, info),
    artists: (args, info): Promise<Artist[]> => super.delegate('query', 'artists', args, {}, info),
    images: (args, info): Promise<Image[]> => super.delegate('query', 'images', args, {}, info),
    track: (args, info): Promise<Track | null> => super.delegate('query', 'track', args, {}, info),
    album: (args, info): Promise<Album | null> => super.delegate('query', 'album', args, {}, info),
    playlist: (args, info): Promise<Playlist | null> => super.delegate('query', 'playlist', args, {}, info),
    user: (args, info): Promise<User | null> => super.delegate('query', 'user', args, {}, info),
    artist: (args, info): Promise<Artist | null> => super.delegate('query', 'artist', args, {}, info),
    image: (args, info): Promise<Image | null> => super.delegate('query', 'image', args, {}, info),
    tracksConnection: (args, info): Promise<TrackConnection> => super.delegate('query', 'tracksConnection', args, {}, info),
    albumsConnection: (args, info): Promise<AlbumConnection> => super.delegate('query', 'albumsConnection', args, {}, info),
    playlistsConnection: (args, info): Promise<PlaylistConnection> => super.delegate('query', 'playlistsConnection', args, {}, info),
    usersConnection: (args, info): Promise<UserConnection> => super.delegate('query', 'usersConnection', args, {}, info),
    artistsConnection: (args, info): Promise<ArtistConnection> => super.delegate('query', 'artistsConnection', args, {}, info),
    imagesConnection: (args, info): Promise<ImageConnection> => super.delegate('query', 'imagesConnection', args, {}, info),
    node: (args, info): Promise<Node | null> => super.delegate('query', 'node', args, {}, info)
  }

  mutation: Mutation = {
    createTrack: (args, info): Promise<Track> => super.delegate('mutation', 'createTrack', args, {}, info),
    createAlbum: (args, info): Promise<Album> => super.delegate('mutation', 'createAlbum', args, {}, info),
    createPlaylist: (args, info): Promise<Playlist> => super.delegate('mutation', 'createPlaylist', args, {}, info),
    createUser: (args, info): Promise<User> => super.delegate('mutation', 'createUser', args, {}, info),
    createArtist: (args, info): Promise<Artist> => super.delegate('mutation', 'createArtist', args, {}, info),
    createImage: (args, info): Promise<Image> => super.delegate('mutation', 'createImage', args, {}, info),
    updateTrack: (args, info): Promise<Track | null> => super.delegate('mutation', 'updateTrack', args, {}, info),
    updateAlbum: (args, info): Promise<Album | null> => super.delegate('mutation', 'updateAlbum', args, {}, info),
    updatePlaylist: (args, info): Promise<Playlist | null> => super.delegate('mutation', 'updatePlaylist', args, {}, info),
    updateUser: (args, info): Promise<User | null> => super.delegate('mutation', 'updateUser', args, {}, info),
    updateArtist: (args, info): Promise<Artist | null> => super.delegate('mutation', 'updateArtist', args, {}, info),
    updateImage: (args, info): Promise<Image | null> => super.delegate('mutation', 'updateImage', args, {}, info),
    deleteTrack: (args, info): Promise<Track | null> => super.delegate('mutation', 'deleteTrack', args, {}, info),
    deleteAlbum: (args, info): Promise<Album | null> => super.delegate('mutation', 'deleteAlbum', args, {}, info),
    deletePlaylist: (args, info): Promise<Playlist | null> => super.delegate('mutation', 'deletePlaylist', args, {}, info),
    deleteUser: (args, info): Promise<User | null> => super.delegate('mutation', 'deleteUser', args, {}, info),
    deleteArtist: (args, info): Promise<Artist | null> => super.delegate('mutation', 'deleteArtist', args, {}, info),
    deleteImage: (args, info): Promise<Image | null> => super.delegate('mutation', 'deleteImage', args, {}, info),
    upsertTrack: (args, info): Promise<Track> => super.delegate('mutation', 'upsertTrack', args, {}, info),
    upsertAlbum: (args, info): Promise<Album> => super.delegate('mutation', 'upsertAlbum', args, {}, info),
    upsertPlaylist: (args, info): Promise<Playlist> => super.delegate('mutation', 'upsertPlaylist', args, {}, info),
    upsertUser: (args, info): Promise<User> => super.delegate('mutation', 'upsertUser', args, {}, info),
    upsertArtist: (args, info): Promise<Artist> => super.delegate('mutation', 'upsertArtist', args, {}, info),
    upsertImage: (args, info): Promise<Image> => super.delegate('mutation', 'upsertImage', args, {}, info),
    updateManyTracks: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyTracks', args, {}, info),
    updateManyAlbums: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyAlbums', args, {}, info),
    updateManyPlaylists: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyPlaylists', args, {}, info),
    updateManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyUsers', args, {}, info),
    updateManyArtists: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyArtists', args, {}, info),
    updateManyImages: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyImages', args, {}, info),
    deleteManyTracks: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyTracks', args, {}, info),
    deleteManyAlbums: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyAlbums', args, {}, info),
    deleteManyPlaylists: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyPlaylists', args, {}, info),
    deleteManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyUsers', args, {}, info),
    deleteManyArtists: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyArtists', args, {}, info),
    deleteManyImages: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyImages', args, {}, info)
  }

  subscription: Subscription = {
    track: (args, infoOrQuery): Promise<AsyncIterator<TrackSubscriptionPayload>> => super.delegateSubscription('track', args, {}, infoOrQuery),
    album: (args, infoOrQuery): Promise<AsyncIterator<AlbumSubscriptionPayload>> => super.delegateSubscription('album', args, {}, infoOrQuery),
    playlist: (args, infoOrQuery): Promise<AsyncIterator<PlaylistSubscriptionPayload>> => super.delegateSubscription('playlist', args, {}, infoOrQuery),
    user: (args, infoOrQuery): Promise<AsyncIterator<UserSubscriptionPayload>> => super.delegateSubscription('user', args, {}, infoOrQuery),
    artist: (args, infoOrQuery): Promise<AsyncIterator<ArtistSubscriptionPayload>> => super.delegateSubscription('artist', args, {}, infoOrQuery),
    image: (args, infoOrQuery): Promise<AsyncIterator<ImageSubscriptionPayload>> => super.delegateSubscription('image', args, {}, infoOrQuery)
  }
}