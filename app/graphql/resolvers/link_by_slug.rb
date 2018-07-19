class Resolvers::LinkBySlug < GraphQL::Function
  argument :slug, !types.String
  type Types::LinkType

  def call(_obj, args, _ctx)
    link = Link.find_by(slug: args[:slug])

    if !link
      return GraphQL::ExecutionError.new("Unable to Find Link with Provided Slug")
    else
      return link
    end
  end
end
