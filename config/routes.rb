Rails.application.routes.draw do

  # get 'weblinks/index'

  # get 'weblinks/create'
  resources :users
  resources :weblinks do
    member do
      patch 'favorite'
      patch 'unfavorite'
    end
  end
  root to: 'users#index'

  get '/signup' => 'users#new'
  post '/users' => 'users#create'

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'

  get '/mylinks' => 'weblinks#index'
  get '/addlinks' => 'weblinks#new'
  post '/weblinks' => 'weblinks#create'
  # post '/update' => 'weblinks#update'
  delete '/destroy' => 'weblinks#destroy'
  get '/myfavorites' => 'weblinks#favorites'
  # patch '/weblinks/:id/favorite(.:format)' => 'weblinks#favosrite'
  patch '/weblinks/:id/edit(.:format)' => 'weblinks#edit'
  # PUT or POST '/weblinks/:id/favorite(.:format)' Data: { state: true/false } => 'weblinks#favorite'

  # these routes are for showing users a login form, logging them in, and logging them out.
  # get "/signout" => "sessions#destroy", :as => :signout


  # get 'user#new'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
