class AddUserIdToWeblinks < ActiveRecord::Migration
  def change
    add_reference :weblinks, :user, index: true
    add_foreign_key :weblinks, :users
  end
end
