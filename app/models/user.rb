require 'bcrypt'

class User < ActiveRecord::Base
  has_many :links
  has_secure_password

  # users.password_hash in the database is a :string
  # include Bcrypt
  # validates :username, :presence => {:message => "put something"} #, :uniqueness => true, :length => {:in => 3..20}
  # VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  # validates :email, presence: true, :uniqueness => true, format: { with: VALID_EMAIL_REGEX }

  # validates :password, :confirmation => true
  # validates_length_of :password, :in => 6..20, :on => :create

  
end
