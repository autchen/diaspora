class RecommendationsController < ApplicationController
        def index
                @recommendations = recommendation_about_me
                recommend_friends
                recommendation_format
        end

        def new
                @recommendation = Recommendation.new
                scored_candidates
                recommendation_format
        end

        def create
                @recommendation = Recommendation.new(recommendation_params)
                scored_candidates

                respond_to do |format|
                        if @recommendation.save
                                Postzord::Dispatcher.build(current_user, @recommendation).post
                                format.html{redirect_to @recommendation, notice: 'recommendation posted'}
                                format.json{render json: @recommendation, status: :posted, location: @recommendation }
                        else
                                format.html{render action: "new" }
                                format.json{render json: @recommendation.errors, status: :error }
                        end
                end
        end

        def show
                @recommendation = Recommendation.find(params[:id])
                recommendation_format
        end

        def destroy
                @recommendation = Recommendation.find(params[:id])
                @recommendation.destroy
                respond_to do |format|                                           
                        format.html{redirect_to recommendations_path, notice: 'recommendation deleted'}
                        format.json{render head: no_content}                
                end
        end

        private                                                                  
        def recommendation_format                                                 
                respond_to do |format|                                           
                        format.html                                              
                        format.json{render json: @recommendation}                
                end                                                              
        end       

        def scored_candidates
                current_user.contacts.map do |contact|
                        @recommendation.candidates.build({:diaspora_handle => contact.person.diaspora_handle, :score => 1})
                end
        end

        def recommendation_params
                params.require(:recommendation).permit(:author_id, :recipient_id)
        end

        def recommend_friends
                @candidates = {}
                recommendation_for_me.each do |rec|
                        if rec.author_id != current_user.person.id
                                rec.candidates.each do |cand|
                                        unless (contact_person_handles.include?(cand.diaspora_handle) || 
                                                cand.diaspora_handle == current_user.person.diaspora_handle)
                                                if @candidates[cand.diaspora_handle].nil?
                                                        @candidates[cand.diaspora_handle] = 0
                                                end
                                                @candidates[cand.diaspora_handle] += cand.score
                                        end
                                end
                        end
                end
                @candidates.sort_by{|k, v| v}
        end

        def contact_person_handles
                current_user.contacts.map do |contact|
                        contact.person.diaspora_handle
                end
        end

        def recommendation_for_me
                tmp = []
                Recommendation.all.each do |rec|
                        if rec.recipient_id == current_user.person.id
                                tmp.push(rec)
                        end
                end
                tmp
        end

        def recommendation_about_me
                tmp = []
                Recommendation.all.each do |rec|
                        if rec.recipient_id == current_user.person.id || rec.author_id == current_user.person.id
                                tmp.push(rec)
                        end
                end
                tmp
        end
end
