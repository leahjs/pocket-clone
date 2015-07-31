class UsersController < ApplicationController

  # before_filter :authorize
  # def index
  # end
  def new
    @user = User.new
  end

  def create #creating an account
    params.permit!
    @user = User.new(params[:user])
    # @user.name = params[:name]
    # @user.username = params[:username]
    # @user.email = params[:email] 
    # @user.password = params[:encrypted_password]
    # @user.salt = params[:salt]
    if @user.errors.any? # If there are errors, do something
      @user.errors.each do |attribute, message|
        message
      end
    end

    @user.save

    if @user.save
      flash[:notice] = "You Signed up successfully"
      session[:user_id] = @user.id
      redirect_to '/'
    else
      redirect_to '/signup'
      
      flash[:notice] = "Your Sign up was Unsuccessful"
    end
    # render "new"
  end
 

  def show
  end

  def update
  end

  private

  def user_params
    params.require(:user).permit(:id, :name, :email, :username, :password, :password_confirmation)
  end

end
