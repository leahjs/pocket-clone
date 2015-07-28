require 'bcrypt'

class User < ActiveRecord::Base
  has_many :links
  has_secure_password

  # users.password_hash in the database is a :string
  # include Bcrypt

  # before_save :encrypt_password
  # after_save :clear_password

  # def encrypt_password
  #   if encrypted_password.present? #before its actually encrypted name of column in User table
  #     self.salt = BCrypt::Engine.generate_salt
  #     self.encrypted_password= BCrypt::Engine.hash_secret(encrypted_password, salt)
  #   end
  # end

  # def clear_password
  #   self.encrypted_password = nil
  # end

  # def self.authenticate(user_email, encrypted_password)
  #   if @user.encrypted_password == encrypted_password
  #     return true
  #   end

  # end

#   user = User.find_by_email("mhartl@example.com")
# >> user.has_password?("foobar")

  # def has_password?(submitted_password)
    
  #   encrypted_password == submitted_password
  # end

  # def self.authenticate(email, submitted_password)
  #   user = find_by_email(email)
  #   # return nil  if user.nil?
  #   return user if user.has_password?(submitted_password)
  # end
  
end
