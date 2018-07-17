class Resolvers::CreateVote < GraphQL::Function
  argument :link_id, !types.ID
  argument :user_id, !types.ID
  type Types::VoteType

  def call(_obj, args, ctx)
    user = User.find_by(id: args[:user_id])
    Vote.create!(
      link: Link.find_by(id: args[:link_id]),
      # user: ctx[:current_user]
      user: user
    )
  end

end
