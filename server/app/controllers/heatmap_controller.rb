class HeatmapController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :authenticate_devise_api_token!
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
            ], status: :created
        rescue
            return render json: [
                :message => "Heatmap could not be created",
                :errors => @heatmap.errors
            ], status: :unprocessable_entity
        end
    end

    def update
        @heatmap = Heatmap.find(params[:id])

        if @heatmap.present?
            begin
                @heatmap.update!(heatmap_params)
                return render json: [
                    :message => "Heatmap updated successfully",
                    :heatmap => @heatmap
                ], status: :ok
            rescue
                return render json: [
                    :message => "Heatmap could not be updated",
                    :errors => @heatmap.errors
                ], status: :unprocessable_entity
            end
        else
            return render json: [
                :errors => ["Heatmap not found"]
            ]
        end
    end

    def destroy
        @heatmap = Heatmap.find(params[:id])

        if @heatmap.present?
            @heatmap.destroy
            return render json: [
                :message => "Heatmap deleted successfully"
            ], status: :ok
        else
            return render json: [
                :errors => ["Heatmap not found"]
            ]
        end
    end

    private
    def heatmap_params
        params.permit(:name, :user_id, :data)
    end
end
