class HeatmapController < ApplicationController
    def index
        @heatmaps = Heatmap.where(user_id: params[:user_id])

        if @heatmaps.present?
            return render json: [
                :heatmaps => @heatmaps
            ], status: :ok 
        else
            return render json: [
                :heatmaps => []
            ], status: :ok
        end
    end
end
