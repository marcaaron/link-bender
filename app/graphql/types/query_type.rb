Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  # Add root-level fields here.
  # They will be entry points for queries on your schema.

  field :linkById, types[Types::LinkType] do
    description 'Find Link By Id'
    argument :id, types.ID, 'The ID of the link to retrieve.'
    resolve -> (obj, args, ctx) {
      Link.find([args[:id]])
    }
  end
  field :allLinks, function: Resolvers::LinksSearch
  field :allUsers, !types[Types::UserType] do
    resolve -> (obj, args, ctx) { User.all }
  end

  field :userById, types[Types::UserType] do
    description 'Find User By Id'
    argument :id, types.ID, 'The ID of the user to retrieve.'
    resolve -> (obj, args, ctx) {
      User.find([args[:id]])
    }
  end
end
