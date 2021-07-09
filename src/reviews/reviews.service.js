const knex = require('../db/connection');

const list = (movieId) => {
    return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.movie_id", "*")
    .where({ movie_id:movieId });
}

const read = (reviewId) => {
    return knex('reviews')
    .select('*')
    .where({review_id: reviewId})
    .first()
}

const update = async (updatedReview) => {
   const review_id = updatedReview.review_id;
   await knex('reviews')
   .select('*')
   .where({review_id:review_id})
   .update(updatedReview, '*');

   return read(updatedReview.review_id)
}

const reviewCritic = (criticId) => {
    return knex('critics')
    .select('*')
    .where({ critic_id : criticId })
    .first();
}

const destroy = reviewId => {
    return knex('reviews')
    .where({ review_id: reviewId})
    .del()
}

module.exports = {
    list,
    update,
    reviewCritic,
    read,
    delete: destroy,
};