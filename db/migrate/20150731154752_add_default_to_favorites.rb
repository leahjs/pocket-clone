class AddDefaultToFavorites < ActiveRecord::Migration
  def change
    change_column :weblinks, :favorite, :boolean, :default => false
  end
end
