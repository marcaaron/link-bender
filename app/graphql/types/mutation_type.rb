Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"
  # field :deleteLink, field: Mutations::DeleteLinkMutation.field
  field :createLink, function: Resolvers::CreateLink.new
  # field :deleteLink, function: Resolvers::DeleteLink.new
  field :createVote, function: Resolvers::CreateVote.new
  field :createUser, function: Resolvers::CreateUser.new
  field :signinUser, function: Resolvers::SignInUser.new

  field :deleteLink, function: Mutations::DeleteLink.new

end
