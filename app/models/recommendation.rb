class Recommendation < ActiveRecord::Base
        include Diaspora::Federated::Base
        include Diaspora::Guid

        xml_attr :created_at
        xml_reader :diaspora_handle
        xml_reader :recipient_handle
        xml_attr :candidates, :as => [Candidate]

        belongs_to :author, :class_name => 'Person'
        belongs_to :recipient, :class_name => 'Person'

        has_many :candidates, dependent: :destroy

        accepts_nested_attributes_for :candidates

        def subscribers(user)
                [self.recipient]
        end

        def public?
                false
        end
end
