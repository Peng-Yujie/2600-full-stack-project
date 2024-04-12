const Score = (user, time, difficulty) => {
  return {
    User: user,
    Time: time,
    Difficulty: difficulty,
    PostedAt: new Date().toUTCString(),
  };
};
module.exports = Score;
