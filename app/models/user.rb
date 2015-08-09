require 'bcrypt'

class User < ActiveRecord::Base
  has_many :links
  has_secure_password
  before_save { self.url = url.downcase } 
  # URL_REGEX = /(http:\/\/www.)|\w+\.+\w+?\.\w+/i

  validates :url, presence: true, uniqueness: true,
            # format:     { with: URL_REGEX },
            uniqueness: { case_sensitive: false }   

  validates :username, :presence => true, :uniqueness => true, :length => {:in => 5..15}
  validates :email, :presence => true, :uniqueness => true

end
