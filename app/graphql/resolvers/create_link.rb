class Resolvers::CreateLink < GraphQL::Function
  argument :description, !types.String
  argument :url, !types.String
  argument :user_id, !types.ID
  type Types::LinkType

  def call(obj, args, ctx)
    user = User.find_by(id: args[:user_id])
    Link.create!(
      description: args[:description],
      url: args[:url],
      user: user
      # user: ctx[:current_user]
    )
  rescue ActiveRecord::RecordInvalid => e
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
