class Mutations::DeleteVote < GraphQL::Function
  argument :link_id, types.ID
  argument :user_id, types.ID
  type types.Boolean

  def call(obj, args, ctx)
    vote = Vote.find_by(link_id: args[:link_id], user_id: args[:user_id])
    !!vote.destroy
  end
end
