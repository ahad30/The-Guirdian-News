import React from 'react';

const SingleComment = ({ item }) => {
  const { recommended } = item;
console.log(item)
  return (
    <div>
      <div>
        {recommended.map(comment => (
          <p key={comment._id}>
            {comment.recommendProductName}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SingleComment;
