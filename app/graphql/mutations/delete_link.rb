class Mutations::DeleteLink < GraphQL::Function
  argument :id, types.ID
  type types.Boolean

  def call(obj, args, ctx)
    votes = Vote.find_by(link_id: args[:id])
    votes.destroy if votes
    link = Link.find(args[:id])
    !!link.destroy
  end
end
