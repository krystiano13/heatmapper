class HeatmapController < ApplicationController
    skip_before_action :verify_authenticity_token
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

    def create
        @heatmap = Heatmap.new(heatmap_params)

        begin
            @heatmap.save!
            return render json: [
                :message => "Heatmap created successfully",
                :heatmap => @heatmap
            ]
        rescue
            return render json: [
                :message => "Heatmap could not be created",
                :errors => @heatmap.errors
            ]
        end
    end

    private
    def heatmap_params
        params.permit(:name, :user_id, :data)
    end
end
