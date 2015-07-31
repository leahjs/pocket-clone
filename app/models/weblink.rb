class Weblink < ActiveRecord::Base
  belongs_to :user

  def favorited?
    !favorite.blank?
  end
end
