class CreateRecommendations < ActiveRecord::Migration
  def change
    create_table :recommendations do |t|
      t.integer :author_id
      t.integer :recipient_id
      t.string :guid

      t.timestamps null: false
    end
  end
end
