class WeblinksController < ApplicationController

  def index
    # binding.pry
    @weblinks = Weblink.where(:user_id => session[:user_id])

  end

  def show
    require 'pismo'
    @url_id = Weblink.all.find(params[:id])
    @doc = Pismo::Document.new(@url_id.url)
    @imgbest = MetaInspector.new(@url_id.url)
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
    @link = Weblink.all.find(params[:id])
    @link.destroy
    redirect_to '/mylinks'
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
      flash[:notice] = @weblinks.errors.full_messages.first
      # flash[:notice] = "Link Addition Unsuccessful"
      redirect_to '/addlinks'
    end
  end
  # def toggle_favorite?
  #   toggle!(:favorite) if favorite.blank? 

  # end
  def favorites
    # @weblink = Weblink.all.find(params[:id])
    # binding.pry
    @fav_links = Weblink.where(:favorite => true)
  end

  def favorite
    @weblink = Weblink.all.find(params[:id])
    @weblink.update_attribute(:favorite, true)
    flash[:notice] = "Favorited Link Successfully"
    redirect_to '/mylinks'
  end

  def unfavorite
    @weblink = Weblink.all.find(params[:id])
    @weblink.update_attribute(:favorite, false)
    flash[:notice] = "Unfavorited Link Successfully"
    redirect_to '/mylinks'
  end

  private

  def weblink_params
    params.require(:weblink).permit(:user_id, :url)
  end
end
