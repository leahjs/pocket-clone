class SessionsController < ApplicationController
  
  def new
  end
  
  def create #when the user signs in .aka. login
    # binding.pry
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to '/', :notice => "Welcome back, #{user.email}"
    else
      redirect_to '/login', :notice => "Log In Unsuccessful"
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to '/login'
  end

  # def authenticate(encrypted_password)
  #   if @user.password == encrypted_password

  # end

  # def password
  #   @password ||= Password.new(password_hash)
  # end
  # def password=(new_password)
  #   @password = BCrypt::Password.create(new_password)
  #   self.password_hash = @password
  # end

  # def login
  #   @user = User.find_by_email(params[:email])
  #   if @user.password == params[:password]
  #     give_token
  #   else
  #     # redirect_to 'user#new'
  #   end
  # end

end
