Rails.application.routes.draw do
  devise_for :users
  get "up" => "rails/health#show", as: :rails_health_check

  get "api/heatmaps/:user_id", to: "heatmap#index", as: :heatmaps
  post "api/heatmaps", to: "heatmap#create", as: :heatmaps_create
  patch "api/heatmaps/:id", to: "heatmap#update", as: :heatmaps_update
  delete "api/heatmaps/:id", to: "heatmap#destroy", as: :heatmaps_destroy
end
