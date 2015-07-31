class AddFavoriteToWeblink < ActiveRecord::Migration
  def change
    add_column :weblinks, :favorite, :boolean
  end
end
