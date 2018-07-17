class Resolvers::DeleteLink < GraphQL::Function
  argument :id, !types.ID
  type Types::LinkType

  def call(_obj, args, ctx)
    input = args[:id]
    Link.destroy([args[:id]])
  end
end
