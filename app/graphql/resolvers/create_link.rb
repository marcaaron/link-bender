class Resolvers::CreateLink < GraphQL::Function
  argument :description, !types.String
  argument :url, !types.String
  argument :user, types.ID
  type Types::LinkType

  def call(obj, args, ctx)
    puts ctx[:current_user]
    Link.create!(
      description: args[:description],
      url: args[:url],
      user: ctx[:current_user]
    )
  rescue ActiveRecord::RecordInvalid => e
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end
