const reviewsService = require('./reviews.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

const list = async (req, res, next) => {
    const movieId = res.locals.movie.movie_id;
    const reviews = await reviewsService.list(movieId);
    const formatReviews = reviews.map(review => {
        const {
            critic_id,
            preferred_name,
            surname,
            organization_name
        } = review;
        return {
            ...review,
            critic_id,
            critic: {
                critic_id,
                preferred_name,
                surname,
                organization_name
            }
        }
    });
    return res.json({ data: formatReviews })
};

const update = async (req, res, next) => {
    if(req.body.data){
        const updatedReview = { ...res.locals.review, ...req.body.data};
        const upD = await reviewsService.update(updatedReview);
        upD.critic = await reviewsService.reviewCritic(updatedReview.critic_id);
        return res.json({ data: upD })
    }
    else{
        return next({
            status: 400,
            message: 'Update failed'
        })
    }
};

const reviewIdExists = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await reviewsService.read(Number(reviewId));
    if(review){
        res.locals.review = review;
        return next()
    }
    else{
        return next({
            status:404,
            message:'Review cannot be found.'
        });
    };
};

const destroy = async (req, res, next) => {
    const { review_id } = res.locals.review;
    await reviewsService.delete(review_id);
    return res.sendStatus(204);
};


module.exports = {
    update: [asyncErrorBoundary(reviewIdExists),asyncErrorBoundary(update)],
    delete:[asyncErrorBoundary(reviewIdExists), asyncErrorBoundary(destroy)],
    list: [asyncErrorBoundary(list)],
};