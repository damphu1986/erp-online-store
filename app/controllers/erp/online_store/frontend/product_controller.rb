module Erp
  module OnlineStore
    module Frontend
      class ProductController < Erp::Frontend::FrontendController
        before_action :set_comment, only: [:delete_comment]
        include ActionView::Helpers::NumberHelper

        def product_detail
          @body_class = "res layout-subpage"
          @product = Erp::Products::Product.find(params[:product_id])
          @meta_keywords = @product.meta_keywords
          @meta_description = @product.meta_description
          @deal_products = Erp::Products::Product.get_deal_products
        end

        def comments
          @product = Erp::Products::Product.find(params[:product_id])

          # product comment
          if params[:comment].present?
            @comment = Erp::Products::Comment.new(comment_params)
            @comment.user = current_user
            @comment.save
          end

          @comments = @product.comments.order('created_at DESC')
            .where(parent_id: nil)
            .where(archived: false)
            .paginate(:page => params[:page], :per_page => 5)

          render 'erp/online_store/frontend/modules/product/_comments', locals: {comments: @comments}, layout: nil
        end

        def ratings
          @rating = current_user.find_rating_by_product(params[:product_id]) if !current_user.nil?
          @product = Erp::Products::Product.find(params[:product_id])

          # product rating
          if params[:rating].present?
            @rating.update(rating_params)
            @rating.user = current_user
            @rating.save
          end

          @ratings = @product.ratings.order('created_at DESC')
            .where(archived: false)
            .paginate(:page => params[:page], :per_page => 5)

          render 'erp/online_store/frontend/modules/product/_ratings', locals: {ratings: @ratings}, layout: nil
        end

        def delete_comment
          authorize! :delete, @comment

          @comment.destroy
          redirect_to :back, notice: 'Nội dung bình luận đã được xóa'
        end

        def delete_rating
          @rating = Erp::Products::Rating.find(params[:rating_id])

          authorize! :delete, @rating

          @rating.destroy
          redirect_to :back, notice: 'Nội dung đánh giá đã được xóa'
        end

        def product_quickview
          @product = Erp::Products::Product.find(params[:product_id])
          render layout: "erp/frontend/quickview"
        end

        def autosearch
          @products = Erp::Products::Product.search(params).paginate(:page => params[:page], :per_page => 10)

          render json: @products.map { |product| {
            name: product.name,
            price: format_number(product.price) + ' ₫',
            link: product_link(product),
            image: image_src(product.main_image, 'small'),
          }}
        end

        # view all product properties
        def all_property
          @product = Erp::Products::Product.find(params[:product_id])
          render "erp/online_store/frontend/modules/product/_all_property", layout: nil
        end

        # Search page
        def search
          @keyword = params[:keyword]
          @body_class = "res layout-subpage"
          @products = Erp::Products::Product.search(params).paginate(:page => params[:page], :per_page => 12)
          @menu = Erp::Menus::Menu.find(params[:menu_id]) if params[:menu_id].present?
        end

        private
          def set_comment
            @comment = Erp::Products::Comment.find(params[:comment_id])
          end

          def comment_params
            params.fetch(:comment, {}).permit(:message, :product_id, :parent_id)
          end

          def rating_params
            params.fetch(:rating, {}).permit(:content, :product_id, :star)
          end
      end
    end
  end
end
