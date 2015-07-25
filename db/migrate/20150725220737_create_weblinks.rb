class CreateWeblinks < ActiveRecord::Migration
  def change
    create_table :weblinks do |t|
      t.string :links
    end
  end
end
