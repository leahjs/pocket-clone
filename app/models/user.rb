require 'bcrypt'

class User < ActiveRecord::Base
  has_many :links

  # users.password_hash in the database is a :string
  # include Bcrypt

  # def password
  #   @password ||= Password.new(password_hash)
  # end

  # def password=(new_password)
  #   @password = BCrypt::Password.create(new_password)
  #   self.password_hash = @password
  # end

  before_save :encrypt_password
  after_save :clear_password
  def encrypt_password
    if encrypted_password.present?
      self.salt = BCrypt::Engine.generate_salt
      self.encrypted_password= BCrypt::Engine.hash_secret(encrypted_password, salt)
    end
  end

  def clear_password
    self.encrypted_password = nil
  end
end
