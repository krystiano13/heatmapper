Rails.application.routes.draw do
  devise_for :users
  get "up" => "rails/health#show", as: :rails_health_check

  get "api/heatmaps/:user_id", to: "heatmap#index", as: :heatmaps
end
