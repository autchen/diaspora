class CreateCandidates < ActiveRecord::Migration
  def change
    create_table :candidates do |t|
      t.string :diaspora_handle
      t.decimal :score
      t.string :guid

      # this adds an integer column called 'recommendation_id'
      t.references :recommendation, index: true

      t.timestamps null: false
    end
    add_foreign_key :candidates, :recommendations
  end
end
