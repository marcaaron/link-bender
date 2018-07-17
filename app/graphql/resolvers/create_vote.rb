class Resolvers::CreateVote < GraphQL::Function
  argument :linkId, types.ID
  argument :user_id, types.ID
  type Types::VoteType

  def call(_obj, args, ctx)
    user = User.find_by(args[:user_id])
    Vote.create!(
      link: Link.find_by(id: args[:linkId]),
      # user: ctx[:current_user]
      user: user
    )
  end

end
