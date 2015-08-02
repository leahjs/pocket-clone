class Weblink < ActiveRecord::Base
  belongs_to :user
  before_save { self.url = url.downcase } 
  # URL_REGEX = /(http:\/\/www.)|\w+\.+\w+?\.\w+/i

  validates :url, presence: true, uniqueness: true,
            # format:     { with: URL_REGEX },
            uniqueness: { case_sensitive: false }   

  def favorited?
    !favorite.blank?
  end
end
