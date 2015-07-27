class UsersController < ApplicationController

  # def index
  #   @user = User.find(params[:id])
  # end
  def new
    @user = User.new
  end

  def create
    params.permit!
    @user = User.new(params[:user])
    # @user.name = params[:name]
    # @user.username = params[:username]
    # @user.email = params[:email] 
    # @user.password = params[:encrypted_password]
    # @user.salt = params[:salt]
    @user.save!

    if @user.save
      flash[:notice] = "You Signed up successfully"
      flash[:color]= "valid"
    else
      flash[:notice] = "Form is invalid"
      flash[:color]= "invalid"
    end
    render "new"
  end

  def login
    @user = User.find_by_email(params[:email])
    if @user.password == params[:password]
      give_token
    else
      # redirect_to 'user#new'
    end
  end

  def show
  end

  def update
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :username, :encrypted_password, :salt)
  end

end
