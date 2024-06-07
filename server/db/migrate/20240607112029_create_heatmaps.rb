class CreateHeatmaps < ActiveRecord::Migration[7.1]
  def change
    create_table :heatmaps do |t|
      t.string :name, null: false
      t.integer :user_id, null: false
      t.string :data, null: true
      t.timestamps
    end
  end
end
