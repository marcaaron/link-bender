class AddSlugToLink < ActiveRecord::Migration[5.2]
  def change
    add_column :links, :slug, :string
  end
end
