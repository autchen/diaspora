class Candidate < ActiveRecord::Base
        include Diaspora::Federated::Base
        include Diaspora::Guid

        xml_attr :created_at
        xml_attr :diaspora_handle
        xml_attr :score
        xml_reader :recommendation_guid

        belongs_to :recommendation, :touch => true

        def subscribers(user)
                return [self.recommendation.recipient]
        end

        def public?
                false
        end
end
