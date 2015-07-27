class WeblinksController < ApplicationController

  def index
  end

  def edit
  end

  def delete
  end

  def create
    @weblinks = Weblinks.find(params[:links])
  end


  private

  def weblinks_params
    params.require(:weblinks).permit(:links)
  end
end
