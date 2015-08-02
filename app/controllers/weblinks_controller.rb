class WeblinksController < ApplicationController

  def index
    # binding.pry
    @weblinks = Weblink.where(:user_id => session[:user_id])

  end

  def show
    require 'pismo'
    @url_id = Weblink.all.find(params[:id])
# # Load a Web page (you could pass an IO object or a string with existing HTML data along, as you prefer)
    @doc = Pismo::Document.new(@url_id.url)
    # binding.pry
    

# doc.title     # => "Cramp: Asychronous Event-Driven Ruby Web App Framework"
# doc.author    # => "Peter Cooper"
# doc.lede      # => "Cramp (GitHub repo) is a new, asynchronous evented Web app framework by Pratik Naik of 37signals (and the Rails core team). It's built around Ruby's EventMachine library and was designed to use event-driven I/O throughout - making it ideal for situations where you need to handle a large number of open connections (such as Comet systems or streaming APIs.)"
# doc.keywords  # => [["cramp", 7], ["controllers", 3], ["app", 3], ["basic", 2], ..., ... ]

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
