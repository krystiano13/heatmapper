class Heatmap < ApplicationRecord
    validates :name , presence: true
    validates :user_id, presence: true
end
