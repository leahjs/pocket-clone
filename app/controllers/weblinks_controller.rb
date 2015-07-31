class WeblinksController < ApplicationController

  def index
    @weblinks = Weblink.all
  end

  def new
    @weblinks = Weblink.new
  end
  def edit
    @weblinks = Weblink.all.find(params[:id])
  end

  def update
    @weblinks = Weblink.all.find(params[:id])
    # @weblinks.find(params[:id])
    @weblinks.update(weblink_params)
    redirect_to '/mylinks' 
  end

  def destroy
    # binding.pry
    @link = Weblink.all.find(params[:id])
    @link.destroy
    # link[:links] = nil
    redirect_to '/mylinks'
    # @weblink = Weblink.find(params[:id])
    # @link = Weblink.find(params[:links])
    # session[:user_id] = nil
  end

  def create
    params.permit!
    @weblinks = Weblink.new(params[:weblink])
    # @weblinks = Weblinks.find(params[:links])
    # @weblinks_user = Weblinks.find(params[:user_id])
    @weblinks.save

    if @weblinks.save
      flash[:notice] = "Added Link Successfully"
      redirect_to '/mylinks'
    else
      flash[:notice] = "Link Addition unsuccessful"
    end
  end

  def favorite
    # binding.pry
    @weblink = Weblink.all.find(params[:id])
    @weblink.update_attribute(:favorite, true)
    flash[:notice] = "Favorited Link Successfully"
    redirect_to '/mylinks'
  end

  private

  def weblink_params
    params.require(:weblink).permit(:user_id, :url)
  end
end
