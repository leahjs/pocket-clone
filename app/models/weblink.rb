class Weblink < ActiveRecord::Base
  belongs_to :user
  validates :url, uniqueness: true
  # URL_REGEX = "/(http://www.)|\w+\.+\w+?\.\w+/i

  def favorited?
    !favorite.blank?
  end
end
