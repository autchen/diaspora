module RecommendationsHelper

        def contact_persons
                current_user.contacts.map do |contact|
                        [contact.person.diaspora_handle, contact.person.id]
                end
        end

end
